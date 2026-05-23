import { Suspense } from "react";
import { MenuContent } from "./MenuContent";

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100dvh",
            background: "#EFE3D6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <span style={{ fontSize: "2.5rem" }}>☕</span>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              color: "#8a6555",
              fontSize: "0.875rem",
            }}
          >
            Cargando menú...
          </p>
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
