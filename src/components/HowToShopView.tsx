/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
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
  const { t } = useLanguage();
  const steps = [
    {
      num: '01',
      title: t('howtoshop.s1'),
      desc: t('howtoshop.s1d'),
      icon: Compass
    },
    {
      num: '02',
      title: t('howtoshop.s2'),
      desc: t('howtoshop.s2d'),
      icon: Layers
    },
    {
      num: '03',
      title: t('howtoshop.s3'),
      desc: t('howtoshop.s3d'),
      icon: ShoppingCart
    },
    {
      num: '04',
      title: t('howtoshop.s4'),
      desc: t('howtoshop.s4d'),
      icon: CreditCard
    },
    {
      num: '05',
      title: t('howtoshop.s5'),
      desc: t('howtoshop.s5d'),
      icon: Truck
    },
    {
      num: '06',
      title: t('howtoshop.s6'),
      desc: t('howtoshop.s6d'),
      icon: Wallet
    },
    {
      num: '07',
      title: t('howtoshop.s7'),
      desc: t('howtoshop.s7d'),
      icon: CheckCircle2
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 font-sans text-zinc-800 bg-white" id="how-to-shop-view">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t('howtoshop.subtitle')}</span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
          {t('howtoshop.title')}
        </h1>
        <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
          {t('howtoshop.desc')}
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
          {t('howtoshop.faqTitle')}
        </h2>

        <div className="space-y-4">
          {[
            { q: t('howtoshop.q1'), a: t('howtoshop.a1') },
            { q: t('howtoshop.q2'), a: t('howtoshop.a2') },
            { q: t('howtoshop.q3'), a: t('howtoshop.a3') },
            { q: t('howtoshop.q4'), a: t('howtoshop.a4') },
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
