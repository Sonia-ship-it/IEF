/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Camera,
  ShieldAlert,
  Globe,
  Zap,
  Code,
  CheckCircle,
  PhoneCall,
  User,
  Mail,
  Wrench,
  X,
  ArrowRight
} from 'lucide-react';
import { Service } from '../types';

interface ServicesViewProps {
  services: Service[];
  onRequestService: (request: {
    serviceTitle: string;
    customerName: string;
    customerEmail: string;
    phone: string;
    message: string;
  }) => void;
}

export default function ServicesView({ services, onRequestService }: ServicesViewProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [requestedServiceTitle, setRequestedServiceTitle] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera': return Camera;
      case 'ShieldAlert': return ShieldAlert;
      case 'Globe': return Globe;
      case 'Zap': return Zap;
      case 'Code': return Code;
      default: return Wrench;
    }
  };

  const handleOpenRequest = (service: Service) => {
    setSelectedService(service);
    setRequestedServiceTitle(service.title);
    setRequestSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !requestedServiceTitle) {
      alert('Please complete all fields to dispatch service request.');
      return;
    }
    onRequestService({ serviceTitle: requestedServiceTitle, customerName: name, customerEmail: email, phone, message });
    setRequestSubmitted(true);
    setName(''); setEmail(''); setPhone(''); setMessage('');
    setTimeout(() => { setRequestSubmitted(false); setSelectedService(null); }, 4000);
  };

  return (
    <div id="services-view" className="font-sans bg-white">

      {/* Hero Banner with Maze Pattern (Charcoal & White) */}
      <div className="relative border-b border-zinc-200 py-16 px-6 bg-pattern-maze text-zinc-900">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-zinc-200 text-[10px] font-bold uppercase tracking-wider text-zinc-700 rounded-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
            Engineering &amp; IT Solutions
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950 leading-tight">
            Technical Solutions &amp; System Installations
          </h1>
          <p className="mt-5 text-zinc-500 text-sm max-w-2xl mx-auto leading-relaxed">
            We house certified technical installers and experienced software engineers to service your infrastructure. Explore our offerings and book site assessments below.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => {
            const Icon = getIcon(srv.icon);
            return (
              <div
                key={srv.id}
                className="group flex flex-col overflow-hidden rounded-md border border-zinc-200 bg-white card-lift"
              >
                {/* Cover Image */}
                <div className="relative aspect-video overflow-hidden bg-zinc-50 border-b border-zinc-200">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                    <div className="rounded-md bg-zinc-900 p-2 shadow-md">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-xs uppercase tracking-wider">{srv.title}</h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-1 flex-col justify-between">
                  <div>
                    <p className="text-xs text-zinc-500 leading-relaxed mb-5 font-medium">{srv.description}</p>
                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Scope Includes:</h4>
                    <ul className="space-y-2 mb-6">
                      {srv.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-600">
                          <span className="text-zinc-900 font-bold shrink-0 mt-0.5">›</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-zinc-100 pt-4 mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Pricing</span>
                      <span className="text-xs font-bold text-zinc-700 bg-zinc-100 px-2 py-1 rounded-md">{srv.priceInfo}</span>
                    </div>
                    <button
                      onClick={() => handleOpenRequest(srv)}
                      className="btn-primary w-full justify-center"
                    >
                      Request Survey
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm" id="service-modal">
          <div className="relative w-full max-w-lg rounded-md bg-white shadow-xl overflow-y-auto max-h-[92vh] border border-zinc-200">
            <div className="p-6">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-md bg-zinc-100 text-zinc-500 hover:bg-zinc-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              {requestSubmitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-zinc-100 text-zinc-900 mb-4 border border-zinc-200">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-black text-zinc-900">Request Submitted!</h3>
                  <p className="mt-3 text-xs text-zinc-500 max-w-xs mx-auto leading-relaxed">
                    We've registered your booking for <strong>{requestedServiceTitle}</strong>. Our team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-zinc-900">Book Survey Consultation</h3>
                    <p className="text-xs text-zinc-400 mt-1">Complete this form to request an expert onsite assessment.</p>
                  </div>

                  {/* Service select */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Chosen Service</label>
                    <select
                      value={requestedServiceTitle}
                      onChange={(e) => setRequestedServiceTitle(e.target.value)}
                      className="w-full rounded-md bg-zinc-50 border border-zinc-200 px-3.5 py-2.5 text-xs font-semibold text-zinc-700 outline-none focus:border-zinc-900 focus:bg-white transition-colors"
                    >
                      {services.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Your Full Name</label>
                    <div className="relative">
                      <User className="absolute top-3 left-3 h-4 w-4 text-zinc-400" />
                      <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Jean Damascene"
                        className="w-full rounded-md bg-zinc-50 border border-zinc-200 py-2.5 pl-9 pr-4 text-xs text-zinc-900 outline-none focus:border-zinc-900 focus:bg-white transition-colors" />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Email</label>
                      <div className="relative">
                        <Mail className="absolute top-3 left-3 h-4 w-4 text-zinc-400" />
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                          className="w-full rounded-md bg-zinc-50 border border-zinc-200 py-2.5 pl-9 pr-4 text-xs text-zinc-900 outline-none focus:border-zinc-900 focus:bg-white transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Phone</label>
                      <div className="relative">
                        <PhoneCall className="absolute top-3 left-3 h-4 w-4 text-zinc-400" />
                        <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+250 788 000 000"
                          className="w-full rounded-md bg-zinc-50 border border-zinc-200 py-2.5 pl-9 pr-4 text-xs text-zinc-900 outline-none focus:border-zinc-900 focus:bg-white transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Project Details</label>
                    <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe what you need..."
                      className="w-full rounded-md bg-zinc-50 border border-zinc-200 px-4 py-2.5 text-xs text-zinc-900 outline-none focus:border-zinc-900 focus:bg-white transition-colors resize-none" />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center">
                    Submit Booking Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
