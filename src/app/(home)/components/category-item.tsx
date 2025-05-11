

import { CATEGORY_ICON } from "@/app/constants/category-icon";
import { Badge } from "@/components/ui/badge";
import { Category } from "@prisma/client";



interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
    
  return (
    <Badge  className="py-3  gap-1 flex justify-center items-center ">
      {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}

        <span className="text-xs font-bold">{category.name}</span>
    </Badge>
  )

  
};

export default CategoryItem;
