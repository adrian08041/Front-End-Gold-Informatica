import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import OrderProductsItem from "./order-product-item";
import { Separator } from "@/components/ui/separator";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: { product: true };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card className="border-none bg-preto p-4 text-white">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              Pedido com {order.orderProducts.length} produto(s)
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p> status</p>
                  <p className="text-dourado">{order.status}</p>
                </div>
                <div>
                  <p className="font-bold">Data</p>
                  <p className="opacity-60">
                    {format(order.createdAt, "d/MM/y")}
                  </p>
                </div>
                <div>
                  <p className="font-bold">Pagamento</p>
                  <p className="opacity-60"> Cartão </p>
                </div>
              </div>

              {order.orderProducts.map((orderProduct) => (
                <OrderProductsItem
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                />
              ))}

              <div className="flex flex-col gap-1 opacity-70">
                <Separator/>
              </div>
                
                



            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
export default OrderItem;
