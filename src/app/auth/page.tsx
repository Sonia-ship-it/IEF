"use client";

import { useRouter } from 'next/navigation';
import AuthView from '../../components/AuthView';
import { useAppContext } from '../../context/AppContext';

export default function AuthPage() {
  const router = useRouter();
  const { currentUser, login, logout, orders } = useAppContext();

  const handleSetView = (view: string) => {
    const routeMap: Record<string, string> = {
      home: '/',
      shop: '/shop',
      admin: '/admin',
    };
    router.push(routeMap[view] || '/');
  };

  return (
    <AuthView
      currentUser={currentUser}
      login={login}
      logout={logout}
      orders={orders}
      setView={handleSetView}
    />
  );
}
