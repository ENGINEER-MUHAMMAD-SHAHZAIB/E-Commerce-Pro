import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, MapPin, Edit2, Trash2, Plus, Package, Heart, Settings, CreditCard, Bell, Shield, LogOut } from 'lucide-react';
import { useApp } from '../AppContext';
import { toast } from 'sonner';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, updateProfile, addAddress, updateAddress, deleteAddress, logout } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'settings'>('profile');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || ''
  });
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

  const handleSaveProfile = () => {
    updateProfile(formData.name, formData.phone);
    setEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.postalCode) {
      toast.error('Please fill all fields');
      return;
    }
    addAddress(newAddress);
    setShowAddressForm(false);
    setNewAddress({
      label: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States',
      isDefault: false
    });
    toast.success('Address added successfully');
  };

  const menuItems = [
    { id: 'profile' as const, icon: User, label: 'Personal Info', description: 'Update your details' },
    { id: 'addresses' as const, icon: MapPin, label: 'Addresses', description: 'Manage shipping addresses' },
    { id: 'settings' as const, icon: Settings, label: 'Settings', description: 'Preferences & security' }
  ];

  const quickActions = [
    { icon: Package, label: 'My Orders', count: user?.orders.length || 0, onClick: () => onNavigate('orders') },
    { icon: Heart, label: 'Wishlist', count: 0, onClick: () => onNavigate('wishlist') },
    { icon: CreditCard, label: 'Payment Methods', count: 0, onClick: () => toast.info('Coming soon!') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">
                {user?.name}
              </h1>
              <p className="text-gray-600 mb-1">{user?.email}</p>
              <p className="text-sm text-purple-600 font-medium">
                Member since {new Date().getFullYear()}
              </p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-6 py-3 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        >
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <action.icon className="w-6 h-6 text-purple-600" />
                </div>
                {action.count > 0 && (
                  <span className="text-2xl font-bold text-purple-600">{action.count}</span>
                )}
              </div>
              <p className="font-semibold text-gray-800">{action.label}</p>
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'gradient-primary text-white shadow-md'
                      : 'hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <div>
                      <p className="font-semibold">{item.label}</p>
                      <p className={`text-xs ${activeTab === item.id ? 'text-purple-100' : 'text-gray-500'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Personal Information</h2>
                  <button
                    onClick={() => editing ? handleSaveProfile() : setEditing(true)}
                    className="flex items-center gap-2 px-6 py-3 gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {editing ? 'Save Changes' : 'Edit Profile'} <Edit2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Email Address</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!editing}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!editing}
                      placeholder="(123) 456-7890"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div
                key="addresses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Saved Addresses</h2>
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="flex items-center gap-2 px-6 py-3 gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Plus className="w-5 h-5" />
                    Add New Address
                  </button>
                </div>

                {showAddressForm && (
                  <div className="mb-6 p-6 border-2 border-purple-200 rounded-xl bg-purple-50">
                    <h3 className="font-semibold mb-4 text-lg">New Address</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Label (e.g., Home, Office)"
                        value={newAddress.label}
                        onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none bg-white"
                      />
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="City"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none bg-white"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none bg-white"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Postal Code"
                        value={newAddress.postalCode}
                        onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none bg-white"
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
                  </div>
                )}

                <div className="grid gap-4">
                  {user && user.addresses.length > 0 ? (
                    user.addresses.map(address => (
                      <div key={address.id} className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-lg">{address.label}</span>
                              {address.isDefault && (
                                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600">
                              {address.street}, {address.city}, {address.state} {address.postalCode}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              deleteAddress(address.id);
                              toast.success('Address deleted');
                            }}
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        {!address.isDefault && (
                          <button
                            onClick={() => {
                              updateAddress(address.id, { isDefault: true });
                              toast.success('Default address updated');
                            }}
                            className="text-sm text-purple-600 hover:underline font-semibold"
                          >
                            Set as default
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No addresses saved yet</p>
                      <p className="text-gray-400 text-sm">Add your first address to get started</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl shadow-md p-8">
                  <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-purple-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <Bell className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive updates about your orders</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition-colors">
                        Enabled
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-purple-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <Shield className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => toast.info('Coming soon!')}
                        className="px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold hover:border-purple-500 transition-colors"
                      >
                        Setup
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-purple-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Payment Methods</p>
                          <p className="text-sm text-gray-500">Manage your saved cards</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => toast.info('Coming soon!')}
                        className="px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold hover:border-purple-500 transition-colors"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-8">
                  <h2 className="text-2xl font-bold mb-6 text-red-600">Danger Zone</h2>
                  <p className="text-gray-600 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button 
                    onClick={() => toast.error('This feature is disabled in demo mode')}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
