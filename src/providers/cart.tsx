"use client";

import { ProductTotalPrice } from "@/helpers/product";
import { createContext, useEffect, useMemo, useState } from "react";

export interface CartProduct extends ProductTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  total: number;
  subTotal: number;
  totalDiscount: number;

  addProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  total: 0,
  subTotal: 0,
  totalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    const storagedProducts = localStorage.getItem(
      "@gold-informatica/cart-products",
    );
    if (storagedProducts) {
      setProducts(JSON.parse(storagedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "@gold-informatica/cart-products",
      JSON.stringify(products),
    );
  }, [products]);

  const subTotal = useMemo(() => {
    return products.reduce(
      (acc, product) => acc + Number(product.basePrice) * product.quantity,
      0,
    );
  }, [products]);

  const total = useMemo(() => {
    return products.reduce(
      (acc, product) => acc + Number(product.totalPrice) * product.quantity,
      0,
    );
  }, [products]);

  const totalDiscount = subTotal - total;

  const addProductToCart = (product: CartProduct) => {
    const productExists = products.some((item) => item.id === product.id);

    if (productExists) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item,
        ),
      );
    } else {
      setProducts((prev) => [...prev, product]);
    }
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const removeProductFromCart = (productId: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        products,
        total,
        subTotal,
        totalDiscount,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
