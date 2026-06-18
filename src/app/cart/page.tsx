"use client";

import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { TrashIcon, ShoppingBagIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const clearCart = useCartStore((s) => s.clearCart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-10 w-48 shimmer rounded-xl mb-8" />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4">
                <div className="w-24 h-24 shimmer rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 shimmer rounded w-3/4" />
                  <div className="h-3 shimmer rounded w-1/2" />
                  <div className="h-5 shimmer rounded w-24" />
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-80 h-64 shimmer rounded-2xl" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-28 h-28 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBagIcon className="h-14 w-14 text-indigo-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">السلة فارغة</h2>
        <p className="text-gray-500 mb-8 text-base">لم تضف أي منتجات للسلة بعد، تصفح منتجاتنا واختر ما يناسبك</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-200 text-base"
        >
          <ArrowRightIcon className="h-5 w-5" />
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">سلة التسوق</h1>
          <p className="text-gray-500 mt-1 text-sm">{items.length} منتج في السلة</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-all flex items-center gap-1.5"
        >
          <TrashIcon className="h-4 w-4" />
          إفراغ السلة
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}-${item.color}`}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <Link href={`/products/${item.productId}`} className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0 block">
                <Image
                  src={item.image}
                  alt={item.nameAr}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="96px"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.productId}`}>
                  <h3 className="font-bold text-gray-900 hover:text-indigo-600 transition-colors truncate">{item.nameAr}</h3>
                </Link>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    {item.size}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    {item.color}
                  </span>
                </div>
                <p className="text-indigo-600 font-bold mt-2 text-lg">{formatPrice(item.price)}</p>
              </div>

              {/* Controls */}
              <div className="flex flex-col items-end gap-3 shrink-0">
                <button
                  onClick={() => removeItem(item.productId, item.size, item.color)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>

                {/* Qty */}
                <div className="flex items-center gap-0 border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => updateQty(item.productId, item.size, item.color, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-100 transition-colors text-gray-700"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-bold border-x-2 border-gray-200 h-8 flex items-center justify-center" dir="ltr">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.productId, item.size, item.color, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-100 transition-colors text-gray-700"
                  >
                    +
                  </button>
                </div>

                <p className="text-sm font-bold text-gray-800">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-20">
            <h2 className="text-xl font-bold text-gray-900 mb-5">ملخص الطلب</h2>

            <div className="space-y-3 pb-4 border-b border-gray-100">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex justify-between text-sm text-gray-600"
                >
                  <span className="line-clamp-1 flex-1 me-3">{item.nameAr} × {item.quantity}</span>
                  <span className="font-medium text-gray-800 shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="py-4 border-b border-gray-100 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>المجموع الفرعي</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600 font-medium">
                <span>الشحن</span>
                <span>مجاني</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 mb-6">
              <span className="font-bold text-gray-900 text-lg">الإجمالي</span>
              <span className="font-bold text-indigo-600 text-2xl">{formatPrice(total)}</span>
            </div>

            <Link href="/checkout" className="block">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-200 text-base">
                إتمام الشراء
              </button>
            </Link>

            <Link
              href="/products"
              className="flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-indigo-600 mt-4 transition-colors"
            >
              <ArrowRightIcon className="h-4 w-4" />
              مواصلة التسوق
            </Link>

            {/* Payment info */}
            <div className="mt-5 p-3 bg-gray-50 rounded-xl text-center">
              <p className="text-xs text-gray-500">
                🔒 دفع آمن عند الاستلام — لا حاجة لبيانات بنكية
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
