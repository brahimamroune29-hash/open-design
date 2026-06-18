import { prisma } from "@/lib/prisma";
import AdminOrderStatus from "./AdminOrderStatus";

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

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { name: true, email: true } },
      items: { include: { product: { select: { nameAr: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة الطلبات</h1>
          <p className="text-gray-500 mt-1">{orders.length} طلب</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
                <th className="text-start px-5 py-3 font-medium">العميل</th>
                <th className="text-start px-5 py-3 font-medium">الهاتف</th>
                <th className="text-start px-5 py-3 font-medium">المنتجات</th>
                <th className="text-start px-5 py-3 font-medium">المبلغ</th>
                <th className="text-start px-5 py-3 font-medium">الحالة</th>
                <th className="text-start px-5 py-3 font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="font-medium text-gray-900">{order.name}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{order.address}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-600" dir="ltr">{order.phone}</td>
                  <td className="px-5 py-4">
                    <div className="text-gray-700">
                      {order.items.map((item) => (
                        <div key={item.id} className="text-xs text-gray-500">
                          {item.product.nameAr} × {item.quantity}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold">{order.totalPrice.toFixed(0)} ر.س</td>
                  <td className="px-5 py-4">
                    <AdminOrderStatus
                      orderId={order.id}
                      currentStatus={order.status}
                      statusAr={STATUS_AR}
                      statusColor={STATUS_COLOR}
                    />
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs">
                    {new Date(order.createdAt).toLocaleDateString("ar-SA")}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-gray-400">لا توجد طلبات حتى الآن</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
