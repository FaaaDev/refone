import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import LoadingDetail from "@/components/loading_detail";

type Variant = {
  id: string;
  productId: string;
  name: string;
  value: string;
  priceDiff: string;
  stockDiff: number;
  createdAt: string;
  updatedAt: string;
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { data, isLoading, isError } = trpc.product.detail.useQuery({
    slug: slug || "",
  });
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLoading) setSelectedImage(data?.imageUrl || "");
  }, [isLoading]);

  useEffect(() => {
    if (!data?.variants) return;

    const grouped = groupedVariants(data.variants);
    const defaultSelected: Record<string, string> = {};

    grouped.forEach((group) => {
      if (group.items.length > 0) {
        defaultSelected[group.variant] = group.items[0].id; 
      }
    });

    setSelectedVariants(defaultSelected);
  }, [data?.variants]);

  if (isLoading) {
    return <LoadingDetail />;
  }

  if (isError || !data) {
    return (
      <div className="text-center text-red-500 py-8">
        Gagal memuat data produk. Silakan coba lagi.
      </div>
    );
  }

  const groupedVariants = (variants: Variant[]) => {
    const map = new Map<string, Variant[]>();

    for (const variant of variants) {
      if (!map.has(variant.name)) {
        map.set(variant.name, []);
      }
      map.get(variant.name)?.push(variant);
    }

    return Array.from(map.entries()).map(([variant, items]) => ({
      variant,
      items,
    }));
  };

  return (
    <div>
      <div className="p-4 md:p-8 max-w-full md:max-w-7xl mx-auto space-y-6">
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col md:flex-row gap-6 w-full">
              {/* Product Images and Gallery */}
              <div className="flex flex-col w-full gap-4">
                <img
                  src={selectedImage || ""}
                  alt=""
                  className="rounded-xl h-100 object-cover border"
                />
                <div className="flex flex-row gap-4">
                  {[
                    ...[{ imageUrl: data?.imageUrl }],
                    ...(data?.galleries || []),
                  ].map((v) => {
                    return (
                      <img
                        src={v.imageUrl || ""}
                        alt=""
                        className={`${selectedImage === v.imageUrl ? "border-primary border-4 " : "border "}rounded-md h-16 w-16 object-cover hover:border-4 hover:border-primary hover: cursor-pointer`}
                        onClick={() => setSelectedImage(v?.imageUrl || "")}
                      />
                    );
                  })}
                </div>
              </div>
              {/* Product Details */}
              <div className="flex flex-col gap-4 w-full">
                <div className="space-y-2 border-b pb-4">
                  <h1 className="text-2xl font-bold">{data?.name}</h1>
                  <p className="text-muted-foreground">
                    Minimum order: {data?.minimumOrderQuantity || 0} Pcs
                  </p>
                  <h1 className="text-2xl font-bold">US${data?.price}</h1>
                </div>
                {/* Product Variant */}
                {groupedVariants(data?.variants || []).map((group) => (
                  <div className="space-x-2 space-y-2 border-b pb-4">
                    <p className="font-semi-bold text-sm">{group.variant}:</p>
                    {group.items.map((v, i) => {
                      return (
                        <Button
                          key={`${group.variant}-${i}`}
                          variant="outline"
                          className={`${selectedVariants[group.variant] === v.id ? "bg-sky-500/10 " : ""}hover:bg-sky-500/20`}
                          onClick={() =>
                            setSelectedVariants((prev) => ({
                              ...prev,
                              [group.variant]: v.id,
                            }))
                          }
                        >
                          <p>{v.value}</p>
                        </Button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            {/* Product Description */}
            <div className="flex flex-col gap-4 w-full mt-6">
              <h1 className="text-2xl font-bold">Product Description</h1>
              <p>{data.description}</p>
            </div>
            {/* Product Spesification */}
            <div className="flex flex-col gap-4 w-full mt-6">
              <h1 className="text-2xl font-bold">Product Spesification</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            {/* REVIEW SUMMARY */}
            <div className="flex flex-col gap-4 w-full mt-6">
              <h1 className="text-2xl font-bold">Product Review</h1>
              <div className="flex flex-col md:flex-row gap-10 w-full border rounded-xl p-4 items-center">
                <div className="flex flex-col gap-4 justify-center items-center">
                  <h1 className="text-6xl font-bold">4.9</h1>
                  <div className="flex flex-row gap-4">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-xl"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-xl"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-xl"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-xl"
                    />
                    <FontAwesomeIcon
                      icon={faStarHalfStroke}
                      className="text-yellow-400 text-xl"
                    />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    95% Buyers Satisfied
                  </p>
                </div>
                {/* Review Meter */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-1 items-center">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <p className="text-sm">5</p>
                    <Progress value={90} className="w-45 lg:w-md" />
                    <p className="text-sm text-gray-400">(200)</p>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <p className="text-sm">4</p>
                    <Progress value={10} className="w-45 lg:w-md" />
                    <p className="text-sm text-gray-400">(20)</p>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <p className="text-sm">3</p>
                    <Progress value={0} className="w-45 lg:w-md" />
                    <p className="text-sm text-gray-400">(0)</p>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <p className="text-sm">2</p>
                    <Progress value={0} className="w-45 lg:w-md" />
                    <p className="text-sm text-gray-400">(0)</p>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <p className="text-sm">1</p>
                    <Progress value={0} className="w-45 lg:w-md" />
                    <p className="text-sm text-gray-400">(0)</p>
                  </div>
                </div>
              </div>
            </div>
            {/* USER REVIEW */}
            <div className="flex flex-col gap-4 w-full mt-6 border-b pb-6">
              <div className="flex flex-row gap-4 w-full items-center">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>IC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 items-start">
                  <div className="flex flex-row gap-4">
                    <p className="text-sm font-bold">I*****a</p>
                    <p className="text-sm text-gray-400">Yesterday</p>
                  </div>
                  <div className="flex flex-row gap-1">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full border-b pb-6">
              <div className="flex flex-row gap-4 w-full items-center">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>IC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 items-start">
                  <div className="flex flex-row gap-4">
                    <p className="text-sm font-bold">I*****a</p>
                    <p className="text-sm text-gray-400">Yesterday</p>
                  </div>
                  <div className="flex flex-row gap-1">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full border-b pb-6">
              <div className="flex flex-row gap-4 w-full items-center">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>IC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 items-start">
                  <div className="flex flex-row gap-4">
                    <p className="text-sm font-bold">I*****a</p>
                    <p className="text-sm text-gray-400">Yesterday</p>
                  </div>
                  <div className="flex flex-row gap-1">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
          {/* Order Navigation */}
          <div className="w-120 h-fit border rounded-xl sticky top-22 p-6 flex-col gap-4 hidden xl:flex">
            <h6 className="font-bold pb-4">Process Order</h6>
            <div className="flex flex-row gap-2 justify-between items-center w-full">
              <p className="text-sm font-bold">Stock</p>
              <p className="text-sm">{data.stockQuantity} Pcs</p>
            </div>
            <div className="flex flex-row gap-2 justify-between items-center w-full">
              <p className="text-sm font-bold">Quantity</p>
              <div className="flex flex-row gap-2 w-40">
                <Button variant="outline" size="icon">
                  <Minus />
                </Button>
                <Input
                  value={1}
                  placeholder="Qty"
                  className="focus:ring-inset text-center"
                />
                <Button variant="default" size="icon">
                  <Plus />
                </Button>
              </div>
            </div>
            <Separator className="mt-4 mb-1" />
            <div className="flex flex-row gap-2 justify-between items-center w-full mb-6">
              <p className="text-sm font-bold">Subtotal</p>
              <p className="text-sm font-bold">US${data?.price}</p>
            </div>
            <Button variant="outline" size="default">
              Add to Cart
            </Button>
            <Button variant="default" size="default">
              Place Order
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 w-full bottom-4 sticky bg-white p-4 shadow-xl border rounded-2xl xl:hidden">
        <Button variant="outline" size="icon">
          <ShoppingCart />
        </Button>
        <div className="w-full">
          <Button variant="default" size="default" className="w-full">
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
