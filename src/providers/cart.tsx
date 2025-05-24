"use client";

import { ProductWithTotalPrice } from "@/helpers/product";

import { createContext, useEffect, useMemo, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: Number;
  cartBasePrice: Number;
  cartTotalDiscount: Number;
  total: Number;
  subTotal: Number;
  totalDiscount: Number;

  addProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  total: 0,
  subTotal: 0,
  totalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>(
    JSON.parse(localStorage.getItem("@gold-informatica/cart-products") || "[]"),
  );

  useEffect(() => {
    localStorage.setItem(
      "@gold-informatica/cart-products",
      JSON.stringify(products),
    );
    [products];
  });

  // preco total  sem desconto

  const subTotal = useMemo(() => {
    return products.reduce((acc, product) => {
      // return acc + Number(product.basePrice);
      return acc + Number(product.basePrice) * product.quantity;
    }, 0);
  }, [products]);

  // preco total com desconto
  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      // return acc + Number(product.totalPrice);
      return acc + Number(product.totalPrice) * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscount = total - subTotal;

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

  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      }),
    );
  };

  const removeProductFromCart = (productId: string) => {
    setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId),
    );
  };
  return (
    <CartContext.Provider
      value={{
        removeProductFromCart,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        total,
        subTotal,
        totalDiscount,

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
