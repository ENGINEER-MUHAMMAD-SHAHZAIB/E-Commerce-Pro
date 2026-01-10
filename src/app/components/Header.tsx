import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';
import { categories } from '../mockData';

interface HeaderProps {
  onNavigate: (page: string, param?: string) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { user, cart, wishlist, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    "Welcome to Phi Horizon E-Commerce Store",
    "Free Shipping on orders over $100!",
    "New Year Sale: Up to 50% OFF!",
    "Check out our latest Tech collection",
    "Join our newsletter for exclusive deals"
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('products');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-white via-purple-50/40 to-white shadow-sm font-sans">
      {/* Top Bar - Modern Gradient & User Greeting */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm py-3 overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto px-4 flex justify-between items-center relative">
          <div className="h-6 overflow-hidden relative flex-1">
            <AnimatePresence mode="wait">
              <motion.p
                key={announcementIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="font-medium tracking-wide opacity-90 absolute"
              >
                {announcements[announcementIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2 font-medium">

                <span>Hello, <span className="underline decoration-purple-300 underline-offset-2">{user.name}</span></span>
              </div>
            ) : (
              <button onClick={() => onNavigate('login')} className="hover:text-purple-200 transition-colors">
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Main Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 py-4 md:py-5">
          <div className="flex items-center justify-between gap-4 md:gap-12">
            {/* Logo */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('home')}
              className="flex-shrink-0"
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
                Phi Horizon
              </h1>
            </motion.button>

            {/* Search Bar - Modern & Professional */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-4xl relative group">
              <div className="flex items-center w-full bg-purple-50/30 hover:bg-white border border-purple-100 hover:border-purple-300 rounded-full transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] focus-within:shadow-[0_0_0_2px_rgba(168,85,247,0.1)] focus-within:border-purple-500 focus-within:bg-white p-1.5 focus-within:ring-2 focus-within:ring-purple-100">

                {/* Category Dropdown */}
                <div className="relative border-r border-gray-200 pl-4 pr-2">
                  <select
                    className="appearance-none bg-transparent py-2 pl-2 pr-8 cursor-pointer text-sm font-semibold text-gray-600 hover:text-purple-700 focus:outline-none transition-colors"
                  >
                    <option>All</option>
                    {categories.map(c => <option key={c.id}>{c.name}</option>)}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 w-full pl-4 pr-4 py-2 bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-gray-400 text-gray-800 font-medium"
                />

                <button
                  type="submit"
                  className="p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-purple-500/30"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Action Icons */}
            <div className="flex items-center gap-2 sm:gap-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNavigate(user ? 'wishlist' : 'login')}
                className="relative p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                title="Wishlist"
              >
                <Heart className="w-6 h-6" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNavigate('cart')}
                className="relative p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                title="Cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                    {cart.length}
                  </span>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNavigate('orders')}
                className="relative p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                title="Orders"
              >
                <Package className="w-6 h-6" />
              </motion.button>

              {user ? (
                <div className="relative group z-20">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1 p-1 hover:bg-purple-50 rounded-full transition-colors"
                  >
                    <div className="p-1.5 bg-purple-100 rounded-full">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-purple-600 group-hover:rotate-180 transition-transform duration-200" />
                  </motion.button>

                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right">
                    <div className="p-2">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b mb-2">
                        Hello, <span className="font-bold text-gray-900">{user.name}</span>
                      </div>
                      <button onClick={() => onNavigate('profile')} className="block w-full text-left px-4 py-2 hover:bg-purple-50 text-gray-700 rounded-lg text-sm transition-colors">My Profile</button>
                      <button onClick={() => onNavigate('orders')} className="block w-full text-left px-4 py-2 hover:bg-purple-50 text-gray-700 rounded-lg text-sm transition-colors">My Orders</button>
                      <button onClick={() => onNavigate('wishlist')} className="block w-full text-left px-4 py-2 hover:bg-purple-50 text-gray-700 rounded-lg text-sm transition-colors">Wishlist</button>
                      <div className="border-t my-1"></div>
                      <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 rounded-lg text-sm transition-colors">Sign Out</button>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => onNavigate('login')}
                  className="flex items-center gap-1 text-purple-600 font-medium hover:bg-purple-50 px-3 py-2 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </motion.button>
              )}

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden text-gray-700 p-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white/60 backdrop-blur-md border-b border-gray-100 hidden md:block">
        <div className="max-w-[1440px] mx-auto px-4">
          <ul className="flex items-center justify-center gap-8 text-sm font-medium text-gray-600 py-3">
            <li>
              <button
                onClick={() => onNavigate('home')}
                className={`px-5 py-2.5 rounded-full transition-all duration-300 relative font-semibold ${currentPage === 'home' ? 'text-purple-600 bg-purple-50 shadow-sm' : 'text-gray-600 hover:text-purple-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:shadow-sm'}`}
              >
                Home
                {currentPage === 'home' && (
                  <motion.div layoutId="nav-pill" className="absolute inset-0 border-2 border-purple-100/50 rounded-full pointer-events-none" />
                )}
              </button>
            </li>

            {categories.slice(0, 5).map((category) => (
              <li
                key={category.id}
                className="group relative"
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <button
                  className={`px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-all duration-300 font-medium ${activeCategory === category.id ? 'text-purple-700 bg-purple-50 shadow-sm scale-105' : 'text-gray-600 hover:text-purple-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:shadow-sm hover:scale-105'
                    }`}
                >
                  {category.name}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeCategory === category.id ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {activeCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-purple-100 py-3 z-50 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50/30 pointer-events-none" />
                      <div className="relative">
                        {category.subcategories.map((sub, idx) => (
                          <button
                            key={sub}
                            onClick={() => { onNavigate('products'); setActiveCategory(null); }}
                            className="block w-full text-left px-5 py-2.5 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 text-gray-600 hover:text-purple-700 transition-all font-medium"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              {sub}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}

            <li>
              <button
                onClick={() => onNavigate('products')}
                className="px-5 py-2.5 rounded-full text-gray-600 hover:text-purple-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 font-medium hover:shadow-sm hover:scale-105"
              >
                All Products
              </button>
            </li>
          </ul>
        </div>
      </nav>

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
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">Phi Horizon</h2>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="p-4 space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <div key={cat.id}>
                        <div className="font-medium text-gray-700 py-2">{cat.name}</div>
                        <div className="pl-4 space-y-2 border-l-2 border-purple-100 ml-1">
                          {cat.subcategories.map(sub => (
                            <button
                              key={sub}
                              onClick={() => { onNavigate('products'); setMobileMenuOpen(false); }}
                              className="block text-sm text-gray-600 hover:text-purple-600"
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">My Account</h3>
                  <div className="space-y-3">
                    {user ? (
                      <>
                        <button onClick={() => { onNavigate('profile'); setMobileMenuOpen(false); }} className="block text-gray-600">Profile</button>
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

      {/* Mobile Search - Visible below header on mobile */}
      <div className="md:hidden p-4 border-b border-gray-100 bg-gray-50/50">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>
    </header>
  );
};
