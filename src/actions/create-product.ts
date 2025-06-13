"use server";

import { db } from "@/lib/prisma";
export const createProduct = async ({
    
  name,
  discountPercentage,
  basePrice,
}: {
  name: string;
  discountPercentage: number;
  basePrice: number;
  stock: number;
}) => {
  await db.product.create({
    data: {
      name,
      basePrice,
      discountPercentage,
    },
  });
};


