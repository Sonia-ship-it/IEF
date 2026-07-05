/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  RotateCcw, 
  ClipboardCheck, 
  FileSearch, 
  CheckCircle, 
  RefreshCw,
  Scale
} from 'lucide-react';

export default function ReturnsView() {
  const steps = [
    {
      title: '01. Physical Inspection',
      desc: 'Our administrative store team receives the return package and performs a physical quality check to verify tags and conditions.',
      icon: FileSearch
    },
    {
      title: '02. Approval Verification',
      desc: 'Upon verifying compliance with condition mandates, we immediately approve the claim and update your customer account logs.',
      icon: ClipboardCheck
    },
    {
      title: '03. Refund Processing',
      desc: 'A direct cash refund, mobile money transfer, or credit card charge-back is dispatched to your original payment account.',
      icon: CheckCircle
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 font-sans text-zinc-800 bg-white" id="returns-view">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Consumer Protection Policies</span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
          Returns &amp; Refund Policies
        </h1>
        <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
          Read our clear guidelines governing product returns, refunds processing schedules, and exchange policies for electronics or fashion.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto mb-10">
        
        {/* Card 1: Returns Conditions */}
        <div className="rounded-md border border-zinc-200 bg-white p-6 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-100 text-zinc-900">
              <RotateCcw className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-black text-zinc-950 tracking-tight">7-Day Returns Policy</h2>
          </div>

          <p className="text-xs text-zinc-500 leading-relaxed">
            We offer our shoppers a flexible <strong>7-day window</strong> to return items purchased from our retail catalog. For deliveries outside Kigali, the return window extends to <strong>14 days</strong> from the delivery confirmation timestamp.
          </p>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Strict Return Conditions:</h3>
            <ul className="space-y-2.5">
              {[
                'The product must remain completely unused, unworn, and unwashed.',
                'Items must remain in their original packaging, including unbroken seal tags.',
                'Footwear box packaging must not be torn, written on, or taped over.',
                'Surveillance security camera lenses must not show scratch marks or wire cuts.'
              ].map((cond, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-zinc-600">
                  <span className="text-zinc-900 font-bold shrink-0 mt-0.5">›</span>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 2: Exchanges */}
        <div className="rounded-md border border-zinc-200 bg-white p-6 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-100 text-zinc-900">
              <RefreshCw className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-black text-zinc-950 tracking-tight">Replacement &amp; Exchanges</h2>
          </div>

          <p className="text-xs text-zinc-500 leading-relaxed">
            If you receive an item that is damaged, structurally flawed, or has mismatched sizing, we offer free direct replacements. Mismatched garment sizing exchanges depend on current stock limits.
          </p>

          <div className="rounded-md bg-zinc-50 p-4 border border-zinc-200 text-xs text-zinc-600 space-y-2">
            <h4 className="font-bold uppercase tracking-wider flex items-center gap-1.5 text-zinc-900 text-[10px]">
              <Scale className="h-4 w-4" />
              Special Electronic &amp; Technical Clause:
            </h4>
            <p className="leading-relaxed text-zinc-500">
              Surveillance cameras, DVR decoders, smoke alarms, or routers already hard-wired or physically drilled on site by client technicians are strictly exempt from general return privileges.
            </p>
          </div>
        </div>
      </div>

      {/* Refund Workflow */}
      <section className="max-w-4xl mx-auto rounded-md border border-zinc-200 bg-zinc-50 p-8">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-8 text-center">Three-Stage Refund Settlement Workflow</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="text-center flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white border border-zinc-200 text-zinc-900 mb-4 shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="text-xs font-bold text-zinc-900 uppercase mb-2">{step.title}</h4>
                <p className="text-[11px] leading-relaxed text-zinc-500">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
