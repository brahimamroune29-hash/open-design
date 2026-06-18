import { prisma } from "@/lib/prisma";
import { parseProductArrays } from "@/lib/utils";
import { notFound } from "next/navigation";
import ProductForm from "../ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">تعديل المنتج: {product.nameAr}</h1>
      <ProductForm product={parseProductArrays(product)} />
    </div>
  );
}
