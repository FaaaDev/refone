import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import CCheck from "./ui/ccheck";
import { Input } from "./ui/input";
import { trpc } from "@/lib/trpc";

type CategoryType = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

const shipping = [
  "JNE YES",
  "JNE Regular",
  "J&T Express",
  "Ninja Express",
  "Sicepat Halu",
  "Sicepat Regular",
  "Go Send - Sameday",
  "Go Send - Instant",
  "Grab Express",
];

const payment = [
  "Credit Card",
  "VISA",
  "Master Card",
  "Jenius Pay",
  "QRIS",
  "Virtual Account",
];

const top = ["1 Month", "3 Month", "6 Month", "12 Month", "24 Month"];

const storage = [
  "16 GB",
  "32 GB",
  "64 GB",
  "128 GB",
  "256 GB",
  "512 GB",
  "1 TB",
];

const memory = ["4 GB", "6 GB", "8 GB", "12 GB", "16 GB"];

const warranty = [
  "1 Month",
  "3 Month",
  "6 Month",
  "12 Month",
  "24 Month",
  "36 Month",
];

export default function SideFilter({
  onChangeCategory,
  onChangeSort,
  selectedSort = "createdAt",
  selectedCategoryId,
}: {
  onChangeCategory?: (category: string[]) => void;
  onChangeSort?: (category: string) => void;
  selectedSort?: string;
  selectedCategoryId?: string[];
}) {
  const { data: category } = trpc.category.all.useQuery<CategoryType[]>();

  return (
    <div className="h-250 w-xs border rounded-xl hidden md:block sticky overflow-hidden top-8">
      <h6 className="font-bold p-4">Filter</h6>
      <div
        className="p-4 h-235 overflow-y-auto not-hover:overflow-y-hidden
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar]:h-1
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <Accordion
          type="multiple"
          defaultValue={[
            "item-1",
            "item-2",
            "item-3",
            "item-5",
            "item-6",
            "item-13",
          ]}
        >
          <AccordionItem className="border-b" value="item-1">
            <AccordionTrigger className="hover:cursor-pointer">
              Category
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {category?.map((v) => (
                  <CCheck
                    label={v.name}
                    value={
                      selectedCategoryId?.some((id) => id === v.id) || false
                    }
                    onChange={(check) => {
                      if (check) {
                        const newCategory = [
                          ...(selectedCategoryId || []),
                          v.id,
                        ];
                        if (onChangeCategory) {
                          onChangeCategory(newCategory);
                        }
                      } else {
                        const newCategory = selectedCategoryId?.filter(
                          (id) => id !== v.id
                        );
                        if (onChangeCategory) {
                          onChangeCategory(newCategory || []);
                        }
                      }
                    }}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-13">
            <AccordionTrigger className="hover:cursor-pointer">
              Sort By
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                <CCheck
                  label="Default"
                  value={selectedSort === "createdAt"}
                  onChange={(check) => {
                    if (check) {
                      if (onChangeSort) {
                        onChangeSort("createdAt");
                      }
                    }
                  }}
                />
                <CCheck
                  label="Price Low to High"
                  value={selectedSort === "priceAsc"}
                  onChange={(check) => {
                    if (check) {
                      if (onChangeSort) {
                        onChangeSort("priceAsc");
                      }
                    }
                  }}
                />
                <CCheck
                  label="Price High to Low"
                  value={selectedSort === "priceDesc"}
                  onChange={(check) => {
                    if (check) {
                      if (onChangeSort) {
                        onChangeSort("priceDesc");
                      }
                    }
                  }}
                />
                <CCheck
                  label="Name A to Z"
                  value={selectedSort === "nameAsc"}
                  onChange={(check) => {
                    if (check) {
                      if (onChangeSort) {
                        onChangeSort("nameAsc");
                      }
                    }
                  }}
                />
                <CCheck
                  label="Name Z to A"
                  value={selectedSort === "nameDesc"}
                  onChange={(check) => {
                    if (check) {
                      if (onChangeSort) {
                        onChangeSort("nameDesc");
                      }
                    }
                  }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-2">
            <AccordionTrigger className="hover:cursor-pointer">
              Shipping Options
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {shipping.map((v) => (
                  <CCheck label={v} value={false} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-3">
            <AccordionTrigger className="hover:cursor-pointer">
              Payment Options
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {payment.map((v) => (
                  <CCheck label={v} value={false} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-4">
            <AccordionTrigger className="hover:cursor-pointer">
              Minimum Order
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-row gap-2 items-center">
                <Input
                  placeholder="Minimum Order"
                  className="focus:ring-inset"
                />
                <Button variant="default" size="default">
                  Ok
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-5">
            <AccordionTrigger className="hover:cursor-pointer">
              Stock Options
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-row gap-2 items-center">
                <Input
                  placeholder="Minimum Stock"
                  className="focus:ring-inset"
                />
                <Button variant="default" size="default">
                  Ok
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-6">
            <AccordionTrigger className="hover:cursor-pointer">
              Price Range
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-row gap-2 items-center">
                <div className="flex flex-row gap-2 items-center">
                  <Input placeholder="Min" className="focus:ring-inset" />
                  -
                  <Input placeholder="Max" className="focus:ring-inset" />
                </div>
                <Button variant="default" size="default">
                  Ok
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-8">
            <AccordionTrigger className="hover:cursor-pointer">
              Term of Payment
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {top.map((v) => (
                  <CCheck label={v} value={false} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-9">
            <AccordionTrigger className="hover:cursor-pointer">
              Storage
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {storage.map((v) => (
                  <CCheck label={v} value={false} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-10">
            <AccordionTrigger className="hover:cursor-pointer">
              Memory
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {memory.map((v) => (
                  <CCheck label={v} value={false} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-12">
            <AccordionTrigger className="hover:cursor-pointer">
              Warranty
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {warranty.map((v) => (
                  <CCheck label={v} value={false} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
