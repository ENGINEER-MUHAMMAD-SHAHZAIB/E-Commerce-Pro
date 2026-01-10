import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, Tag } from 'lucide-react';
import { useApp } from '../AppContext';
import { toast } from 'sonner';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, updateCartItem, removeFromCart, cartSubtotal, cartTotal, cartTax, cartShipping, cartDiscount, applyCoupon, currentCoupon, user } = useApp();
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    if (applyCoupon(couponCode)) {
      toast.success('Coupon applied successfully!');
      setCouponCode('');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to checkout');
      onNavigate('login');
      return;
    }
    onNavigate('checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet</p>
          <button
            onClick={() => onNavigate('products')}
            className="px-8 py-4 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cart.length} items)</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={`${item.productId}-${JSON.stringify(item.selectedVariants)}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex gap-6">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">{item.product.brand}</p>
                        {Object.entries(item.selectedVariants).length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {Object.entries(item.selectedVariants).map(([key, value]) => (
                              <span key={key} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {value}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateCartItem(item.productId, item.quantity - 1)}
                          className="p-1 border-2 border-gray-200 rounded hover:border-purple-500 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItem(item.productId, item.quantity + 1)}
                          className="p-1 border-2 border-gray-200 rounded hover:border-purple-500 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xl font-bold text-purple-600">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        {item.product.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ${(item.product.originalPrice * item.quantity).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Coupon */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Coupon Code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Apply
                  </button>
                </div>
                {currentCoupon && (
                  <p className="text-sm text-green-600 mt-2">✓ Coupon "{currentCoupon}" applied</p>
                )}
                <p className="text-xs text-gray-500 mt-2">Try: WELCOME10, SAVE20, FLAT50</p>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${cartSubtotal.toFixed(2)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${cartDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-semibold">${cartTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {cartShipping === 0 ? 'FREE' : `$${cartShipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between mb-6 text-xl font-bold">
                <span>Total</span>
                <span className="text-purple-600">${cartTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity mb-4"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => onNavigate('products')}
                className="w-full py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
