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
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <img src={data?.imageUrl || ""} alt="" className="rounded-xl" />
        <div>
          <h1 className="text-2xl font-bold">{data?.name}</h1>
          <p className="text-xl text-primary">{data?.price}</p>
          <p className="text-muted-foreground">
            Min. order: {data?.minimumOrderQuantity}
          </p>
          <p className="text-muted-foreground">Grade: A+</p>
        </div>
      </div>
      <div className="prose max-w-none">
        <h2>Description</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}
