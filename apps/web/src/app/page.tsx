import { Button } from "@/components/ui/button";
import { trpc } from "../lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import SideFilter from "@/components/side_filter";

export default function UsedPhonesPage() {
  const { data, isLoading, isError } = trpc.product.all.useQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
        ))}
      </div>
    );
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
        {data.map((product, idx) => (
          <div key={idx} className="flex flex-col overflow-hidden py-2 gap-2 border rounded-xl hover:shadow-lg hover:cursor-pointer">
            <Link to={`/product-detail/${product.slug}`} key={product.slug} className="h-46 object-cover mx-2">
              <img
                src={product.imageUrl ?? ""}
                alt={product.name}
                className="rounded-lg"
              />
            </Link>
            <div className="px-2 space-y-2 flex flex-col justify-between h-full">
              <Link to={`/product-detail/${product.slug}`} key={product.slug}>
                <div className="space-y-2 py-4 px-2">
                  <p className="font-semibold leading-tight line-clamp-2">
                    {product.name}
                  </p>
                  <p className="text-primary font-bold text-base">
                    ${product.price}
                  </p>
                  <h2 className="text-muted-foreground text-sm">
                    Min. order: {product.minimumOrderQuantity}
                  </h2>
                </div>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => {}}
              >
                Chat now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
