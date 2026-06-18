export const dynamic = 'force-dynamic';
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { parseProductArrays } from "@/lib/utils";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";

interface SearchParams {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  featured?: string;
  size?: string;
}

async function getProducts(searchParams: SearchParams) {
  const where: Record<string, unknown> = {};

  if (searchParams.category) where.category = searchParams.category;
  if (searchParams.featured === "true") where.featured = true;
  if (searchParams.minPrice || searchParams.maxPrice) {
    where.price = {
      ...(searchParams.minPrice ? { gte: parseFloat(searchParams.minPrice) } : {}),
      ...(searchParams.maxPrice ? { lte: parseFloat(searchParams.maxPrice) } : {}),
    };
  }
  if (searchParams.search) {
    where.OR = [
      { nameAr: { contains: searchParams.search } },
      { name: { contains: searchParams.search } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  // Filter by size client-side since sizes is JSON string
  let parsed = products.map(parseProductArrays);
  if (searchParams.size) {
    parsed = parsed.filter((p) => p.sizes.includes(searchParams.size!));
  }

  return parsed;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const products = await getProducts(params);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">المنتجات</h1>
        <p className="text-gray-500 mt-1">{products.length} منتج متوفر</p>
      </div>

      <div className="flex gap-8">
        <Suspense>
          <ProductFilters />
        </Suspense>

        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-gray-500 text-lg">لا توجد منتجات تطابق الفلاتر المختارة</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
