import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون على الأقل حرفين"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export const productSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب"),
  nameAr: z.string().min(1, "الاسم العربي مطلوب"),
  description: z.string().min(1, "الوصف مطلوب"),
  descriptionAr: z.string().min(1, "الوصف العربي مطلوب"),
  price: z.number().positive("السعر يجب أن يكون أكبر من 0"),
  category: z.enum(["men", "women", "kids", "accessories"]),
  sizes: z.array(z.string()).min(1, "اختر حجماً واحداً على الأقل"),
  colors: z.array(z.string()).min(1, "اختر لوناً واحداً على الأقل"),
  images: z.array(z.string()),
  stock: z.number().int().min(0),
  featured: z.boolean().optional(),
});

export const orderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
      size: z.string(),
      color: z.string(),
    })
  ).min(1, "السلة فارغة"),
  name: z.string().min(2, "الاسم مطلوب"),
  address: z.string().min(5, "العنوان مطلوب"),
  phone: z.string().min(9, "رقم الهاتف غير صحيح"),
  notes: z.string().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type OrderInput = z.infer<typeof orderSchema>;
