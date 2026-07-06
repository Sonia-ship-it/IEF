"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ShopView from '../../components/ShopView';
import ProductDetailView from '../../components/ProductDetailView';
import { useAppContext } from '../../context/AppContext';
import { Product } from '../../types';

export default function ShopPage() {
  const router = useRouter();
  const { products, addToCart, addToWishlist, wishlist } = useAppContext();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentView, setCurrentView] = useState('shop');

  const handleSetView = (view: string) => {
    if (view === 'shop') {
      setCurrentView('shop');
      setSelectedProduct(null);
    } else if (view === 'product-detail') {
      setCurrentView('product-detail');
    } else {
      // Navigate to other routes
      const routeMap: Record<string, string> = {
        home: '/',
        cart: '/cart',
        checkout: '/checkout',
        auth: '/auth',
        services: '/services',
        about: '/about',
        contact: '/contact',
        wishlist: '/wishlist',
      };
      router.push(routeMap[view] || '/');
    }
  };

  const handleSetSelectedProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  if (currentView === 'product-detail' && selectedProduct) {
    return (
      <ProductDetailView
        product={selectedProduct}
        allProducts={products}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        wishlist={wishlist}
        setSelectedProduct={handleSetSelectedProduct}
        setView={handleSetView}
      />
    );
  }

  return (
    <ShopView
      products={products}
      addToCart={addToCart}
      addToWishlist={addToWishlist}
      wishlist={wishlist}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedSubcategory={selectedSubcategory}
      setSelectedSubcategory={setSelectedSubcategory}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      sortOption={sortOption}
      setSortOption={setSortOption}
      setSelectedProduct={handleSetSelectedProduct}
      setView={handleSetView}
    />
  );
}
