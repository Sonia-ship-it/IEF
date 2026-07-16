"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  ArrowRight
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navGroups = [
    {
      label: t('footer.navigate'),
      links: [
        { name: t('nav.home'), view: '/' },
        { name: t('nav.shop'), view: '/shop' },
        { name: t('nav.services'), view: '/services' },
        { name: t('nav.about'), view: '/about' },
        { name: t('footer.howToShop'), view: '/how-to-shop' },
      ]
    },
    {
      label: t('footer.support'),
      links: [
        { name: t('footer.contactSupport'), view: '/contact' },
        { name: t('footer.refundsReturns'), view: '/returns' },
        { name: t('nav.wishlist'), view: '/wishlist' },
        { name: t('nav.cart'), view: '/cart' },
      ]
    }
  ];

  const services = [
    t('footer.serviceCctv'),
    t('footer.serviceNetwork'),
    t('footer.serviceFire'),
    t('footer.serviceSoftware'),
    t('footer.serviceElectrical'),
  ];

  return (
    <footer id="footer" className="relative bg-zinc-950 text-zinc-400 font-sans mt-auto overflow-hidden">
      
      {/* Maze Pattern Overlay in Footer Top (Subtle) */}
      <div className="absolute inset-0 bg-pattern-maze-dark opacity-40 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-20">

        {/* Newsletter strip */}
        <div className="mb-16 rounded-xl border border-zinc-800 bg-zinc-900 p-8 lg:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10 shadow-lg">
          <div className="mb-8 lg:mb-0">
            <h3 className="text-xl font-black text-white">{t('footer.newsletter')}</h3>
            <p className="mt-2 text-sm text-zinc-400 font-medium">{t('footer.newsletterDesc')}</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg w-full">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('footer.emailPlaceholder')}
              className="flex-1 rounded-md bg-zinc-950 border border-zinc-700 px-5 py-3 text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-zinc-200 transition-all shrink-0"
            >
              {subscribed ? `✓ ${t('footer.subscribed')}` : <><Send className="h-4 w-4" /> {t('footer.subscribe')}</>}
            </button>
          </form>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 cursor-pointer">
              <BrandLogo size="md" />
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed mb-8 font-medium">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Linkedin, label: 'LinkedIn' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-white hover:text-zinc-950 transition-all duration-200"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.label}>
              <h4 className="text-xs font-black uppercase tracking-widest text-white mb-6">
                {group.label}
              </h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.view}>
                    <Link
                      href={link.view}
                      className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                    >
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-6">{t('footer.contactInfo')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-zinc-400 font-medium">
                <MapPin className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-400 font-medium">
                <Phone className="h-5 w-5 text-white shrink-0" />
                <span>{t('footer.phone')}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-400 font-medium">
                <Mail className="h-5 w-5 text-white shrink-0" />
                <span>{t('footer.email')}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-400 font-medium">
                <Clock className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <div>
                  <p>{t('footer.hoursWeekday')}</p>
                  <p className="text-zinc-500 mt-1">{t('footer.hoursSat')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Services tags */}
        <div className="mt-16 pt-10 border-t border-zinc-800">
          <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">{t('footer.technicalSolutions')}</p>
          <div className="flex flex-wrap gap-2">
            {services.map((s) => (
              <Link
                key={s}
                href="/services"
                className="px-4 py-2 rounded-md border border-zinc-800 text-xs font-bold text-zinc-400 bg-zinc-900 hover:border-white hover:text-white transition-colors"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500 font-semibold">
          <p>© {new Date().getFullYear()} IE &amp; F Shop. {t('footer.rights')} Kigali, Rwanda.</p>
          <div className="flex gap-6">
            <Link href="/returns" className="hover:text-white transition-colors">{t('footer.privacyPolicy')}</Link>
            <Link href="/returns" className="hover:text-white transition-colors">{t('footer.termsOfService')}</Link>
            <Link href="/returns" className="hover:text-white transition-colors">{t('footer.returnsRefunds')}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
