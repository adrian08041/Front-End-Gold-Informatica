"use client";

import { Children, createContext } from "react";

interface CartProduct extends ICartContext {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: Number;
  cartBasePrice: Number;
  cartTotalDiscount: Number;
}

const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartContext.Provider
      value={{
        products: [],
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
