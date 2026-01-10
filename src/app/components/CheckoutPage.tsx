import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Wallet, DollarSign, MapPin, Plus, CheckCircle } from 'lucide-react';
import { useApp } from '../AppContext';
import { Address } from '../types';
import { toast } from 'sonner';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { user, cart, cartTotal, createOrder, addAddress } = useApp();
  const [step, setStep] = useState<'address' | 'payment' | 'review' | 'success'>('address');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    user?.addresses.find(a => a.isDefault) || null
  );
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'paypal'>('cod');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    isDefault: false
  });
  const [orderId, setOrderId] = useState('');

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.postalCode) {
      toast.error('Please fill all address fields');
      return;
    }
    addAddress(newAddress);
    const addedAddress = {
      ...newAddress,
      id: Date.now().toString()
    };
    setSelectedAddress(addedAddress);
    setShowAddressForm(false);
    toast.success('Address added successfully');
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast.error('Please select a shipping address');
      return;
    }

    const order = createOrder(selectedAddress, paymentMethod);
    setOrderId(order.id);
    setStep('success');
    toast.success('Order placed successfully!');
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-2">Thank you for your purchase</p>
          <p className="text-lg font-semibold text-purple-600 mb-8">Order ID: {orderId}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('orders')}
              className="px-8 py-4 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              View Order
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {/* Progress */}
        <div className="flex items-center justify-center mb-12">
          {['address', 'payment', 'review'].map((s, index) => (
            <div key={s} className="flex items-center">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step === s ? 'gradient-primary text-white' :
                  ['address', 'payment', 'review'].indexOf(step) > index ? 'bg-green-500 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                <span className="ml-2 capitalize hidden md:block">{s}</span>
              </div>
              {index < 2 && (
                <div className={`w-24 h-1 mx-4 ${
                  ['address', 'payment', 'review'].indexOf(step) > index ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Address Step */}
            {step === 'address' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Shipping Address</h2>

                {user && user.addresses.length > 0 && !showAddressForm && (
                  <div className="space-y-4 mb-6">
                    {user.addresses.map(address => (
                      <div
                        key={address.id}
                        onClick={() => setSelectedAddress(address)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedAddress?.id === address.id
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold">{address.label}</span>
                          {address.isDefault && (
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {address.street}, {address.city}, {address.state} {address.postalCode}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {showAddressForm && (
                  <div className="space-y-4 mb-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Label (e.g., Home, Office)"
                        value={newAddress.label}
                        onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={newAddress.postalCode}
                      onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none w-full"
                    />
                    <div className="flex gap-4">
                      <button
                        onClick={handleAddAddress}
                        className="px-6 py-3 gradient-primary text-white rounded-lg font-semibold hover:opacity-90"
                      >
                        Save Address
                      </button>
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="px-6 py-3 border-2 border-gray-200 rounded-lg font-semibold hover:border-purple-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center gap-2 text-purple-600 font-semibold hover:underline mb-6"
                  >
                    <Plus className="w-5 h-5" />
                    Add New Address
                  </button>
                )}

                <button
                  onClick={() => setStep('payment')}
                  disabled={!selectedAddress}
                  className="w-full py-4 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Payment Step */}
            {step === 'payment' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>

                <div className="space-y-4 mb-6">
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex items-center gap-4 ${
                      paymentMethod === 'cod'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <DollarSign className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="font-semibold">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when you receive</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex items-center gap-4 ${
                      paymentMethod === 'card'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <CreditCard className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="font-semibold">Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Visa, Mastercard, Amex</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex items-center gap-4 ${
                      paymentMethod === 'paypal'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <Wallet className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="font-semibold">PayPal / Google Pay</p>
                      <p className="text-sm text-gray-600">Digital wallet</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('address')}
                    className="flex-1 py-4 border-2 border-gray-200 rounded-lg font-semibold hover:border-purple-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep('review')}
                    className="flex-1 py-4 gradient-primary text-white rounded-lg font-semibold hover:opacity-90"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Review Step */}
            {step === 'review' && selectedAddress && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Review Order</h2>

                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Shipping Address</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold mb-1">{selectedAddress.label}</p>
                    <p className="text-sm text-gray-600">
                      {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.postalCode}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Payment Method</h3>
                  <p className="capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod}</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('payment')}
                    className="flex-1 py-4 border-2 border-gray-200 rounded-lg font-semibold hover:border-purple-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 py-4 gradient-primary text-white rounded-lg font-semibold hover:opacity-90"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.productId} className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold line-clamp-2">{item.product.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold text-purple-600">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};