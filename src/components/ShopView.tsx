/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Star,
  Heart,
  ShoppingCart,
  X,
  LayoutGrid,
  List
} from 'lucide-react';
import { Product } from '../types';

interface ShopViewProps {
  products: Product[];
  addToCart: (product: Product) => void;
  addToWishlist: (product: Product) => void;
  wishlist: Product[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (subcategory: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  setSelectedProduct: (product: Product) => void;
  setView: (view: string) => void;
}

export default function ShopView({
  products,
  addToCart,
  addToWishlist,
  wishlist,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  setSelectedProduct,
  setView
}: ShopViewProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Categories structure mapping
  const CATEGORIES_MAP: Record<string, string[]> = {
    'All': [],
    'Electronics': ['CCTV Cameras', 'Headphones', 'Mini Radios', 'Watches'],
    'Clothing & Fashion': ['T-Shirts', "Men's Shirts", 'Trousers', 'Jogging / Tracksuits', 'Tops', 'Complete Outfits', 'Jerseys'],
    'Jewelry': ['Necklaces'],
    'Footwear': ["Men’s Shoes", "Women’s Shoes"]
  };

  const categories = Object.keys(CATEGORIES_MAP);

  const subcategories = useMemo(() => {
    if (selectedCategory === 'All') return [];
    return CATEGORIES_MAP[selectedCategory] || [];
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory('All');
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // 1. Category Filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // 2. Subcategory Filter
        if (selectedSubcategory !== 'All' && p.subcategory !== selectedSubcategory) {
          return false;
        }
        // 3. Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesDesc = p.description.toLowerCase().includes(q);
          const matchesSub = p.subcategory.toLowerCase().includes(q);
          if (!matchesName && !matchesDesc && !matchesSub) return false;
        }
        return true;
      })
      .sort((a, b) => {
        // Sort
        if (sortOption === 'price-low-high') return a.price - b.price;
        if (sortOption === 'price-high-low') return b.price - a.price;
        if (sortOption === 'rating') return b.rating - a.rating;
        if (sortOption === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        return 0; // Default Featured / ID sorting
      });
  }, [products, selectedCategory, selectedSubcategory, searchQuery, sortOption]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('product-detail');
  };

  const isInWishlist = (product: Product) => {
    return wishlist.some(item => item.id === product.id);
  };

