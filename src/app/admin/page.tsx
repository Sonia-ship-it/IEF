"use client";

import { useRouter } from 'next/navigation';
import AdminDashboardView from '../../components/AdminDashboardView';
import { useAppContext } from '../../context/AppContext';
import { Product, Service, Order } from '../../types';

export default function AdminPage() {
  const router = useRouter();
  const { products, setProducts, services, setServices, orders, setOrders, currentUser } = useAppContext();

  // Redirect non-admin users
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center font-sans text-zinc-800 bg-white">
        <h2 className="text-2xl font-black text-zinc-950 mb-4">Access Denied</h2>
        <p className="text-zinc-500 mb-6">You must be logged in as an admin to access this page.</p>
        <button
          onClick={() => router.push('/auth')}
          className="btn-primary"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleAddService = (service: Service) => {
    setServices([...services, service]);
  };

  const handleUpdateService = (updatedService: Service) => {
    setServices(services.map(s => s.id === updatedService.id ? updatedService : s));
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter(s => s.id !== serviceId));
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleSetView = (view: string) => {
    const routeMap: Record<string, string> = {
      home: '/',
      shop: '/shop',
      auth: '/auth',
    };
    router.push(routeMap[view] || '/');
  };

  return (
    <AdminDashboardView
      products={products}
      services={services}
      orders={orders}
      onAddProduct={handleAddProduct}
      onUpdateProduct={handleUpdateProduct}
      onDeleteProduct={handleDeleteProduct}
      onAddService={handleAddService}
      onUpdateService={handleUpdateService}
      onDeleteService={handleDeleteService}
      onUpdateOrderStatus={handleUpdateOrderStatus}
      setView={handleSetView}
    />
  );
}
