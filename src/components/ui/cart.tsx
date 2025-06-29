"use client";
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProduct, computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";

import { createOrder } from "@/actions/order";
import { useRouter } from "next/navigation";
import { getUserIdFromToken } from "@/utils/token.cliente";

const Cart = () => {
  const { products, subTotal, total, totalDiscount } = useContext(CartContext);
  const router = useRouter();
  const handleFinishCheckout = async () => {
    const userId = getUserIdFromToken();

    if (!userId) {
      router.push("/login");
      return;
    }

    const order = await createOrder(products, userId);

    const checkout = await createCheckout(products, order.id);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge className="w-fit gap-1 border-2 border-dourado px-3 py-[0.375rem] text-base uppercase">
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      {/*  renderizar produtos */}

      <div className="flex h-full flex-col gap-5 overflow-hidden">
        <div className="flex h-full flex-col">
          <ScrollArea className="h-full">
            <div className="flex h-full flex-col gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <CartItem
                    key={product.id}
                    product={computeProduct(product as any) as any}
                  />
                ))
              ) : (
                <p className="text-center font-semibold">Carrinho vazio.</p>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
      {products.length > 0 && (
        <div className="flex flex-col gap-3">
          <Separator className="h-[2px] w-full bg-accent opacity-50" />

          <div className="flex items-center justify-between text-xs">
            <p>SubTotal</p>
            <p>R$ {subTotal.toFixed(2)} </p>
          </div>
          <Separator className="h-[2px] w-full bg-accent opacity-50" />
          <div className="flex items-center justify-between text-xs">
            <p>Entrega</p>
            <p>GRÀTIS</p>
          </div>

          <Separator className="h-[2px] w-full bg-accent opacity-50" />
          <div className="flex items-center justify-between text-xs">
            <p>Descontos</p>
            <p>R$ {totalDiscount.toFixed(2)}</p>
          </div>

          <Separator className="h-[2px] w-full bg-accent opacity-50" />
          <div className="flex items-center justify-between text-sm font-bold">
            <p>Total</p>
            <p>R$ {total.toFixed(2)}</p>
          </div>
          <Button
            variant={"secondary"}
            className="mt-5 font-bold uppercase"
            onClick={handleFinishCheckout}
          >
            {" "}
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
