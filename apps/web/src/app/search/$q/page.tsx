import LoadingGrid from "@/components/loading_grid";
import ItemGrid from "@/components/item_grid";
import { trpc } from "@/lib/trpc";
import { useNavigate, useParams } from "react-router-dom";
import noData from "@/assets/no-result.png";
import { Button } from "@/components/ui/button";
import SideFilter from "@/components/side_filter";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Filter from "@/components/filter";
import { FilterIcon } from "lucide-react";

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

type CategoryType = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export default function ProductSearch() {
  const { q } = useParams();
  const [category, setCategory] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState<string>("createdAt");

  const { data: dataCategory } = trpc.category.all.useQuery<CategoryType[]>();
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
    <div className="pb-4 md:p-8 max-w-full md:max-w-7xl mx-auto flex flex-row gap-0 md:gap-6">
      <SideFilter
        selectedCategoryId={category}
        selectedSort={orderBy}
        onChangeCategory={(categories) => setCategory(categories)}
        onChangeSort={(key) => setOrderBy(key)}
      />
      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-2 w-full md:hidden sticky top-17 bg-white px-4 pb-4 pt-2">
          <div className="flex flex-row gap-2 w-full overflow-x-auto">
            {dataCategory?.map((cat) => (
              <Button
                key={`${cat.slug}`}
                variant="outline"
                className={`${category?.some((id) => id === cat.id) || false ? "bg-sky-500/10 " : ""}hover:bg-sky-500/20`}
                onClick={() => {
                  if (!category?.some((id) => id === cat.id) || false) {
                    const newCategory = [...(category || []), cat.id];
                    setCategory(newCategory);
                  } else {
                    const newCategory = category?.filter((id) => id !== cat.id);
                    setCategory(newCategory);
                  }
                }}
              >
                <p>{cat.name}</p>
              </Button>
            ))}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <FilterIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="z-1000">
              <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
              </SheetHeader>
              <div className="p-4 overflow-y-auto">
                <Filter
                  selectedCategoryId={category}
                  selectedSort={orderBy}
                  onChangeCategory={(categories) => setCategory(categories)}
                  onChangeSort={(key) => setOrderBy(key)}
                />
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Apply Filter</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        {data.length ? (
          <div className="flex flex-col gap-4 w-full">
            <p className="text-sm px-4 md:px-0">
              Showing {data.length} result for <b>"{q}"</b>
            </p>
            <div className="px-4 md:px-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full h-fit">
              {data.map((product: ProductType, idx: number) => (
                <div key={`container-${idx + 1}`}>
                  <ItemGrid
                  itemKey={`item-${idx + 1}`}
                  product={product || null}
                  onChat={() => {}}
                />
                </div>
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
              <p className="text-sm mb-5">
                Try looking for something else or change your category
              </p>
            </div>
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        )}
      </div>
    </div>
  );
}
