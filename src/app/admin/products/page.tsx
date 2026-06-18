import { prisma } from "@/lib/prisma";
import { parseProductArrays, formatPrice, CATEGORY_LABELS } from "@/lib/utils";
import Link from "next/link";
import AdminProductActions from "./AdminProductActions";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  const parsed = products.map(parseProductArrays);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">المنتجات</h1>
          <p className="text-gray-500 mt-1">{products.length} منتج</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
        >
          + إضافة منتج
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
                <th className="text-start px-5 py-3 font-medium">المنتج</th>
                <th className="text-start px-5 py-3 font-medium">الفئة</th>
                <th className="text-start px-5 py-3 font-medium">السعر</th>
                <th className="text-start px-5 py-3 font-medium">المخزون</th>
                <th className="text-start px-5 py-3 font-medium">مميز</th>
                <th className="text-start px-5 py-3 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {parsed.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="font-medium text-gray-900">{product.nameAr}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{product.name}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{CATEGORY_LABELS[product.category] ?? product.category}</td>
                  <td className="px-5 py-4 font-semibold">{formatPrice(product.price)}</td>
                  <td className="px-5 py-4">
                    <span className={`font-medium ${product.stock === 0 ? "text-red-600" : product.stock < 5 ? "text-yellow-600" : "text-green-600"}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {product.featured ? (
                      <span className="text-indigo-600">✓</span>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <AdminProductActions productId={product.id} />
                  </td>
                </tr>
              ))}
              {parsed.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-gray-400">
                    لا توجد منتجات. <Link href="/admin/products/new" className="text-indigo-600 hover:underline">أضف منتجاً الآن</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
