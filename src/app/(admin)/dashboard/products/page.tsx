import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prismaClient } from "@/lib/prisma";
import { PackageIcon, PlusIcon } from "lucide-react";

import { ComputeProductTotalPrice } from "@/helpers/product";
import ProductsTable, {
  ProductWithTotalPriceAndCategory,
} from "./components/products-table";

const ProductsPage = async () => {
  const products = await prismaClient.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const productsWithTotalPrice: ProductWithTotalPriceAndCategory[] =
    products.map((product) => ({
      ...product,
      totalPrice: ComputeProductTotalPrice(product),
    }));

  return (
    <div className="flex w-full flex-col gap-10 p-10">
      <Badge variant="secondary">
        <PackageIcon size={18} />
        Produtos
      </Badge>

      <div className="flex w-full items-center justify-between">
        <p className="text-lg  text-white font-bold">
          Produtos encontrados: {products.length}
        </p>

        <Button variant="secondary" className="flex gap-2">
          <PlusIcon size={18} />
          Adicionar produto
        </Button>
      </div>

      <ProductsTable products={productsWithTotalPrice} />
    </div>
  );
};

export default ProductsPage;
