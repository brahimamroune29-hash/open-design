"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function AdminProductActions({ productId }: { productId: string }) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("تم حذف المنتج");
        router.refresh();
      } else {
        toast.error("فشل الحذف");
      }
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Link
          href={`/admin/products/${productId}`}
          className="text-indigo-600 hover:text-indigo-800 text-xs font-medium"
        >
          تعديل
        </Link>
        <button
          onClick={() => setConfirmOpen(true)}
          className="text-red-600 hover:text-red-800 text-xs font-medium"
        >
          حذف
        </button>
      </div>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="تأكيد الحذف">
        <p className="text-gray-600 mb-6">هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.</p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => setConfirmOpen(false)}>إلغاء</Button>
          <Button variant="danger" loading={deleting} onClick={handleDelete}>حذف</Button>
        </div>
      </Modal>
    </>
  );
}
