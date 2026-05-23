"use client";
import Link from "next/link";

type LabelType = "history" | "pairing" | "trending";

interface FeaturedCardProps {
  id: string;
  emoji: string;
  name: string;
  description: string;
  price: number;
  label: string;
  labelType: LabelType;
  imageUrl?: string;
}

export function FeaturedCard({
  id,
  emoji,
  name,
  description,
  price,
  label,
  labelType,
  imageUrl,
}: FeaturedCardProps) {
  return (
    <Link href={`/menu/${id}`} className="featured-card">
      {/* Image area */}
      <div 
        className="featured-card__image"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
          />
        ) : (
          <span style={{ fontSize: "2rem" }}>{emoji}</span>
        )}
        <span 
          className={`featured-card__label featured-card__label--${labelType}`}
          style={{ zIndex: 1 }}
        >
          {label}
        </span>
      </div>

      {/* Info */}
      <div className="featured-card__body">
        <div className="featured-card__name">{name}</div>
        <div className="featured-card__desc">{description}</div>
        <div className="featured-card__price">${price.toFixed(2)}</div>
      </div>
    </Link>
  );
}
