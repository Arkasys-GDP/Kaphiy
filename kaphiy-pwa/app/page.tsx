import Link from "next/link";
import Image from "next/image";
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
      <svg viewBox="0 0 24 24" fill="#fff9f4">
        <ellipse cx="12" cy="12" rx="9" ry="6" />
        <path
          d="M12 6 Q14 12 12 18"
          stroke="#565243"
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
        background: "oklch(60.34% 0.057 23.21)",
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
        {/* Brand logo */}
        <Image
          src="/logoCB.png"
          alt="Praliné Coffee House"
          width={260}
          height={120}
          priority
          style={{ height: "auto", maxWidth: "70%", objectFit: "contain" }}
        />
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.65rem",
            fontWeight: 500,
            color: "#EFE3D6",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            marginTop: "-0.5rem",
          }}
        >
          COFFEE HOUSE · SPECIALTY
        </p>

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
            color: "#EFE3D6",
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
                background: i === 1 ? "#EFE3D6" : "#EFE3D6",
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
              color: "#EFE3D6",
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
                color: "#EFE3D6",
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
