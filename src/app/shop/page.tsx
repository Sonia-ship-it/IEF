"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ShopView from '../../components/ShopView';
import ProductDetailView from '../../components/ProductDetailView';
import { useAppContext } from '../../context/AppContext';
import { Product } from '../../types';

function ShopPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, addToCart, addToWishlist, wishlist } = useAppContext();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentView, setCurrentView] = useState('shop');

  useEffect(() => {
    const category = searchParams.get('category');
    const productId = searchParams.get('product');

    if (category) {
      setSelectedCategory(decodeURIComponent(category));
      setSelectedSubcategory('All');
    }

    if (productId) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        setSelectedProduct(product);
        setCurrentView('product-detail');
      }
    }
  }, [searchParams, products]);

  const handleSetView = (view: string) => {
    if (view === 'shop') {
      setCurrentView('shop');
      setSelectedProduct(null);
      router.replace('/shop');
    } else if (view === 'product-detail') {
      setCurrentView('product-detail');
    } else {
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
    router.replace(`/shop?product=${product.id}`);
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

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-zinc-400">Loading...</div>}>
      <ShopPageContent />
    </Suspense>
  );
}
