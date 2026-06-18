import type { Product } from "@prisma/client";

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function parseProductArrays(product: Product) {
  return {
    ...product,
    sizes: JSON.parse(product.sizes) as string[],
    colors: JSON.parse(product.colors) as string[],
    images: JSON.parse(product.images) as string[],
  };
}

export type ParsedProduct = ReturnType<typeof parseProductArrays>;

export const STATUS_LABELS: Record<string, string> = {
  PENDING: "قيد الانتظار",
  CONFIRMED: "مؤكد",
  SHIPPED: "تم الشحن",
  DELIVERED: "تم التوصيل",
  CANCELLED: "ملغي",
};

export const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export const CATEGORY_LABELS: Record<string, string> = {
  men: "رجال",
  women: "نساء",
  kids: "أطفال",
  accessories: "إكسسوارات",
};
