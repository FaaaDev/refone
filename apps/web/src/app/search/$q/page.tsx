import LoadingGrid from "@/components/loading_grid";
import ItemGrid from "@/components/item_grid";
import { trpc } from "@/lib/trpc";
import { useNavigate, useParams } from "react-router-dom";
import noData from "@/assets/no-result.png";
import { Button } from "@/components/ui/button";
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

export default function ProductSearch() {
  const { q } = useParams();
  const [category, setCategory] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState<string>("createdAt");
  const { data, isLoading, isError } = trpc.product.search.useQuery<
    ProductType[]
  >({ q: q || "", category, orderBy });
  const navigate = useNavigate();

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
      {data.length ? (
        <div className="flex flex-col gap-4 w-full">
          <p className="text-sm">
            Showing {data.length} result for <b>"{q}"</b>
          </p>
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
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-4 pt-20 w-full">
          <img className="h-50" src={noData} />
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-500">
              No result for <b>"{q}"</b>
            </p>
            <p className="text-sm mb-5">Try looking for something else or change your category</p>
          </div>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      )}
    </div>
  );
}
