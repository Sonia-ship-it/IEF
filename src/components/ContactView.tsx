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
  Send, 
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill in your name, email, and message content.');
      return;
    }
    setSubmitted(true);
    setName(''); setEmail(''); setPhone(''); setMessage('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 font-sans text-zinc-950 bg-white" id="contact-view">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Client Communications</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-950 sm:text-6xl">
          Connect With Our Specialists
        </h1>
        <p className="mt-6 text-lg text-zinc-500 leading-relaxed font-medium">
          Need sizing advice on luxury fashion sets, have product questions, or require urgent assistance on surveillance maintenance? Get in touch immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
        
        {/* Left: Form */}
        <div className="lg:col-span-7 rounded-md border border-zinc-200 bg-white p-8 sm:p-12 card-lift">
          {submitted ? (
            <div className="text-center py-20">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-md bg-zinc-100 text-zinc-900 mb-6 border border-zinc-200">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black text-zinc-950">Message Dispatched!</h3>
              <p className="mt-4 text-base text-zinc-500 leading-relaxed max-w-sm mx-auto font-medium">
                Thank you for connecting with us. A designated specialist will contact you within 2 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-8">Send Us a Direct Message</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Full Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Jean Damascene"
                    className="w-full rounded-md bg-zinc-50 border border-zinc-200 px-5 py-3.5 text-sm outline-none focus:border-zinc-900 focus:bg-white transition-colors text-zinc-950 font-medium placeholder:text-zinc-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Email Address</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="damascene@domain.com"
                    className="w-full rounded-md bg-zinc-50 border border-zinc-200 px-5 py-3.5 text-sm outline-none focus:border-zinc-900 focus:bg-white transition-colors text-zinc-950 font-medium placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Phone Number (Optional)</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="+250 788 000 000"
                  className="w-full rounded-md bg-zinc-50 border border-zinc-200 px-5 py-3.5 text-sm outline-none focus:border-zinc-900 focus:bg-white transition-colors text-zinc-950 font-medium placeholder:text-zinc-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Message</label>
                <textarea required rows={6} value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your questions or service requests..."
                  className="w-full rounded-md bg-zinc-50 border border-zinc-200 px-5 py-3.5 text-sm outline-none focus:border-zinc-900 focus:bg-white transition-colors text-zinc-950 font-medium resize-none placeholder:text-zinc-400"
                />
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full btn-primary justify-center py-4 text-base">
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Contact Info & Map */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="rounded-md border border-zinc-200 bg-white p-8 sm:p-10 card-lift">
            <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-8 pb-4 border-b border-zinc-100">Support Coordinates</h2>
            
            <ul className="space-y-8 text-sm">
              {[
                { Icon: MapPin, title: 'Store Address', lines: ['KN 4 Ave, Kigali City Mall', 'Ground Floor, Kigali, Rwanda'] },
                { Icon: Phone, title: 'Official Hotlines', lines: ['General Sales: +250 788 345 678', 'Specialist Surveys: +250 789 123 456'] },
                { Icon: Mail, title: 'Email Address', lines: ['Support: info@iefshop.com', 'Corporate: b2b@iefshop.com'] },
                { Icon: Clock, title: 'Office Hours', lines: ['Mon–Fri: 8:00 AM – 6:00 PM', 'Saturday: 9:00 AM – 3:00 PM'] },
              ].map(({ Icon, title, lines }) => (
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

          {/* Expanded Map placeholder */}
          <div className="rounded-md border border-zinc-200 bg-zinc-100 p-6 relative h-[360px] overflow-hidden card-lift group cursor-pointer">
            <div className="absolute inset-0 bg-pattern-grid opacity-30" />
            
            {/* Visual map representation */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-white border border-zinc-300 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8 text-zinc-900 animate-pulse" />
              </div>
              <h4 className="text-lg font-black text-zinc-900">Kigali City Mall Branch</h4>
              <p className="text-sm font-medium text-zinc-500 mt-2 max-w-[200px] leading-relaxed">
                Click to open interactive map for directions.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
