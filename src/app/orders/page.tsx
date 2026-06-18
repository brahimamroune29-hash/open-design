"use client";

import { useEffect, useState } from "react";
import { formatPrice, STATUS_LABELS, STATUS_COLORS } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

interface OrderItem {
  id: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
  product: { nameAr: string; images: string };
}

interface Order {
  id: string;
  status: string;
  totalPrice: number;
  name: string;
  address: string;
  phone: string;
  notes?: string;
  createdAt: string;
  items: OrderItem[];
}

const STATUS_STEPS: Record<string, number> = {
  PENDING: 0,
  CONFIRMED: 1,
  SHIPPED: 2,
  DELIVERED: 3,
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        <div className="h-10 w-48 bg-gray-200 rounded-xl shimmer mb-8" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
            <div className="flex justify-between">
              <div className="h-4 w-40 bg-gray-200 rounded shimmer" />
              <div className="h-6 w-24 bg-gray-200 rounded-full shimmer" />
            </div>
            <div className="h-3 w-56 bg-gray-100 rounded shimmer" />
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-28 h-28 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBagIcon className="h-14 w-14 text-indigo-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">لا توجد طلبات بعد</h2>
        <p className="text-gray-500 mb-8">لم تقم بأي طلب حتى الآن، ابدأ التسوق الآن!</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-200"
        >
          ابدأ التسوق
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">طلباتي</h1>
        <p className="text-gray-500 mt-1 text-sm">{orders.length} طلب</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const step = STATUS_STEPS[order.status] ?? -1;
          const isExpanded = expanded === order.id;
          const isCancelled = order.status === "CANCELLED";

          return (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-0.5 rounded">
                        #{order.id.slice(0, 12)}
                      </p>
                      <Badge className={STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-700"}>
                        {STATUS_LABELS[order.status] ?? order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("ar-SA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.items.length} منتج · {order.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <span className="text-2xl font-bold text-indigo-600">
                      {formatPrice(order.totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Progress tracker */}
                {!isCancelled && (
                  <div className="mt-5">
                    <div className="flex items-center gap-0">
                      {["قيد الانتظار", "مؤكد", "تم الشحن", "تم التوصيل"].map((label, i) => (
                        <div key={i} className="flex items-center flex-1 last:flex-none">
                          <div className="flex flex-col items-center gap-1">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                step >= i
                                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {step > i ? "✓" : i + 1}
                            </div>
                            <span className={`text-xs hidden sm:block ${step >= i ? "text-indigo-600 font-medium" : "text-gray-400"}`}>
                              {label}
                            </span>
                          </div>
                          {i < 3 && (
                            <div
                              className={`flex-1 h-1 mx-1 rounded-full transition-all ${
                                step > i ? "bg-indigo-500" : "bg-gray-100"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isCancelled && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
                    تم إلغاء هذا الطلب
                  </div>
                )}

                <button
                  onClick={() => setExpanded(isExpanded ? null : order.id)}
                  className="mt-4 flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUpIcon className="h-4 w-4" />
                      إخفاء التفاصيل
                    </>
                  ) : (
                    <>
                      <ChevronDownIcon className="h-4 w-4" />
                      عرض التفاصيل
                    </>
                  )}
                </button>
              </div>

              {/* Details */}
              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50 p-5">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3 text-sm">المنتجات</h4>
                      <div className="space-y-2.5">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between bg-white rounded-xl p-3 border border-gray-100">
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{item.product.nameAr}</p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {item.size} · {item.color} · × {item.quantity}
                              </p>
                            </div>
                            <span className="font-bold text-sm text-indigo-600">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3 text-sm">بيانات التوصيل</h4>
                      <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-gray-400">👤</span>
                          <span className="text-gray-700">{order.name}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-400">📱</span>
                          <span className="text-gray-700" dir="ltr">{order.phone}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-400">📍</span>
                          <span className="text-gray-700">{order.address}</span>
                        </div>
                        {order.notes && (
                          <div className="flex items-start gap-2">
                            <span className="text-gray-400">📝</span>
                            <span className="text-gray-600">{order.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
