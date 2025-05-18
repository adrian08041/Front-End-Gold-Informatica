import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { ComputeProductTotalPrice } from "@/helpers/product";
import { Separator } from "@radix-ui/react-separator";

const Cart = () => {
  const { products, subTotal, total, totalDiscount } = useContext(CartContext);

  return (
    <div className="flex flex-col gap-8">
      <Badge className="w-fit gap-1 border-2 border-dourado px-3 py-[0.375rem] text-base uppercase">
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      {/*  renderizar produtos */}

      <div className="flex flex-col gap-5">
        {products.length > 0 ? (
          products.map((product) => (
            <CartItem
              key={product.id}
              product={ComputeProductTotalPrice(product as any) as any}
            />
          ))
        ) : (
          <p className="text-center font-semibold">Carrinho vazio.</p>
        )}
      </div>

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
          <p>{total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
