"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import type { ParsedProduct } from "@/lib/utils";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { useState } from "react";
import { CATEGORY_LABELS } from "@/lib/utils";

interface ProductCardProps {
  product: ParsedProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [wished, setWished] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const toggleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWished(!wished);
    toast(wished ? "تم إزالة المنتج من المفضلة" : "تمت إضافة المنتج للمفضلة", {
      icon: wished ? "💔" : "❤️",
    });
  };

  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group card-lift">
      <Link href={`/products/${product.id}`} className="block relative h-60 bg-gray-50">
        <Image
          src={product.images[0] ?? "/images/placeholder.png"}
          alt={product.nameAr}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Out of stock */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-800 text-sm font-bold px-4 py-1.5 rounded-full shadow">
              نفذ المخزون
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 start-3 flex flex-col gap-1.5">
          {product.featured && product.stock > 0 && (
            <span className="bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              مميز ⭐
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-2.5 py-1 rounded-full shadow">
            {categoryLabel}
          </span>
        </div>

        {/* Wishlist button */}
        <button
          onClick={toggleWish}
          className="absolute top-3 end-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
        >
          {wished ? (
            <HeartSolid className="h-4 w-4 text-red-500" />
          ) : (
            <HeartIcon className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1 text-base">
            {product.nameAr}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
          {product.descriptionAr}
        </p>

        {/* Sizes preview */}
        {product.sizes.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {product.sizes.slice(0, 4).map((s) => (
              <span key={s} className="text-xs border border-gray-200 text-gray-500 px-1.5 py-0.5 rounded">
                {s}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-xs text-gray-400">+{product.sizes.length - 4}</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <div>
            <span className="text-lg font-bold text-indigo-600">{formatPrice(product.price)}</span>
            {product.stock > 0 && product.stock <= 5 && (
              <p className="text-xs text-orange-500 mt-0.5">آخر {product.stock} قطع!</p>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm px-3.5 py-2 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-indigo-200"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            <span>أضف</span>
          </button>
        </div>
      </div>
    </div>
  );
}
