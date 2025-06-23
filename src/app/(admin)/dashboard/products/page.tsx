"use client";
import { Badge } from "@/components/ui/badge";

import { PackageIcon } from "lucide-react";

import { computeProductTotalPrice } from "@/helpers/product";
import ProductsTable, {
  ProductWithTotalPriceAndCategory,
} from "./components/products-table";

import AddProductButton from "./components/add-product-button";
import { ProductQuery } from "@/service/hooks";

export function ProductsPage() {
  // const products = await prismaClient.product.findMany({
  //   include: {
  //     category: {
  //       select: {
  //         name: true,
  //       },
  //     },
  //   },
  // });

  const { data: response, isLoading } = ProductQuery.useProductQueryKey({
    page: 0,
    perPage: 0,
    name: "",
  });

  const productsWithTotalPrice: ProductWithTotalPriceAndCategory[] =
    response?.data.map((product) => ({
      ...product,
      totalPrice: computeProductTotalPrice(product),
    })) || [];

  return (
    <div className="flex w-full flex-col gap-10 p-10">
      <Badge className="w-fit gap-1 border-2 border-dourado px-3 py-[0.375rem] text-base uppercase">
        <PackageIcon size={18} />
        Produtos
      </Badge>

      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-bold text-white">
          Produtos encontrados: {productsWithTotalPrice.length}
        </p>
        <div>
          {" "}
          <AddProductButton />
        </div>
      </div>

      <ProductsTable products={productsWithTotalPrice} />
    </div>
  );
}

export default ProductsPage;
