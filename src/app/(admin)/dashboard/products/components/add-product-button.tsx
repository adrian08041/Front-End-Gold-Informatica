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

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { NumericFormat } from "react-number-format";
import { UploadButton } from "@/utils/uploadthing";

const formSchema = z
  .object({
    name: z.string().trim().min(1, {
      message: "O nome do produto é obrigatório.",
    }),
    slug: z.string().trim().min(1, {
      message: "O slug do produto é obrigatório.",
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

const onSubmit = (data: FormSchema) => {
  console.log(data);
};

type FormSchema = z.infer<typeof formSchema>;

const AddProductButton = () => {
  const form = useForm<FormSchema>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema) as Resolver<FormSchema, any>,
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      categoryId: "",
      discountPercentage: 0,
      basePrice: 0,
      imageUrls: [] as File[],
    },
  });

  return (
    <Dialog>
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

            {/* Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug do produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o slug" {...field} />
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
                    <Input
                      placeholder="Digite a categoria do produto"
                      {...field}
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
                    <Input
                      type="file"
                      multiple
                      name={field.name} // conecta o nome
                      ref={field.ref} // conecta o ref para validação
                      onChange={(e) => field.onChange(e.target.files)} // envia FileList
                    
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
            {/* <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Digite a quantidade em estoque"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Salvar </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductButton;
