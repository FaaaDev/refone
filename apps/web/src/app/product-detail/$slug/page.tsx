import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-full md:max-w-7xl mx-auto space-y-6">
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col md:flex-row gap-6 w-full">
              <div className="flex flex-col w-full gap-4">
                <Skeleton className="h-100 w-full rounded-xl" />
                <div className="flex flex-row gap-4">
                  <Skeleton className="h-16 w-16 rounded-xl" />
                  <Skeleton className="h-16 w-16 rounded-xl" />
                  <Skeleton className="h-16 w-16 rounded-xl" />
                  <Skeleton className="h-16 w-16 rounded-xl" />
                </div>
              </div>
              <div className="flex flex-col w-full gap-4">
                <Skeleton className="h-8 w-[100%] rounded-xl" />
                <Skeleton className="h-6 w-[20%] rounded-xl" />
                <Skeleton className="h-8 w-[60%] rounded-xl" />
                <Skeleton className="h-5 w-[10%] rounded-xl mt-4" />
                <div className="flex flex-row w-full gap-2">
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                </div>
                <Skeleton className="h-5 w-[10%] rounded-xl mt-4" />
                <div className="flex flex-row w-full gap-2">
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                </div>
                <Skeleton className="h-5 w-[10%] rounded-xl mt-4" />
                <div className="flex flex-row w-full gap-2">
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                </div>
              </div>
            </div>
            <Skeleton className="h-8 w-[30%] rounded-xl mt-6" />
            <Skeleton className="h-6 w-[90%] rounded-xl" />
            <Skeleton className="h-6 w-[70%] rounded-xl" />
            <Skeleton className="h-6 w-[80%] rounded-xl" />

            <Skeleton className="h-8 w-[30%] rounded-xl mt-6" />
            <Skeleton className="h-6 w-[70%] rounded-xl" />
            <Skeleton className="h-6 w-[80%] rounded-xl" />
            <Skeleton className="h-6 w-[80%] rounded-xl" />
          </div>
          <div className="w-120 h-fit border rounded-xl sticky top-8 p-6 flex-col gap-4 hidden xl:flex">
                <Skeleton className="h-5 w-[30%] rounded-xl" />
                <div className="flex flex-row w-full justify-between">
                  <Skeleton className="h-5 w-[30%] rounded-xl" />
                  <Skeleton className="h-5 w-[35%] rounded-xl" />
                </div>
                <div className="flex flex-row w-full justify-between">
                  <Skeleton className="h-5 w-[25%] rounded-xl" />
                  <Skeleton className="h-5 w-[30%] rounded-xl" />
                </div>
                <div className="flex flex-row w-full justify-between mt-5">
                  <Skeleton className="h-5 w-[40%] rounded-xl" />
                  <Skeleton className="h-5 w-[35%] rounded-xl" />
                </div>
                <Skeleton className="h-10 w-full rounded-xl mt-6" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
        </div>
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
    <div>
      <div className="p-4 md:p-8 max-w-full md:max-w-7xl mx-auto space-y-6">
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col md:flex-row gap-6 w-full">
              {/* Product Images and Gallery */}
              <div className="flex flex-col w-full gap-4">
                <img
                  src={data?.imageUrl || ""}
                  alt=""
                  className="rounded-xl h-100 object-cover border"
                />
                <div className="flex flex-row gap-4">
                  <img
                    src={data?.imageUrl || ""}
                    alt=""
                    className="rounded-md h-16 w-16 object-cover border"
                  />
                  <img
                    src={data?.imageUrl || ""}
                    alt=""
                    className="rounded-md h-16 w-16 object-cover border"
                  />
                  <img
                    src={data?.imageUrl || ""}
                    alt=""
                    className="rounded-md h-16 w-16 object-cover border"
                  />
                  <img
                    src={data?.imageUrl || ""}
                    alt=""
                    className="rounded-md h-16 w-16 object-cover border"
                  />
                </div>
              </div>
              {/* Product Details */}
              <div className="flex flex-col gap-4 w-full">
                <div className="space-y-2 border-b pb-4">
                  <h1 className="text-2xl font-bold">{data?.name}</h1>
                  <p className="text-muted-foreground">
                    Minimum order: {data?.minimumOrderQuantity} Pcs
                  </p>
                  <h1 className="text-2xl font-bold">US${data?.price}</h1>
                </div>
                {/* Product Variant */}
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
            {/* Product Description */}
            <div className="flex flex-col gap-4 w-full mt-6">
              <h1 className="text-2xl font-bold">Product Description</h1>
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
                    <Progress value={90} className="w-xs lg:w-md" />
                    <p className="text-sm text-gray-400">(200)</p>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <p className="text-sm">4</p>
                    <Progress value={10} className="w-xs lg:w-md" />
                    <p className="text-sm text-gray-400">(20)</p>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <p className="text-sm">3</p>
                    <Progress value={0} className="w-xs lg:w-md" />
                    <p className="text-sm text-gray-400">(0)</p>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <p className="text-sm">2</p>
                    <Progress value={0} className="w-xs lg:w-md" />
                    <p className="text-sm text-gray-400">(0)</p>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400 text-sm"
                    />
                    <p className="text-sm">1</p>
                    <Progress value={0} className="w-xs lg:w-md" />
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
          <div className="w-120 h-fit border rounded-xl sticky top-8 p-6 flex-col gap-4 hidden xl:flex">
            <h6 className="font-bold pb-4">Process Order</h6>
            <div className="flex flex-row gap-2 justify-between items-center w-full">
              <p className="text-sm font-bold">Stock</p>
              <p className="text-sm">1.320 Pcs</p>
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
