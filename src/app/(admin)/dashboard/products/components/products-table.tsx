"use client";
import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductTotalPrice } from "@/helpers/product";
import { useDeleteProduct } from "@/service/hooks/productQuery";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import {  useCallback } from "react";

export type ProductWithTotalPriceAndCategory = ProductTotalPrice & {
  category: {
    name: string;
  };
};

interface ProductsTableProps {
  products: ProductWithTotalPriceAndCategory[];
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  const queryCliente = useQueryClient();
  const deleteProduct = useDeleteProduct();

  const handleDeleteProduct = useCallback(
    (id: string) => {
      console.log("Deleting product with ID:", id);
      deleteProduct.mutateAsync(id).then(() => {
        console.log("Product deleted successfully");
        queryCliente.invalidateQueries({
          queryKey: [ReactQueryKeysEnum.PRODUCTS_FIND_ALL],
        });
      });
    },
    [deleteProduct, queryCliente],
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-white">Nome</TableHead>
          <TableHead className="text-white">Categoria</TableHead>
          <TableHead className="text-white">Preço total</TableHead>
          <TableHead className="text-white">Preço base</TableHead>
          <TableHead className="text-white">Vendidos</TableHead>
          <TableHead className="text-white">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="text-white">{product.name}</TableCell>

            <TableCell className="text-white">
              {(product as any).category.name}
            </TableCell>

            <TableCell className="text-white">
              R$ {Number(product.totalPrice).toFixed(2)}
            </TableCell>

            <TableCell className="text-white">
              R$ {Number(product.basePrice).toFixed(2)}
            </TableCell>

            <TableCell className="text-white">0</TableCell>

            <TableCell className="text-white">
              <button
                className="text-red-600 hover:text-red-400"
                onClick={() => handleDeleteProduct(product.id)}
              >
                <Trash2 />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
