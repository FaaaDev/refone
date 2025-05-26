import { trpc } from "../lib/trpc";
import LoadingGrid from "@/components/loading_grid";
import ItemGrid from "@/components/item_grid";
import SideFilter from "@/components/side_filter";
import { useState } from "react";

type ProductType = {
  name: string;
  id: string;
  sku: string;
  slug: string;
  description: string;
  price: string;
  imageUrl: string | null;
  stockQuantity: number;
  minimumOrderQuantity: number;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
};

export default function UsedPhonesPage() {
  const [category, setCategory] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState<string>("createdAt");

  const { data, isLoading, isError } = trpc.product.all.useQuery<ProductType[]>(
    { category, orderBy }
  );

  if (isLoading) {
    return <LoadingGrid />;
  }

  if (isError || !data) {
    return (
      <div className="text-center text-red-500 py-8">
        Gagal memuat data produk. Silakan coba lagi.
      </div>
    );
  }
  return (
    <div className="p-4 md:p-8 max-w-full md:max-w-7xl mx-auto flex flex-row gap-0 md:gap-6">
      <SideFilter
        selectedCategoryId={category}
        selectedSort={orderBy}
        onChangeCategory={(categories) => setCategory(categories)}
        onChangeSort={(key) => setOrderBy(key)}
      />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full h-fit">
        {data.map((product: ProductType, idx: number) => (
          <ItemGrid
            key={`item-${idx + 1}`}
            product={product || null}
            onChat={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
