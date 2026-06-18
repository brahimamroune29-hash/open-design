import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/admin", label: "نظرة عامة", icon: "📊" },
  { href: "/admin/products", label: "المنتجات", icon: "👕" },
  { href: "/admin/orders", label: "الطلبات", icon: "📦" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 text-white flex flex-col shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Brand */}
        <div className="p-5 border-b border-gray-800">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">م</span>
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-none">لوحة التحكم</p>
              <p className="text-gray-500 text-xs mt-0.5">متجر الملابس</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider px-3 py-2">القائمة</p>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-all text-sm font-medium group"
            >
              <span className="text-base group-hover:scale-110 transition-transform">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User info */}
        <div className="p-3 border-t border-gray-800 space-y-1">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-800">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0">
              A
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">{session.user?.name}</p>
              <p className="text-gray-500 text-xs">مدير النظام</p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-500 hover:text-white hover:bg-gray-800 transition-all text-xs"
          >
            <span>←</span>
            العودة للمتجر
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
