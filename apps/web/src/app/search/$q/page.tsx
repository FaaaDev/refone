import SideFilter from "@/components/side_filter";
import LoadingGrid from "@/components/loading_grid";
import ItemGrid from "@/components/item_grid";
import { trpc } from "@/lib/trpc";
import { useParams } from "react-router-dom";

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
}
export default function UsedPhonesPage() {
    const { q } = useParams();
  const { data, isLoading, isError } = trpc.product.search.useQuery<ProductType[]>({q: q || ""});

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
      <SideFilter />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
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
