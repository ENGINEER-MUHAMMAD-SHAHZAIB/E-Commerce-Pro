import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, CartItem, Product, WishlistItem, Order, Address } from './types';
import { mockProducts } from './mockData';

interface AppContextType {
  user: User | null;
  isAdmin: boolean;
  cart: CartItem[];
  wishlist: WishlistItem[];
  orders: Order[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  addToCart: (product: Product, quantity: number, variants: Record<string, string>) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  createOrder: (shippingAddress: Address, paymentMethod: string, couponCode?: string) => Order;
  updateProfile: (name: string, phone?: string) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (addressId: string, address: Partial<Address>) => void;
  deleteAddress: (addressId: string) => void;
  cartTotal: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTax: number;
  cartShipping: number;
  applyCoupon: (code: string) => boolean;
  currentCoupon: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentCoupon, setCurrentCoupon] = useState<string | null>(null);

  // Load data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedOrders = localStorage.getItem('orders');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    if (email && password) {
      const isAdmin = email === 'admin@phihorizon.com';
      const newUser: User = {
        id: '1',
        email,
        name: isAdmin ? 'Admin User' : email.split('@')[0],
        isAdmin,
        addresses: []
      };
      setUser(newUser);
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock registration
    if (email && password && name) {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        isAdmin: false,
        addresses: []
      };
      setUser(newUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
    setCurrentCoupon(null);
  };

  const addToCart = (product: Product, quantity: number, variants: Record<string, string>) => {
    const existingItem = cart.find(
      item => item.productId === product.id && 
      JSON.stringify(item.selectedVariants) === JSON.stringify(variants)
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.productId === product.id && 
        JSON.stringify(item.selectedVariants) === JSON.stringify(variants)
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { productId: product.id, product, quantity, selectedVariants: variants }]);
    }
  };

  const updateCartItem = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setCurrentCoupon(null);
  };

  const addToWishlist = (product: Product) => {
    if (!wishlist.find(item => item.productId === product.id)) {
      setWishlist([...wishlist, { id: Date.now().toString(), productId: product.id, product }]);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(wishlist.filter(item => item.productId !== productId));
  };

  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartDiscount = currentCoupon === 'WELCOME10' ? cartSubtotal * 0.1 : 
                       currentCoupon === 'SAVE20' ? cartSubtotal * 0.2 : 
                       currentCoupon === 'FLAT50' ? 50 : 0;
  const cartTax = (cartSubtotal - cartDiscount) * 0.08;
  const cartShipping = cartSubtotal > 100 ? 0 : 10;
  const cartTotal = cartSubtotal - cartDiscount + cartTax + cartShipping;

  const applyCoupon = (code: string): boolean => {
    const validCoupons = ['WELCOME10', 'SAVE20', 'FLAT50'];
    if (validCoupons.includes(code.toUpperCase())) {
      setCurrentCoupon(code.toUpperCase());
      return true;
    }
    return false;
  };

  const createOrder = (shippingAddress: Address, paymentMethod: string, couponCode?: string): Order => {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      userId: user?.id || 'guest',
      items: [...cart],
      total: cartTotal,
      subtotal: cartSubtotal,
      tax: cartTax,
      shipping: cartShipping,
      discount: cartDiscount,
      status: 'processing',
      shippingAddress,
      paymentMethod,
      trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    setOrders([order, ...orders]);
    clearCart();
    return order;
  };

  const updateProfile = (name: string, phone?: string) => {
    if (user) {
      setUser({ ...user, name, phone });
    }
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (user) {
      const newAddress: Address = {
        ...address,
        id: Date.now().toString()
      };
      setUser({
        ...user,
        addresses: [...user.addresses, newAddress]
      });
    }
  };

  const updateAddress = (addressId: string, address: Partial<Address>) => {
    if (user) {
      setUser({
        ...user,
        addresses: user.addresses.map(addr =>
          addr.id === addressId ? { ...addr, ...address } : addr
        )
      });
    }
  };

  const deleteAddress = (addressId: string) => {
    if (user) {
      setUser({
        ...user,
        addresses: user.addresses.filter(addr => addr.id !== addressId)
      });
    }
  };

  const value: AppContextType = {
    user,
    isAdmin: user?.isAdmin || false,
    cart,
    wishlist,
    orders,
    login,
    register,
    logout,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    createOrder,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    cartTotal,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    applyCoupon,
    currentCoupon
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
