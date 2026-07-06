"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Tv,
  Shirt,
  Gem,
  Footprints,
  Star,
  ShoppingCart,
  Heart,
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';
import { TESTIMONIALS, SHOPPING_STEPS } from '../data';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const { products, addToCart, addToWishlist, wishlist } = useAppContext();

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  const categoriesList = [
    { name: 'Electronics', count: '5+ items', icon: Tv },
    { name: 'Clothing & Fashion', count: '7+ items', icon: Shirt },
    { name: 'Jewelry', count: '1+ items', icon: Gem },
    { name: 'Footwear', count: '2+ items', icon: Footprints }
  ];

  const handleCategoryChange = (categoryName: string) => {
    // In a real app we might pass this via context or URL params
    // For now we just route to shop
    router.push(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  const isInWishlist = (product: Product) =>
    wishlist.some(item => item.id === product.id);

  return (
    <div className="font-sans text-zinc-900 bg-white" id="home-view">

      {/* ================================================================
          1. HERO SECTION
          ================================================================ */}
      <section id="hero-section" className="relative border-b border-zinc-200 py-24 sm:py-32 overflow-hidden bg-pattern-maze">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            <div className="max-w-2xl text-left animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-700 rounded-md mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-zinc-900 animate-pulse" />
                Premium Boutique &amp; Setup Solutions
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-zinc-950 leading-[1.1]">
                Your Premier Online Hub for Fashion &amp; Tech.
              </h1>
              
              <p className="mt-6 text-lg sm:text-xl text-zinc-500 leading-relaxed font-medium max-w-xl">
                Browse our curated boutique collections of luxury clothing, high-performance shoes, and fine jewelry alongside top-tier CCTV security configurations.
              </p>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/shop" className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2">
                  Explore Shop Catalogue
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/services" className="btn-outline text-base px-8 py-4 inline-flex items-center gap-2">
                  Technical Services
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-6 text-sm font-semibold text-zinc-500">
                {['Direct checkout', '100% Secure Payments', 'Nationwide shipping'].map((trust) => (
                  <div key={trust} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-zinc-900 shrink-0" />
                    {trust}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg lg:max-w-none animate-fade-left flex justify-center lg:justify-end">
              <div className="relative w-full aspect-square max-h-[500px]">
                <Image 
                  src="/assets/ecommerce.png" 
                  alt="E-Commerce Platform Illustration" 
                  fill
                  className="object-contain drop-shadow-xl hover:scale-[1.02] transition-transform duration-500"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          2. CATEGORIES
          ================================================================ */}
      <section id="categories-section" className="relative border-b border-zinc-200 py-24 bg-pattern-dots">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">Shop by Category</h2>
              <p className="mt-2 text-base text-zinc-500 font-medium">Discover items tailor-made to match your lifestyle.</p>
            </div>
            <Link
              href="/shop"
              className="group flex items-center gap-2 text-sm font-bold text-zinc-900 hover:text-zinc-600 transition-colors"
            >
              View all products <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesList.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryChange(cat.name)}
                  className="group relative overflow-hidden rounded-md border border-zinc-200 bg-white p-8 text-left card-lift flex flex-col items-start"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-md bg-zinc-100 text-zinc-900 mb-6 transition-transform group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white duration-300">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-bold text-zinc-950 text-lg mb-1">{cat.name}</h3>
                  <p className="text-sm font-semibold text-zinc-400 group-hover:text-zinc-600 transition-colors">{cat.count}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          3. FEATURED PRODUCTS
          ================================================================ */}
      <section id="featured-products-section" className="bg-white py-24 border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">Curated New Arrivals</h2>
              <p className="mt-2 text-zinc-500 text-base font-medium">Fresh selections prioritizing elegant cuts and digital reliability.</p>
            </div>
            <Link
              href="/shop"
              className="group hidden sm:flex shrink-0 items-center gap-2 text-sm font-bold text-zinc-900 hover:text-zinc-600 transition-colors"
            >
              See all <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isInWishlist={isInWishlist(product)}
                onProductClick={() => router.push(`/shop/${product.id}`)}
                onAddToCart={() => addToCart(product)}
                onAddToWishlist={() => addToWishlist(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          4. HOW TO SHOP
          ================================================================ */}
      <section id="steps-section" className="relative border-b border-zinc-200 py-24 bg-pattern-grid">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">How to Shop with Us</h2>
            <p className="mt-3 text-base text-zinc-500 font-medium">Simple and secure steps to complete your purchase.</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {SHOPPING_STEPS.map((step) => (
              <div
                key={step.step}
                className="group relative bg-white border border-zinc-200 rounded-md p-8 card-lift hover:border-zinc-300 transition-colors"
              >
                <div className="absolute top-4 right-6 text-6xl font-black text-zinc-50 group-hover:text-zinc-100 transition-colors select-none">
                  {step.step}
                </div>
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-md bg-zinc-900 text-white text-lg font-black mb-6 shadow-sm">
                  {parseInt(step.step)}
                </div>
                <h3 className="text-lg font-bold text-zinc-950 mb-3">{step.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed font-medium">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          5. BEST SELLERS
          ================================================================ */}
      <section id="bestsellers-section" className="bg-white py-24 border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">Best Sellers</h2>
              <p className="mt-2 text-zinc-500 text-base font-medium">Our most popular selections across fashion and installations.</p>
            </div>
            <Link
              href="/shop"
              className="group flex shrink-0 items-center gap-2 text-sm font-bold text-zinc-900 hover:text-zinc-600 transition-colors"
            >
              See all <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isInWishlist={isInWishlist(product)}
                onProductClick={() => router.push(`/shop/${product.id}`)}
                onAddToCart={() => addToCart(product)}
                onAddToWishlist={() => addToWishlist(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          6. TESTIMONIALS
          ================================================================ */}
      <section id="testimonials-section" className="relative py-24 bg-zinc-50">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 font-sans">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testi) => (
              <div
                key={testi.id}
                className="bg-white border border-zinc-200 rounded-md p-8 card-lift flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex gap-1 text-zinc-900 mb-6">
                    {[...Array(testi.rating)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-8 font-medium">"{testi.comment}"</p>
                </div>
                <div className="flex items-center gap-4 pt-5 border-t border-zinc-100">
                  <div className="relative h-12 w-12 rounded-md overflow-hidden border border-zinc-200">
                    <Image
                      src={testi.avatar}
                      alt={testi.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-950">{testi.name}</h4>
                    <p className="text-xs text-zinc-500 font-semibold mt-0.5">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

/* ================================================================
   REUSABLE PRODUCT CARD COMPONENT
   ================================================================ */
interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  onProductClick: () => void;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
}

export function ProductCard({ product, isInWishlist, onProductClick, onAddToCart, onAddToWishlist }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-md border border-zinc-200 bg-white card-lift shadow-sm hover:shadow-md transition-all">
      <div
        className="relative aspect-[4/5] overflow-hidden cursor-pointer bg-zinc-50 border-b border-zinc-200"
        onClick={onProductClick}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />

        {product.stock <= 8 && (
          <span className="absolute top-3 left-3 rounded-md bg-zinc-900 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm z-10">
            Low Stock
          </span>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); onAddToWishlist(); }}
          className={`absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-md border shadow-sm transition-all duration-200 hover:scale-105 z-10 ${
            isInWishlist
              ? 'bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-800'
              : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
          }`}
        >
          <Heart className="h-5 w-5" fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-zinc-400 font-bold uppercase tracking-wider">{product.subcategory}</span>
          <div className="flex items-center gap-1 text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded-md">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="font-bold text-[11px]">{product.rating}</span>
          </div>
        </div>
        <h3
          className="text-base font-bold line-clamp-2 cursor-pointer transition-colors min-h-[48px] text-zinc-950 group-hover:text-zinc-600 leading-snug"
          onClick={onProductClick}
        >
          {product.name}
        </h3>
        <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between">
          <span className="text-lg font-black text-zinc-950">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={onAddToCart}
            className="flex items-center justify-center w-10 h-10 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 transition-colors hover:scale-105 duration-200"
            aria-label="Add to Cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
