import { ComputeProductTotalPrice } from "@/helpers/product";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface OrderProductsItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
}

const OrderProductsItem = ({ orderProduct }: OrderProductsItemProps) => {
  const productWithTotalPrice = ComputeProductTotalPrice(orderProduct.product);
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-backgroundItems">
        <Image
          alt={orderProduct.product.name}
          src={orderProduct.product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
        />
      </div>

      <div className="flex flex-col gap-1 ">
        <div className="flex px-3 py-1 rounded-lg bg-backgroundItems">
          <p className="text-[11px]">
            Vendigo e entregue por: {" "}
            <span className="font-bold text-dourado">Gold Informatica</span>
          </p>
        </div>
        <p>{orderProduct.product.name}</p>

        <div className="flex items-center gap-1">
          <p>R$ {productWithTotalPrice.totalPrice.toFixed(2)}</p>
          {productWithTotalPrice.discountPercentage > 0 && (
            <p className="text-xs line-through opacity-60">
              R$ {Number(productWithTotalPrice.basePrice).toFixed(2)}
            </p>
          )}
        </div>
        <p className=" text-xs opacity-65"> Qntd: {orderProduct.quantity}</p>
      </div>
    </div>
  );
};

export default OrderProductsItem;
