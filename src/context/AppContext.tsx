"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Service, Order, User, CartItem } from "../types";
import { INITIAL_PRODUCTS, INITIAL_SERVICES } from "../data";

interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  wishlist: Product[];
  setWishlist: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  
  // Helpers
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  moveToCart: (product: Product) => void;
  login: (email: string, role: "customer" | "admin", name: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  // States
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    setIsClient(true);
    
    const savedProducts = localStorage.getItem("ief_products");
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    
    const savedServices = localStorage.getItem("ief_services");
    if (savedServices) setServices(JSON.parse(savedServices));
    
    const savedCart = localStorage.getItem("ief_cart");
    if (savedCart) setCart(JSON.parse(savedCart));
    
    const savedWishlist = localStorage.getItem("ief_wishlist");
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    
    const savedOrders = localStorage.getItem("ief_orders");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    
    const savedUser = localStorage.getItem("ief_user");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  // Save to LocalStorage on change (only after initial mount)
  useEffect(() => {
    if (isClient) localStorage.setItem("ief_products", JSON.stringify(products));
  }, [products, isClient]);

  useEffect(() => {
    if (isClient) localStorage.setItem("ief_services", JSON.stringify(services));
  }, [services, isClient]);

  useEffect(() => {
    if (isClient) localStorage.setItem("ief_cart", JSON.stringify(cart));
  }, [cart, isClient]);

  useEffect(() => {
    if (isClient) localStorage.setItem("ief_wishlist", JSON.stringify(wishlist));
  }, [wishlist, isClient]);

  useEffect(() => {
    if (isClient) localStorage.setItem("ief_orders", JSON.stringify(orders));
  }, [orders, isClient]);

  useEffect(() => {
    if (isClient) {
      if (currentUser) {
        localStorage.setItem("ief_user", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("ief_user");
      }
    }
  }, [currentUser, isClient]);


  // Cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // Wishlist operations
  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) return prevWishlist;
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };

  const moveToCart = (product: Product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  // Auth operations
  const login = (email: string, role: "customer" | "admin", name: string) => {
    setCurrentUser({
      name,
      email,
      role,
      phone: role === "admin" ? "+250 789 123 456" : "+250 788 345 678",
      address: role === "admin" ? "Ian Electronics, Kigali" : "KN 4 Ave, Kigali City Mall, Ground Floor Plaza"
    });
  };

  const logout = () => setCurrentUser(null);

  const value = {
    products, setProducts,
    services, setServices,
    cart, setCart,
    wishlist, setWishlist,
    orders, setOrders,
    currentUser, setCurrentUser,
    addToCart, removeFromCart, updateCartQuantity, clearCart,
    addToWishlist, removeFromWishlist, moveToCart,
    login, logout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
