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
}

export function FeaturedCard({
  id,
  emoji,
  name,
  description,
  price,
  label,
  labelType,
}: FeaturedCardProps) {
  return (
    <Link href={`/menu/${id}`} className="featured-card">
      {/* Image area */}
      <div className="featured-card__image">
        {emoji}
        <span className={`featured-card__label featured-card__label--${labelType}`}>
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
