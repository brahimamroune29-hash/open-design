"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { CATEGORY_LABELS } from "@/lib/utils";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const CATEGORIES = Object.entries(CATEGORY_LABELS);

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(`/products?${params.toString()}`);
    },
    [router, searchParams]
  );

  const currentCategory = searchParams.get("category");

  return (
    <aside className="w-64 shrink-0">
      <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-20 space-y-6">
        <div>
          <h3 className="font-bold text-gray-900 mb-3">الفئة</h3>
          <div className="space-y-2">
            <button
              onClick={() => updateParam("category", null)}
              className={`block w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${!currentCategory ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
            >
              الكل
            </button>
            {CATEGORIES.map(([key, label]) => (
              <button
                key={key}
                onClick={() => updateParam("category", key)}
                className={`block w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${currentCategory === key ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-3">السعر</h3>
          <div className="space-y-2">
            {[
              { label: "أقل من 100 ريال", min: null, max: "100" },
              { label: "100 - 200 ريال", min: "100", max: "200" },
              { label: "200 - 300 ريال", min: "200", max: "300" },
              { label: "أكثر من 300 ريال", min: "300", max: null },
            ].map((range) => {
              const active =
                searchParams.get("minPrice") === range.min &&
                searchParams.get("maxPrice") === range.max;
              return (
                <button
                  key={range.label}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    if (active) {
                      params.delete("minPrice");
                      params.delete("maxPrice");
                    } else {
                      if (range.min) params.set("minPrice", range.min);
                      else params.delete("minPrice");
                      if (range.max) params.set("maxPrice", range.max);
                      else params.delete("maxPrice");
                    }
                    router.push(`/products?${params.toString()}`);
                  }}
                  className={`block w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${active ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-3">الحجم</h3>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => updateParam("size", searchParams.get("size") === size ? null : size)}
                className={`px-3 py-1 rounded-lg border text-sm font-medium transition-colors ${
                  searchParams.get("size") === size
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-gray-200 text-gray-600 hover:border-indigo-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => router.push("/products")}
          className="w-full text-sm text-gray-500 hover:text-red-600 transition-colors text-center py-2"
        >
          مسح الفلاتر
        </button>
      </div>
    </aside>
  );
}
