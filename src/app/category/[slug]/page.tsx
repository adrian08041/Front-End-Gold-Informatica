import { prismaClient } from "@/lib/prisma";

const CategoryProducts = async ({ params }: any) => {
  const products = await prismaClient.product.findMany({
    where: {
      category: {
        slug: params.slug,
      },
    },
  });

  return <h1>{params.slug}</h1>;
};

export default CategoryProducts;
