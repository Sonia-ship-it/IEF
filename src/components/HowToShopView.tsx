/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Compass, 
  Layers, 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  Wallet, 
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export default function HowToShopView() {
  const steps = [
    {
      num: '01',
      title: 'Browse Products &amp; Categories',
      desc: 'Explore our catalog across four primary sections: luxury clothing, premium shoes, necklaces, and smart security electronics.',
      icon: Compass
    },
    {
      num: '02',
      title: 'Select a Product &amp; Check Details',
      desc: 'Inspect full highweight fabrics GSM specs, precise measurements, dome or bullet lens details, and original stock availability.',
      icon: Layers
    },
    {
      num: '03',
      title: 'Add Selected Items to Cart',
      desc: 'Update desired quantities, save favorite luxury items in your persistent wishlist, and organize your selected items in the cart.',
      icon: ShoppingCart
    },
    {
      num: '04',
      title: 'Proceed to Secure Checkout',
      desc: 'Confirm your invoice summaries and click the Proceed to Checkout button to advance to customer details panels.',
      icon: CreditCard
    },
    {
      num: '05',
      title: 'Enter Delivery Information',
      desc: 'Provide your accurate Kigali district, building, or landmark coordinates and active courier phone numbers.',
      icon: Truck
    },
    {
      num: '06',
      title: 'Choose Your Payment Method',
      desc: 'Opt for instant MTN MoMo or Airtel Money pushing, secure Visa credit cards, or convenient cash settlement on doorstep delivery.',
      icon: Wallet
    },
    {
      num: '07',
      title: 'Place Order &amp; Track Progress',
      desc: 'Submit your request, receive your invoice number reference immediately, and monitor our real-time delivery progress bars.',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 font-sans text-zinc-800 bg-white" id="how-to-shop-view">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Knowledge Base Manual</span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
          How to Shop &amp; Request Services
        </h1>
        <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
          Follow our transparent, step-by-step guidelines to purchase premium fashion accessories or schedule technical on-site surveys in Kigali.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-zinc-200 max-w-4xl mx-auto space-y-8 mb-14 pl-8">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[41px] top-3 flex h-10 w-10 items-center justify-center rounded-md bg-white border-2 border-zinc-900 text-zinc-900 font-black text-xs shadow-sm group-hover:bg-zinc-900 group-hover:text-white transition-all">
                {step.num}
              </div>

              {/* Card */}
              <div className="rounded-md border border-zinc-200 bg-white p-5 card-lift">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 text-zinc-900 shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-sm text-zinc-900 tracking-tight" dangerouslySetInnerHTML={{ __html: step.title }} />
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed pl-10">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto border-t border-zinc-200 pt-12">
        <h2 className="text-base font-black text-zinc-950 tracking-tight mb-8 text-center flex items-center justify-center gap-2">
          <HelpCircle className="h-5 w-5 text-zinc-900" />
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {[
            {
              q: 'How do I request an onsite survey for CCTV installation?',
              a: 'Head to our Services Page, click "Request Technical Service Survey" on the CCTV card, complete your email, phone, and coordinates in the form, and submit. A technical expert will contact you to coordinate a visit.'
            },
            {
              q: 'Is my Mobile Money payment secured?',
              a: 'Absolutely. We do not store PIN codes. When you submit a MoMo checkout request, our API securely requests a direct push prompt to your mobile screen. Payment clears only after you enter your private PIN code.'
            },
            {
              q: 'What is your sizing criteria for Complete Outfits?',
              a: 'Our clothing fits true to Western premium sizing (S, M, L, XL). Exact measurements are specified in product description specs. If you are unsure, you can write details in our contact forms or visit our Kigali City Mall store.'
            },
            {
              q: 'How long do technical systems installations take?',
              a: 'Standard 4-camera CCTV monitoring setups are fully completed in 1 business day. Complex fiber optic networking cabling or industrial smoke detectors mapping takes between 2 to 5 business days.'
            }
          ].map((faq, idx) => (
            <div key={idx} className="rounded-md border border-zinc-200 bg-zinc-50 p-5">
              <h4 className="text-xs font-bold text-zinc-900 tracking-wide mb-2">Q: {faq.q}</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
