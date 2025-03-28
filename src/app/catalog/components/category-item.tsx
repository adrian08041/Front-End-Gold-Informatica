import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="H-[150px] flex w-full items-center justify-center rounded-tl-lg rounded-tr-lg bg-dourado">
        {/* IMAGEM */}
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <div className=" bg-backgroundItems text-white rounded-bl-lg rounded-br-lg  py-3">
        {/* TEXTO */}
        <p className="text-center text-sm font-semibold">{category.name}</p>
      </div>
    </div>
  );
};

export default CategoryItem;
