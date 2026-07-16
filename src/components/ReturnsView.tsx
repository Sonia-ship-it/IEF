/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  RotateCcw, 
  ClipboardCheck, 
  FileSearch, 
  CheckCircle, 
  RefreshCw,
  Scale
} from 'lucide-react';

export default function ReturnsView() {
  const { t } = useLanguage();
  const steps = [
    {
      title: t('returns.step1Title'),
      desc: t('returns.step1Desc'),
      icon: FileSearch
    },
    {
      title: t('returns.step2Title'),
      desc: t('returns.step2Desc'),
      icon: ClipboardCheck
    },
    {
      title: t('returns.step3Title'),
      desc: t('returns.step3Desc'),
      icon: CheckCircle
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 font-sans text-zinc-800 bg-white" id="returns-view">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t('returns.subtitle')}</span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
          {t('returns.title')}
        </h1>
        <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
          {t('returns.desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto mb-10">
        
        {/* Card 1: Returns Conditions */}
        <div className="rounded-md border border-zinc-200 bg-white p-6 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-100 text-zinc-900">
              <RotateCcw className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-black text-zinc-950 tracking-tight">{t('returns.card1Title')}</h2>
          </div>

          <p className="text-xs text-zinc-500 leading-relaxed">
            {t('returns.card1Desc')}
          </p>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">{t('returns.strictTitle')}</h3>
            <ul className="space-y-2.5">
              {[
                t('returns.cond1'),
                t('returns.cond2'),
                t('returns.cond3'),
                t('returns.cond4')
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
            <h2 className="text-sm font-black text-zinc-950 tracking-tight">{t('returns.card2Title')}</h2>
          </div>

          <p className="text-xs text-zinc-500 leading-relaxed">
            {t('returns.card2Desc')}
          </p>

          <div className="rounded-md bg-zinc-50 p-4 border border-zinc-200 text-xs text-zinc-600 space-y-2">
            <h4 className="font-bold uppercase tracking-wider flex items-center gap-1.5 text-zinc-900 text-[10px]">
              <Scale className="h-4 w-4" />
              {t('returns.specialClause')}
            </h4>
            <p className="leading-relaxed text-zinc-500">
              {t('returns.specialClauseDesc2')}
            </p>
          </div>
        </div>
      </div>

      {/* Refund Workflow */}
      <section className="max-w-4xl mx-auto rounded-md border border-zinc-200 bg-zinc-50 p-8">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-8 text-center">{t('returns.threeStage')}</h3>
        
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
