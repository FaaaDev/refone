import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { trpc } from "../../lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";


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
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Search Bar */}

      <div className="flex gap-2 mb-6">
        <Input placeholder="Search used mobile phones" className="flex-1" />
        <Button variant="default" size="icon">
          <Search className="w-5 h-5" />
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product, idx) => (
          <Card key={idx} className="overflow-hidden">
            <img
              src={product.imageUrl ?? ""}
              alt={product.name}
              className="h-60 object-cover mx-4 rounded-lg"
            />
            <CardContent className="p-4 space-y-2">
              <h2 className="text-sm font-semibold leading-tight line-clamp-2">
                {product.name}
              </h2>
              <p className="text-primary font-bold text-base">
                {product.price}
              </p>
              <p className="text-muted-foreground text-sm">
                Min. order: {product.minimumOrderQuantity}
              </p>
              <p className="text-muted-foreground text-xs line-clamp-1">
                sunshen
              </p>
              <Button variant="outline" size="sm" className="w-full mt-2">
                Chat now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
