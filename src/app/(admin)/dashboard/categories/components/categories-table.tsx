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

import { Prisma } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useDeleteCategory } from "./categoryQuery";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
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

interface CategoriesTableProps {
  categories: Prisma.CategoryGetPayload<{
    include: {
      products: {
        select: {
          id: true;
        };
      };
    };
  }>[];
}

const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  const queryClient = useQueryClient();
  const deleteCategory = useDeleteCategory();
  const router = useRouter();

  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const handleDeleteCategory = useCallback(
    async (id: string) => {
      try {
        await deleteCategory.mutateAsync(id);
        toast.success("Categoria excluída com sucesso!");
        setOpenDialogId(null);
        queryClient.invalidateQueries({
          queryKey: [ReactQueryKeysEnum.CATEGORIES_FIND_ALL],
        });
        router.refresh();
      } catch (error) {
        toast.error("Erro ao excluir categoria");
      }
    },
    [deleteCategory, queryClient, router],
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-white">Nome</TableHead>
          <TableHead className="text-white">Quantidade</TableHead>
          <TableHead className="text-white">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="text-white">{category.name}</TableCell>

            <TableCell className="text-white">
              {category.products.length}
            </TableCell>

            <TableCell className="text-white">
              <Dialog
                open={openDialogId === category.id}
                onOpenChange={(open) =>
                  setOpenDialogId(open ? category.id : null)
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
                      Tem certeza que deseja excluir a categoria{" "}
                      <strong>{category.name}</strong>? Essa ação não poderá ser
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
                      onClick={() => handleDeleteCategory(category.id)}
                      disabled={deleteCategory.isPending}
                    >
                      {deleteCategory.isPending ? "Excluindo..." : "Confirmar"}
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

export default CategoriesTable;
