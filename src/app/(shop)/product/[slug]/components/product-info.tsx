"use client";

import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discount-badge";
import { ProductTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";

import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface ProductInfoProps {
  product: ProductTotalPrice;
}

const ProductInfo = ({ product: product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const { addProductToCart } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCartClick = () => {
    addProductToCart({ ...product, quantity });
  };

  return (
    <div className="flex flex-col px-5 text-white lg:w-[40%] lg:rounded-lg lg:bg-backgroundItems lg:p-10">
      <h2 className="text-lg lg:text-2xl">{product.name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="gap-2 text-xl font-bold lg:text-3xl">
          R$ {Number(product.totalPrice)?.toFixed(2)}
        </h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge className="" variant={"secondary"}>
            {product.discountPercentage}
          </DiscountBadge>
        )}
      </div>
      {product.discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75 lg:text-base">
          R$ {Number(product.basePrice).toFixed(2)}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          onClick={handleDecreaseQuantityClick}
          value={quantity}
          size="icon"
          variant="ghost"
        >
          <ArrowLeftIcon size={16} />
        </Button>
        <span>{quantity}</span>
        <Button
          onClick={handleIncreaseQuantityClick}
          size="icon"
          variant="ghost"
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-sm opacity-60">{product.description}</p>
      </div>
      <Button
        variant="secondary"
        className="mt-8 font-bold uppercase"
        onClick={handleAddToCartClick}
      >
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex items-center justify-between rounded bg-backgroundItems px-5 py-2 lg:bg-[#2A2A2A]">
        <div className="flex items-center gap-2">
          <TruckIcon />
          <div className="flex flex-col">
            <p>
              Entrega via <span className="font-bold">GOLDPacket</span>
            </p>
            <p className="text-xs text-dourado">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>
        <p className="font-bold">Frete Gràtis</p>
      </div>
    </div>
  );
};

export default ProductInfo;
