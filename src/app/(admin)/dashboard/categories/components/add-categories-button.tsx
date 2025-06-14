"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImageUploader from "@/components/ui/UploadButton";
import { useCreateCategory } from "@/service/hooks/categoryQuery";
import { zodResolver } from "@hookform/resolvers/zod";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().trim().min(1, {
      message: "O nome do produto é obrigatório.",
    }),
    imageUrls: z
      .any()
      .refine((files) => files?.length > 0, {
        message: "É preciso enviar ao menos uma imagem.",
      })
      .transform((files) => Array.from(files as FileList)),
  })
  .required();
type FormSchema = z.infer<typeof formSchema>;
export default function AddCategoriesButton() {
  const createCategory = useCreateCategory();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const onSubmit = async (data: FormSchema) => {
    setIsLoading(true);
    const files = data.imageUrls as File[];
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error("Erro ao enviar imagens");
      return;
    }

    const uploadedUrls: string[] = await res.json(); // Supondo que o backend retorne um array de URLs

    // pega o name da categoria e transforma em slug
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const payload = {
      name: data.name,
      slug,
      imageUrl: uploadedUrls[0],
    };

    console.log("Payload final para envio:", payload);

    createCategory
      .mutateAsync(payload)
      .then(() => {
        console.log("Categoria criada com sucesso!");
        const { data: response } = createCategory;
        console.log("Resposta do servidor:", response);
        handleOpenChange(false);
        // if(response?.data)
        // handleOpenChange(false);
        // Aqui você pode adicionar lógica para fechar o modal ou limpar o formulário
      })
      .catch((error) => {
        console.error("Erro ao criar categoria:", error);
        // Aqui você pode adicionar lógica para exibir uma mensagem de erro
      })
      .finally(() => {
        setIsLoading(false);
        // Aqui você pode adicionar lógica para resetar o formulário ou fechar o modal
      });
    // Aqui você pode enviar isso para seu banco/API
  };

  const form = useForm<FormSchema>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema) as Resolver<FormSchema, any>,
    defaultValues: {
      name: "",
      imageUrls: [] as File[],
    },
  });

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="flex gap-2">
            <PlusIcon size={18} />
            Adicionar categoria
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Adicionar categoria</DialogTitle>
                <DialogDescription>
                  Insira as informações abaixo
                </DialogDescription>
              </DialogHeader>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da categoria</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome do produto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrls"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagem da categoria</FormLabel>
                    <FormControl>
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      ;
    </>
  );
}
