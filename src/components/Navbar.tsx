/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Heart,
  Menu,
  X,
  User as UserIcon,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Compass,
  Sparkles,
  Briefcase,
  HelpCircle,
  Mail
} from 'lucide-react';
import { User } from '../types';
import BrandLogo from './BrandLogo';

interface NavbarProps {
  currentView: string;
  setView: (view: any) => void;
  cartCount: number;
  wishlistCount: number;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentUser: User | null;
  logout: () => void;
}

export default function Navbar({
  currentView,
  setView,
  cartCount,
  wishlistCount,
  currentUser,
  logout
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Home', view: 'home', icon: Compass },
    { label: 'Shop', view: 'shop', icon: Sparkles },
    { label: 'Services', view: 'services', icon: Briefcase },
    { label: 'About', view: 'about', icon: HelpCircle },
    { label: 'Contact', view: 'contact', icon: Mail },
  ];

  const handleNavClick = (view: string) => {
    setView(view);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-3 bg-transparent pointer-events-none">
      <div className="mx-auto max-w-5xl w-full flex items-center justify-center gap-3 pointer-events-auto">
        
        {/* Brand Logo — Round pill */}
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm shrink-0 cursor-pointer hover:border-zinc-400 hover:shadow-md transition-all duration-200"
          onClick={() => handleNavClick('home')}
          title="Go Home"
        >
          <BrandLogo iconOnly size="sm" />
        </div>

        {/* Main Pill Nav Container */}
        <div
          className={`flex-1 flex h-16 items-center justify-between border bg-white/96 backdrop-blur-md px-4 rounded-full transition-all duration-300 ${
            scrolled ? 'shadow-lg border-zinc-300' : 'border-zinc-200 shadow-sm'
          }`}
        >
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive =
                currentView === item.view ||
                (item.view === 'shop' && currentView === 'product-detail');
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`relative flex items-center gap-2 px-4 py-2 text-sm font-semibold tracking-wide rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-zinc-900 bg-zinc-100 font-bold'
                      : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-zinc-900" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 ml-auto">
            
            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                currentView === 'wishlist'
                  ? 'text-zinc-900 bg-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-zinc-900 text-[9px] font-bold text-white border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => handleNavClick('cart')}
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                currentView === 'cart'
                  ? 'text-zinc-900 bg-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-zinc-900 text-[9px] font-bold text-white border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Divider */}
            <span className="w-px h-6 bg-zinc-200 mx-1" />

            {/* User Auth */}
            <div className="relative">
              {currentUser ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 rounded-full border border-zinc-200 pl-1.5 pr-3.5 py-1.5 text-sm font-bold text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-200"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-white text-xs font-black">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block max-w-[70px] truncate">{currentUser.name.split(' ')[0]}</span>
                  </button>

                  {userDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setUserDropdownOpen(false)} />
                      <div className="absolute right-0 mt-3 w-52 z-20 origin-top-right rounded-md border border-zinc-200 bg-white p-1.5 shadow-xl animate-slide-down">
                        <button
                          onClick={() => handleNavClick('auth')}
                          className="flex w-full items-center gap-2.5 rounded-md px-3.5 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors"
                        >
                          <UserIcon className="h-4 w-4 text-zinc-500" />
                          Profile &amp; Orders
                        </button>
                        {currentUser.role === 'admin' && (
                          <button
                            onClick={() => handleNavClick('admin')}
                            className="flex w-full items-center gap-2.5 rounded-md px-3.5 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors"
                          >
                            <LayoutDashboard className="h-4 w-4 text-zinc-500" />
                            Admin Dashboard
                          </button>
                        )}
                        <div className="border-t border-zinc-100 mt-1.5 pt-1.5">
                          <button
                            onClick={logout}
                            className="flex w-full items-center gap-2.5 rounded-md px-3.5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleNavClick('auth')}
                  className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-bold tracking-wide text-white hover:bg-zinc-700 transition-all duration-200 hover:shadow-md"
                >
                  Get Started
                </button>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full text-zinc-500 hover:bg-zinc-100 md:hidden transition-all"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mx-auto max-w-5xl mt-2 rounded-md border border-zinc-200 bg-white shadow-xl pointer-events-auto md:hidden animate-slide-down">
          <div className="px-4 py-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`flex w-full items-center justify-between rounded-md px-4 py-3 text-sm font-bold transition-all ${
                    isActive ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4.5 w-4.5 text-zinc-500" />
                    {item.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-zinc-400" />
                </button>
              );
            })}
            {!currentUser && (
              <div className="pt-3 border-t border-zinc-100 mt-2">
                <button
                  onClick={() => handleNavClick('auth')}
                  className="w-full rounded-md bg-zinc-900 py-3 text-sm font-bold text-white text-center hover:bg-zinc-700 transition-colors"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
