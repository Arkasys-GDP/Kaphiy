import Link from "next/link";
import Image from "next/image";

type BadgeType = "green" | "rose" | "muted" | "dark";

interface ProductListItemProps {
  id: string;
  emoji: string;
  name: string;
  description: string;
  price: number;
  badges?: string[];
  badgeTypes?: BadgeType[];
  imageUrl?: string;
}

export function ProductListItem({
  id,
  emoji,
  name,
  description,
  price,
  badges = [],
  badgeTypes = [],
  imageUrl,
}: ProductListItemProps) {
  return (
    <Link href={`/menu/${id}`} style={{ textDecoration: "none" }}>
      <div className="product-list-item">
        <div
          className="product-item__icon"
          style={{
            padding: imageUrl ? 0 : undefined,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="60px"
              style={{ objectFit: "cover" }}
            />
          ) : (
            emoji
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="product-item__name">{name}</div>
          <div className="product-item__desc">{description}</div>
          {badges.length > 0 && (
            <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
              {badges.map((badge, i) => (
                <span
                  key={badge}
                  className={`badge badge-${badgeTypes[i] ?? "muted"}`}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="product-item__price">${price.toFixed(2)}</div>
      </div>
    </Link>
  );
}
