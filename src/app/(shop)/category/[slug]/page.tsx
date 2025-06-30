import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";

import { CATEGORY_ICON } from "../../constants/category-icon";
import { computeProductTotalPrice } from "@/helpers/product";
import { Product } from "@/@types/product";
import { Category } from "@/@types/category";

const CategoryProducts = async ({ params }: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/category/slug/${params.slug}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) return null;

  const { data: category }: { data: Category } = await res.json();
  if (!category) return null;

  return (
    <div className="flex flex-col gap-8 p-5 lg:p-10">
      <Badge className="w-fit gap-1 border-2 border-dourado px-3 py-[0.375rem] text-base uppercase">
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {category.name}
      </Badge>
      <div className="grid grid-cols-2 gap-8 lg:flex lg:flex-wrap">
        {category.products.map(
          (product) => (
            console.log(
              "product.price:",
              product.price,
              "| typeof:",
              typeof product.price,
            ),
            (
              <ProductItem
                key={product.id}
                product={{
                  ...product,
                  totalPrice: computeProductTotalPrice(product),
                }}
              />
            )
          ),
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
