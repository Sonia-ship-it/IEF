/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ShoppingBag, 
  Wrench, 
  FileText, 
  Users, 
  Check, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle2,
  X,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Package,
  BarChart3,
  Menu,
  Upload,
  AlertTriangle
} from 'lucide-react';
import { Product, Service, Order, User } from '../types';
import { formatCurrency } from '../utils/currency';

interface AdminDashboardViewProps {
  products: Product[];
  services: Service[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onAddService: (service: Service) => void;
  onUpdateService: (service: Service) => void;
  onDeleteService: (serviceId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  setView: (view: string) => void;
}

export default function AdminDashboardView({
  products,
  services,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onAddService,
  onUpdateService,
  onDeleteService,
  onUpdateOrderStatus,
  setView
}: AdminDashboardViewProps) {
  const { t } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'products' | 'services' | 'orders' | 'users' | 'settings'>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Product Edit/Add form states
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodCategory, setProdCategory] = useState<'Electronics' | 'Clothing & Fashion' | 'Jewelry' | 'Footwear'>('Electronics');
  const [prodSubcategory, setProdSubcategory] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImages, setProdImages] = useState(''); // kept for edit fallback URL
  const [uploadedProdImages, setUploadedProdImages] = useState<string[]>([]); // base64
  const prodFileRef = useRef<HTMLInputElement>(null);
  const [prodStock, setProdStock] = useState('');
  const [prodIsBestSeller, setProdIsBestSeller] = useState(false);
  const [prodIsFeatured, setProdIsFeatured] = useState(false);

  // Service Edit/Add form states
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [srvTitle, setSrvTitle] = useState('');
  const [srvDesc, setSrvDesc] = useState('');
  const [srvDetails, setSrvDetails] = useState('');
  const [srvPrice, setSrvPrice] = useState('');
  const [srvImage, setSrvImage] = useState(''); // kept for edit fallback URL
  const [uploadedSrvImage, setUploadedSrvImage] = useState<string>(''); // base64
  const srvFileRef = useRef<HTMLInputElement>(null);

