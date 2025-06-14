"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

import Select from "react-select";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { NumericFormat } from "react-number-format";

import ImageUploader from "@/components/ui/UploadButton";
import { useCreateProduct } from "@/service/hooks/productQuery";
import { useState } from "react";
import { useCategoryQuery } from "@/service/hooks/categoryQuery";

const formSchema = z
  .object({
    name: z.string().trim().min(1, {
      message: "O nome do produto é obrigatório.",
    }),
    description: z.string().trim().min(1, {
      message: "A descrição do produto é obrigatória.",
    }),
    categoryId: z.string().trim().min(1, {
      message: "A categoria do produto é obrigatória.",
    }),
    discountPercentage: z.coerce
      .number()
      .min(0, { message: "O desconto não pode ser negativo." }),
    basePrice: z.coerce
      .number()
      .min(0.01, { message: "O preço base do produto é obrigatório." }),
    imageUrls: z
      .any()
      .refine((files) => files?.length > 0, {
        message: "É preciso enviar ao menos uma imagem.",
      })
      .transform((files) => Array.from(files as FileList)),
  })
  .required();

type FormSchema = z.infer<typeof formSchema>;

export default function AddProductButton() {
  const createProduct = useCreateProduct();
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

    // pega o name do produto e transforma em slug
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const payload = {
      ...data,
      slug: slug, // usa o slug gerado
      imageUrls: uploadedUrls, // substitui os arquivos por URLs
    };

    console.log("Payload final para envio:", payload);

    createProduct
      .mutateAsync(payload)
      .then(() => {
        console.log("Produto criado com sucesso!");
        const { data: response } = createProduct;
        console.log("Resposta do servidor:", response);
        handleOpenChange(false);
        // if(response?.data)
        // handleOpenChange(false);
        // Aqui você pode adicionar lógica para fechar o modal ou limpar o formulário
      })
      .catch((error) => {
        console.error("Erro ao criar produto:", error);
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
      description: "",
      categoryId: "",
      discountPercentage: 0,
      basePrice: 0,
      imageUrls: [] as File[],
    },
  });

  const { data: categories } = useCategoryQuery({});

  const options =
    categories?.data?.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? [];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex gap-2">
          <PlusIcon size={18} />
          Adicionar produto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Adicionar produto</DialogTitle>
              <DialogDescription>
                Insira as informações abaixo
              </DialogDescription>
            </DialogHeader>

            {/* Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Descrição */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do produto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a descrição do produto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Categoria */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria do produto</FormLabel>
                  <FormControl>
                    <Select<{ value: string; label: string }>
                      options={options}
                      noOptionsMessage={() => "Nenhuma categoria encontrada"}
                      value={
                        options.find(
                          (option) => option.value === field.value,
                        ) || null
                      }
                      onChange={(selected) =>
                        field.onChange(selected ? selected.value : "")
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Imagens */}

            <FormField
              control={form.control}
              name="imageUrls"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagens do produto</FormLabel>
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

            {/* Preço Base */}
            <FormField
              control={form.control}
              name="basePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço base do produto</FormLabel>
                  <FormControl>
                    <NumericFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      fixedDecimalScale
                      decimalScale={2}
                      prefix="R$ "
                      allowNegative={false}
                      customInput={Input}
                      value={field.value}
                      onValueChange={(values) =>
                        field.onChange(values.floatValue ?? 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Desconto */}
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desconto do produto</FormLabel>
                  <FormControl>
                    <NumericFormat
                      suffix="%"
                      allowNegative={false}
                      customInput={Input}
                      value={field.value}
                      onValueChange={(values) =>
                        field.onChange(values.floatValue ?? 0)
                      }
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
  );
}
