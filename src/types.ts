/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Electronics' | 'Clothing & Fashion' | 'Jewelry' | 'Footwear';
  subcategory: string;
  images: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  specifications?: Record<string, string>;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  priceInfo: string;
  icon: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  phone?: string;
  address?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  deliveryAddress: string;
  phone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Pending' | 'Shipped' | 'Completed' | 'Cancelled';
  paymentMethod: 'Mobile Money' | 'Card Payment' | 'Cash on Delivery';
}

export interface ServiceRequest {
  id: string;
  date: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  message: string;
  status: 'Pending' | 'Reviewed' | 'Scheduled' | 'Completed';
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  role: string;
  avatar: string;
}
