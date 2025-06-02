import { Badge } from "@/components/ui/badge";
import OrderItem from "@/components/ui/order-item";
import { prismaClient } from "@/lib/prisma";

import { PackageSearchIcon } from "lucide-react";

const OrdersPage = async () => {
  const orders = await prismaClient.order.findMany({
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="flex w-full flex-col gap-10 p-10">
      <Badge className="w-fit gap-1 border-2 border-dourado px-3 py-[0.375rem] text-base uppercase">
        <PackageSearchIcon size={18} />
        Categorias
      </Badge>

      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-bold text-white">
          Pedidos encontrados: {orders.length}
        </p>
      </div>
      <div className="h-full overflow-auto">
        <div className="flex flex-col gap-5">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
