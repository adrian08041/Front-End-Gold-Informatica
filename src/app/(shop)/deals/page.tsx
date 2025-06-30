import { Product } from "@/@types/product";
import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";

import { PercentIcon } from "lucide-react";

const DealsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/deals`, {
    next: { revalidate: 60 }, // se estiver usando caching
  });
  const deals: Product[] = await res.json();

  return (
    <div className="flex flex-col gap-5 p-5 lg:p-10">
      <Badge className="w-fit gap-1 border-2 border-dourado px-3 py-[0.375rem] text-base uppercase">
        <PercentIcon size={16} />
        Ofertas
      </Badge>
      <div className="grid grid-cols-2 gap-8 lg:flex lg:flex-wrap lg:gap-10">
        {deals.map((product) => (
          <ProductItem
            key={product.id}
            product={{
              ...product,
              discountPercentage: product.discountPercentage ?? 0,
              totalPrice: computeProductTotalPrice({
                basePrice: product.price,
                discountPercentage: product.discountPercentage ?? 0,
              }),
              basePrice: product.price,
              categoryId: product.category?.id ?? "",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DealsPage;
