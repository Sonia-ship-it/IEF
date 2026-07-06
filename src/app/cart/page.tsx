"use client";

import { useRouter } from 'next/navigation';
import CartView from '../../components/CartView';
import { useAppContext } from '../../context/AppContext';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateCartQuantity, removeFromCart } = useAppContext();

  const handleSetView = (view: string) => {
    const routeMap: Record<string, string> = {
      home: '/',
      shop: '/shop',
      checkout: '/checkout',
    };
    router.push(routeMap[view] || '/');
  };

  return (
    <CartView
      cart={cart}
      updateCartQty={updateCartQuantity}
      removeFromCart={removeFromCart}
      setView={handleSetView}
    />
  );
}
