"use server";

import { db } from "@/lib/prisma";
import slugify from "slugify";

export const createProduct = async ({
  name,
  discountPercentage,
  basePrice,

  categoryId,
  description,
}: {
  name: string;
  discountPercentage: number;
  basePrice: number;
  stock: number;
  categoryId: string;
  description: string;
}) => {
  await db.product.create({
    data: {
      name,
      slug: slugify(name, { lower: true }),
      basePrice,
      discountPercentage,

      description,
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  });
};
