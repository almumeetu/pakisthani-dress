"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types/ProductType";

interface StoreContextType {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <StoreContext.Provider value={{ cartItems, setCartItems, products, setProducts }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
