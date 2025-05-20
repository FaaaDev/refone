import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useParams } from "react-router-dom";

const colors = ["Grey", "Mindnight", "Space Blue", "White"];
const storage = ["128 GB", "256 GB", "512 GB", "1 TB"];
const grade = ["S", "A+", "A", "B"];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { data, isLoading, isError } = trpc.product.detail.useQuery({
    slug: slug || "",
  });
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState(0);

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
            <div className="flex flex-col w-full gap-4">
              <img
                src={data?.imageUrl || ""}
                alt=""
                className="rounded-xl h-100"
              />
              <div className="flex flex-row gap-4">
                <img
                  src={data?.imageUrl || ""}
                  alt=""
                  className="rounded-md h-16 w-16"
                />
                <img
                  src={data?.imageUrl || ""}
                  alt=""
                  className="rounded-md h-16 w-16"
                />
                <img
                  src={data?.imageUrl || ""}
                  alt=""
                  className="rounded-md h-16 w-16"
                />
                <img
                  src={data?.imageUrl || ""}
                  alt=""
                  className="rounded-md h-16 w-16"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="space-y-2 border-b pb-4">
                <h1 className="text-2xl font-bold">{data?.name}</h1>
                <p className="text-muted-foreground">
                  Minimum order: {data?.minimumOrderQuantity} pcs
                </p>
                <h1 className="text-2xl font-bold">US${data?.price}</h1>
              </div>
              <div className="space-x-2 space-y-2 border-b pb-4">
                <p className="font-semi-bold text-sm">Color:</p>
                {colors.map((v, i) => {
                  return (
                    <Button
                      key={v}
                      variant="outline"
                      className={`${selectedColor === i ? "bg-sky-500/10 " : ""}hover:bg-sky-500/20`}
                      onClick={() => setSelectedColor(i)}
                    >
                      <p>{v}</p>
                    </Button>
                  );
                })}
              </div>
              <div className="space-x-2 space-y-2 border-b pb-4">
                <p className="font-semi-bold text-sm">Storage:</p>
                {storage.map((v, i) => {
                  return (
                    <Button
                      key={v}
                      variant="outline"
                      className={`${selectedStorage === i ? "bg-sky-500/10 " : ""}hover:bg-sky-500/20`}
                      onClick={() => setSelectedStorage(i)}
                    >
                      <p>{v}</p>
                    </Button>
                  );
                })}
              </div>
              <div className="space-x-2 space-y-2 border-b pb-4">
                <p className="font-semi-bold text-sm">Grade:</p>
                {grade.map((v, i) => {
                  return (
                    <Button
                      key={v}
                      variant="outline"
                      className={`${selectedGrade === i ? "bg-sky-500/10 " : ""}hover:bg-sky-500/20`}
                      onClick={() => setSelectedGrade(i)}
                    >
                      <p>{v}</p>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full mt-6">
            <h1 className="text-2xl font-bold">Product Description</h1>
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
          <div className="flex flex-col gap-4 w-full mt-6">
            <h1 className="text-2xl font-bold">Product Spesification</h1>
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
          <div className="flex flex-col gap-4 w-full mt-6">
            <h1 className="text-2xl font-bold">Product Review</h1>
            <div className="flex flex-row gap-6 w-full h-40 border rounded-xl p-4 items-center">
              <h1 className="text-6xl font-bold">4.9</h1>
            </div>
          </div>
        </div>
        <div className="w-120 h-150 border rounded-xl"></div>
      </div>
    </div>
  );
}
