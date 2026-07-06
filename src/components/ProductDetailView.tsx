/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  Heart, 
  Check, 
  Info, 
  Truck, 
  ShieldCheck, 
  RefreshCcw 
} from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../utils/currency';

interface ProductDetailViewProps {
  product: Product;
  allProducts: Product[];
  addToCart: (product: Product, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  wishlist: Product[];
  setSelectedProduct: (product: Product) => void;
  setView: (view: string) => void;
}

export default function ProductDetailView({
  product,
  allProducts,
  addToCart,
  addToWishlist,
  wishlist,
  setSelectedProduct,
  setView
}: ProductDetailViewProps) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setActiveImage(product.images[0]);
    setQuantity(1);
  }, [product]);

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const incrementQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 font-sans text-zinc-800" id="product-detail-view">
      
      {/* Back button */}
      <button
        onClick={() => setView('shop')}
        className="group flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold hover:bg-zinc-50 mb-8"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Catalogue
      </button>

      {/* Main product block */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-16">
        
        {/* Left column: Images gallery */}
        <div className="space-y-4">
          <div className="aspect-square w-full overflow-hidden rounded-md bg-zinc-50 border border-zinc-200">
            <img
              src={activeImage}
              alt={product.name}
              className="h-full w-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`h-16 w-16 rounded-md overflow-hidden bg-zinc-50 border-2 transition-all ${
                    activeImage === img ? 'border-zinc-900 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Product specs, rating, controls */}
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
            {product.category} &rsaquo; {product.subcategory}
          </span>
          
          <h1 className="text-2xl font-black tracking-tight text-zinc-950 sm:text-3xl uppercase">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-0.5 text-zinc-900">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-zinc-200'}`} 
                />
              ))}
              <span className="ml-1.5 font-bold text-xs text-zinc-700">{product.rating}</span>
            </div>
            <span className="text-zinc-350">|</span>
            <span className="text-xs font-semibold text-zinc-500">
              {product.reviewsCount} Customer Reviews
            </span>
          </div>

          {/* Price & Stock */}
          <div className="mt-5 flex items-baseline gap-6 border-y border-zinc-150 py-5">
            <span className="text-2xl font-black text-zinc-950">
              {formatCurrency(product.price)}
            </span>
            <div className="flex items-center gap-2">
              <span className={`inline-flex h-2 w-2 rounded-full ${product.stock > 0 ? 'bg-zinc-900 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-xs font-semibold text-zinc-500">
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Temporarily Out of Stock'}
              </span>
            </div>
          </div>

          <p className="mt-5 text-xs text-zinc-500 leading-relaxed font-medium">
            {product.description}
          </p>

          {/* Actions */}
          {product.stock > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              
              {/* Qty */}
              <div className="flex items-center rounded-md border border-zinc-200 overflow-hidden bg-zinc-50 p-1 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  onClick={decrementQty}
                  disabled={quantity <= 1}
                  className="px-3.5 py-1.5 text-zinc-500 hover:text-zinc-900 disabled:opacity-30 text-xs font-extrabold"
                >
                  &minus;
                </button>
                <span className="px-3 text-xs font-black text-zinc-950 min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQty}
                  disabled={quantity >= product.stock}
                  className="px-3.5 py-1.5 text-zinc-500 hover:text-zinc-900 disabled:opacity-30 text-xs font-extrabold"
                >
                  &#43;
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 rounded-md py-3 px-6 text-xs font-bold text-white transition-all w-full ${
                  justAdded ? 'bg-zinc-700' : 'bg-zinc-900 hover:bg-zinc-800'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="h-4 w-4 stroke-[3]" />
                    Successfully Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart Bag
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => addToWishlist(product)}
                className={`p-3 rounded-md border transition-all shrink-0 w-full sm:w-auto flex items-center justify-center gap-2 ${
                  isInWishlist ? 'bg-zinc-100 border-zinc-200 text-zinc-900 font-bold' : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                <Heart className="h-4 w-4" fill={isInWishlist ? 'currentColor' : 'none'} />
                <span className="sm:hidden text-xs font-bold">{isInWishlist ? 'Saved' : 'Add to Wishlist'}</span>
              </button>

            </div>
          )}

          {/* Policies */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-100 pt-6 text-[10px] text-zinc-400">
            <div className="flex items-start gap-2">
              <Truck className="h-4 w-4 text-zinc-900 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-zinc-800 mb-0.5">Reliable Shipping</h4>
                <p>Express 24-48h dispatch in Kigali, next-day nationwide.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <RefreshCcw className="h-4 w-4 text-zinc-900 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-zinc-800 mb-0.5">Easy Returns</h4>
                <p>7-day hassle-free return policy for pristine items.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-zinc-900 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-zinc-800 mb-0.5">Genuine Guarantee</h4>
                <p>100% original electronic chips &amp; highweight garments.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Specs */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <section className="border-t border-zinc-150 pt-10 mb-12">
          <h2 className="text-base font-black text-zinc-950 mb-6 uppercase tracking-wider flex items-center gap-2">
            <Info className="h-4 w-4 text-zinc-900" />
            Detailed Specifications
          </h2>
          <div className="rounded-md border border-zinc-200 bg-zinc-50 overflow-hidden max-w-2xl">
            <dl className="divide-y divide-zinc-200">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 py-3 text-xs">
                  <dt className="font-bold text-zinc-400 uppercase tracking-wider">{key}</dt>
                  <dd className="font-semibold text-zinc-900 sm:col-span-2">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Related items */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-zinc-150 pt-10">
          <h2 className="text-base font-black text-zinc-950 mb-6 uppercase tracking-wider">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => {
              const isPInWishlist = wishlist.some(item => item.id === p.id);
              return (
                <div 
                  key={p.id} 
                  className="group relative flex flex-col overflow-hidden rounded-md border border-zinc-200 bg-white cursor-pointer card-lift"
                  onClick={() => setSelectedProduct(p)}
                >
                  <div className="aspect-square w-full overflow-hidden bg-zinc-50 border-b border-zinc-200 relative">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-200"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(p);
                      }}
                      className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-md border shadow-sm transition-all ${
                        isPInWishlist ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50'
                      }`}
                    >
                      <Heart className="h-4 w-4" fill={isPInWishlist ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{p.subcategory}</span>
                    <h3 className="mt-1 text-xs font-bold text-zinc-900 line-clamp-2 min-h-[36px] group-hover:text-zinc-650">
                      {p.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-black text-zinc-900">
                        {formatCurrency(p.price)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
