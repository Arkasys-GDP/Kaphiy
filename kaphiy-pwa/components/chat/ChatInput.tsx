import { RefObject } from "react";

const QUICK_SUGGESTIONS = [
  "¿Qué me recomiendas?",
  "Ver opciones de Brunch",
  "¿Tienen sin gluten?",
  "Confirmar pedido",
];

interface ChatInputProps {
  inputValue: string;
  setInputValue: (val: string) => void;
  isTyping: boolean;
  isRecording: boolean;
  handleSend: (text?: string) => void;
  toggleRecording: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

export function ChatInput({
  inputValue,
  setInputValue,
  isTyping,
  isRecording,
  handleSend,
  toggleRecording,
  inputRef
}: ChatInputProps) {
  
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      <div 
        className="chat-quick-bar" 
        id="chat-quick-bar"
        style={{ 
          display: "flex", 
          overflowX: "auto", 
          whiteSpace: "nowrap", 
          gap: "0.5rem", 
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch" 
        }}
      >
        <style>{`#chat-quick-bar::-webkit-scrollbar { display: none; }`}</style>
        {QUICK_SUGGESTIONS.map((s) => (
          <button
            key={s}
            id={`quick-${s.replace(/\s+/g, "-").toLowerCase()}`}
            className="chat-quick-chip"
            onClick={() => handleSend(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="chat-input-bar">
        <div className="chat-input-wrap">
          <input
            ref={inputRef}
            id="chat-input"
            className="chat-input"
            type="text"
            placeholder="Escribe tu pedido..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <button
            id="chat-mic-btn"
            className={`chat-input-mic ${isRecording ? "text-red-500 animate-pulse bg-red-100 rounded-full p-2" : "p-2"}`}
            aria-label={isRecording ? "Detener grabación" : "Iniciar grabación"}
            onClick={toggleRecording}
          >
            {isRecording ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="2" width="6" height="11" rx="3" />
                <path d="M5 10a7 7 0 0 0 14 0" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="9"  y1="22" x2="15" y2="22" />
              </svg>
            )}
          </button>
        </div>

        <button
          id="chat-send-btn"
          className="chat-send-btn"
          onClick={() => handleSend()}
          disabled={!inputValue.trim() && !isTyping}
          aria-label="Enviar mensaje"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </>
  );
}
