/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Wallet,
  Coins
} from 'lucide-react';
import { CartItem, Order, User } from '../types';
import { formatCurrency } from '../utils/currency';
import { getProductImage, FALLBACK_PRODUCT_IMAGE } from '../utils/image';
import { SafeImg } from './SafeImage';

interface CheckoutViewProps {
  cart: CartItem[];
  currentUser: User | null;
  onPlaceOrder: (orderDetails: {
    customerName: string;
    customerEmail: string;
    deliveryAddress: string;
    phone: string;
    paymentMethod: 'Mobile Money' | 'Card Payment' | 'Cash on Delivery';
  }) => void;
  setView: (view: string) => void;
}

export default function CheckoutView({
  cart,
  currentUser,
  onPlaceOrder,
  setView
}: CheckoutViewProps) {
  const { t } = useLanguage();
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [paymentMethod, setPaymentMethod] = useState<'Mobile Money' | 'Card Payment' | 'Cash on Delivery'>('Mobile Money');
  const [momoProvider, setMomoProvider] = useState<'MTN MoMo' | 'Airtel Money'>('MTN MoMo');
  const [momoNumber, setMomoNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 150 ? 0 : 5.00;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      alert(t('checkout.alert'));
      return;
    }
    onPlaceOrder({ customerName: name, customerEmail: email, deliveryAddress: address, phone, paymentMethod });
  };

  const inputClass = "w-full rounded-md bg-zinc-50 border border-zinc-200 px-4 py-2.5 text-xs text-zinc-900 outline-none focus:border-zinc-900 focus:bg-white transition-colors";
  const labelClass = "block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5";

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 font-sans text-zinc-800 bg-white" id="checkout-view">
      
      <button onClick={() => setView('cart')}
        className="group flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-xs font-bold hover:bg-zinc-50 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Return to Cart
      </button>

      <h1 className="text-2xl font-black tracking-tight text-zinc-950 mb-8 uppercase">{t('checkout.title')}</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Form */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Section 1 */}
          <section className="rounded-md border border-zinc-200 bg-white p-5">
            <h2 className="text-xs font-black text-zinc-950 uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-[10px] font-bold text-white">1</span>
              Customer Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>{t('checkout.fullName')}</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jean Damascene" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t('checkout.email')}</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="damascene@domain.com" className={inputClass} />
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="rounded-md border border-zinc-200 bg-white p-5">
            <h2 className="text-xs font-black text-zinc-950 uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-[10px] font-bold text-white">2</span>
              {t('checkout.deliveryLogistics')}
            </h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>{t('checkout.contactPhone')}</label>
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+250 788 000 000" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t('checkout.physicalAddress')}</label>
                <textarea required rows={3} value={address} onChange={(e) => setAddress(e.target.value)}
                  placeholder="KN 4 Ave, Kigali City Mall, Floor 1, Nyarugenge District, Kigali"
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="rounded-md border border-zinc-200 bg-white p-5">
            <h2 className="text-xs font-black text-zinc-950 uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-[10px] font-bold text-white">3</span>
              {t('checkout.paymentMethods')}
            </h2>
            
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { type: 'Mobile Money', icon: Wallet, label: t('checkout.momo') },
                { type: 'Card Payment', icon: CreditCard, label: t('checkout.creditCard') },
                { type: 'Cash on Delivery', icon: Coins, label: t('checkout.onDelivery') }
              ].map((pm) => {
                const Icon = pm.icon;
                const isSelected = paymentMethod === pm.type;
                return (
                  <button
                    type="button"
                    key={pm.type}
                    onClick={() => setPaymentMethod(pm.type as any)}
                    className={`flex flex-col items-center gap-2 rounded-md border p-4 transition-all ${
                      isSelected
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-200 text-zinc-500 hover:bg-zinc-50 bg-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-[10px] font-bold">{pm.label}</span>
                  </button>
                );
              })}
            </div>

            {paymentMethod === 'Mobile Money' && (
              <div className="space-y-4 rounded-md bg-zinc-50 p-4 border border-zinc-200">
                <div className="flex gap-4">
                  {(['MTN MoMo', 'Airtel Money'] as const).map((provider) => (
                    <label key={provider} className="flex items-center gap-2 text-xs font-bold cursor-pointer text-zinc-700">
                      <input type="radio" name="momoProvider" checked={momoProvider === provider} onChange={() => setMomoProvider(provider)} className="accent-zinc-900" />
                      {provider}
                    </label>
                  ))}
                </div>
                <div>
                  <label className={labelClass}>{t('checkout.momoWallet')}</label>
                  <input type="tel" required={paymentMethod === 'Mobile Money'} value={momoNumber} onChange={(e) => setMomoNumber(e.target.value)} placeholder="+250 78X XXX XXX" className={inputClass} />
                  <p className="text-[10px] text-zinc-400 mt-1.5">{t('checkout.momoPushMsg')} {formatCurrency(total)}.</p>
                </div>
              </div>
            )}

            {paymentMethod === 'Card Payment' && (
              <div className="space-y-4 rounded-md bg-zinc-50 p-4 border border-zinc-200">
                <div>
                  <label className={labelClass}>{t('checkout.cardNum')}</label>
                  <input type="text" required={paymentMethod === 'Card Payment'} value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="1234 5678 9101 1121" className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{t('checkout.cardExp')}</label>
                    <input type="text" required={paymentMethod === 'Card Payment'} value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="MM/YY" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{t('checkout.cardCvc')}</label>
                    <input type="password" maxLength={3} required={paymentMethod === 'Card Payment'} value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} placeholder="123" className={inputClass} />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'Cash on Delivery' && (
              <div className="rounded-md bg-zinc-50 p-4 border border-zinc-200">
                  <p className="text-xs leading-relaxed text-zinc-500">
                    {t('checkout.cashDesc2')} <strong className="text-zinc-900">{formatCurrency(total)}</strong>.
                  </p>
              </div>
            )}
          </section>
        </div>

        {/* Right: Order Summary */}
        <aside className="lg:col-span-5 rounded-md border border-zinc-200 bg-zinc-50 p-5 sticky top-28">
          <h2 className="text-xs font-black text-zinc-950 uppercase tracking-wider mb-5">{t('checkout.invoiceBreakdown')}</h2>

          <div className="divide-y divide-zinc-200 pb-4 mb-4 max-h-56 overflow-y-auto custom-scrollbar pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-3 py-3 first:pt-0">
                <SafeImg src={getProductImage(item.product.images)} fallback={FALLBACK_PRODUCT_IMAGE} alt={t(`products.${item.product.id}.name`, item.product.name)} className="h-10 w-10 object-cover rounded-md border border-zinc-200 bg-white" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-[11px] font-bold text-zinc-900 truncate">{t(`products.${item.product.id}.name`, item.product.name)}</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">{t('checkout.qty')}: {item.quantity} × {formatCurrency(item.product.price)}</p>
                </div>
                <span className="text-xs font-bold text-zinc-900">{formatCurrency(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-xs border-t border-zinc-200 pt-4">
            <div className="flex justify-between">
              <span className="text-zinc-500">{t('checkout.subtotal')}</span>
              <span className="font-bold text-zinc-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">{t('checkout.delivery')}</span>
              <span className="font-bold text-zinc-900">{deliveryFee === 0 ? t('checkout.free') : formatCurrency(deliveryFee)}</span>
            </div>
            <div className="border-t border-zinc-200 pt-3 flex justify-between text-sm font-black">
              <span className="text-zinc-950 uppercase tracking-wide">{t('checkout.total')}</span>
              <span className="text-zinc-950">{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="mt-6">
            <button type="submit" className="w-full btn-primary justify-center py-3.5">
              <ShieldCheck className="h-4 w-4" />
              {t('checkout.placeAndPush')}
            </button>
            <p className="text-[9px] text-zinc-400 text-center leading-normal mt-3">
              {t('checkout.authMsg')}
            </p>
          </div>
        </aside>

      </form>
    </div>
  );
}
