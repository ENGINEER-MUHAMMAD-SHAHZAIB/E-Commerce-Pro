import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Users, ShoppingCart, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import { mockProducts } from '../mockData';
import { useApp } from '../AppContext';

export const AdminPanel: React.FC = () => {
  const { orders } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');

  const stats = {
    totalProducts: mockProducts.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    pendingOrders: orders.filter(o => o.status === 'processing').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gradient-primary text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p>Manage your store and track performance</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Package className="w-10 h-10 text-purple-600" />
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <p className="text-2xl font-bold mb-1">{stats.totalProducts}</p>
            <p className="text-sm text-gray-600">Total Products</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <ShoppingCart className="w-10 h-10 text-blue-600" />
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                {stats.pendingOrders} Pending
              </span>
            </div>
            <p className="text-2xl font-bold mb-1">{stats.totalOrders}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-10 h-10 text-green-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold mb-1">${stats.totalRevenue.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-orange-600" />
              <BarChart3 className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold mb-1">2,547</p>
            <p className="text-sm text-gray-600">Total Customers</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex border-b">
            {['dashboard', 'products', 'orders'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-4 px-6 font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'gradient-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Sales Overview</h2>
                
                {/* Recent Orders */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Recent Orders</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Items</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map(order => (
                          <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-mono">{order.id}</td>
                            <td className="px-4 py-3 text-sm">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-sm">{order.items.length}</td>
                            <td className="px-4 py-3 text-sm font-semibold">${order.total.toFixed(2)}</td>
                            <td className="px-4 py-3">
                              <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full capitalize">
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Top Products */}
                <div>
                  <h3 className="font-semibold mb-4">Top Selling Products</h3>
                  <div className="space-y-3">
                    {mockProducts.slice(0, 5).map((product, index) => (
                      <div key={product.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.reviewCount} sales</p>
                        </div>
                        <p className="font-bold text-purple-600">${product.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Products Management</h2>
                  <button className="px-6 py-3 gradient-primary text-white rounded-lg font-semibold hover:opacity-90">
                    Add New Product
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">SKU</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Stock</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockProducts.map(product => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-xs text-gray-600">{product.brand}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm font-mono">{product.sku}</td>
                          <td className="px-4 py-3 text-sm font-semibold">${product.price}</td>
                          <td className="px-4 py-3">
                            <span className={`text-sm ${product.stock > 20 ? 'text-green-600' : 'text-orange-600'}`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">{product.category}</td>
                          <td className="px-4 py-3">
                            <button className="text-sm text-purple-600 hover:underline mr-3">Edit</button>
                            <button className="text-sm text-red-600 hover:underline">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Orders Management</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Payment</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-mono">{order.id}</td>
                          <td className="px-4 py-3 text-sm">{order.shippingAddress.label}</td>
                          <td className="px-4 py-3 text-sm">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold">${order.total.toFixed(2)}</td>
                          <td className="px-4 py-3 text-sm capitalize">{order.paymentMethod}</td>
                          <td className="px-4 py-3">
                            <select
                              value={order.status}
                              className="text-xs px-2 py-1 border-2 border-gray-200 rounded capitalize"
                            >
                              <option value="processing">Processing</option>
                              <option value="packed">Packed</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <button className="text-sm text-purple-600 hover:underline">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
