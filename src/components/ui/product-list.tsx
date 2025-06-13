import ProductItem from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { ProductResponse } from "@/service/types";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductListProps {
  products: ProductResponse[] | undefined;
  isLoading?: boolean;
}

const ProductList = ({ products, isLoading }: ProductListProps) => {
  if (isLoading) {
    return (
      <div className="flex w-full snap-x snap-mandatory flex-nowrap gap-4 overflow-x-auto scroll-smooth px-5 [&::-webkit-scrollbar]:hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex w-[156px] flex-shrink-0 flex-col gap-4">
            {/* Skeleton da imagem */}
            <Skeleton className="h-[170px] w-[156px] rounded-lg" />

            {/* Skeleton do nome */}
            <Skeleton className="h-4 w-full rounded-sm" />

            {/* Skeleton dos preços */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16 rounded-sm" />
              <Skeleton className="h-3 w-12 rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full snap-x snap-mandatory flex-nowrap gap-4 overflow-x-auto scroll-smooth px-5 [&::-webkit-scrollbar]:hidden">
      {products?.map((product) => (
        <ProductItem
          key={product.id}
          product={{
            ...product,
            totalPrice: computeProductTotalPrice(product),
          }}
        />
      ))}
    </div>
  );
};

export default ProductList;