  return (
    <div className="bg-white font-sans text-zinc-900" id="shop-view">

      {/* Hero Strip with Maze Pattern (Charcoal & White) */}
      <div className="relative border-b border-zinc-200 py-12 px-6 bg-pattern-maze text-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-950">Product Catalogue</h1>
            <p className="mt-1 text-xs text-zinc-500 font-medium">Showing {filteredProducts.length} of {products.length} elegant items</p>
          </div>
          {/* Live Search */}
          <div className="relative max-w-sm w-full">
            <Search className="absolute top-3 left-3.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search fashion or electronics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md bg-zinc-50 border border-zinc-200 py-2.5 pl-10 pr-9 text-xs text-zinc-900 outline-none focus:border-zinc-900 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-16 flex flex-col lg:flex-row gap-8">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block w-64 shrink-0" id="desktop-filters">
          <div className="sticky top-24 rounded-md border border-zinc-250 bg-zinc-50/50 p-5 space-y-7">
            
            {/* Category selection */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-semibold tracking-wide transition-all ${
                        isSelected
                          ? 'bg-zinc-900 text-white shadow-sm'
                          : 'text-zinc-600 hover:bg-white hover:text-zinc-950 border border-transparent hover:border-zinc-200'
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subcategory */}
            {selectedCategory !== 'All' && subcategories.length > 0 && (
              <div className="border-t border-zinc-200 pt-5">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">Refine</h3>
                <div className="space-y-0.5">
                  <button
                    onClick={() => setSelectedSubcategory('All')}
                    className={`flex w-full items-center rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                      selectedSubcategory === 'All' ? 'text-zinc-900 font-bold' : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    All {selectedCategory}
                  </button>
                  {subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`flex w-full items-center rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                        selectedSubcategory === sub ? 'text-zinc-900 font-bold' : 'text-zinc-500 hover:text-zinc-950'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sort */}
            <div className="border-t border-zinc-200 pt-5">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">Sort By</h3>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full rounded-md bg-white border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-700 outline-none focus:border-zinc-900 transition-colors"
              >
                <option value="featured">Featured Selections</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
                <option value="bestseller">Best Selling First</option>
              </select>
            </div>

          </div>
        </aside>

        {/* MAIN PRODUCT GRID */}
        <main className="flex-1" id="shop-main-content">
          
          {/* Mobile Filters Trigger */}
          <div className="flex lg:hidden items-center justify-between gap-4 mb-6">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-md border border-zinc-200 px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters &amp; Sort
            </button>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-colors border ${viewMode === 'grid' ? 'bg-zinc-900 border-zinc-900 text-white' : 'border-zinc-200 text-zinc-400 hover:bg-zinc-50'}`}>
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-colors border ${viewMode === 'list' ? 'bg-zinc-900 border-zinc-900 text-white' : 'border-zinc-200 text-zinc-400 hover:bg-zinc-50'}`}>
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Desktop view-mode toggle */}
          <div className="hidden lg:flex items-center justify-end gap-1.5 mb-6">
            <span className="text-xs text-zinc-400 font-semibold mr-1.5">View:</span>
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-colors border ${viewMode === 'grid' ? 'bg-zinc-900 border-zinc-900 text-white' : 'border-zinc-200 text-zinc-400 hover:bg-zinc-50'}`}>
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-colors border ${viewMode === 'list' ? 'bg-zinc-900 border-zinc-900 text-white' : 'border-zinc-200 text-zinc-400 hover:bg-zinc-50'}`}>
              <List className="h-4 w-4" />
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 rounded-md border border-dashed border-zinc-200 bg-zinc-50">
              <span className="text-4xl">🔍</span>
              <h3 className="mt-4 text-base font-bold text-zinc-900">No products found</h3>
              <p className="mt-2 text-xs text-zinc-500 max-w-sm mx-auto">We couldn't find matches. Try resetting filters.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSelectedSubcategory('All'); setSearchQuery(''); setSortOption('featured'); }}
                className="mt-5 btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-md border border-zinc-200 bg-white card-lift">
                  <div
                    className="aspect-square w-full overflow-hidden bg-zinc-50 border-b border-zinc-200 relative cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-200"
                      referrerPolicy="no-referrer"
                    />
                    {product.stock <= 8 && (
                      <span className="absolute top-2 left-2 rounded-md bg-zinc-900 px-2 py-0.5 text-[8px] font-bold text-white uppercase tracking-wider">Low Stock</span>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); addToWishlist(product); }}
                      className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-md border shadow-sm transition-all ${
                        wishlist.some(i => i.id === product.id)
                          ? 'bg-zinc-900 border-zinc-900 text-white'
                          : 'bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-100'
                      }`}
                    >
                      <Heart className="h-4 w-4" fill={wishlist.some(i => i.id === product.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1.5">
                      <span>{product.subcategory}</span>
                      <div className="flex items-center gap-0.5 text-zinc-700">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="font-bold text-xs">{product.rating}</span>
                      </div>
                    </div>
                    <h3
                      className="text-xs font-bold text-zinc-900 line-clamp-2 hover:text-zinc-600 cursor-pointer min-h-[36px]"
                      onClick={() => handleProductClick(product)}
                    >{product.name}</h3>
                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                      <span className="text-sm font-black text-zinc-950">${product.price.toFixed(2)}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group flex flex-col sm:flex-row gap-4 overflow-hidden rounded-md border border-zinc-200 bg-white p-4 card-lift">
                  <div
                    className="aspect-square w-full sm:w-32 sm:h-32 overflow-hidden bg-zinc-50 border border-zinc-200 relative cursor-pointer rounded-md shrink-0"
                    onClick={() => handleProductClick(product)}
                  >
                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-200" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{product.category} › {product.subcategory}</span>
                      <div className="flex items-center gap-1 text-zinc-700 mt-0.5">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs font-bold">{product.rating}</span>
                      </div>
                      <h3 className="text-sm font-bold text-zinc-900 hover:text-zinc-600 cursor-pointer mt-1" onClick={() => handleProductClick(product)}>{product.name}</h3>
                      <p className="mt-1.5 text-xs text-zinc-500 line-clamp-2 leading-relaxed">{product.description}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-black text-zinc-950">${product.price.toFixed(2)}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => addToWishlist(product)}
                          className={`rounded-md p-2 border transition-all ${
                            isInWishlist(product) ? 'bg-zinc-100 border-zinc-200 text-zinc-900' : 'border-zinc-250 text-zinc-500 hover:bg-zinc-50'
                          }`}
                        >
                          <Heart className="h-4 w-4" fill={isInWishlist(product) ? 'currentColor' : 'none'} />
                        </button>
                        <button onClick={() => addToCart(product)} className="flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 transition-colors">
                          <ShoppingCart className="h-4 w-4" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTERS DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-zinc-950/40 backdrop-blur-sm" id="mobile-filters-drawer">
          <div className="ml-auto flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
              <h2 className="text-base font-bold text-zinc-900">Refine Catalogue</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-md bg-zinc-100 text-zinc-500 hover:bg-zinc-200 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">Categories</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => handleCategoryChange(cat)}
                      className={`flex w-full items-center justify-between rounded-md px-3.5 py-2.5 text-xs font-semibold transition-all ${
                        selectedCategory === cat ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-50'
                      }`}>{cat}</button>
                  ))}
                </div>
              </div>
              {selectedCategory !== 'All' && subcategories.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">Subcategory</h3>
                  <div className="space-y-0.5">
                    <button onClick={() => setSelectedSubcategory('All')} className={`flex w-full items-center rounded-md px-3 py-2 text-xs font-semibold ${selectedSubcategory === 'All' ? 'text-zinc-950 font-bold' : 'text-zinc-500'}`}>
                      All {selectedCategory}
                    </button>
                    {subcategories.map((sub) => (
                      <button key={sub} onClick={() => setSelectedSubcategory(sub)} className={`flex w-full items-center rounded-md px-3 py-2 text-xs font-semibold ${selectedSubcategory === sub ? 'text-zinc-950 font-bold' : 'text-zinc-500'}`}>{sub}</button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">Sort By</h3>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}
                  className="w-full rounded-md bg-zinc-50 border border-zinc-200 px-3.5 py-2.5 text-xs font-semibold text-zinc-700 outline-none focus:border-zinc-950">
                  <option value="featured">Featured Selections</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                  <option value="bestseller">Best Selling First</option>
                </select>
              </div>
              <div className="pt-4">
                <button onClick={() => setMobileFiltersOpen(false)} className="btn-primary w-full justify-center">Apply &amp; View Results</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
