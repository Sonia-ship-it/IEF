/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  X
} from 'lucide-react';
import { Product, Service, Order, User } from '../types';

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
  const [activeSubTab, setActiveSubTab] = useState<'products' | 'services' | 'orders' | 'users'>('orders');

  // Product Edit/Add form states
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodCategory, setProdCategory] = useState<'Electronics' | 'Clothing & Fashion' | 'Jewelry' | 'Footwear'>('Electronics');
  const [prodSubcategory, setProdSubcategory] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImages, setProdImages] = useState('');
  const [prodStock, setProdStock] = useState('');
  const [prodIsBestSeller, setProdIsBestSeller] = useState(false);
  const [prodIsFeatured, setProdIsFeatured] = useState(false);

  // Service Edit/Add form states
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [srvTitle, setSrvTitle] = useState('');
  const [srvDesc, setSrvDesc] = useState('');
  const [srvDetails, setSrvDetails] = useState('');
  const [srvPrice, setSrvPrice] = useState('');
  const [srvImage, setSrvImage] = useState('');

  // Stats Card Calculations
  const totalSales = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((acc, o) => acc + o.totalAmount, 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;
  const completedOrdersCount = orders.filter(o => o.status === 'Completed').length;

  // --- PRODUCTS FORM CRUD LOGIC ---
  const handleEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProdName(p.name);
    setProdPrice(p.price.toString());
    setProdCategory(p.category);
    setProdSubcategory(p.subcategory);
    setProdDesc(p.description);
    setProdImages(p.images.join(', '));
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

    const imgsList = prodImages.split(',').map(s => s.trim()).filter(Boolean);
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
      image: srvImage || 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80'
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
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 font-sans text-zinc-800 dark:text-zinc-200" id="admin-dashboard-view">
      
      {/* Intro Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-zinc-200/85 dark:border-zinc-800 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white uppercase">
            Administrative Control Panel
          </h1>
          <p className="mt-1.5 text-xs text-zinc-500">
            Secure store statistics, orders verification, and product catalog management database.
          </p>
        </div>
        <div className="rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white uppercase tracking-wider block w-fit">
          Logged in as Store Admin
        </div>
      </div>

      {/* --- STATS SUMMARY BAR --- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10" id="admin-stats">
        {/* Total Sales */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Total Store Sales</span>
            <span className="text-2xl font-black text-zinc-900 dark:text-white mt-1.5 block">${totalSales.toFixed(2)}</span>
          </div>
          <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>

        {/* Pending Invoices */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Pending Orders</span>
            <span className="text-2xl font-black text-zinc-900 dark:text-white mt-1.5 block">{pendingOrdersCount}</span>
          </div>
          <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500">
            <Clock className="h-6 w-6 animate-pulse" />
          </div>
        </div>

        {/* Completed Dispatches */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Completed Delivery</span>
            <span className="text-2xl font-black text-zinc-900 dark:text-white mt-1.5 block">{completedOrdersCount}</span>
          </div>
          <div className="rounded-xl bg-orange-500/10 p-3 text-orange-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        </div>

        {/* Total Registered Products */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Active Products</span>
            <span className="text-2xl font-black text-zinc-900 dark:text-white mt-1.5 block">{products.length}</span>
          </div>
          <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
            <ShoppingBag className="h-6 w-6" />
          </div>
        </div>
      </section>

      {/* --- DASHBOARD NAVIGATION --- */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 mb-8 overflow-x-auto custom-scrollbar">
        {[
          { id: 'orders', label: 'Order Management', icon: FileText },
          { id: 'products', label: 'Product Management', icon: ShoppingBag },
          { id: 'services', label: 'Service Management', icon: Wrench },
          { id: 'users', label: 'Customer Log List', icon: Users }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 pb-4 px-6 text-xs font-extrabold uppercase tracking-widest whitespace-nowrap relative transition-all ${
                isSelected 
                  ? 'text-orange-600 dark:text-orange-500' 
                  : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {isSelected && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 dark:bg-orange-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* --- TAB CONTENT 1: ORDER MANAGEMENT --- */}
      {activeSubTab === 'orders' && (
        <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
          <h2 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            Customer Invoices &amp; Dispatches ({orders.length})
          </h2>

          {orders.length === 0 ? (
            <p className="text-center py-12 text-zinc-400 text-xs">No customer orders recorded yet.</p>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-400 min-w-[700px]">
                <thead className="bg-zinc-50 dark:bg-zinc-950 uppercase text-[10px] font-bold text-zinc-400 tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Customer Details</th>
                    <th className="px-4 py-3">Purchased Items</th>
                    <th className="px-4 py-3">Settlement</th>
                    <th className="px-4 py-3">Total paid</th>
                    <th className="px-4 py-3">Status Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-150/80 dark:divide-zinc-850">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20">
                      <td className="px-4 py-4 font-mono font-bold text-zinc-900 dark:text-white">{o.id}</td>
                      <td className="px-4 py-4">
                        <div className="font-bold text-zinc-850 dark:text-zinc-100">{o.customerName}</div>
                        <div className="text-[10px] text-zinc-400">{o.customerEmail}</div>
                        <div className="text-[10px] text-zinc-400 mt-1 truncate max-w-[180px]">{o.deliveryAddress}</div>
                      </td>
                      <td className="px-4 py-4 font-medium">
                        <ul className="space-y-1">
                          {o.items.map((item, idx) => (
                            <li key={idx} className="text-[10px] truncate max-w-[180px]">
                              ● {item.productName} (Qty: {item.quantity})
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-4 uppercase font-bold text-[9px]">{o.paymentMethod}</td>
                      <td className="px-4 py-4 font-extrabold text-zinc-900 dark:text-white">${o.totalAmount.toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <select
                          value={o.status}
                          onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as any)}
                          className="rounded border border-zinc-200 bg-white px-2 py-1 text-[10px] font-bold outline-none dark:border-zinc-800 dark:bg-zinc-950"
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
        </section>
      )}

      {/* --- TAB CONTENT 2: PRODUCT MANAGEMENT (CRUD) --- */}
      {activeSubTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Add / Edit Form Panel */}
          <section className="lg:col-span-5 rounded-3xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider mb-6 flex items-center justify-between">
              <span>{editingProductId ? 'Update Product Details' : 'Add New Product to Shop'}</span>
              {editingProductId && (
                <button 
                  onClick={() => {
                    setEditingProductId(null);
                    setProdName('');
                    setProdPrice('');
                    setProdDesc('');
                    setProdStock('');
                    setProdImages('');
                  }}
                  className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </h2>

            <form onSubmit={handleProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Product Title / Name</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="e.g. Classic Heavyweight Oversized Tee"
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4.5 py-3 text-xs outline-none focus:border-orange-500 dark:bg-zinc-950 dark:border-zinc-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Category</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value as any)}
                    className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-3 py-3 text-xs outline-none focus:border-orange-500 dark:bg-zinc-950 dark:border-zinc-800"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing & Fashion">Clothing &amp; Fashion</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Footwear">Footwear</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Subcategory</label>
                  <input
                    type="text"
                    required
                    value={prodSubcategory}
                    onChange={(e) => setProdSubcategory(e.target.value)}
                    placeholder="e.g. T-Shirts, CCTV Cameras"
                    className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4.5 py-3 text-xs outline-none focus:border-orange-500 dark:bg-zinc-950 dark:border-zinc-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Price (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="24.99"
                    className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4.5 py-3 text-xs outline-none focus:border-orange-500 dark:bg-zinc-950 dark:border-zinc-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Stock quantity</label>
                  <input
                    type="number"
                    required
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    placeholder="25"
                    className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4.5 py-3 text-xs outline-none focus:border-orange-500 dark:bg-zinc-950 dark:border-zinc-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Image URLs (comma separated)</label>
                <input
                  type="text"
                  value={prodImages}
                  onChange={(e) => setProdImages(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-X, https://images.unsplash.com/photo-Y"
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4.5 py-3 text-xs outline-none focus:border-orange-500 dark:bg-zinc-950 dark:border-zinc-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Product Description</label>
                <textarea
                  rows={3}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  placeholder="Tell customers about material, weight, sizes, chips resolution..."
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4.5 py-3 text-xs outline-none focus:border-orange-500 dark:bg-zinc-950 dark:border-zinc-800"
                />
              </div>

              <div className="flex gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                <label className="flex items-center gap-2 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodIsBestSeller}
                    onChange={(e) => setProdIsBestSeller(e.target.checked)}
                    className="text-orange-600 focus:ring-orange-500 rounded"
                  />
                  Bestseller Card Tag
                </label>
                <label className="flex items-center gap-2 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodIsFeatured}
                    onChange={(e) => setProdIsFeatured(e.target.checked)}
                    className="text-orange-600 focus:ring-orange-500 rounded"
                  />
                  Featured Section Tag
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-600 py-3.5 text-center text-xs font-bold text-white transition-all hover:bg-orange-700"
                >
                  <Plus className="h-4 w-4" />
                  {editingProductId ? 'Update Catalog Product' : 'Add Product to Catalog'}
                </button>
              </div>
            </form>
          </section>

          {/* Products List Panel */}
          <section className="lg:col-span-7 rounded-3xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b border-zinc-100 dark:border-zinc-800">
              Active Store Catalog Products ({products.length})
            </h2>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-400 min-w-[500px]">
                <thead className="bg-zinc-50 dark:bg-zinc-950 uppercase text-[10px] font-bold text-zinc-400 tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-150/85 dark:divide-zinc-850">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20">
                      <td className="px-4 py-3">
                        <div className="flex gap-2.5 items-center">
                          <img 
                            src={p.images[0]} 
                            alt="" 
                            className="h-8 w-8 object-cover rounded-md border" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-zinc-850 dark:text-zinc-100 truncate max-w-[150px]">{p.name}</h4>
                            <span className="text-[9px] text-zinc-400 uppercase">{p.subcategory}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[10px] uppercase font-bold text-zinc-400">{p.category}</td>
                      <td className="px-4 py-3 font-bold text-zinc-900 dark:text-white">${p.price.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`font-bold ${p.stock <= 8 ? 'text-red-500 font-black' : ''}`}>{p.stock}</span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => handleEditProduct(p)}
                          className="p-1.5 rounded bg-zinc-100 text-zinc-600 hover:text-orange-600 dark:bg-zinc-800 dark:text-zinc-400"
                          title="Edit product"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${p.name} from catalog?`)) {
                              onDeleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100"
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
          </section>

        </div>
      )}

      {/* --- TAB CONTENT 3: SERVICE MANAGEMENT (CRUD) --- */}
      {activeSubTab === 'services' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Add / Edit Form Panel */}
          <section className="lg:col-span-5 rounded-3xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider mb-6 flex items-center justify-between">
              <span>{editingServiceId ? 'Update Service Offerings' : 'Register New Technical Service'}</span>
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

            <form onSubmit={handleServiceSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Service Title</label>
                <input
                  type="text"
                  required
                  value={srvTitle}
                  onChange={(e) => setSrvTitle(e.target.value)}
                  placeholder="e.g. Fire Fighting System Installation"
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-2.5 text-xs outline-none focus:border-orange-500 dark:bg-zinc-950 dark:border-zinc-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Pricing Terms</label>
                <input
                  type="text"
                  required
                  value={srvPrice}
                  onChange={(e) => setSrvPrice(e.target.value)}
                  placeholder="e.g. From $150 (depends on camera count)"
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-2.5 text-xs outline-none focus:border-orange-500 dark:bg-zinc-950 dark:border-zinc-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Cover Image URL</label>
                <input
                  type="text"
                  value={srvImage}
                  onChange={(e) => setSrvImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-X"
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-2.5 text-xs outline-none focus:border-orange-500 dark:bg-zinc-950 dark:border-zinc-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Included scopes (comma separated)</label>
                <textarea
                  rows={2}
                  value={srvDetails}
                  onChange={(e) => setSrvDetails(e.target.value)}
                  placeholder="Onsite survey consultation, Full hardware mounting, Software testing..."
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-2.5 text-xs outline-none focus:border-orange-500 dark:bg-zinc-950 dark:border-zinc-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Service Overview Description</label>
                <textarea
                  rows={3}
                  value={srvDesc}
                  onChange={(e) => setSrvDesc(e.target.value)}
                  placeholder="Explain scope, certifications, hardware warranties..."
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-2.5 text-xs outline-none focus:border-orange-500 dark:bg-zinc-950 dark:border-zinc-800"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-600 py-3.5 text-center text-xs font-bold text-white transition-all hover:bg-orange-700"
                >
                  <Plus className="h-4 w-4" />
                  {editingServiceId ? 'Update Service Offerings' : 'Register New Tech Service'}
                </button>
              </div>
            </form>
          </section>

          {/* Services List Panel */}
          <section className="lg:col-span-7 rounded-3xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b border-zinc-100 dark:border-zinc-800">
              Registered System Services ({services.length})
            </h2>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-400 min-w-[500px]">
                <thead className="bg-zinc-50 dark:bg-zinc-950 uppercase text-[10px] font-bold text-zinc-400 tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Technical Service</th>
                    <th className="px-4 py-3">Pricing Tier</th>
                    <th className="px-4 py-3">Details count</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-150/85 dark:divide-zinc-850">
                  {services.map((s) => (
                    <tr key={s.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20">
                      <td className="px-4 py-3 font-bold text-zinc-850 dark:text-zinc-100">{s.title}</td>
                      <td className="px-4 py-3 text-[10px] font-bold text-zinc-500">{s.priceInfo}</td>
                      <td className="px-4 py-3 text-zinc-400 font-medium">{s.details.length} points</td>
                      <td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => handleEditService(s)}
                          className="p-1.5 rounded bg-zinc-100 text-zinc-600 hover:text-orange-600 dark:bg-zinc-800 dark:text-zinc-400"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${s.title}?`)) {
                              onDeleteService(s.id);
                            }
                          }}
                          className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      )}

      {/* --- TAB CONTENT 4: USER MANAGEMENT --- */}
      {activeSubTab === 'users' && (
        <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
          <h2 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            Registered Shop Customers Database
          </h2>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-400 min-w-[600px]">
              <thead className="bg-zinc-50 dark:bg-zinc-950 uppercase text-[10px] font-bold text-zinc-400 tracking-wider">
                <tr>
                  <th className="px-4 py-3">Customer Name</th>
                  <th className="px-4 py-3">Registered Email</th>
                  <th className="px-4 py-3">Logistics Phone</th>
                  <th className="px-4 py-3">Delivery Address</th>
                  <th className="px-4 py-3 text-right">Transactions Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-150/80 dark:divide-zinc-850">
                {[
                  { name: 'Diana Ishimwe', email: 'ishimwedianah80@gmail.com', phone: '+250 788 345 678', address: 'KN 4 Ave, Kigali City Mall, Ground Floor Plaza' },
                  { name: 'Jean Damascene', email: 'customer@iefshop.com', phone: '+250 782 101 202', address: 'Kacyiru Sector, Gasabo, Kigali' }
                ].map((user, idx) => {
                  const uOrdersCount = orders.filter(o => o.customerEmail.toLowerCase() === user.email.toLowerCase()).length;
                  return (
                    <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20">
                      <td className="px-4 py-3.5 font-bold text-zinc-850 dark:text-zinc-100">{user.name}</td>
                      <td className="px-4 py-3.5 font-medium">{user.email}</td>
                      <td className="px-4 py-3.5 text-zinc-500">{user.phone}</td>
                      <td className="px-4 py-3.5 text-zinc-500 leading-normal max-w-[200px] truncate" title={user.address}>{user.address}</td>
                      <td className="px-4 py-3.5 text-right font-black text-zinc-900 dark:text-white">{uOrdersCount} Invoices</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

    </div>
  );
}
