"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import type { ParsedProduct } from "@/lib/utils";
import toast from "react-hot-toast";

interface ProductFormProps {
  product?: ParsedProduct;
}

const EMPTY = {
  name: "", nameAr: "", description: "", descriptionAr: "",
  price: "", category: "men" as string,
  sizesInput: "", colorsInput: "",
  stock: "0", featured: false,
};

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: product?.name ?? EMPTY.name,
    nameAr: product?.nameAr ?? EMPTY.nameAr,
    description: product?.description ?? EMPTY.description,
    descriptionAr: product?.descriptionAr ?? EMPTY.descriptionAr,
    price: product?.price?.toString() ?? EMPTY.price,
    category: product?.category ?? EMPTY.category,
    sizesInput: product?.sizes.join(", ") ?? EMPTY.sizesInput,
    colorsInput: product?.colors.join(", ") ?? EMPTY.colorsInput,
    stock: product?.stock?.toString() ?? EMPTY.stock,
    featured: product?.featured ?? EMPTY.featured,
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(product?.images[0] ?? "");

  const handleImageUpload = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (res.ok) {
      const data = await res.json();
      setImageUrl(data.url);
      return data.url as string;
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let finalImage = imageUrl;
    if (imageFile) {
      const uploaded = await handleImageUpload(imageFile);
      if (uploaded) finalImage = uploaded;
    }

    const payload = {
      name: form.name,
      nameAr: form.nameAr,
      description: form.description,
      descriptionAr: form.descriptionAr,
      price: parseFloat(form.price),
      category: form.category,
      sizes: form.sizesInput.split(",").map((s) => s.trim()).filter(Boolean),
      colors: form.colorsInput.split(",").map((c) => c.trim()).filter(Boolean),
      images: finalImage ? [finalImage] : [],
      stock: parseInt(form.stock, 10),
      featured: form.featured,
    };

    const url = product ? `/api/products/${product.id}` : "/api/products";
    const method = product ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(product ? "تم تحديث المنتج" : "تم إضافة المنتج");
        router.push("/admin/products");
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error ?? "حدث خطأ");
      }
    } finally {
      setLoading(false);
    }
  };

  const set = (key: string, val: string | boolean) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">بيانات المنتج</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="الاسم بالعربي *" id="nameAr" value={form.nameAr} onChange={(e) => set("nameAr", e.target.value)} required />
          <Input label="الاسم بالإنجليزي *" id="name" value={form.name} onChange={(e) => set("name", e.target.value)} dir="ltr" required />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">الوصف بالعربي *</label>
          <textarea
            value={form.descriptionAr}
            onChange={(e) => set("descriptionAr", e.target.value)}
            rows={3}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">الوصف بالإنجليزي *</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
            required
            dir="ltr"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="السعر (ريال) *" id="price" type="number" min="0" step="0.01" value={form.price} onChange={(e) => set("price", e.target.value)} dir="ltr" required />
          <Input label="المخزون *" id="stock" type="number" min="0" value={form.stock} onChange={(e) => set("stock", e.target.value)} dir="ltr" required />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">الفئة</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="men">رجال</option>
              <option value="women">نساء</option>
              <option value="kids">أطفال</option>
              <option value="accessories">إكسسوارات</option>
            </select>
          </div>
        </div>

        <Input
          label='الأحجام (مفصولة بفاصلة: S, M, L, XL)'
          id="sizes"
          value={form.sizesInput}
          onChange={(e) => set("sizesInput", e.target.value)}
          dir="ltr"
          placeholder="S, M, L, XL"
        />
        <Input
          label='الألوان (مفصولة بفاصلة: أحمر, أزرق)'
          id="colors"
          value={form.colorsInput}
          onChange={(e) => set("colorsInput", e.target.value)}
          placeholder="أحمر, أزرق, أسود"
        />

        <div className="flex items-center gap-2">
          <input
            id="featured"
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded"
          />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">منتج مميز (يظهر في الصفحة الرئيسية)</label>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4">صورة المنتج</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) {
              setImageFile(f);
              setImageUrl(URL.createObjectURL(f));
            }
          }}
          className="text-sm text-gray-600"
        />
        {imageUrl && (
          <img src={imageUrl} alt="معاينة" className="mt-4 w-32 h-32 object-cover rounded-lg border border-gray-200" />
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" loading={loading} size="lg">
          {product ? "تحديث المنتج" : "إضافة المنتج"}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
          إلغاء
        </Button>
      </div>
    </form>
  );
}
