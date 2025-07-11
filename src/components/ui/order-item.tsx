import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";

import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { computeProductTotalPrice } from "@/helpers/product";
import { getOrderStatus } from "../../app/(shop)/orders/helpers/status";
import OrderProductsItem from "./order-product-item";

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
  //calculo subtotal
  const subTotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    }, 0);
  }, [order.orderProducts]);

  // calculo total
  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, product) => {
      const productTotalPrice = computeProductTotalPrice({
        ...product.product,
        basePrice: Number(product.product.basePrice),
      });
      return acc + productTotalPrice * product.quantity;
    }, 0);
  }, [order.orderProducts]);

  // calculo desconto
  const totalDiscount = subTotal - total;

  return (
    <Card className="border-none bg-preto p-4 text-white">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p className="font-bold uppercase">
                Pedido com {order.orderProducts.length} produto(s)
              </p>
              <span className="text-sm opacity-60">
                {" "}
                Feito em {format(order.createdAt, "d/MM/y 'às' HH:mm")}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p> status</p>
                  <p className="text-dourado">{getOrderStatus(order.status)}</p>
                </div>
                <div>
                  <p className="font-bold">Data</p>
                  <p className="opacity-60">
                    {format(order.createdAt, "d/MM/y")}
                  </p>
                </div>
                <div>
                  <p className="font-bold">Pagamento</p>
                  <p className="opacity-60">Cartão</p>
                </div>
              </div>

              {order.orderProducts.map((orderProduct) => (
                <OrderProductsItem
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                />
              ))}

              <div className="flex flex-col gap-1 text-xs opacity-70">
                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>SubTotal</p>
                  <p>R$ {subTotal.toFixed(2)}</p>
                </div>
                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Entregal</p>
                  <p>Gràtis</p>
                </div>
                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Descontos</p>
                  <p>R$ {totalDiscount.toFixed(2)}</p>
                </div>
                <Separator />

                <div className="flex w-full justify-between py-3 text-sm font-bold">
                  <p>Total</p>
                  <p>R$ {total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
export default OrderItem;
