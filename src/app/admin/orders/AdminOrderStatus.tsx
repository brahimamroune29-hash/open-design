"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const STATUSES = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

interface AdminOrderStatusProps {
  orderId: string;
  currentStatus: string;
  statusAr: Record<string, string>;
  statusColor: Record<string, string>;
}

export default function AdminOrderStatus({ orderId, currentStatus, statusAr, statusColor }: AdminOrderStatusProps) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = async (newStatus: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
        toast.success("تم تحديث الحالة");
        router.refresh();
      } else {
        toast.error("فشل التحديث");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[status] ?? "bg-gray-100 text-gray-700"}`}>
        {statusAr[status] ?? status}
      </span>
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value)}
        disabled={loading}
        className="text-xs border border-gray-200 rounded-md px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{statusAr[s]}</option>
        ))}
      </select>
    </div>
  );
}
