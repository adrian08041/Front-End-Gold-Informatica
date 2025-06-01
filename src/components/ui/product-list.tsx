import ProductItem from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex w-full gap-4 overflow-x-auto p-5 [&::-webkit-scrollbar]:hidden">
      {products.map((products) => (
        <ProductItem
          key={products.id}
          product={{
            ...products,
            totalPrice: computeProductTotalPrice(products),
          }}
        />
      ))}
    </div>
  );
};

export default ProductList;
