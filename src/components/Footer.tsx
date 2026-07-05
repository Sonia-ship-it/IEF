/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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

interface FooterProps {
  setView: (view: any) => void;
}

export default function Footer({ setView }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const navGroups = [
    {
      label: 'Navigate',
      links: [
        { name: 'Home', view: 'home' },
        { name: 'Shop', view: 'shop' },
        { name: 'Technical Services', view: 'services' },
        { name: 'About Company', view: 'about' },
        { name: 'How to Shop', view: 'how-to-shop' },
      ]
    },
    {
      label: 'Support',
      links: [
        { name: 'Contact & Support', view: 'contact' },
        { name: 'Refunds & Returns', view: 'returns' },
        { name: 'My Wishlist', view: 'wishlist' },
        { name: 'My Cart', view: 'cart' },
      ]
    }
  ];

  const services = [
    'CCTV & Surveillance Systems',
    'Networking & Conduit Cabling',
    'Industrial Fire Alarm Systems',
    'Software & Web Applications',
    'Electrical Installation'
  ];

  return (
    <footer id="footer" className="relative bg-zinc-950 text-zinc-400 font-sans mt-auto overflow-hidden">
      
      {/* Maze Pattern Overlay in Footer Top (Subtle) */}
      <div className="absolute inset-0 bg-pattern-maze-dark opacity-40 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-20">

        {/* Newsletter strip */}
        <div className="mb-16 rounded-xl border border-zinc-800 bg-zinc-900 p-8 lg:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10 shadow-lg">
          <div className="mb-8 lg:mb-0">
            <h3 className="text-xl font-black text-white">Subscribe to our newsletter</h3>
            <p className="mt-2 text-sm text-zinc-400 font-medium">Restocking events, exclusive sales, and safety guides.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg w-full">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-md bg-zinc-950 border border-zinc-700 px-5 py-3 text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-zinc-200 transition-all shrink-0"
            >
              {subscribed ? '✓ Done!' : <><Send className="h-4 w-4" /> Subscribe</>}
            </button>
          </form>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="cursor-pointer mb-6" onClick={() => setView('home')}>
              <BrandLogo size="md" />
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-8 font-medium">
              The premier destination combining fashion, electronics, and engineering services in Kigali, Rwanda.
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
                    <button
                      onClick={() => setView(link.view)}
                      className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                    >
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white" />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-zinc-400 font-medium">
                <MapPin className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <span>KN 4 Ave, Kigali City Mall, Ground Floor, Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-400 font-medium">
                <Phone className="h-5 w-5 text-white shrink-0" />
                <span>+250 788 345 678</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-400 font-medium">
                <Mail className="h-5 w-5 text-white shrink-0" />
                <span>info@iefshop.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-400 font-medium">
                <Clock className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <div>
                  <p>Mon–Fri: 8:00 AM – 6:00 PM</p>
                  <p className="text-zinc-500 mt-1">Sat: 9:00 AM – 3:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Services tags */}
        <div className="mt-16 pt-10 border-t border-zinc-800">
          <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">Technical Solutions</p>
          <div className="flex flex-wrap gap-2">
            {services.map((s) => (
              <button
                key={s}
                onClick={() => setView('services')}
                className="px-4 py-2 rounded-md border border-zinc-800 text-xs font-bold text-zinc-400 bg-zinc-900 hover:border-white hover:text-white transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500 font-semibold">
          <p>© {new Date().getFullYear()} IE &amp; F Shop. All rights reserved. Kigali, Rwanda.</p>
          <div className="flex gap-6">
            <button onClick={() => setView('returns')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => setView('returns')} className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => setView('returns')} className="hover:text-white transition-colors">Returns &amp; Refunds</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
