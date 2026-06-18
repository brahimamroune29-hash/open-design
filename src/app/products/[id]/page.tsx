"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import type { ParsedProduct } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/lib/utils";
import toast from "react-hot-toast";
import {
  ShoppingCartIcon,
  HeartIcon,
  ShareIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ParsedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wished, setWished] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        setSelectedSize(data.sizes?.[0] ?? "");
        setSelectedColor(data.colors?.[0] ?? "");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square rounded-3xl bg-gray-200 shimmer" />
          <div className="flex flex-col gap-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded-xl shimmer" />
            <div className="h-10 w-1/3 bg-gray-200 rounded-xl shimmer" />
            <div className="h-24 bg-gray-100 rounded-xl shimmer" />
            <div className="h-12 bg-gray-100 rounded-xl shimmer" />
            <div className="h-12 bg-indigo-100 rounded-xl shimmer" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">المنتج غير موجود</h2>
        <p className="text-gray-500 mb-6">ربما تم حذف هذا المنتج أو تغيير رابطه</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all"
        >
          <ArrowRightIcon className="h-4 w-4" />
          العودة للمنتجات
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error("اختر الحجم أولاً"); return; }
    if (!selectedColor) { toast.error("اختر اللون أولاً"); return; }
    addItem({
      productId: product.id,
      nameAr: product.nameAr,
      price: product.price,
      image: product.images[0] ?? "/images/placeholder.png",
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    toast.success("تمت إضافة المنتج للسلة 🛒");
  };

  const images = product.images.length > 0
    ? product.images
    : ["/images/placeholder.png"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
        <Link href="/" className="hover:text-indigo-600 transition-colors">الرئيسية</Link>
        <span className="text-gray-300">/</span>
        <Link href="/products" className="hover:text-indigo-600 transition-colors">المنتجات</Link>
        <span className="text-gray-300">/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-indigo-600 transition-colors">
          {CATEGORY_LABELS[product.category] ?? product.category}
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-medium">{product.nameAr}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image section */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
            <Image
              src={images[activeImage]}
              alt={product.nameAr}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-white text-gray-800 font-bold px-8 py-3 rounded-2xl text-lg shadow">
                  نفذ المخزون
                </span>
              </div>
            )}
            {product.featured && (
              <span className="absolute top-4 start-4 bg-indigo-600 text-white font-bold px-3 py-1.5 rounded-full text-sm shadow">
                مميز ⭐
              </span>
            )}
          </div>
          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    activeImage === i ? "border-indigo-600 scale-105" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.nameAr}</h1>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => { setWished(!wished); toast(wished ? "تم إزالته من المفضلة" : "تمت إضافته للمفضلة", { icon: wished ? "💔" : "❤️" }); }}
                  className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-red-400 hover:bg-red-50 transition-all"
                >
                  {wished
                    ? <HeartSolid className="h-5 w-5 text-red-500" />
                    : <HeartIcon className="h-5 w-5 text-gray-500" />}
                </button>
                <button
                  onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success("تم نسخ الرابط"); }}
                  className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-indigo-400 hover:bg-indigo-50 transition-all"
                >
                  <ShareIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <span className="text-4xl font-bold text-indigo-600">{formatPrice(product.price)}</span>
              {product.stock > 0 && product.stock <= 5 && (
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  آخر {product.stock} قطع!
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-base">{product.descriptionAr}</p>

          {/* Stock badge */}
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <span className="flex items-center gap-1.5 text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full text-sm font-medium">
                <CheckBadgeIcon className="h-4 w-4" />
                متوفر في المخزون
              </span>
            ) : (
              <span className="text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full text-sm font-medium">
                نفذ المخزون
              </span>
            )}
          </div>

          {/* Size */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-gray-900">
                الحجم:
                <span className="text-indigo-600 font-semibold me-2"> {selectedSize}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[48px] px-4 py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${
                    selectedSize === size
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <p className="font-bold text-gray-900 mb-3">
              اللون:
              <span className="text-indigo-600 font-semibold me-2"> {selectedColor}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                    selectedColor === color
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="font-bold text-gray-900 mb-3">الكمية</p>
            <div className="flex items-center gap-0 w-fit border-2 border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-11 h-11 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 transition-colors text-lg"
              >
                −
              </button>
              <span className="w-14 text-center font-bold text-lg border-x-2 border-gray-200 h-11 flex items-center justify-center" dir="ltr">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-11 h-11 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 transition-colors text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 text-base"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              أضف للسلة
            </button>
            <Link
              href="/cart"
              className="flex items-center justify-center px-6 py-3.5 rounded-xl border-2 border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-50 transition-all text-base"
            >
              السلة
            </Link>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100">
            {[
              { icon: <TruckIcon className="h-5 w-5" />, label: "شحن سريع" },
              { icon: <CheckBadgeIcon className="h-5 w-5" />, label: "جودة مضمونة" },
              { icon: "💰", label: "دفع عند الاستلام" },
            ].map((b, i) => (
              <div key={i} className="flex flex-col items-center gap-1 text-center p-3 bg-gray-50 rounded-xl">
                <span className="text-indigo-600">{typeof b.icon === "string" ? b.icon : b.icon}</span>
                <span className="text-xs text-gray-600 font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
