/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  History, 
  Target, 
  Eye, 
  Users, 
  ShieldCheck, 
  Briefcase 
} from 'lucide-react';
import { FALLBACK_AVATAR_IMAGE } from '../utils/image';
import { SafeImage } from './SafeImage';

export default function AboutView() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 font-sans text-zinc-950 bg-white" id="about-view">
      
      {/* Intro Hero */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{t('about.subtitle')}</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-950 sm:text-6xl uppercase">
          {t('about.title')}
        </h1>
        <p className="mt-6 text-lg text-zinc-500 leading-relaxed font-medium">
          {t('about.desc')}
        </p>
      </div>

      {/* Grid: Overview, Mission, Vision */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        
        {/* Overview */}
        <div className="rounded-md border border-zinc-200 bg-white p-8 card-lift">
          <div className="rounded-md bg-zinc-100 p-4 w-fit text-zinc-900 mb-8">
            <History className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-black text-zinc-950 mb-4 uppercase tracking-wider">{t('about.historyTitle')}</h3>
          <p className="text-sm leading-relaxed text-zinc-500 font-medium">
            {t('about.historyDesc')}
          </p>
        </div>

        {/* Mission */}
        <div className="rounded-md border border-zinc-200 bg-white p-8 card-lift">
          <div className="rounded-md bg-zinc-100 p-4 w-fit text-zinc-900 mb-8">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-black text-zinc-950 mb-4 uppercase tracking-wider">{t('about.missionTitle')}</h3>
          <p className="text-sm leading-relaxed text-zinc-500 font-medium">
            {t('about.missionDesc')}
          </p>
        </div>

        {/* Vision */}
        <div className="rounded-md border border-zinc-200 bg-white p-8 card-lift">
          <div className="rounded-md bg-zinc-100 p-4 w-fit text-zinc-900 mb-8">
            <Eye className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-black text-zinc-950 mb-4 uppercase tracking-wider">{t('about.visionTitle')}</h3>
          <p className="text-sm leading-relaxed text-zinc-500 font-medium">
            {t('about.visionDesc')}
          </p>
        </div>

      </div>

      {/* Why Choose Us & Achievements */}
      <section className="bg-zinc-50 border border-zinc-200 rounded-md p-10 sm:p-16 mb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-zinc-200/30 blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{t('about.whyLead')}</span>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl uppercase tracking-tight text-zinc-950">{t('about.uncompromising')}</h2>
            <p className="mt-6 text-base text-zinc-600 leading-relaxed font-medium">
              {t('about.uncompromisingDesc')}
            </p>
            
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-6 w-6 text-zinc-900 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-zinc-950 uppercase tracking-wide">{t('about.genuine')}</h4>
                  <p className="text-xs text-zinc-500 mt-2 font-medium">{t('about.genuineDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Briefcase className="h-6 w-6 text-zinc-900 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-zinc-950 uppercase tracking-wide">{t('about.engineers')}</h4>
                  <p className="text-xs text-zinc-500 mt-2 font-medium">{t('about.engineersDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Achievements */}
          <div className="grid grid-cols-2 gap-6 lg:pl-12">
            {[
              { num: '500+', label: t('about.stat1') },
              { num: '2,500+', label: t('about.stat2') },
              { num: '100%', label: t('about.stat3') },
              { num: '1-Year', label: t('about.stat4') }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white border border-zinc-200 rounded-md p-8 text-center card-lift">
                <span className="text-4xl font-black text-zinc-950 block mb-3">{stat.num}</span>
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider leading-relaxed block">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Leadership Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-black text-zinc-950 uppercase tracking-tight mb-12 text-center flex items-center justify-center gap-3">
          <Users className="h-8 w-8 text-zinc-900" />
          {t('about.teamTitle')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {[
            {
              name: t('about.member1Name'),
              role: t('about.member1Role'),
              img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
              bio: t('about.member1Bio')
            },
            {
              name: t('about.member2Name'),
              role: t('about.member2Role'),
              img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
              bio: t('about.member2Bio')
            },
            {
              name: t('about.member3Name'),
              role: t('about.member3Role'),
              img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
              bio: t('about.member3Bio')
            }
          ].map((member, idx) => (
            <div key={idx} className="rounded-md border border-zinc-200 bg-white p-8 text-center card-lift">
              <div className="h-32 w-32 rounded-full overflow-hidden mx-auto mb-6 border-2 border-zinc-200 relative">
                <SafeImage src={member.img} fallback={FALLBACK_AVATAR_IMAGE} alt={member.name} fill sizes="128px" className="object-cover" unoptimized />
              </div>
              <h4 className="font-black text-zinc-950 uppercase text-base tracking-wide">{member.name}</h4>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-widest mt-2 mb-4" dangerouslySetInnerHTML={{ __html: member.role }} />
              <p className="text-sm text-zinc-500 leading-relaxed font-medium">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
