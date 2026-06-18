"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import type { ParsedProduct } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/lib/utils";

interface Props {
  product: ParsedProduct;
  delay?: number;
}

export default function DarkProductCard({ product, delay = 0 }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      nameAr: product.nameAr,
      price: product.price,
      image: product.images[0] ?? "/images/placeholder.png",
      size: product.sizes[0] ?? "M",
      color: product.colors[0] ?? "",
      quantity: 1,
    });
    toast.success(`تمت إضافة "${product.nameAr}" للسلة`);
  };

  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;
  const priceFormatted = product.price.toLocaleString("ar-SA");

  return (
    <div
      data-reveal
      data-delay={delay}
      className="group hover:-translate-y-1.5 hover:border-white/20"
      style={{
        background: "#0E0E10",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 18,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform .25s cubic-bezier(.2,.8,.2,1), border-color .25s",
      }}
    >
      {/* Image / placeholder area */}
      <Link
        href={`/products/${product.id}`}
        style={{
          position: "relative",
          height: 210,
          background: "radial-gradient(120% 100% at 70% 0%,#1C1C20,#0B0B0D)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.nameAr}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <svg width="82" height="82" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.4 14.5 16 10V4.5a2 2 0 0 0-2-2h-1.5a2.5 2.5 0 0 1-5 0H6a2 2 0 0 0-2 2V10l-1.6 4.5a1 1 0 0 0 .6 1.3L6 17v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3l3-.7a1 1 0 0 0 .6-1.3Z" />
          </svg>
        )}

        {/* Featured badge */}
        {product.featured && product.stock > 0 && (
          <span
            style={{
              position: "absolute",
              top: 13,
              right: 13,
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "6px 11px",
              borderRadius: 999,
              background: "rgba(255,255,255,.92)",
              color: "#0A0A0C",
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#0A0A0C" stroke="none">
              <path d="m12 2 2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.8 5.9 20.5l1.5-6.8L2.2 9l6.9-.7Z" />
            </svg>
            مميز
          </span>
        )}

        {/* Category tag */}
        <span
          style={{
            position: "absolute",
            top: 13,
            left: 13,
            padding: "6px 11px",
            borderRadius: 999,
            background: "rgba(255,255,255,.08)",
            border: "1px solid rgba(255,255,255,.12)",
            color: "#E9E9EC",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {categoryLabel}
        </span>

        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                background: "rgba(255,255,255,.1)",
                border: "1px solid rgba(255,255,255,.18)",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                padding: "8px 16px",
                borderRadius: 999,
              }}
            >
              نفذ المخزون
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div style={{ padding: 18, display: "flex", flexDirection: "column", flex: 1 }}>
        <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
          <div style={{ fontWeight: 700, fontSize: 17, color: "#fff" }} className="line-clamp-1">
            {product.nameAr}
          </div>
        </Link>
        <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,.5)", fontSize: 13.5, lineHeight: 1.7, minHeight: 46 }} className="line-clamp-2">
          {product.descriptionAr}
        </p>

        {/* Sizes */}
        {product.sizes.length > 0 && (
          <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
            {product.sizes.slice(0, 4).map((s) => (
              <span
                key={s}
                style={{
                  minWidth: 30,
                  height: 28,
                  padding: "0 8px",
                  borderRadius: 7,
                  border: "1px solid rgba(255,255,255,.12)",
                  background: "rgba(255,255,255,.04)",
                  color: "rgba(255,255,255,.75)",
                  fontSize: 12.5,
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {s}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span style={{ color: "rgba(255,255,255,.35)", fontSize: 12.5, fontWeight: 700, display: "inline-flex", alignItems: "center" }}>
                +{product.sizes.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Price + Add to cart */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 18,
            paddingTop: 16,
            borderTop: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "0 16px",
              height: 42,
              borderRadius: 11,
              border: "none",
              cursor: product.stock === 0 ? "not-allowed" : "pointer",
              background: product.stock === 0 ? "rgba(244,244,245,.25)" : "#F4F4F5",
              color: "#0A0A0C",
              fontSize: 14,
              fontWeight: 800,
              fontFamily: "inherit",
              opacity: product.stock === 0 ? 0.5 : 1,
              transition: "background .2s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="20" r="1.3" />
              <circle cx="18" cy="20" r="1.3" />
              <path d="M2.5 3h2l2.2 12.5a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.2L21 7H6" />
            </svg>
            أضف
          </button>
          <div style={{ fontWeight: 800, fontSize: 21, color: "#fff" }}>
            {priceFormatted}{" "}
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.5)", fontWeight: 700 }}>ر.س.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
