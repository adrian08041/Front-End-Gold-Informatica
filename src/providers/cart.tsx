"use client";

import { ProductWithTotalPrice } from "@/helpers/product";

import { createContext, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: Number;
  cartBasePrice: Number;
  cartTotalDiscount: Number;
  addProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: CartProduct) => {
    // se o produto estiver no carrinho somente aumentar a quantidade

    const productIsAlReadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (productIsAlReadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }
          return cartProduct;
        }),
      );
      return;
    }

    setProducts((prev) => [...prev, product]);
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }
          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
    );
  };
  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        decreaseProductQuantity,
        products,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
