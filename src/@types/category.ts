import { Product } from "./product";

export type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  products: Product[];
};
