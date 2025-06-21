import { CategoryRequest } from "@/service/requests";
import { useMutation } from "@tanstack/react-query";

export function useDeleteCategory() {
  const mutation = useMutation({
    mutationFn: (id: string) => CategoryRequest.deleteCategory(id),
  });
  return mutation;
}
