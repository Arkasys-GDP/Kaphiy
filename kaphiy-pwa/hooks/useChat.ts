import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/chat";

export function formatTime() {
  return new Date().toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    let sid = localStorage.getItem("chat_session_id");
    let isNewSession = false;
    
    if (!sid) {
      sid = "session_" + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("chat_session_id", sid);
      isNewSession = true;
    }
    setSessionId(sid);

    if (isNewSession) {
      localStorage.removeItem("chat_messages");
      setMessages([]);
    } else {
      const savedMessages = localStorage.getItem("chat_messages");
      if (savedMessages) {
        try {
          setMessages(JSON.parse(savedMessages));
        } catch (e) {}
      }
    }
    setIsInitialized(true);

    const checkOnlineStatus = async () => {
      try {
        await fetch('/api/n8n-webhook', { method: 'OPTIONS' });
        setIsOnline(true);
      } catch (e) {
        setIsOnline(false);
      }
    };
    checkOnlineStatus();
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("chat_messages", JSON.stringify(messages));
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isInitialized, isTyping]);

  async function toggleRecording() {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
          handleSend(undefined, audioBlob);
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error al acceder al micrófono:", err);
        alert("No se pudo acceder al micrófono para grabar audio.");
      }
    }
  }

  async function handleSend(text?: string, audioBlob?: Blob) {
    const msgText = text ?? inputValue.trim();
    if (!msgText && !audioBlob) return;

    if (msgText) {
      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        text: msgText,
        time: formatTime(),
      };
      setMessages((prev) => [...prev, userMsg]);
    } else if (audioBlob) {
      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        text: "🎙️ Mensaje de voz",
        time: formatTime(),
      };
      setMessages((prev) => [...prev, userMsg]);
    }

    setInputValue("");
    setIsTyping(true);

    try {
      const formData = new FormData();
      formData.append("sessionId", sessionId);
      if (msgText) {
        formData.append("text", msgText);
      }
      if (audioBlob) {
        formData.append("data", audioBlob, "audio.webm");
      }

      const response = await fetch('/api/n8n-webhook', {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del webhook");
      }

      const textResponse = await response.text();
      let data: any = {};
      
      try {
        data = JSON.parse(textResponse);
      } catch (e) {
        const match = textResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (match && match[1]) {
          try { data = JSON.parse(match[1]); } catch(err) {}
        }
        if (!data.response) {
          data = { response: textResponse };
        }
      }

      if (data.orderReady && data.cartItems) {
        localStorage.setItem("current_order", JSON.stringify({
          cartItems: data.cartItems,
          aiNotes: data.aiNotes || []
        }));
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: data.response || "Lo siento, no tengo respuesta en este momento.",
        time: formatTime(),
        isOrderReady: !!data.orderReady
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: "Hubo un error de conexión con el asistente.",
        time: formatTime(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  }

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    isRecording,
    isOnline,
    handleSend,
    toggleRecording,
    messagesEndRef,
    inputRef,
    isInitialized
  };
}
