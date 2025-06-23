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
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type ProductWithTotalPriceAndCategory = ProductTotalPrice & {
  category: {
    name: string;
  };
};

interface ProductsTableProps {
  products: ProductWithTotalPriceAndCategory[];
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  const queryClient = useQueryClient();
  const deleteProduct = useDeleteProduct();
  const router = useRouter();

  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const handleDeleteProduct = useCallback(
    async (id: string) => {
      try {
        await deleteProduct.mutateAsync(id);
        toast.success("Produto excluído com sucesso!");
        setOpenDialogId(null);
        queryClient.invalidateQueries({
          queryKey: [ReactQueryKeysEnum.PRODUCTS_FIND_ALL],
        });
        router.refresh();
      } catch (error) {
        toast.error("Erro ao excluir produto");
      }
    },
    [deleteProduct, queryClient, router],
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
              {product.category.name}
            </TableCell>

            <TableCell className="text-white">
              R$ {Number(product.totalPrice).toFixed(2)}
            </TableCell>

            <TableCell className="text-white">
              R$ {Number(product.basePrice).toFixed(2)}
            </TableCell>

            <TableCell className="text-white">0</TableCell>

            <TableCell className="text-white">
              <Dialog
                open={openDialogId === product.id}
                onOpenChange={(open) =>
                  setOpenDialogId(open ? product.id : null)
                }
              >
                <DialogTrigger asChild>
                  <button className="text-red-600 hover:text-red-400">
                    <Trash2 />
                  </button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar exclusão</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      Tem certeza que deseja excluir o produto{" "}
                      <strong>{product.name}</strong>? Essa ação não poderá ser
                      desfeita.
                    </p>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setOpenDialogId(null)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteProduct(product.id)}
                      disabled={deleteProduct.isPending}
                    >
                      {deleteProduct.isPending ? "Excluindo..." : "Confirmar"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
