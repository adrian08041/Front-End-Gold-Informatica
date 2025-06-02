export const dynamic = "force-dynamic";

import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { PackageSearchIcon, ShapesIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "../../../components/ui/order-item";

async function OrderPage() {
  const user = await getServerSession(authOptions);

  if (!user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-center font-semibold text-white">
          Você precisa estar logado para acessar essa página.
        </p>
      </div>
    );
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="p-5">
      <div className="flex flex-col gap-5">
        <Badge className="w-fit gap-2 border-2 border-dourado px-3 py-[0.375rem] text-base uppercase">
          <PackageSearchIcon size={16} />
          Meus Pedidos
        </Badge>

        <div className="mt-5 flex flex-col gap-5">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
