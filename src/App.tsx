/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Product, Service, Order, User, CartItem } from './types';
import { INITIAL_PRODUCTS, INITIAL_SERVICES } from './data';

// Component views
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import ProductDetailView from './components/ProductDetailView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import OrderConfirmationView from './components/OrderConfirmationView';
import AuthView from './components/AuthView';
import WishlistView from './components/WishlistView';
import ServicesView from './components/ServicesView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import HowToShopView from './components/HowToShopView';
import ReturnsView from './components/ReturnsView';
import AdminDashboardView from './components/AdminDashboardView';

export default function App() {
  // 1. ROUTING, THEME, & CATALOG FILTERS STATES
  const [currentView, setView] = useState<string>('home');
  // Light mode only — no dark mode
  const [theme] = useState<'light' | 'dark'>('light');

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('featured');

  // 2. DATA PERSISTENCE STATES (Synced with localStorage)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ief_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('ief_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ief_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ief_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ief_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ief_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // 3. Always enforce light mode
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  // 4. EFFECTS FOR DATABASES SYNC
  useEffect(() => {
    localStorage.setItem('ief_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ief_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('ief_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ief_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ief_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ief_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ief_user');
    }
  }, [currentUser]);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentView]);

  // 5. CALLBACKS & STATE HANDLERS

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) return prevWishlist;
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };

  const moveToCart = (product: Product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  // Auth operations
  const login = (email: string, role: 'customer' | 'admin', name: string) => {
    setCurrentUser({
      name,
      email,
      role,
      phone: role === 'admin' ? '+250 789 123 456' : '+250 788 345 678',
      address: role === 'admin' ? 'Ian Electronics, Kigali' : 'KN 4 Ave, Kigali City Mall, Ground Floor Plaza'
    });
    setView('home');
  };

  const logout = () => {
    setCurrentUser(null);
    setView('home');
  };

  // Checkout submit order details and map into fully stored Order model
  const handlePlaceOrder = (orderDetails: {
    customerName: string;
    customerEmail: string;
    deliveryAddress: string;
    phone: string;
    paymentMethod: 'Mobile Money' | 'Card Payment' | 'Cash on Delivery';
  }) => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const deliveryFee = subtotal === 0 ? 0 : (subtotal > 150 ? 0 : 5.00);
    const totalAmount = subtotal + deliveryFee;

    const newOrder: Order = {
      id: `IEF-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      customerName: orderDetails.customerName,
      customerEmail: orderDetails.customerEmail,
      deliveryAddress: orderDetails.deliveryAddress,
      phone: orderDetails.phone,
      paymentMethod: orderDetails.paymentMethod,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0]
      })),
      totalAmount,
      status: 'Pending'
    };

    // Subtract stock quantities
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const orderedItem = newOrder.items.find((item) => item.productId === p.id);
        if (orderedItem) {
          const newStock = Math.max(0, p.stock - orderedItem.quantity);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    setCurrentOrder(newOrder);
    clearCart();
    setView('order-confirmation');
  };

  // Booking a tech service request
  const handleRequestService = (request: {
    serviceTitle: string;
    customerName: string;
    customerEmail: string;
    phone: string;
    message: string;
  }) => {
    const existingBookingsStr = localStorage.getItem('ief_bookings');
    const existingBookings = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
    
    const newBooking = {
      id: `book-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US'),
      ...request,
      status: 'Awaiting Survey'
    };

    localStorage.setItem('ief_bookings', JSON.stringify([newBooking, ...existingBookings]));
  };

  // Admin Product CRUD callbacks
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  // Admin Service CRUD callbacks
  const handleAddService = (newService: Service) => {
    setServices((prev) => [newService, ...prev]);
  };

  const handleUpdateService = (updatedService: Service) => {
    setServices((prev) =>
      prev.map((s) => (s.id === updatedService.id ? updatedService : s))
    );
  };

  const handleDeleteService = (serviceId: string) => {
    setServices((prev) => prev.filter((s) => s.id !== serviceId));
  };

  // Admin Order Status modification
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // 6. RENDER DYNAMIC VIEW CONTROLLER
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            products={products}
            setView={setView}
            setSelectedCategory={setSelectedCategory}
            addToCart={(product) => addToCart(product, 1)}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
            setSelectedProduct={setSelectedProduct}
          />
        );

      case 'shop':
        return (
          <ShopView
            products={products}
            addToCart={(product) => addToCart(product, 1)}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubcategory={selectedSubcategory}
            setSelectedSubcategory={setSelectedSubcategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortOption={sortOption}
            setSortOption={setSortOption}
            setSelectedProduct={setSelectedProduct}
            setView={setView}
          />
        );

      case 'product-detail':
        if (!selectedProduct) {
          return (
            <div className="mx-auto max-w-md px-4 py-24 text-center font-sans text-zinc-800 dark:text-zinc-200">
              <h1 className="text-xl font-extrabold uppercase">No active product selected</h1>
              <button
                onClick={() => setView('shop')}
                className="mt-6 rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-bold text-white"
              >
                Go to Shop Catalog
              </button>
            </div>
          );
        }
        return (
          <ProductDetailView
            product={selectedProduct}
            allProducts={products}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
            setSelectedProduct={setSelectedProduct}
            setView={setView}
          />
        );

      case 'cart':
        return (
          <CartView
            cart={cart}
            updateCartQty={updateCartQuantity}
            removeFromCart={removeFromCart}
            setView={setView}
          />
        );

      case 'checkout':
        return (
          <CheckoutView
            cart={cart}
            currentUser={currentUser}
            onPlaceOrder={handlePlaceOrder}
            setView={setView}
          />
        );

      case 'order-confirmation':
        return (
          <OrderConfirmationView
            order={currentOrder}
            setView={setView}
          />
        );

      case 'wishlist':
        return (
          <WishlistView
            wishlist={wishlist}
            removeFromWishlist={removeFromWishlist}
            moveToCart={moveToCart}
            setSelectedProduct={setSelectedProduct}
            setView={setView}
          />
        );

      case 'services':
        return (
          <ServicesView
            services={services}
            onRequestService={handleRequestService}
          />
        );

      case 'about':
        return <AboutView />;

      case 'contact':
        return <ContactView />;

      case 'how-to-shop':
        return <HowToShopView />;

      case 'returns':
        return <ReturnsView />;

      case 'auth':
        return (
          <AuthView
            currentUser={currentUser}
            login={login}
            logout={logout}
            orders={orders}
            setView={setView}
          />
        );

      case 'admin':
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
            setView={setView}
          />
        );

      default:
        return (
          <HomeView
            products={products}
            setView={setView}
            setSelectedCategory={setSelectedCategory}
            addToCart={(product) => addToCart(product, 1)}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
            setSelectedProduct={setSelectedProduct}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans antialiased text-zinc-800">

      {/* GLOBAL NAVBAR HEADER */}
      <Navbar
        currentView={currentView}
        setView={setView}
        cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
        wishlistCount={wishlist.length}
        currentUser={currentUser}
        logout={logout}
        theme={theme}
        toggleTheme={() => {}}
      />

      {/* DYNAMIC COMPONENT VIEW STAGE */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* GLOBAL DISPATCHER FOOTER */}
      <Footer setView={setView} />

    </div>
  );
}
