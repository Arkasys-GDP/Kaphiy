import Link from "next/link";
import { CheckCircle, List } from "lucide-react";

function CoffeeBean({
  x,
  y,
  size = 24,
  opacity = 0.08,
  rotate = 0,
}: {
  x: string;
  y: string;
  size?: number;
  opacity?: number;
  rotate?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        opacity,
        transform: `rotate(${rotate}deg)`,
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <svg viewBox="0 0 24 24" fill="#565243">
        <ellipse cx="12" cy="12" rx="9" ry="6" />
        <path
          d="M12 6 Q14 12 12 18"
          stroke="#EFE3D6"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default function SplashPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#EFE3D6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative beans */}
      <CoffeeBean x="8%" y="10%" size={32} opacity={0.1} rotate={20} />
      <CoffeeBean x="80%" y="6%" size={20} opacity={0.07} rotate={-15} />
      <CoffeeBean x="15%" y="30%" size={16} opacity={0.06} rotate={45} />
      <CoffeeBean x="75%" y="25%" size={26} opacity={0.09} rotate={-30} />
      <CoffeeBean x="5%" y="60%" size={22} opacity={0.07} rotate={60} />
      <CoffeeBean x="82%" y="55%" size={18} opacity={0.06} rotate={10} />
      <CoffeeBean x="40%" y="8%" size={14} opacity={0.05} rotate={80} />
      <CoffeeBean x="60%" y="75%" size={20} opacity={0.07} rotate={-45} />
      <CoffeeBean x="20%" y="80%" size={28} opacity={0.08} rotate={25} />
      <CoffeeBean x="72%" y="85%" size={16} opacity={0.06} rotate={-60} />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          width: "100%",
          maxWidth: 340,
          zIndex: 1,
        }}
      >
        {/* App icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 24,
            background: "#565243",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            boxShadow: "0 8px 32px rgba(86,82,67,0.3)",
          }}
        >
          ☕
        </div>

        {/* Brand */}
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "2.8rem",
              fontWeight: 700,
              color: "#3e3b30",
              letterSpacing: "0.15em",
              marginBottom: "0.3rem",
              lineHeight: 1,
            }}
          >
            PRALINÉ
          </h1>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.65rem",
              fontWeight: 500,
              color: "#8a6555",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}
          >
            COFFEE HOUSE · SPECIALTY
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 40,
            height: 1,
            background: "#d8c8b8",
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontSize: "1.1rem",
            color: "#5A3A2E",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          &ldquo;Bienvenido a tu experiencia sensorial&rdquo;
        </p>

        {/* Dots indicator */}
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: i === 1 ? 20 : 6,
                height: 6,
                borderRadius: 9999,
                background: i === 1 ? "#A27572" : "#d8c8b8",
                transition: "width 0.3s",
              }}
            />
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            width: "100%",
          }}
        >
          <Link href="/chat" style={{ textDecoration: "none" }}>
            <button className="btn-primary">
              <CheckCircle size={18} />
              Comenzar mi pedido con IA
            </button>
          </Link>

          <Link href="/menu" style={{ textDecoration: "none" }}>
            <button className="btn-secondary">
              <List size={16} />
              Ver menú completo
            </button>
          </Link>
        </div>

        {/* Footer badge */}
        <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.6rem",
              color: "#8a6555",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "0.3rem",
            }}
          >
            POWERED BY
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            <span
              style={{
                background: "#3e3b30",
                color: "#fff9f4",
                borderRadius: 6,
                padding: "0.2rem 0.5rem",
                fontSize: "0.7rem",
                fontWeight: 700,
                fontFamily: "var(--font-inter)",
                letterSpacing: "0.08em",
              }}
            >
              KAPHY
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.7rem",
                color: "#8a6555",
              }}
            >
              Mesero Virtual IA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
