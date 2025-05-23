import { Link } from "react-router-dom";
import { Button } from "./ui/button";

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
}

export default function ItemGrid({
  key,
  product,
  onChat,
}: {
  key: string;
  product: ProductType;
  onChat: () => void
}) {
  return (
    <div
      key={key}
      className="flex flex-col overflow-hidden py-2 gap-2 border rounded-xl hover:shadow-lg hover:cursor-pointer"
    >
      <Link
        to={`/product-detail/${product.slug}`}
        key={product.slug}
        className="h-46 object-cover mx-2"
      >
        <img
          src={product.imageUrl ?? ""}
          alt={product.name}
          className="rounded-lg h-50 w-full object-cover"
        />
      </Link>
      <div className="px-2 space-y-2 flex flex-col justify-between h-full">
        <Link to={`/product-detail/${product.slug}`} key={product.slug}>
          <div className="space-y-2 py-4 px-2">
            <p className="font-semibold leading-tight line-clamp-2">
              {product.name}
            </p>
            <p className="font-bold text-base">${product.price}</p>
            <h2 className="text-muted-foreground text-sm">
              Min. order: {product.minimumOrderQuantity}
            </h2>
          </div>
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2"
          onClick={() => onChat()}
        >
          Chat now
        </Button>
      </div>
    </div>
  );
}
