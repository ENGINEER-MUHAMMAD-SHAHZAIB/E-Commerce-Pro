import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, Package, Facebook, Instagram, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';
import { categories } from '../mockData';

interface HeaderProps {
  onNavigate: (page: string, param?: string) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { user, isAdmin, cart, wishlist, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('products');
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white font-sans shadow-sm">
      {/* Top Bar */}
      <div className="border-b border-gray-100 bg-white text-xs font-medium text-black">
        <div className="max-w-[1440px] mx-auto px-4 py-2 flex justify-between items-center">
          <div className="hidden md:flex items-center gap-4">
            <span className="flex items-center gap-1 hover:text-purple-600 cursor-pointer transition-colors">
              <Instagram className="w-3.5 h-3.5" />
              100k Followers
            </span>
            <span className="flex items-center gap-1 hover:text-purple-600 cursor-pointer transition-colors">
              <Facebook className="w-3.5 h-3.5" />
              300k Followers
            </span>
          </div>
          <div className="hidden md:block font-medium text-center flex-1">
            Open Doors To A World Of Fashion | <span className="underline cursor-pointer hover:text-purple-600">Discover More</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-1 cursor-pointer hover:text-purple-600">
              <span>English</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-purple-600">
              <span>USD</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-[1440px] mx-auto px-4 py-4 md:py-6 relative">
        <div className="flex items-center justify-between">
          {/* Left: Navigation (Desktop) / Menu (Mobile) */}
          <div className="flex-1 flex items-center justify-start">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-black p-2 -ml-2"
            >
              <Menu className="w-6 h-6" />
            </button>

            <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 text-sm lg:text-base font-bold text-black uppercase tracking-wide">
              <button
                onClick={() => onNavigate('home')}
                className={`transition-colors hover:text-purple-600 ${currentPage === 'home' ? 'text-purple-600' : ''}`}
              >
                Home
              </button>

              {/* Shop/Categories Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center gap-1 hover:text-purple-600 py-2"
                  onMouseEnter={() => setActiveCategory('shop')}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  Shop
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <AnimatePresence>
                  {activeCategory === 'shop' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 text-left capitalize font-medium text-gray-700"
                      onMouseEnter={() => setActiveCategory('shop')}
                      onMouseLeave={() => setActiveCategory(null)}
                    >
                      <button onClick={() => onNavigate('products')} className="block w-full text-left px-5 py-2 hover:bg-purple-50 hover:text-purple-600">All Products</button>
                      {categories.slice(0, 5).map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => onNavigate('products')}
                          className="block w-full text-left px-5 py-2 hover:bg-purple-50 hover:text-purple-600"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => onNavigate('products')}
                className="hover:text-purple-600 transition-colors whitespace-nowrap"
              >
                New Arrivals
              </button>

              <button
                onClick={() => onNavigate('info', 'about')}
                className="hover:text-purple-600 transition-colors"
              >
                About
              </button>

              <button
                onClick={() => onNavigate('info', 'contact')}
                className="hover:text-purple-600 transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('home')}
            >
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-black tracking-tighter">
                Phi Horizon
              </h1>
            </motion.button>
          </div>

          {/* Right: Icons */}
          <div className="flex-1 flex items-center justify-end gap-3 md:gap-6 text-black">
            {/* Track Order Button */}
            <button
              onClick={() => onNavigate('track-order')}
              className="hidden lg:flex items-center gap-2 hover:text-purple-600 transition-colors font-medium text-sm uppercase tracking-wide"
            >
              <Package className="w-5 h-5" />
              <span>Track Order</span>
            </button>

            {/* Search Icon */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {searchOpen ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
              </button>
              {/* Search Overlay */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-[300px] md:w-[400px] bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50"
                  >
                    <form onSubmit={handleSearch} className="flex gap-2">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 font-normal text-base"
                        placeholder="Search products..."
                        autoFocus
                      />
                      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 font-medium">Search</button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Icon */}
            {user ? (
              <div className="relative group">
                <button onClick={() => onNavigate('profile')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <User className="w-6 h-6" />
                </button>
                {/* Dropdown for User */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-4 py-2 text-xs text-gray-500 border-b">Hello, {user.name}</div>
                  <button onClick={() => onNavigate('profile')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 font-normal">Profile</button>
                  {isAdmin && <button onClick={() => onNavigate('admin')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-blue-600 font-semibold">Admin Panel</button>}
                  <button onClick={() => onNavigate('orders')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 font-normal">Orders</button>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600 font-normal">Logout</button>
                </div>
              </div>
            ) : (
              <button onClick={() => onNavigate('login')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="w-6 h-6" />
              </button>
            )}

            {/* Wishlist */}
            <button onClick={() => onNavigate('wishlist')} className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
              )}
            </button>

            {/* Cart */}
            <button onClick={() => onNavigate('cart')} className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white z-[60] overflow-y-auto"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Phi Horizon</h2>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="p-4 space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Menu</h3>
                  <div className="space-y-2">
                    <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 font-medium border-b border-gray-50">Home</button>
                    <button onClick={() => { onNavigate('products'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 font-medium border-b border-gray-50">Shop</button>
                    <button onClick={() => { onNavigate('products'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 font-medium border-b border-gray-50">New Arrivals</button>
                    <button onClick={() => { onNavigate('info', 'about'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 font-medium border-b border-gray-50">About</button>
                    <button onClick={() => { onNavigate('info', 'contact'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 font-medium border-b border-gray-50">Contact</button>

                    {categories.map(cat => (
                      <button key={cat.id} onClick={() => { onNavigate('products'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 pl-4 text-gray-600 text-sm">
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Account</h3>
                  <div className="space-y-3">
                    {user ? (
                      <>
                        <button onClick={() => { onNavigate('profile'); setMobileMenuOpen(false); }} className="block text-gray-600">Profile</button>
                        {isAdmin && (
                          <button onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }} className="block text-blue-600 font-bold">Admin Panel</button>
                        )}
                        <button onClick={() => { onNavigate('orders'); setMobileMenuOpen(false); }} className="block text-gray-600">Orders</button>
                        <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block text-red-600 font-medium">Sign Out</button>
                      </>
                    ) : (
                      <button onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }} className="block w-full py-2 bg-purple-600 text-white rounded-lg font-medium text-center">Login / Register</button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
