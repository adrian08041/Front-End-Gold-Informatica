import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ShapesIcon } from "lucide-react";
import CategoryItem from "./components/category-item";

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany({});

  return (
    <div className=" flex flex-col gap-8 p-5">
      <Badge className=" border-dourado w-fit gap-1 border-2 px-3 py-[0.375rem] text-base uppercase">
        <ShapesIcon size={16} />
        Catàlago
      </Badge>
      <div className="grid grid-cols-2 gap-6">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
