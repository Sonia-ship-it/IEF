/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Mail, 
  MapPin, 
  Phone,
  History, 
  FileText,
  LogOut,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { User as UserType, Order } from '../types';

interface AuthViewProps {
  currentUser: UserType | null;
  login: (email: string, role: 'customer' | 'admin', name: string) => void;
  logout: () => void;
  orders: Order[];
  setView: (view: string) => void;
}

export default function AuthView({
  currentUser,
  login,
  logout,
  orders,
  setView
}: AuthViewProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpAddress, setSignUpAddress] = useState('');
  const [signUpRole, setSignUpRole] = useState<'customer' | 'admin'>('customer');

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const userOrders = orders.filter(
    (order) => order.customerEmail.toLowerCase() === currentUser?.email.toLowerCase()
  );

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail) return;
    const emailLower = signInEmail.toLowerCase();
    if (emailLower.includes('admin')) {
      login(signInEmail, 'admin', 'Ian Admin Specialist');
    } else {
      login(signInEmail, 'customer', 'Diana Ishimwe');
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpEmail || !signUpName) return;
    login(signUpEmail, signUpRole, signUpName);
  };

  const triggerQuickLogin = (email: string) => {
    if (email === 'admin@iefshop.com') {
      login(email, 'admin', 'Ian Admin Specialist');
    } else {
      login(email, 'customer', 'Diana Ishimwe');
    }
  };

  const inputClass = "w-full rounded-md bg-zinc-50 border border-zinc-200 py-2.5 pl-10 pr-4 text-xs text-zinc-900 outline-none focus:border-zinc-900 focus:bg-white transition-colors";
  const labelClass = "block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5";

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 font-sans text-zinc-800 bg-white" id="auth-view">
      
      {!currentUser ? (
        /* LOGIN / REGISTER */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-4xl mx-auto">
          
          {/* Form */}
          <div className="lg:col-span-7 rounded-md border border-zinc-200 bg-white p-6 sm:p-8">
            {/* Tabs */}
            <div className="flex border-b border-zinc-200 mb-7">
              {(['signin', 'signup'] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 pb-3.5 text-center text-xs font-bold tracking-wide uppercase transition-all relative ${
                    activeTab === tab ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  {tab === 'signin' ? 'Sign In' : 'Register Account'}
                  {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />}
                </button>
              ))}
            </div>

            {activeTab === 'signin' ? (
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                  <label className={labelClass}>Email Address</label>
                  <div className="relative">
                    <Mail className="absolute top-2.5 left-3 h-4 w-4 text-zinc-400" />
                    <input type="email" required value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} placeholder="customer@iefshop.com" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Password</label>
                  <div className="relative">
                    <Lock className="absolute top-2.5 left-3 h-4 w-4 text-zinc-400" />
                    <input type="password" required value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
                  </div>
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full btn-primary justify-center py-3">Authenticate Account</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <div className="relative">
                    <User className="absolute top-2.5 left-3 h-4 w-4 text-zinc-400" />
                    <input type="text" required value={signUpName} onChange={(e) => setSignUpName(e.target.value)} placeholder="Jean Damascene" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <div className="relative">
                    <Mail className="absolute top-2.5 left-3 h-4 w-4 text-zinc-400" />
                    <input type="email" required value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} placeholder="jean@domain.com" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute top-2.5 left-3 h-4 w-4 text-zinc-400" />
                    <input type="tel" value={signUpPhone} onChange={(e) => setSignUpPhone(e.target.value)} placeholder="+250 788 000 000" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Delivery Address</label>
                  <div className="relative">
                    <MapPin className="absolute top-2.5 left-3 h-4 w-4 text-zinc-400" />
                    <input type="text" value={signUpAddress} onChange={(e) => setSignUpAddress(e.target.value)} placeholder="Kigali City Mall, Ground Floor" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Account Type</label>
                  <div className="flex gap-5">
                    {(['customer', 'admin'] as const).map((role) => (
                      <label key={role} className="flex items-center gap-2 text-xs font-bold cursor-pointer text-zinc-700">
                        <input type="radio" name="signUpRole" checked={signUpRole === role} onChange={() => setSignUpRole(role)} className="accent-zinc-900" />
                        {role === 'customer' ? 'Standard Shopper' : 'Store Administrator'}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full btn-primary justify-center py-3">Register &amp; Log In</button>
                </div>
              </form>
            )}
          </div>

          {/* Quick Login */}
          <div className="lg:col-span-5 rounded-md border border-zinc-200 bg-zinc-50 p-6">
            <h2 className="text-sm font-black text-zinc-900 tracking-tight mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-zinc-500" />
              Quick Sandbox Login
            </h2>
            <p className="text-xs text-zinc-500 leading-relaxed mb-5">
              Use these pre-configured accounts to instantly explore both customer and admin dashboard views.
            </p>

            <div className="space-y-3">
              {[
                { email: 'customer@iefshop.com', label: 'Standard Customer', badge: 'Demo', desc: 'Shopping guides, orders, purchase history log.' },
                { email: 'admin@iefshop.com', label: 'Store Administrator', badge: 'Admin', desc: 'CRUD control of products, services, and order statuses.' },
              ].map(({ email, label, badge, desc }) => (
                <div key={email} onClick={() => triggerQuickLogin(email)}
                  className="rounded-md border border-zinc-200 bg-white p-4 cursor-pointer hover:border-zinc-900 transition-all group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-zinc-800 group-hover:text-zinc-900">{label}</span>
                    <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[8px] font-bold text-zinc-500 uppercase border border-zinc-200">{badge}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400">Email: <strong className="text-zinc-600">{email}</strong></p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* PROFILE / ACCOUNT VIEW */
        <div className="space-y-6">
          
          {/* Profile Header */}
          <section className="rounded-md border border-zinc-200 bg-white p-5 sm:p-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-md bg-zinc-900 font-black text-2xl text-white">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-lg font-black text-zinc-950 tracking-tight">{currentUser.name}</h1>
                  <span className={`rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    currentUser.role === 'admin' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'
                  }`}>
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">{currentUser.email}</p>
                {currentUser.phone && <p className="text-xs text-zinc-400 mt-0.5">Phone: {currentUser.phone}</p>}
                {currentUser.address && <p className="text-xs text-zinc-400 mt-0.5">Address: {currentUser.address}</p>}
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              {currentUser.role === 'admin' && (
                <button onClick={() => setView('admin')} className="btn-primary">
                  Enter Admin Dashboard
                </button>
              )}
              <button onClick={logout} className="btn-outline text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </section>

          {/* Orders */}
          <section className="rounded-md border border-zinc-200 bg-white p-5 sm:p-7">
            <h2 className="text-sm font-black text-zinc-950 tracking-tight mb-5 pb-3 border-b border-zinc-100 flex items-center gap-2">
              <History className="h-4 w-4 text-zinc-900" />
              My Purchase History ({userOrders.length} records)
            </h2>

            {userOrders.length === 0 ? (
              <div className="text-center py-14">
                <FileText className="h-9 w-9 text-zinc-300 mx-auto" />
                <h3 className="mt-4 text-sm font-bold text-zinc-900">No orders recorded yet</h3>
                <p className="mt-1.5 text-xs text-zinc-500 max-w-sm mx-auto">
                  Looks like you haven't processed any invoices yet.
                </p>
                <button onClick={() => setView('shop')} className="mt-5 btn-primary">
                  Go to Shop Catalogue
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {userOrders.map((order) => {
                  const isExpanded = expandedOrder === order.id;
                  return (
                    <div key={order.id} className="rounded-md border border-zinc-200 overflow-hidden">
                      <div
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 cursor-pointer bg-zinc-50 hover:bg-zinc-100 transition-colors gap-2"
                      >
                        <div className="flex gap-4">
                          <span className="font-mono font-bold text-xs text-zinc-900">#{order.id}</span>
                          <span className="text-xs text-zinc-400">{order.date}</span>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          <span className="text-xs font-black text-zinc-950">${order.totalAmount.toFixed(2)}</span>
                          <span className={`rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                            order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status}
                          </span>
                          <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-4 border-t border-zinc-200 space-y-4 bg-white">
                          <div>
                            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Delivery Address</h4>
                            <p className="text-xs leading-normal font-semibold text-zinc-700">{order.deliveryAddress}</p>
                          </div>
                          <div>
                            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Items Ordered</h4>
                            <div className="space-y-2.5">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex gap-3 items-center">
                                  <img src={item.image} alt="" className="h-9 w-9 object-cover rounded-md border border-zinc-200" referrerPolicy="no-referrer" />
                                  <div className="flex-1 min-w-0">
                                    <h5 className="text-xs font-bold text-zinc-900 truncate">{item.productName}</h5>
                                    <p className="text-[10px] text-zinc-400 mt-0.5">Qty: {item.quantity} &times; ${item.price.toFixed(2)}</p>
                                  </div>
                                  <span className="text-xs font-black text-zinc-900">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
