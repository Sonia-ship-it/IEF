"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutView from '../../components/CheckoutView';
import OrderConfirmationView from '../../components/OrderConfirmationView';
import { useAppContext } from '../../context/AppContext';
import { Order } from '../../types';
import { getProductImage } from '../../utils/image';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, currentUser, clearCart, orders, setOrders } = useAppContext();
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const handlePlaceOrder = (orderDetails: {
    customerName: string;
    customerEmail: string;
    deliveryAddress: string;
    phone: string;
    paymentMethod: 'Mobile Money' | 'Card Payment' | 'Cash on Delivery';
  }) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      customerName: orderDetails.customerName,
      customerEmail: orderDetails.customerEmail,
      deliveryAddress: orderDetails.deliveryAddress,
      phone: orderDetails.phone,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: getProductImage(item.product.images),
      })),
      totalAmount: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      status: 'Pending',
      paymentMethod: orderDetails.paymentMethod,
    };

    setOrders([...orders, newOrder]);
    clearCart();
    setConfirmedOrder(newOrder);
  };

  const handleSetView = (view: string) => {
    const routeMap: Record<string, string> = {
      home: '/',
      shop: '/shop',
      cart: '/cart',
    };
    router.push(routeMap[view] || '/');
  };

  if (confirmedOrder) {
    return (
      <OrderConfirmationView
        order={confirmedOrder}
        setView={handleSetView}
      />
    );
  }

  return (
    <CheckoutView
      cart={cart}
      currentUser={currentUser}
      onPlaceOrder={handlePlaceOrder}
      setView={handleSetView}
    />
  );
}
