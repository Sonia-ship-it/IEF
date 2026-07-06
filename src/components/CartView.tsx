/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  CreditCard, 
  Truck, 
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { CartItem } from '../types';
import { formatCurrency } from '../utils/currency';

interface CartViewProps {
  cart: CartItem[];
  updateCartQty: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  setView: (view: string) => void;
}

export default function CartView({
  cart,
  updateCartQty,
  removeFromCart,
  setView
}: CartViewProps) {
  
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal === 0 ? 0 : (subtotal > 150 ? 0 : 5.00);
  const total = subtotal + deliveryFee;

  const handleIncrement = (item: CartItem) => {
    if (item.quantity < item.product.stock) {
      updateCartQty(item.product.id, item.quantity + 1);
    }
  };

  const handleDecrement = (item: CartItem) => {
    if (item.quantity > 1) {
      updateCartQty(item.product.id, item.quantity - 1);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center font-sans text-zinc-800 bg-white" id="empty-cart-view">
        <div className="flex h-20 w-20 items-center justify-center rounded-md bg-zinc-100 text-zinc-400 mx-auto">
          <ShoppingCart className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-xl font-black tracking-tight text-zinc-950">Your Cart is Empty</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Looks like you haven't added any products yet. Explore our premium fashion garments and advanced security systems today.
        </p>
        <button onClick={() => setView('shop')} className="mt-8 btn-primary">
          <ArrowRight className="h-4 w-4" />
          Go to Shop Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 font-sans text-zinc-800 bg-white" id="cart-view">
      
      <h1 className="text-2xl font-black tracking-tight text-zinc-950 mb-8">
        Your Shopping Bag <span className="text-zinc-400 font-medium text-base">({cart.length} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left: Items */}
        <div className="lg:col-span-2 space-y-0 divide-y divide-zinc-200 border-t border-b border-zinc-200">
          {cart.map((item) => (
            <div key={item.product.id} className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between py-5">
              
              {/* Image & Info */}
              <div className="flex gap-4 items-center">
                <div className="h-20 w-20 rounded-md overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                  <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-0.5">
                    {item.product.category}
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900 hover:text-zinc-600 cursor-pointer line-clamp-1 max-w-[260px] transition-colors" onClick={() => setView('product-detail')}>
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Unit: {formatCurrency(item.product.price)}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6 mt-2 sm:mt-0">
                {/* Quantity */}
                <div className="flex items-center rounded-md border border-zinc-200 overflow-hidden bg-zinc-50">
                  <button onClick={() => handleDecrement(item)} className="px-3 py-1.5 text-zinc-500 hover:text-zinc-900 font-bold text-sm transition-colors">
                    &minus;
                  </button>
                  <span className="px-3 text-xs font-bold text-zinc-900 min-w-[20px] text-center border-x border-zinc-200">
                    {item.quantity}
                  </span>
                  <button onClick={() => handleIncrement(item)} className="px-3 py-1.5 text-zinc-500 hover:text-zinc-900 font-bold text-sm transition-colors">
                    &#43;
                  </button>
                </div>

                {/* Price */}
                <span className="text-sm font-black text-zinc-950 min-w-[72px] text-right">
                  {formatCurrency(item.product.price * item.quantity)}
                </span>

                {/* Remove */}
                <button onClick={() => removeFromCart(item.product.id)} className="rounded-md p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100" aria-label="Remove item">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary */}
        <aside className="rounded-md border border-zinc-200 bg-zinc-50 p-5 sticky top-28">
          <h2 className="text-xs font-black text-zinc-950 uppercase tracking-wider mb-5">Order Summary</h2>

          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-500">Subtotal</span>
              <span className="font-bold text-zinc-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-zinc-400" />
                Delivery
              </span>
              <span className="font-bold text-zinc-900">
                {deliveryFee === 0 ? (
                  <span className="text-zinc-900 font-bold">Free</span>
                ) : (
                  formatCurrency(deliveryFee)
                )}
              </span>
            </div>

            {subtotal < 150 && (
              <div className="rounded-md bg-white p-3 border border-zinc-200 text-xs text-zinc-600 leading-normal">
                Add <strong className="text-zinc-900">{formatCurrency(150 - subtotal)}</strong> more to unlock <strong className="text-zinc-900">Free Delivery</strong>!
              </div>
            )}

            <div className="border-t border-zinc-200 pt-3.5 flex justify-between text-sm font-black">
              <span className="text-zinc-950 uppercase tracking-wide">Grand Total</span>
              <span className="text-zinc-950">{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button onClick={() => setView('checkout')} className="w-full btn-primary justify-center">
              <CreditCard className="h-4 w-4" />
              Proceed to Checkout
            </button>
            <button onClick={() => setView('shop')} className="w-full btn-outline justify-center">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </button>
          </div>

          <p className="text-[9px] text-zinc-400 text-center leading-normal mt-3">
            Prices include administrative VAT. Delivery coordinates with local couriers.
          </p>
        </aside>
      </div>
    </div>
  );
}
