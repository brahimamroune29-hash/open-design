"use client";

import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  TruckIcon,
  CheckCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();

  const [form, setForm] = useState({
    name: session?.user?.name ?? "",
    address: "",
    phone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-10 w-48 shimmer rounded-xl mb-8" />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              {[1, 2, 3].map((i) => <div key={i} className="h-12 shimmer rounded-xl" />)}
            </div>
          </div>
          <div className="lg:w-80 h-80 shimmer rounded-2xl" />
        </div>
      </div>
    );
  }

  if (items.length === 0 && !done) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBagIcon className="h-12 w-12 text-indigo-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">السلة فارغة</h2>
        <p className="text-gray-500 mb-6">أضف منتجات للسلة أولاً لإتمام الطلب</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-indigo-700 transition-all"
        >
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon className="h-12 w-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">تم تسجيل طلبك!</h2>
        <p className="text-gray-500 mb-2">شكراً لك على طلبك، سنتواصل معك قريباً لتأكيد موعد التوصيل.</p>
        <p className="text-sm text-gray-400 mb-8">سيصلك الطلب خلال 3-5 أيام عمل</p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/orders"
            className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all"
          >
            تتبع طلباتي
          </Link>
          <Link
            href="/products"
            className="border-2 border-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-all"
          >
            متابعة التسوق
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.phone) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            size: i.size,
            color: i.color,
          })),
          ...form,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error ?? "حدث خطأ في تسجيل الطلب");
        return;
      }
      clearCart();
      setDone(true);
    } catch {
      toast.error("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">إتمام الطلب</h1>
        <p className="text-gray-500 mt-1 text-sm">أدخل بيانات التوصيل لإتمام طلبك</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-5">
          {/* Delivery info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center">
                <TruckIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">بيانات التوصيل</h2>
            </div>

            <div className="space-y-4">
              <Input
                label="الاسم الكامل *"
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="أدخل اسمك الكامل"
                required
              />
              <Input
                label="رقم الهاتف *"
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="05XXXXXXXX"
                dir="ltr"
                required
              />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="address" className="text-sm font-semibold text-gray-700">
                  العنوان الكامل *
                </label>
                <textarea
                  id="address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="المدينة، الحي، الشارع، رقم المبنى..."
                  rows={3}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all resize-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="notes" className="text-sm font-semibold text-gray-700">
                  ملاحظات إضافية
                  <span className="text-gray-400 font-normal ms-1">(اختياري)</span>
                </label>
                <textarea
                  id="notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="أي تعليمات خاصة للتوصيل..."
                  rows={2}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
              💵
            </div>
            <div>
              <p className="font-bold text-green-900 text-base">الدفع عند الاستلام</p>
              <p className="text-sm text-green-700 mt-0.5">
                ادفع نقداً عند استلام طلبك — لا تحتاج لبطاقة بنكية
              </p>
            </div>
            <CheckCircleIcon className="h-6 w-6 text-green-500 shrink-0 ms-auto" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-4 rounded-2xl transition-all disabled:opacity-60 shadow-lg shadow-indigo-200 text-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                جاري تسجيل الطلب...
              </span>
            ) : "تأكيد الطلب"}
          </button>
        </form>

        {/* Order summary */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-20">
            <h2 className="text-lg font-bold text-gray-900 mb-4">ملخص طلبك</h2>

            <div className="space-y-3 max-h-72 overflow-y-auto pb-4 border-b border-gray-100">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.nameAr}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.nameAr}</p>
                    <p className="text-xs text-gray-500">{item.size} · {item.color}</p>
                  </div>
                  <div className="text-end shrink-0">
                    <p className="text-xs text-gray-500">× {item.quantity}</p>
                    <p className="text-sm font-bold text-gray-800">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>المجموع الفرعي</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600 font-medium">
                <span>تكلفة الشحن</span>
                <span>مجاني</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="font-bold text-gray-900">الإجمالي</span>
                <span className="text-2xl font-bold text-indigo-600">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-xl text-center">
              <p className="text-xs text-gray-500">
                🔒 طلبك آمن — دفع عند الاستلام فقط
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
