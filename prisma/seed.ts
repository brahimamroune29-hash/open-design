import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@store.com" },
    update: {},
    create: {
      name: "مدير المتجر",
      email: "admin@store.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Demo products
  const products = [
    {
      name: "Classic White Shirt",
      nameAr: "قميص أبيض كلاسيكي",
      description: "Classic white cotton shirt",
      descriptionAr: "قميص قطني أبيض كلاسيكي مريح ومناسب لجميع المناسبات",
      price: 120,
      category: "men",
      sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
      colors: JSON.stringify(["أبيض", "أزرق فاتح", "رمادي"]),
      images: JSON.stringify(["/images/placeholder.png"]),
      stock: 50,
      featured: true,
    },
    {
      name: "Slim Fit Jeans",
      nameAr: "جينز ضيق",
      description: "Slim fit denim jeans",
      descriptionAr: "بنطلون جينز ضيق عصري ومريح",
      price: 200,
      category: "men",
      sizes: JSON.stringify(["28", "30", "32", "34", "36"]),
      colors: JSON.stringify(["أزرق داكن", "أسود", "رمادي"]),
      images: JSON.stringify(["/images/placeholder.png"]),
      stock: 30,
      featured: true,
    },
    {
      name: "Floral Dress",
      nameAr: "فستان زهري",
      description: "Beautiful floral summer dress",
      descriptionAr: "فستان صيفي جميل بنقوش زهرية أنيقة",
      price: 280,
      category: "women",
      sizes: JSON.stringify(["XS", "S", "M", "L", "XL"]),
      colors: JSON.stringify(["وردي", "أزرق", "أصفر"]),
      images: JSON.stringify(["/images/placeholder.png"]),
      stock: 20,
      featured: true,
    },
    {
      name: "Knit Sweater",
      nameAr: "سترة صوف",
      description: "Warm knit sweater for winter",
      descriptionAr: "سترة صوف دافئة مناسبة للشتاء",
      price: 180,
      category: "women",
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      colors: JSON.stringify(["بيج", "بني", "أخضر"]),
      images: JSON.stringify(["/images/placeholder.png"]),
      stock: 25,
      featured: false,
    },
    {
      name: "Kids T-Shirt",
      nameAr: "تيشيرت أطفال",
      description: "Colorful kids t-shirt",
      descriptionAr: "تيشيرت ملون ومريح للأطفال",
      price: 60,
      category: "kids",
      sizes: JSON.stringify(["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"]),
      colors: JSON.stringify(["أحمر", "أزرق", "أصفر", "أخضر"]),
      images: JSON.stringify(["/images/placeholder.png"]),
      stock: 40,
      featured: false,
    },
    {
      name: "Leather Belt",
      nameAr: "حزام جلد",
      description: "Genuine leather belt",
      descriptionAr: "حزام جلد طبيعي عالي الجودة",
      price: 85,
      category: "accessories",
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      colors: JSON.stringify(["بني", "أسود"]),
      images: JSON.stringify(["/images/placeholder.png"]),
      stock: 35,
      featured: false,
    },
    {
      name: "Sport Jacket",
      nameAr: "جاكيت رياضي",
      description: "Lightweight sport jacket",
      descriptionAr: "جاكيت رياضي خفيف الوزن مناسب للنشاطات الخارجية",
      price: 320,
      category: "men",
      sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
      colors: JSON.stringify(["أسود", "كحلي", "رمادي"]),
      images: JSON.stringify(["/images/placeholder.png"]),
      stock: 15,
      featured: true,
    },
    {
      name: "Silk Scarf",
      nameAr: "وشاح حرير",
      description: "Elegant silk scarf",
      descriptionAr: "وشاح حريري أنيق بألوان متعددة",
      price: 95,
      category: "accessories",
      sizes: JSON.stringify(["One Size"]),
      colors: JSON.stringify(["أحمر", "أزرق", "بنفسجي", "أخضر"]),
      images: JSON.stringify(["/images/placeholder.png"]),
      stock: 20,
      featured: false,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("✅ Seed data created successfully");
  console.log("👤 Admin: admin@store.com / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
