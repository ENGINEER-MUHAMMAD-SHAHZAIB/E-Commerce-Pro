import React from 'react';
import { motion } from 'motion/react';
import { Package, MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { useApp } from '../AppContext';

interface OrdersPageProps {
  onNavigate: (page: string, productId?: string) => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({ onNavigate }) => {
  const { orders } = useApp();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'packed': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return Package;
      case 'packed': return Package;
      case 'shipped': return Truck;
      case 'delivered': return CheckCircle;
      default: return Package;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-24 h-24 mx-auto mb-6 text-gray-300" />
          <h2 className="text-3xl font-bold mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-8">You haven't placed any orders</p>
          <button
            onClick={() => onNavigate('products')}
            className="px-8 py-4 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order, index) => {
            const StatusIcon = getStatusIcon(order.status);
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b bg-gray-50">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-bold text-lg">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-bold text-purple-600">${order.total.toFixed(2)}</p>
                    </div>
                    <div>
                      <span className={`px-4 py-2 rounded-full font-semibold capitalize ${getStatusColor(order.status)}`}>
                        <StatusIcon className="w-4 h-4 inline mr-2" />
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  {/* Items */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-4">Items</h3>
                    <div className="space-y-4">
                      {order.items.map(item => (
                        <div
                          key={item.productId}
                          className="flex gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                          onClick={() => onNavigate('product', item.productId)}
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-semibold">{item.product.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            {Object.entries(item.selectedVariants).length > 0 && (
                              <div className="flex gap-2 mt-1">
                                {Object.values(item.selectedVariants).map((value, i) => (
                                  <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    {value}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping & Payment Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-purple-600" />
                        Shipping Address
                      </h3>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold mb-1">{order.shippingAddress.label}</p>
                        <p className="text-sm text-gray-600">
                          {order.shippingAddress.street}, {order.shippingAddress.city},<br />
                          {order.shippingAddress.state} {order.shippingAddress.postalCode}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                        Payment & Tracking
                      </h3>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm mb-2">
                          <span className="font-semibold">Payment:</span>{' '}
                          <span className="capitalize">{order.paymentMethod}</span>
                        </p>
                        {order.trackingNumber && (
                          <p className="text-sm mb-2">
                            <span className="font-semibold">Tracking:</span>{' '}
                            {order.trackingNumber}
                          </p>
                        )}
                        {order.estimatedDelivery && (
                          <p className="text-sm">
                            <span className="font-semibold">Est. Delivery:</span>{' '}
                            {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Timeline */}
                  <div className="mt-6">
                    <h3 className="font-semibold mb-4">Order Status</h3>
                    <div className="flex items-center justify-between relative">
                      <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200">
                        <div
                          className="h-full gradient-primary transition-all"
                          style={{
                            width: order.status === 'processing' ? '0%' :
                                   order.status === 'packed' ? '33%' :
                                   order.status === 'shipped' ? '66%' :
                                   order.status === 'delivered' ? '100%' : '0%'
                          }}
                        />
                      </div>
                      {['processing', 'packed', 'shipped', 'delivered'].map((s, i) => {
                        const isCompleted = ['processing', 'packed', 'shipped', 'delivered'].indexOf(order.status) >= i;
                        return (
                          <div key={s} className="relative z-10 text-center">
                            <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                              isCompleted ? 'gradient-primary text-white' : 'bg-gray-200'
                            }`}>
                              {isCompleted ? '✓' : i + 1}
                            </div>
                            <p className="text-xs capitalize">{s}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
