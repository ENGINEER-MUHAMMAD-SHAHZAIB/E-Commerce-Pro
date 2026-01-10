export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  isAdmin?: boolean;
  addresses: Address[];
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  subcategory: string;
  brand: string;
  images: string[];
  variants: ProductVariant[];
  stock: number;
  sku: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
  selected?: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  status: 'processing' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
  createdAt: string;
  estimatedDelivery?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  verified: boolean;
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minPurchase?: number;
}
