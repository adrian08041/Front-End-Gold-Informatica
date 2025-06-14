export type CategoriesResponse = {
  id: string;
  name: string;
  slug: string;
  enabled: boolean;
  imageUrl: string;
};

export type CategoryFindAllRequest = {
  page?: number;
  perPage?: number;
  name?: string;
};

export type CreateCategoryRequest = {
  name: string;
  slug: string;

  imageUrls?: string[];
};
