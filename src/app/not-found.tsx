import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="text-center max-w-lg">
        <div className="relative mb-8">
          <p className="text-9xl font-bold text-indigo-100 leading-none select-none">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">😕</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">الصفحة غير موجودة</h1>
        <p className="text-gray-500 mb-8 text-base leading-relaxed">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها أو حذفها
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            العودة للرئيسية
          </Link>
          <Link
            href="/products"
            className="border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all"
          >
            تصفح المنتجات
          </Link>
        </div>
      </div>
    </div>
  );
}