  // Delete Confirmation Modal State
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: 'product' | 'service' | null;
    id: string | null;
    name: string;
  }>({ isOpen: false, type: null, id: null, name: '' });

  // Stats Card Calculations
  const totalSales = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((acc, o) => acc + o.totalAmount, 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;
  const completedOrdersCount = orders.filter(o => o.status === 'Completed').length;
  const shippedOrdersCount = orders.filter(o => o.status === 'Shipped').length;

  // --- PRODUCTS FORM CRUD LOGIC ---
  const handleEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProdName(p.name);
    setProdPrice(p.price.toString());
    setProdCategory(p.category);
    setProdSubcategory(p.subcategory);
    setProdDesc(p.description);
    setProdImages(p.images.join(', '));
    setUploadedProdImages([]); // clear file uploads when switching to edit
    if (prodFileRef.current) prodFileRef.current.value = '';
    setProdStock(p.stock.toString());
    setProdIsBestSeller(!!p.isBestSeller);
    setProdIsFeatured(!!p.isFeatured);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodPrice || !prodStock) {
      alert('Please fill out all product fields.');
      return;
    }

    const imgsList = uploadedProdImages.length > 0
      ? uploadedProdImages
      : prodImages.split(',').map(s => s.trim()).filter(Boolean);
    const imagesArray = imgsList.length > 0 ? imgsList : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'];

    const productPayload: Product = {
      id: editingProductId || `prod-custom-${Date.now()}`,
      name: prodName,
      price: parseFloat(prodPrice),
      description: prodDesc,
      category: prodCategory,
      subcategory: prodSubcategory || 'General',
      images: imagesArray,
      stock: parseInt(prodStock),
      rating: editingProductId ? (products.find(p => p.id === editingProductId)?.rating || 4.5) : 4.5,
      reviewsCount: editingProductId ? (products.find(p => p.id === editingProductId)?.reviewsCount || 1) : 0,
      isBestSeller: prodIsBestSeller,
      isFeatured: prodIsFeatured
    };

    if (editingProductId) {
      onUpdateProduct(productPayload);
      setEditingProductId(null);
    } else {
      onAddProduct(productPayload);
    }

    // Reset Form
    setProdName('');
    setProdPrice('');
    setProdSubcategory('');
    setProdDesc('');
    setProdImages('');
    setUploadedProdImages([]);
    if (prodFileRef.current) prodFileRef.current.value = '';
    setProdStock('');
    setProdIsBestSeller(false);
    setProdIsFeatured(false);
  };

  // --- SERVICES FORM CRUD LOGIC ---
  const handleEditService = (s: Service) => {
    setEditingServiceId(s.id);
    setSrvTitle(s.title);
    setSrvDesc(s.description);
    setSrvDetails(s.details.join(', '));
    setSrvPrice(s.priceInfo);
    setSrvImage(s.image);
    setUploadedSrvImage(''); // clear file upload when switching to edit
    if (srvFileRef.current) srvFileRef.current.value = '';
  };

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvTitle || !srvPrice) {
      alert('Please fill out service title and pricing.');
      return;
    }

    const detailsArray = srvDetails.split(',').map(s => s.trim()).filter(Boolean);

    const servicePayload: Service = {
      id: editingServiceId || `srv-custom-${Date.now()}`,
      title: srvTitle,
      description: srvDesc,
      details: detailsArray,
      priceInfo: srvPrice,
      icon: editingServiceId ? (services.find(s => s.id === editingServiceId)?.icon || 'Wrench') : 'Wrench',
      image: uploadedSrvImage || srvImage || 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80'
    };

    if (editingServiceId) {
      onUpdateService(servicePayload);
      setEditingServiceId(null);
    } else {
      onAddService(servicePayload);
    }

    // Reset Form
    setSrvTitle('');
    setSrvDesc('');
    setSrvDetails('');
    setSrvPrice('');
    setSrvImage('');
    setUploadedSrvImage('');
    if (srvFileRef.current) srvFileRef.current.value = '';
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Order Management', icon: FileText },
    { id: 'products', label: 'Product Catalog', icon: ShoppingBag },
    { id: 'services', label: 'Service Management', icon: Wrench },
    { id: 'users', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  /* ================================================================
     SIDEBAR COMPONENT (shared between desktop & mobile)
     ================================================================ */
  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className={`flex items-center gap-3 px-5 py-6 border-b border-zinc-800 ${sidebarCollapsed && !isMobile ? 'justify-center px-3' : ''}`}>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-white shrink-0">
          <LayoutDashboard className="h-5 w-5" />
        </div>
        {(!sidebarCollapsed || isMobile) && (
          <div className="min-w-0">
            <span className="block text-sm font-extrabold text-white tracking-tight truncate">IE &amp; F Admin</span>
            <span className="block text-[10px] text-zinc-500 font-medium">Control Panel</span>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSubTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveSubTab(item.id as any);
                if (isMobile) setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              } ${sidebarCollapsed && !isMobile ? 'justify-center px-2.5' : ''}`}
              title={sidebarCollapsed && !isMobile ? item.label : undefined}
            >
              <Icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
              {(!sidebarCollapsed || isMobile) && (
                <span className="truncate">{item.label}</span>
              )}
              {isActive && (!sidebarCollapsed || isMobile) && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white shrink-0" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className={`px-3 py-4 border-t border-zinc-800 ${sidebarCollapsed && !isMobile ? 'px-2' : ''}`}>
        <button
          onClick={() => setView('home')}
          className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-zinc-500 hover:text-red-400 hover:bg-zinc-800/50 transition-all ${sidebarCollapsed && !isMobile ? 'justify-center px-2.5' : ''}`}
          title={sidebarCollapsed && !isMobile ? 'Exit Dashboard' : undefined}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />
          {(!sidebarCollapsed || isMobile) && <span>Exit Dashboard</span>}
        </button>
      </div>
    </div>
  );

  /* ================================================================
     INPUT HELPER CLASS
     ================================================================ */
  const inputClass = "w-full rounded-md bg-zinc-50 border border-zinc-200 px-3.5 py-2.5 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors placeholder:text-zinc-400";
  const labelClass = "block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5";

  return (
    <div className="flex h-screen bg-zinc-100 overflow-hidden -mx-0 font-sans" id="admin-dashboard-view">
      
      {/* ============================================================
         MOBILE SIDEBAR OVERLAY
         ============================================================ */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileSidebarOpen(false)} />
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-zinc-950 z-50 animate-fade-left">
            <SidebarContent isMobile />
          </div>
        </div>
      )}

      {/* ============================================================
         DESKTOP SIDEBAR
         ============================================================ */}
      <aside className={`hidden lg:flex flex-col bg-zinc-950 shrink-0 transition-all duration-300 ${
        sidebarCollapsed ? 'w-[68px]' : 'w-60'
      }`}>
        <SidebarContent />
        
        {/* Collapse Toggle */}
        <div className="px-3 pb-3">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center rounded-lg py-2 text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800/50 transition-all"
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </aside>

      {/* ============================================================
         MAIN CONTENT AREA
         ============================================================ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Bar */}
        <header className="flex items-center justify-between bg-white border-b border-zinc-200 px-6 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileSidebarOpen(true)} 
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-zinc-950">
                {sidebarItems.find(i => i.id === activeSubTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-zinc-400 font-medium">IE &amp; F Company Ltd — Administrative Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block rounded-md bg-zinc-950 px-3 py-1.5 text-[10px] font-bold text-white uppercase tracking-wider">
              Store Admin
            </span>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">

          {/* ============================================================
             DASHBOARD OVERVIEW
             ============================================================ */}
          {activeSubTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="group relative bg-white border border-zinc-200 rounded-md p-8 card-lift hover:border-zinc-300 transition-colors flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Total Sales</span>
                    <span className="text-2xl font-black text-zinc-900 mt-1 block">{formatCurrency(totalSales)}</span>
                  </div>
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-md bg-zinc-900 text-white shadow-sm transition-transform group-hover:scale-110 duration-300">
                    <DollarSign className="h-5 w-5" />
                  </div>
                </div>

                <div className="group relative bg-white border border-zinc-200 rounded-md p-8 card-lift hover:border-zinc-300 transition-colors flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">{t('admin.pendingOrders')}</span>
                    <span className="text-2xl font-black text-zinc-900 mt-1 block">{pendingOrdersCount}</span>
                  </div>
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-md bg-zinc-900 text-white shadow-sm transition-transform group-hover:scale-110 duration-300">
                    <Clock className="h-5 w-5" />
                  </div>
                </div>

                <div className="group relative bg-white border border-zinc-200 rounded-md p-8 card-lift hover:border-zinc-300 transition-colors flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Completed</span>
                    <span className="text-2xl font-black text-zinc-900 mt-1 block">{completedOrdersCount}</span>
                  </div>
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-md bg-zinc-900 text-white shadow-sm transition-transform group-hover:scale-110 duration-300">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                </div>

                <div className="group relative bg-white border border-zinc-200 rounded-md p-8 card-lift hover:border-zinc-300 transition-colors flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Active Products</span>
                    <span className="text-2xl font-black text-zinc-900 mt-1 block">{products.length}</span>
                  </div>
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-md bg-zinc-900 text-white shadow-sm transition-transform group-hover:scale-110 duration-300">
                    <Package className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Quick Overview Panels */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Recent Orders */}
                <div className="bg-white border border-zinc-200 rounded-md card-lift hover:border-zinc-300 transition-colors p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Recent Orders</h3>
                    <button onClick={() => setActiveSubTab('orders')} className="text-xs font-semibold text-zinc-400 hover:text-zinc-900 transition-colors">
                      View All →
                    </button>
                  </div>
                  {orders.length === 0 ? (
                    <p className="text-center py-8 text-zinc-400 text-xs">No orders yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {orders.slice(-5).reverse().map((o) => (
                        <div key={o.id} className="flex items-center justify-between py-2 border-b border-zinc-100 last:border-0">
                          <div className="min-w-0">
                            <span className="block text-xs font-bold text-zinc-900 truncate">{o.customerName}</span>
                            <span className="block text-[10px] text-zinc-400 font-mono">{o.id}</span>
                          </div>
                          <div className="text-right shrink-0 ml-3">
                            <span className="block text-xs font-bold text-zinc-900">{formatCurrency(o.totalAmount)}</span>
                            <span className={`text-[10px] font-bold uppercase ${
                              o.status === 'Pending' ? 'text-amber-500' :
                              o.status === 'Shipped' ? 'text-blue-500' :
                              o.status === 'Completed' ? 'text-emerald-500' :
                              'text-red-500'
                            }`}>{o.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Inventory Summary */}
                <div className="bg-white border border-zinc-200 rounded-md card-lift hover:border-zinc-300 transition-colors p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Inventory Summary</h3>
                    <button onClick={() => setActiveSubTab('products')} className="text-xs font-semibold text-zinc-400 hover:text-zinc-900 transition-colors">
                      View All →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {['Electronics', 'Clothing & Fashion', 'Jewelry', 'Footwear'].map(cat => {
                      const count = products.filter(p => p.category === cat).length;
                      const totalStock = products.filter(p => p.category === cat).reduce((sum, p) => sum + p.stock, 0);
                      return (
                        <div key={cat} className="flex items-center justify-between py-2 border-b border-zinc-100 last:border-0">
                          <span className="text-xs font-semibold text-zinc-700">{cat}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] text-zinc-400 font-bold uppercase">{count} items</span>
                            <span className="text-xs font-bold text-zinc-900">{totalStock} in stock</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-500">Services Offered</span>
                    <span className="text-sm font-black text-zinc-900">{services.length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
             ORDER MANAGEMENT
             ============================================================ */}
          {activeSubTab === 'orders' && (
            <div className="bg-white border border-zinc-200 rounded-md card-lift hover:border-zinc-300 transition-colors">
              <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
                <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                  Customer Orders ({orders.length})
                </h2>
              </div>
              
              {orders.length === 0 ? (
                <p className="text-center py-16 text-zinc-400 text-sm">No customer orders recorded yet.</p>
              ) : (
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-xs text-zinc-600 min-w-[700px]">
                    <thead className="bg-zinc-50 uppercase text-[10px] font-bold text-zinc-400 tracking-wider">
                      <tr>
                        <th className="px-6 py-3">{t('admin.id')}</th>
                        <th className="px-6 py-3">{t('admin.customer')}</th>
                        <th className="px-6 py-3">Items</th>
                        <th className="px-6 py-3">Payment</th>
                        <th className="px-6 py-3">{t('admin.total')}</th>
                        <th className="px-6 py-3">{t('admin.status')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-zinc-900">{o.id}</td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-zinc-900">{o.customerName}</div>
                            <div className="text-[10px] text-zinc-400">{o.customerEmail}</div>
                            <div className="text-[10px] text-zinc-400 mt-0.5 truncate max-w-[180px]">{o.deliveryAddress}</div>
                          </td>
                          <td className="px-6 py-4 font-medium">
                            <ul className="space-y-0.5">
                              {o.items.map((item, idx) => (
                                <li key={idx} className="text-[10px] truncate max-w-[180px]">
                                  • {item.productName} ×{item.quantity}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="px-6 py-4 uppercase font-bold text-[10px] text-zinc-400">{o.paymentMethod}</td>
                          <td className="px-6 py-4 font-extrabold text-zinc-900">${o.totalAmount.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <select
                              value={o.status}
                              onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as any)}
                              className="rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] font-bold outline-none focus:border-zinc-900"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ============================================================
             PRODUCT MANAGEMENT
             ============================================================ */}
          {activeSubTab === 'products' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
              
              {/* Add / Edit Form Panel */}
              <div className="xl:col-span-5 bg-white border border-zinc-200 rounded-md card-lift hover:border-zinc-300 transition-colors p-6">
                <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-5 flex items-center justify-between">
                  <span>{editingProductId ? 'Update Product' : 'Add New Product'}</span>
                  {editingProductId && (
                    <button 
                      onClick={() => {
                        setEditingProductId(null);
                        setProdName('');
                        setProdPrice('');
                        setProdDesc('');
                        setProdStock('');
                        setProdImages('');
                        setUploadedProdImages([]);
                        if (prodFileRef.current) prodFileRef.current.value = '';
                      }}
                      className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </h2>

                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div>
                    <label className={labelClass}>{t('admin.prodName')}</label>
                    <input
                      type="text"
                      required
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      placeholder="e.g. Classic Heavyweight Oversized Tee"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>{t('admin.category')}</label>
                      <select
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value as any)}
                        className={inputClass}
                      >
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing & Fashion">Clothing &amp; Fashion</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Footwear">Footwear</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Subcategory</label>
                      <input
                        type="text"
                        required
                        value={prodSubcategory}
                        onChange={(e) => setProdSubcategory(e.target.value)}
                        placeholder="e.g. T-Shirts"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Price (USD)</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={prodPrice}
                        onChange={(e) => setProdPrice(e.target.value)}
                        placeholder="24.99"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Stock Quantity</label>
                      <input
                        type="number"
                        required
                        value={prodStock}
                        onChange={(e) => setProdStock(e.target.value)}
                        placeholder="25"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Product Images</label>
                    <div
                      onClick={() => prodFileRef.current?.click()}
                      className="border-2 border-dashed border-zinc-200 rounded-md p-4 cursor-pointer hover:border-zinc-400 transition-colors text-center"
                    >
                      {uploadedProdImages.length > 0 ? (
                        <div className="flex flex-wrap gap-2 justify-center">
                          {uploadedProdImages.map((src, i) => (
                            <img key={i} src={src} alt={`preview-${i}`} className="h-16 w-16 object-cover rounded-md border border-zinc-200" />
                          ))}
                          <div className="w-full text-[10px] text-zinc-400 mt-1">{uploadedProdImages.length} image(s) — click to change</div>
                        </div>
                      ) : prodImages ? (
                        <div>
                          <img src={prodImages.split(',')[0].trim()} alt="current" className="h-16 w-16 object-cover rounded-md border border-zinc-200 mx-auto" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
                          <div className="text-[10px] text-zinc-400 mt-1">Current image — click to upload new</div>
                        </div>
                      ) : (
                        <div className="py-3">
                          <Upload className="h-6 w-6 text-zinc-300 mx-auto mb-1" />
                          <p className="text-xs text-zinc-400">Click to upload images</p>
                          <p className="text-[10px] text-zinc-300 mt-0.5">PNG, JPG, WEBP — multiple allowed</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={prodFileRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length === 0) return;
                        const readers = files.map(file => new Promise<string>((resolve) => {
                          const reader = new FileReader();
                          reader.onload = () => resolve(reader.result as string);
                          reader.readAsDataURL(file);
                        }));
                        Promise.all(readers).then(results => setUploadedProdImages(results));
                      }}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea
                      rows={3}
                      value={prodDesc}
                      onChange={(e) => setProdDesc(e.target.value)}
                      placeholder="Describe the product..."
                      className={inputClass}
                    />
                  </div>

                  <div className="flex gap-5 border-t border-zinc-100 pt-3">
                    <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-zinc-600">
                      <input
                        type="checkbox"
                        checked={prodIsBestSeller}
                        onChange={(e) => setProdIsBestSeller(e.target.checked)}
                        className="rounded border-zinc-300"
                      />
                      Bestseller
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-zinc-600">
                      <input
                        type="checkbox"
                        checked={prodIsFeatured}
                        onChange={(e) => setProdIsFeatured(e.target.checked)}
                        className="rounded border-zinc-300"
                      />
                      Featured
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center"
                  >
                    <Plus className="h-4 w-4" />
                    {editingProductId ? 'Update Product' : 'Add Product'}
                  </button>
                </form>
              </div>

              {/* Products List Panel */}
              <div className="xl:col-span-7 bg-white border border-zinc-200 rounded-md card-lift hover:border-zinc-300 transition-colors">
                <div className="px-6 py-4 border-b border-zinc-100">
                  <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    Product Catalog ({products.length})
                  </h2>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-xs text-zinc-600 min-w-[500px]">
                    <thead className="bg-zinc-50 uppercase text-[10px] font-bold text-zinc-400 tracking-wider">
                      <tr>
                        <th className="px-6 py-3">Product</th>
                        <th className="px-6 py-3">{t('admin.category')}</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Stock</th>
                        <th className="px-6 py-3 text-right">{t('admin.actions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="px-6 py-3">
                            <div className="flex gap-2.5 items-center">
                              <img 
                                src={p.images[0]} 
                                alt="" 
                                className="h-9 w-9 object-cover rounded-md border border-zinc-200" 
                                referrerPolicy="no-referrer"
                              />
                              <div className="min-w-0">
                                <h4 className="font-bold text-zinc-900 truncate max-w-[150px]">{p.name}</h4>
                                <span className="text-[9px] text-zinc-400 uppercase">{p.subcategory}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-[10px] uppercase font-bold text-zinc-400">{p.category}</td>
                          <td className="px-6 py-3 font-bold text-zinc-900">{formatCurrency(p.price)}</td>
                          <td className="px-6 py-3">
                            <span className={`font-bold ${p.stock <= 8 ? 'text-red-500' : 'text-zinc-700'}`}>{p.stock}</span>
                          </td>
                          <td className="px-6 py-3 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => handleEditProduct(p)}
                              className="p-1.5 rounded-md bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors"
                              title="Edit product"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteModal({ isOpen: true, type: 'product', id: p.id, name: p.name })}
                              className="p-1.5 rounded-md bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================
             SERVICE MANAGEMENT
             ============================================================ */}
          {activeSubTab === 'services' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
              
              {/* Add / Edit Form Panel */}
              <div className="xl:col-span-5 bg-white border border-zinc-200 rounded-md card-lift hover:border-zinc-300 transition-colors p-6">
                <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-5 flex items-center justify-between">
                  <span>{editingServiceId ? 'Update Service' : 'Add New Service'}</span>
                  {editingServiceId && (
                    <button 
                      onClick={() => {
                        setEditingServiceId(null);
                        setSrvTitle('');
                        setSrvDesc('');
                        setSrvDetails('');
                        setSrvPrice('');
                        setSrvImage('');
                      }}
                      className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </h2>

                <form onSubmit={handleServiceSubmit} className="space-y-4">
                  <div>
                    <label className={labelClass}>{t('admin.title')}</label>
                    <input
                      type="text"
                      required
                      value={srvTitle}
                      onChange={(e) => setSrvTitle(e.target.value)}
                      placeholder="e.g. Fire Fighting System Installation"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Pricing Terms</label>
                    <input
                      type="text"
                      required
                      value={srvPrice}
                      onChange={(e) => setSrvPrice(e.target.value)}
                      placeholder="e.g. From $150 (depends on camera count)"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Cover Image</label>
                    <div
                      onClick={() => srvFileRef.current?.click()}
                      className="border-2 border-dashed border-zinc-200 rounded-md p-4 cursor-pointer hover:border-zinc-400 transition-colors text-center"
                    >
                      {uploadedSrvImage ? (
                        <div>
                          <img src={uploadedSrvImage} alt="preview" className="h-20 w-full object-cover rounded-md border border-zinc-200 mb-1" />
                          <div className="text-[10px] text-zinc-400">Image selected — click to change</div>
                        </div>
                      ) : srvImage ? (
                        <div>
                          <img src={srvImage} alt="current" className="h-20 w-full object-cover rounded-md border border-zinc-200 mb-1" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
                          <div className="text-[10px] text-zinc-400">Current image — click to upload new</div>
                        </div>
                      ) : (
                        <div className="py-3">
                          <Upload className="h-6 w-6 text-zinc-300 mx-auto mb-1" />
                          <p className="text-xs text-zinc-400">Click to upload a cover image</p>
                          <p className="text-[10px] text-zinc-300 mt-0.5">PNG, JPG, WEBP supported</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={srvFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = () => setUploadedSrvImage(reader.result as string);
                        reader.readAsDataURL(file);
                      }}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Included Scopes (comma separated)</label>
                    <textarea
                      rows={2}
                      value={srvDetails}
                      onChange={(e) => setSrvDetails(e.target.value)}
                      placeholder="Onsite survey, Hardware mounting, Software testing..."
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Service Description</label>
                    <textarea
                      rows={3}
                      value={srvDesc}
                      onChange={(e) => setSrvDesc(e.target.value)}
                      placeholder="Explain scope, certifications, warranties..."
                      className={inputClass}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center"
                  >
                    <Plus className="h-4 w-4" />
                    {editingServiceId ? 'Update Service' : 'Add Service'}
                  </button>
                </form>
              </div>

              {/* Services List Panel */}
              <div className="xl:col-span-7 bg-white border border-zinc-200 rounded-md card-lift hover:border-zinc-300 transition-colors">
                <div className="px-6 py-4 border-b border-zinc-100">
                  <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    Registered Services ({services.length})
                  </h2>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-xs text-zinc-600 min-w-[500px]">
                    <thead className="bg-zinc-50 uppercase text-[10px] font-bold text-zinc-400 tracking-wider">
                      <tr>
                        <th className="px-6 py-3">Service</th>
                        <th className="px-6 py-3">Pricing</th>
                        <th className="px-6 py-3">Details</th>
                        <th className="px-6 py-3 text-right">{t('admin.actions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {services.map((s) => (
                        <tr key={s.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="px-6 py-3 font-bold text-zinc-900">{s.title}</td>
                          <td className="px-6 py-3 text-[11px] font-semibold text-zinc-500">{s.priceInfo}</td>
                          <td className="px-6 py-3 text-zinc-400 font-medium">{s.details.length} scopes</td>
                          <td className="px-6 py-3 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => handleEditService(s)}
                              className="p-1.5 rounded-md bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteModal({ isOpen: true, type: 'service', id: s.id, name: s.title })}
                              className="p-1.5 rounded-md bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================
             CUSTOMER LIST
             ============================================================ */}
          {activeSubTab === 'users' && (
            <div className="bg-white border border-zinc-200 rounded-md card-lift hover:border-zinc-300 transition-colors">
              <div className="px-6 py-4 border-b border-zinc-100">
                <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                  Registered Customers
                </h2>
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs text-zinc-600 min-w-[600px]">
                  <thead className="bg-zinc-50 uppercase text-[10px] font-bold text-zinc-400 tracking-wider">
                    <tr>
                      <th className="px-6 py-3">Customer Name</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Phone</th>
                      <th className="px-6 py-3">Address</th>
                      <th className="px-6 py-3 text-right">Orders</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {[
                      { name: 'Diana Ishimwe', email: 'ishimwedianah80@gmail.com', phone: '+250 788 345 678', address: 'KN 4 Ave, Kigali City Mall, Ground Floor Plaza' },
                      { name: 'Jean Damascene', email: 'customer@iefshop.com', phone: '+250 782 101 202', address: 'Kacyiru Sector, Gasabo, Kigali' }
                    ].map((user, idx) => {
                      const uOrdersCount = orders.filter(o => o.customerEmail.toLowerCase() === user.email.toLowerCase()).length;
                      return (
                        <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-zinc-900">{user.name}</td>
                          <td className="px-6 py-4 font-medium">{user.email}</td>
                          <td className="px-6 py-4 text-zinc-500">{user.phone}</td>
                          <td className="px-6 py-4 text-zinc-500 truncate max-w-[200px]" title={user.address}>{user.address}</td>
                          <td className="px-6 py-4 text-right font-black text-zinc-900">{uOrdersCount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================
             SETTINGS
             ============================================================ */}
          {activeSubTab === 'settings' && (
            <div className="bg-white border border-zinc-200 rounded-md card-lift hover:border-zinc-300 transition-colors p-6 max-w-2xl">
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-6">Store Settings</h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Store Name</label>
                  <input type="text" defaultValue="IE & F Company Ltd" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Contact Email</label>
                  <input type="email" defaultValue="info@iefcompany.com" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input type="tel" defaultValue="+250 789 123 456" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Business Address</label>
                  <textarea rows={2} defaultValue="KN 4 Ave, Kigali, Rwanda" className={inputClass} />
                </div>
                <button className="btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteModal({ isOpen: false, type: null, id: null, name: '' })} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-fade-up">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 tracking-tight">Confirm Deletion</h3>
                <p className="text-xs text-zinc-500 mt-0.5">This action cannot be undone.</p>
              </div>
            </div>
            
            <p className="text-sm text-zinc-600 mb-6 py-2 border-y border-zinc-100">
              Are you sure you want to delete <strong className="text-zinc-900">{deleteModal.name}</strong> from the catalog?
            </p>

            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setDeleteModal({ isOpen: false, type: null, id: null, name: '' })}
                className="px-4 py-2 text-sm font-bold text-zinc-600 hover:bg-zinc-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteModal.type === 'product' && deleteModal.id) {
                    onDeleteProduct(deleteModal.id);
                  } else if (deleteModal.type === 'service' && deleteModal.id) {
                    onDeleteService(deleteModal.id);
                  }
                  setDeleteModal({ isOpen: false, type: null, id: null, name: '' });
                }}
                className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors flex items-center gap-2 shadow-sm"
              >
                <Trash2 className="h-4 w-4" />
                Delete {deleteModal.type === 'product' ? 'Product' : 'Service'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
