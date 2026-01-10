import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, Package } from 'lucide-react';
import { useApp } from '../AppContext';
import { categories } from '../mockData';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { user, cart, wishlist, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('products');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="gradient-primary">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-white text-sm">
            <p className="hidden md:block">Welcome to Phi Horizon E-Commerce Store</p>
            <p className="md:hidden">Phi Horizon Store</p>
            <div className="flex items-center gap-4">
              {user && (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline">👋</span>
                  <span className="font-medium">
                    Hello, <span className="font-bold">{user.name.split(' ')[0]}</span>
                  </span>
                </div>
              )}
              {user?.isAdmin && (
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:underline font-medium"
                >
                  Admin Panel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex-shrink-0"
          >
            <h1 className="text-2xl md:text-3xl font-bold gradient-text">
              Phi Horizon
            </h1>
          </button>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-4 py-2 pr-12 border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 gradient-primary text-white rounded-full hover:opacity-90 transition-opacity"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => onNavigate(user ? 'wishlist' : 'login')}
              className="relative p-2 hover:bg-purple-50 rounded-full transition-colors"
              title="Wishlist"
            >
              <Heart className="w-6 h-6 text-purple-600" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 hover:bg-purple-50 rounded-full transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6 text-purple-600" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {user && (
              <button
                onClick={() => onNavigate('orders')}
                className="relative p-2 hover:bg-purple-50 rounded-full transition-colors hidden md:block"
                title="My Orders"
              >
                <Package className="w-6 h-6 text-purple-600" />
              </button>
            )}

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 hover:bg-purple-50 rounded-full transition-colors">
                  <User className="w-6 h-6 text-purple-600" />
                  <ChevronDown className="w-4 h-4 text-purple-600 hidden md:block" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button
                    onClick={() => onNavigate('profile')}
                    className="block w-full text-left px-4 py-2 hover:bg-purple-50 transition-colors"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => onNavigate('orders')}
                    className="block w-full text-left px-4 py-2 hover:bg-purple-50 transition-colors"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-purple-50 text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 gradient-primary text-white rounded-full hover:opacity-90 transition-opacity"
              >
                Login
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-purple-50 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full px-4 py-2 pr-12 border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 gradient-primary text-white rounded-full"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Navigation Bar */}
      <nav className="border-t border-purple-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-8 py-3">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-purple-600 transition-colors ${
                currentPage === 'home' ? 'text-purple-600 font-semibold' : ''
              }`}
            >
              Home
            </button>
            
            {categories.slice(0, 5).map((category) => (
              <div
                key={category.id}
                className="relative group"
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                  {category.name}
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {activeCategory === category.id && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg py-2 min-w-[200px]">
                    {category.subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          onNavigate('products');
                          setActiveCategory(null);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-purple-50 transition-colors"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() => onNavigate('products')}
              className="hover:text-purple-600 transition-colors"
            >
              All Products
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-purple-100 bg-white">
          <div className="px-4 py-4 space-y-2">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:text-purple-600 transition-colors"
            >
              Home
            </button>
            {categories.map((category) => (
              <div key={category.id}>
                <button className="block w-full text-left py-2 font-semibold">
                  {category.name}
                </button>
                <div className="pl-4 space-y-1">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        onNavigate('products');
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-1 text-sm hover:text-purple-600 transition-colors"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};