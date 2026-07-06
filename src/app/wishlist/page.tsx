"use client";

import { useRouter } from 'next/navigation';
import WishlistView from '../../components/WishlistView';
import { useAppContext } from '../../context/AppContext';
import { Product } from '../../types';

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist, removeFromWishlist, moveToCart } = useAppContext();

  const handleSetSelectedProduct = (product: Product) => {
    // For now, navigate to shop — product detail is handled within the shop page
    router.push('/shop');
  };

  const handleSetView = (view: string) => {
    const routeMap: Record<string, string> = {
      home: '/',
      shop: '/shop',
      cart: '/cart',
    };
    router.push(routeMap[view] || '/');
  };

  return (
    <WishlistView
      wishlist={wishlist}
      removeFromWishlist={removeFromWishlist}
      moveToCart={moveToCart}
      setSelectedProduct={handleSetSelectedProduct}
      setView={handleSetView}
    />
  );
}
