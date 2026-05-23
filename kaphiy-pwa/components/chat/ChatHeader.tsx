import { useRouter } from "next/navigation";

interface ChatHeaderProps {
  isOnline: boolean;
}

export function ChatHeader({ isOnline }: ChatHeaderProps) {
  const router = useRouter();

  return (
    <header className="chat-header">
      <button
        id="chat-back-btn"
        className="chat-header__back"
        onClick={() => router.back()}
        aria-label="Volver"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="chat-header__avatar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" fill="currentColor" />
        </svg>
        {isOnline ? <span className="chat-header__online-dot" /> : null}
      </div>

      <div className="chat-header__info">
        <p className="chat-header__name">Asistente KAPHY</p>
        <p className="chat-header__status">
          {isOnline ? "● En línea" : "○ Desconectado"}
        </p>
      </div>

    </header>
  );
}
