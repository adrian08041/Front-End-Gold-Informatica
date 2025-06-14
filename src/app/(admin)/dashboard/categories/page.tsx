import { Badge } from "@/components/ui/badge";

import { prismaClient } from "@/lib/prisma";
import { ListOrderedIcon } from "lucide-react";
import CategoriesTable from "./components/categories-table";
import AddCategoriesButton from "./components/add-categories-button";

const CategoriesPage = async () => {
  const categories = await prismaClient.category.findMany({
    include: {
      products: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <div className="flex w-full flex-col gap-10 p-10">
      <Badge className="w-fit gap-1 border-2 border-dourado px-3 py-[0.375rem] text-base uppercase">
        <ListOrderedIcon size={18} />
        Categorias
      </Badge>

      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-bold text-white">
          Categorias encontradas: {categories.length}
        </p>

        {/* <Button variant="secondary" className="flex gap-2">
          <PlusIcon size={18} />
          Adicionar categoria
        </Button> */}
        <div>
          <AddCategoriesButton />
        </div>
      </div>
      <CategoriesTable categories={categories} />
    </div>
  );
};

export default CategoriesPage;
