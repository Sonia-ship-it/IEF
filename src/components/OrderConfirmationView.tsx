/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  CheckCircle, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  Truck, 
  FileSpreadsheet
} from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmationViewProps {
  order: Order | null;
  setView: (view: string) => void;
}

export default function OrderConfirmationView({
  order,
  setView
}: OrderConfirmationViewProps) {
  
  if (!order) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center font-sans text-zinc-800 bg-white">
        <CheckCircle className="h-16 w-16 text-zinc-300 mx-auto" />
        <h1 className="mt-6 text-xl font-black tracking-tight text-zinc-900">No active order loaded</h1>
        <button onClick={() => setView('home')} className="mt-6 btn-primary">
          Return to Home Page
        </button>
      </div>
    );
  }

  const getDeliveryRange = () => {
    const today = new Date();
    const minDate = new Date(today); minDate.setDate(today.getDate() + 1);
    const maxDate = new Date(today); maxDate.setDate(today.getDate() + 2);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${minDate.toLocaleDateString('en-US', options)} - ${maxDate.toLocaleDateString('en-US', options)}`;
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 font-sans text-zinc-800 bg-white" id="order-confirmation-view">
      
      {/* Success Banner */}
      <div className="rounded-md border border-zinc-200 bg-zinc-50 p-8 text-center mb-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-zinc-900 text-white mb-4">
          <CheckCircle className="h-6 w-6 stroke-[2.5]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">Order Placed Successfully!</h1>
        <p className="mt-2 text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
          We have successfully registered your transaction. An automated invoice reference <strong>#{order.id}</strong> was dispatched to your credentials.
        </p>
      </div>

      {/* Delivery Progress Tracker */}
      <section className="mb-8 bg-white border border-zinc-200 rounded-md p-6">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6 text-center">Delivery Progress Tracker</h3>
        
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Connector Line */}
          <div className="absolute top-4 left-6 right-6 hidden sm:block h-px bg-zinc-200 z-0">
            <div className="h-full w-1/4 bg-zinc-900" />
          </div>

          {[
            { label: 'Order Registered', desc: 'Awaiting checks', done: true },
            { label: 'Under Review', desc: 'Quality assurance', active: true },
            { label: 'Out for Delivery', desc: 'With local courier', active: false },
            { label: 'Delivered', desc: 'Doorstep dropoff', active: false }
          ].map((step, idx) => (
            <div key={idx} className="flex sm:flex-col items-center gap-4 sm:gap-2 relative z-10 w-full sm:w-1/4 sm:text-center">
              <div className={`h-8 w-8 rounded-md border-2 flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                step.done
                  ? 'bg-zinc-900 border-zinc-900 text-white'
                  : step.active
                    ? 'bg-white border-zinc-900 text-zinc-900'
                    : 'bg-white border-zinc-200 text-zinc-400'
              }`}>
                {step.done ? '✓' : (idx + 1)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-800">{step.label}</h4>
                <p className="text-[10px] text-zinc-400 mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        
        {/* Delivery Details */}
        <div className="rounded-md border border-zinc-200 bg-white p-5">
          <h2 className="text-xs font-black text-zinc-900 uppercase tracking-wider mb-5 pb-2.5 border-b border-zinc-100 flex items-center gap-2">
            <Truck className="h-4 w-4 text-zinc-900" />
            Courier Delivery Logistics
          </h2>
          <dl className="space-y-4 text-xs">
            <div>
              <dt className="font-bold text-zinc-400 uppercase tracking-widest text-[9px] mb-1">Recipient</dt>
              <dd className="font-semibold text-zinc-900">{order.customerName}</dd>
            </div>
            <div>
              <dt className="font-bold text-zinc-400 uppercase tracking-widest text-[9px] mb-1">Courier Mobile</dt>
              <dd className="font-semibold text-zinc-900">{order.phone}</dd>
            </div>
            <div>
              <dt className="font-bold text-zinc-400 uppercase tracking-widest text-[9px] mb-1">Delivery Address</dt>
              <dd className="font-semibold text-zinc-900 leading-normal flex items-start gap-1">
                <MapPin className="h-3.5 w-3.5 text-zinc-900 shrink-0 mt-0.5" />
                {order.deliveryAddress}
              </dd>
            </div>
            <div>
              <dt className="font-bold text-zinc-400 uppercase tracking-widest text-[9px] mb-1">Estimated Delivery</dt>
              <dd className="font-bold text-zinc-900 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                {getDeliveryRange()}
              </dd>
            </div>
          </dl>
        </div>

        {/* Invoice Details */}
        <div className="rounded-md border border-zinc-200 bg-white p-5">
          <h2 className="text-xs font-black text-zinc-900 uppercase tracking-wider mb-5 pb-2.5 border-b border-zinc-100 flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4 text-zinc-900" />
            Transaction Invoice
          </h2>
          <dl className="space-y-4 text-xs mb-5">
            <div>
              <dt className="font-bold text-zinc-400 uppercase tracking-widest text-[9px] mb-1">Invoice Reference</dt>
              <dd className="font-mono font-bold text-zinc-950 text-sm">{order.id}</dd>
            </div>
            <div>
              <dt className="font-bold text-zinc-400 uppercase tracking-widest text-[9px] mb-1">Payment Method</dt>
              <dd className="font-semibold text-zinc-900 uppercase tracking-wider text-[10px]">{order.paymentMethod}</dd>
            </div>
            <div>
              <dt className="font-bold text-zinc-400 uppercase tracking-widest text-[9px] mb-1">Status</dt>
              <dd className="inline-flex rounded-md bg-zinc-100 px-2 py-0.5 text-[9px] font-bold text-zinc-700 uppercase tracking-wide">
                {order.status}
              </dd>
            </div>
          </dl>
          <div className="border-t border-zinc-100 pt-4 flex justify-between items-center">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total Paid</span>
            <span className="text-xl font-black text-zinc-950">${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Items List */}
      <section className="rounded-md border border-zinc-200 bg-white p-5 mb-8">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-5">Items Purchased</h3>
        <div className="divide-y divide-zinc-100">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-center py-3.5 first:pt-0 last:pb-0">
              <img src={item.image} alt="" className="h-11 w-11 object-cover rounded-md border border-zinc-200 bg-zinc-50" referrerPolicy="no-referrer" />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-zinc-900 truncate">{item.productName}</h4>
                <p className="text-[10px] text-zinc-400 mt-0.5">Qty: {item.quantity} &times; ${item.price.toFixed(2)}</p>
              </div>
              <span className="text-xs font-black text-zinc-900">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
        <button onClick={() => setView('shop')} className="btn-primary w-full sm:w-auto justify-center">
          <ShoppingBag className="h-4 w-4" />
          Browse More Products
        </button>
        <button onClick={() => setView('auth')} className="btn-outline w-full sm:w-auto justify-center">
          Track My Orders
        </button>
      </div>
    </div>
  );
}
