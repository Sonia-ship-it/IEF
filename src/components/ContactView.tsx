/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

export default function ContactView() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert(t('contact.alert'));
      return;
    }
    setSubmitted(true);
    setName(''); setEmail(''); setPhone(''); setMessage('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactItems = [
    {
      Icon: MapPin,
      title: t('contact.storeAddress'),
      lines: [t('contact.storeAddressLine1'), t('contact.storeAddressLine2')],
    },
    {
      Icon: Phone,
      title: t('contact.officialHotlines'),
      lines: [t('contact.hotlineSales'), t('contact.hotlineSpecialist')],
    },
    {
      Icon: Mail,
      title: t('contact.emailAddress'),
      lines: [t('contact.emailSupport'), t('contact.emailCorporate')],
    },
    {
      Icon: Clock,
      title: t('contact.officeHours'),
      lines: [t('contact.hoursDesc1'), t('contact.hoursDesc2')],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 font-sans text-zinc-950 bg-white" id="contact-view">
      
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{t('contact.headerSubtitle')}</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-950 sm:text-6xl">
          {t('contact.headerTitle')}
        </h1>
        <p className="mt-6 text-lg text-zinc-500 leading-relaxed font-medium">
          {t('contact.headerDesc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
        
        <div className="lg:col-span-7 group relative border border-zinc-200 bg-white p-8 sm:p-12 rounded-md card-lift hover:border-zinc-300 transition-colors">
          {submitted ? (
            <div className="text-center py-20">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-md bg-zinc-100 text-zinc-900 mb-6 border border-zinc-200">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black text-zinc-950">{t('contact.successTitle')}</h3>
              <p className="mt-4 text-base text-zinc-500 leading-relaxed max-w-sm mx-auto font-medium">
                {t('contact.successMsgExtended')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-8">{t('contact.formTitle')}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">{t('contact.name')}</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    placeholder={t('contact.namePlaceholder')}
                    className="w-full rounded-md bg-zinc-50 border border-zinc-200 px-5 py-3.5 text-sm outline-none focus:border-zinc-900 focus:bg-white transition-colors text-zinc-950 font-medium placeholder:text-zinc-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">{t('contact.email')}</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('contact.emailPlaceholder')}
                    className="w-full rounded-md bg-zinc-50 border border-zinc-200 px-5 py-3.5 text-sm outline-none focus:border-zinc-900 focus:bg-white transition-colors text-zinc-950 font-medium placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">{t('contact.phone')}</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder={t('contact.phonePlaceholder')}
                  className="w-full rounded-md bg-zinc-50 border border-zinc-200 px-5 py-3.5 text-sm outline-none focus:border-zinc-900 focus:bg-white transition-colors text-zinc-950 font-medium placeholder:text-zinc-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">{t('contact.message')}</label>
                <textarea required rows={6} value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('contact.messagePlaceholderExtended')}
                  className="w-full rounded-md bg-zinc-50 border border-zinc-200 px-5 py-3.5 text-sm outline-none focus:border-zinc-900 focus:bg-white transition-colors text-zinc-950 font-medium resize-none placeholder:text-zinc-400"
                />
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full btn-primary justify-center py-4 text-base">
                  <Send className="h-5 w-5" />
                  {t('contact.send')}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="lg:col-span-5 space-y-8">
          
          <div className="group relative border border-zinc-200 bg-white p-8 sm:p-10 rounded-md card-lift hover:border-zinc-300 transition-colors">
            <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-8 pb-4 border-b border-zinc-100">{t('contact.supportCoordinates')}</h2>
            
            <ul className="space-y-8 text-sm">
              {contactItems.map(({ Icon, title, lines }) => (
                <li key={title} className="flex items-start gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-zinc-100 text-zinc-900 shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-950 mb-1.5 text-base">{title}</h4>
                    {lines.map((l) => <p key={l} className="text-zinc-500 font-medium leading-relaxed">{l}</p>)}
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex gap-4 mt-10 pt-6 border-t border-zinc-100">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Linkedin, label: 'LinkedIn' },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="flex items-center justify-center w-12 h-12 rounded-md bg-zinc-50 text-zinc-500 hover:bg-zinc-900 hover:text-white border border-zinc-200 transition-all duration-200 hover:-translate-y-1"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-zinc-200 bg-zinc-100 p-6 relative h-[360px] overflow-hidden card-lift group cursor-pointer">
            <div className="absolute inset-0 bg-pattern-grid opacity-30" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-white border border-zinc-300 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8 text-zinc-900 animate-pulse" />
              </div>
              <h4 className="text-lg font-black text-zinc-900">{t('contact.mapTitle')}</h4>
              <p className="text-sm font-medium text-zinc-500 mt-2 max-w-[200px] leading-relaxed">
                {t('contact.mapDesc')}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
