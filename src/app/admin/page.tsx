import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

async function getStats() {
  const [totalProducts, totalOrders, pendingOrders, allOrders, totalUsers] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.findMany({ select: { totalPrice: true } }),
    prisma.user.count(),
  ]);
  const totalRevenue = allOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  return { totalProducts, totalOrders, pendingOrders, totalRevenue, totalUsers };
}

async function getRecentOrders() {
  return prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true } }, items: true },
  });
}

const STATUS_AR: Record<string, string> = {
  PENDING: "قيد الانتظار",
  CONFIRMED: "مؤكد",
  SHIPPED: "تم الشحن",
  DELIVERED: "تم التوصيل",
  CANCELLED: "ملغي",
};

const STATUS_COLOR: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default async function AdminDashboardPage() {
  const [stats, recentOrders] = await Promise.all([getStats(), getRecentOrders()]);

  const statCards = [
    {
      label: "إجمالي المنتجات",
      value: stats.totalProducts,
      icon: "👕",
      bg: "bg-blue-500",
      light: "bg-blue-50",
      text: "text-blue-600",
      href: "/admin/products",
    },
    {
      label: "إجمالي الطلبات",
      value: stats.totalOrders,
      icon: "📦",
      bg: "bg-green-500",
      light: "bg-green-50",
      text: "text-green-600",
      href: "/admin/orders",
    },
    {
      label: "طلبات معلقة",
      value: stats.pendingOrders,
      icon: "⏳",
      bg: "bg-yellow-500",
      light: "bg-yellow-50",
      text: "text-yellow-700",
      href: "/admin/orders",
    },
    {
      label: "إجمالي المبيعات",
      value: formatPrice(stats.totalRevenue),
      icon: "💰",
      bg: "bg-purple-500",
      light: "bg-purple-50",
      text: "text-purple-600",
      href: "/admin/orders",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
        <p className="text-gray-500 text-sm mt-1">مرحباً بك في لوحة تحكم المتجر</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href} className="group">
            <div className={`${stat.light} rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all group-hover:scale-[1.02]`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center text-xl shadow-sm`}>
                  {stat.icon}
                </div>
                <span className={`text-xs font-medium ${stat.text} bg-white px-2 py-1 rounded-lg`}>
                  عرض ←
                </span>
              </div>
              <div className={`text-2xl font-bold ${stat.text}`}>{stat.value}</div>
              <div className="text-sm text-gray-600 mt-0.5">{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link
          href="/admin/products/new"
          className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:scale-[1.02]"
        >
          <p className="text-3xl mb-2">➕</p>
          <p className="font-bold text-base">إضافة منتج</p>
          <p className="text-indigo-200 text-xs mt-1">أضف منتجاً جديداً للمتجر</p>
        </Link>
        <Link
          href="/admin/orders"
          className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:scale-[1.02]"
        >
          <p className="text-3xl mb-2">📋</p>
          <p className="font-bold text-base">إدارة الطلبات</p>
          <p className="text-green-200 text-xs mt-1">{stats.pendingOrders} طلب معلق</p>
        </Link>
        <Link
          href="/admin/products"
          className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:scale-[1.02]"
        >
          <p className="text-3xl mb-2">🛍️</p>
          <p className="font-bold text-base">إدارة المنتجات</p>
          <p className="text-purple-200 text-xs mt-1">{stats.totalProducts} منتج</p>
        </Link>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">آخر الطلبات</h2>
          <Link
            href="/admin/orders"
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-all"
          >
            عرض الكل
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs">
                <th className="text-start px-6 py-3 font-semibold">العميل</th>
                <th className="text-start px-6 py-3 font-semibold">المنتجات</th>
                <th className="text-start px-6 py-3 font-semibold">المبلغ</th>
                <th className="text-start px-6 py-3 font-semibold">الحالة</th>
                <th className="text-start px-6 py-3 font-semibold">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {order.user?.name ?? order.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{order.items.length} منتج</td>
                  <td className="px-6 py-4 font-bold text-indigo-600">
                    {formatPrice(order.totalPrice)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_COLOR[order.status] ?? "bg-gray-100 text-gray-700"}`}>
                      {STATUS_AR[order.status] ?? order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("ar-SA")}
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    <p className="text-4xl mb-2">📭</p>
                    لا توجد طلبات حتى الآن
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
