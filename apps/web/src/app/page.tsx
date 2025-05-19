import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "../lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
    <div className="p-4 md:p-8 max-w-7xl mx-auto flex flex-row gap-0 md:gap-6">
      {/* Product Grid */}
      <div className="vh-100 w-xs border rounded-xl p-4 hidden md:block">
        <h6 className="font-bold mb-4">Filter</h6>
        <Accordion type="single" collapsible>
          <AccordionItem className=" border-b" value="item-1">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-2">
            <AccordionTrigger>Shipping Options</AccordionTrigger>
            <AccordionContent>
              
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-3">
            <AccordionTrigger>Payment Options</AccordionTrigger>
            <AccordionContent>
              
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-4">
            <AccordionTrigger>Minimum Order</AccordionTrigger>
            <AccordionContent>
              
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-5">
            <AccordionTrigger>Stock Options</AccordionTrigger>
            <AccordionContent>
              
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-6">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-7">
            <AccordionTrigger>Payment Method</AccordionTrigger>
            <AccordionContent>
              
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-8">
            <AccordionTrigger>Term of Payment</AccordionTrigger>
            <AccordionContent>
              
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-9">
            <AccordionTrigger>Storage</AccordionTrigger>
            <AccordionContent>
              
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-10">
            <AccordionTrigger>Memory</AccordionTrigger>
            <AccordionContent>
              
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-11">
            <AccordionTrigger>Assurance</AccordionTrigger>
            <AccordionContent>
              
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b" value="item-12">
            <AccordionTrigger>Warranty</AccordionTrigger>
            <AccordionContent>
              
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product, idx) => (
          <Link to={`/product-detail/${product.slug}`} key={product.slug}>
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
          </Link>
        ))}
      </div>
    </div>
  );
}
