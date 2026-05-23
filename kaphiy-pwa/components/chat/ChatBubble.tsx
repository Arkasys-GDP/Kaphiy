import { Message } from "@/types/chat";
import Link from "next/link";

function parseBold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold">{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function AiBubble({ message }: { message: Message }) {
  return (
    <div className="chat-bubble-row chat-bubble-row--ai">
      <div className="chat-ai-avatar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" fill="currentColor" />
        </svg>
      </div>

      <div className="chat-bubble chat-bubble--ai">
        <p className="chat-bubble__text">
          {message.text.split("\n").map((line, i) => (
            <span key={i}>
              {parseBold(line)}
              {i < message.text.split("\n").length - 1 && <br />}
            </span>
          ))}
        </p>

        {message.suggestions && (
          <div className="chat-suggestions">
            {message.suggestions.map((s) => (
              <button key={s.id} id={`suggestion-${s.id}`} className="chat-product-card">
                <span className="chat-product-card__emoji">{s.emoji}</span>
                <div className="chat-product-card__info">
                  <span className="chat-product-card__name">{s.name}</span>
                  <span className="chat-product-card__desc">{s.description} · {s.price}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {message.isOrderReady && (
          <div style={{ marginTop: "0.75rem" }}>
            <Link href="/pedido" style={{ textDecoration: "none" }}>
              <button className="btn-primary" style={{ padding: "0.6rem 1rem", fontSize: "0.85rem" }}>
                Ver y Pagar Pedido
              </button>
            </Link>
          </div>
        )}

        <span className="chat-bubble__time">{message.time} · IA Gemini</span>
      </div>
    </div>
  );
}

export function UserBubble({ message }: { message: Message }) {
  return (
    <div className="chat-bubble-row chat-bubble-row--user">
      <div className="chat-bubble chat-bubble--user">
        <p className="chat-bubble__text">{message.text}</p>
        <span className="chat-bubble__time chat-bubble__time--user">{message.time}</span>
      </div>
    </div>
  );
}
