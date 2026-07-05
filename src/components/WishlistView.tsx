/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Heart, 
  Trash2, 
  ShoppingCart, 
  ArrowRight
} from 'lucide-react';
import { Product } from '../types';

interface WishlistViewProps {
  wishlist: Product[];
  removeFromWishlist: (productId: string) => void;
  moveToCart: (product: Product) => void;
  setSelectedProduct: (product: Product) => void;
  setView: (view: string) => void;
}

export default function WishlistView({
  wishlist,
  removeFromWishlist,
  moveToCart,
  setSelectedProduct,
  setView
}: WishlistViewProps) {
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('product-detail');
  };

  if (wishlist.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center font-sans text-zinc-800" id="empty-wishlist-view">
        <div className="rounded-md bg-zinc-50 p-6 w-fit mx-auto text-zinc-400 border border-zinc-200">
          <Heart className="h-12 w-12" />
        </div>
        <h1 className="mt-6 text-2xl font-black tracking-tight text-zinc-950 uppercase">Your Wishlist is Empty</h1>
        <p className="mt-2 text-xs text-zinc-500 font-medium">
          Save garments, shoes, accessories, or smart camera products for later. Keep track of what you love!
        </p>
        <button
          onClick={() => setView('shop')}
          className="mt-6 btn-primary"
        >
          Explore Shop Catalogue
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 font-sans text-zinc-800 bg-white" id="wishlist-view">
      
      <h1 className="text-2xl font-black tracking-tight text-zinc-950 mb-8 uppercase">
        Saved Wishlist Items ({wishlist.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {wishlist.map((product) => (
          <div 
            key={product.id} 
            className="group relative flex flex-col overflow-hidden rounded-md border border-zinc-200 bg-white card-lift"
          >
            {/* Image Box */}
            <div 
              className="aspect-square w-full overflow-hidden bg-zinc-50 relative cursor-pointer border-b border-zinc-200"
              onClick={() => handleProductClick(product)}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover object-center group-hover:scale-102 transition-transform duration-200"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(product.id);
                }}
                className="absolute top-2 right-2 rounded-md bg-white p-2 text-zinc-500 hover:bg-zinc-900 hover:text-white border border-zinc-200 shadow-sm transition-colors"
                aria-label="Remove from Wishlist"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Info and Actions */}
            <div className="flex flex-1 flex-col p-4 justify-between">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                  {product.subcategory}
                </span>
                <h3 
                  className="text-xs font-bold text-zinc-900 line-clamp-2 hover:text-zinc-600 cursor-pointer min-h-[36px]"
                  onClick={() => handleProductClick(product)}
                >
                  {product.name}
                </h3>
              </div>

              <div className="mt-4 space-y-3 pt-3 border-t border-zinc-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-zinc-950">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-semibold">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                </div>

                {product.stock > 0 ? (
                  <button
                    onClick={() => moveToCart(product)}
                    className="w-full btn-primary justify-center py-2.5 text-xs"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Move to Cart Bag
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full rounded-md bg-zinc-100 py-2.5 text-xs font-bold text-zinc-400 cursor-not-allowed border border-zinc-200"
                  >
                    Temporarily Unavailable
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
