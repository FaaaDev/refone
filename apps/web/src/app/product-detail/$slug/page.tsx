import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { data, isLoading, isError } = trpc.product.detail.useQuery({
    slug: slug || "",
  });

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
    <div className="p-4 md:p-8 max-w-full md:max-w-7xl mx-auto space-y-6">
      <div className="flex flex-row gap-6">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-6 w-full">
            <img
              src={data?.imageUrl || ""}
              alt=""
              className="rounded-xl h-100"
            />
            <div className="flex flex-col gap-4 w-full">
              <div className="space-y-2 border-b pb-4">
                <h1 className="text-2xl font-bold">{data?.name}</h1>
                <p className="text-muted-foreground">
                  Minimum order: {data?.minimumOrderQuantity} pcs
                </p>
                <h1 className="text-2xl font-bold">US${data?.price}</h1>
              </div>
            </div>
          </div>
          <div className="prose max-w-none">
            <h2>Description</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="w-120 h-150 border rounded-xl"></div>
      </div>
    </div>
  );
}
