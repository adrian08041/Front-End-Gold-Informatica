import { prismaClient } from "@/lib/prisma";
import CategoryItem from "./category-item";

const Categories = () => {
  return (
    <div className="grid grid-cols-2 gap-x-16 gap-y-2 lg:grid-cols-6"></div>
  );
};

export default Categories;
