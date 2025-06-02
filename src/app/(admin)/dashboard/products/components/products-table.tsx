import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductTotalPrice } from "@/helpers/product";

export type ProductWithTotalPriceAndCategory = ProductTotalPrice & {
  category: {
    name: string;
  };
};

interface ProductsTableProps {
  products: ProductWithTotalPriceAndCategory[];
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-white">Nome</TableHead>
          <TableHead className="text-white">Categoria</TableHead>
          <TableHead className="text-white">Preço total</TableHead>
          <TableHead className="text-white">Preço base</TableHead>
          <TableHead className="text-white">Vendidos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="text-white">{product.name}</TableCell>

            <TableCell className="text-white">
              {(product as any).category.name}
            </TableCell>

            <TableCell className="text-white">
              R$ {Number(product.totalPrice).toFixed(2)}
            </TableCell>

            <TableCell className="text-white">
              R$ {Number(product.basePrice).toFixed(2)}
            </TableCell>

            <TableCell className="text-white">0</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
