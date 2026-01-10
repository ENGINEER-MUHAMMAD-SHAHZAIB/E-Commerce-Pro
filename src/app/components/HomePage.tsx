import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, TrendingUp, Award, Truck, ChevronRight } from 'lucide-react';
import { useApp } from '../AppContext';
import { mockProducts } from '../mockData';
import { ProductCard } from './ProductCard';
import { toast } from 'sonner';

interface HomePageProps {
  onNavigate: (page: string, productId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { addToCart, addToWishlist } = useApp();
  const featuredProducts = mockProducts.filter(p => p.featured).slice(0, 4);
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [activeBanner, setActiveBanner] = useState(0);

  const banners = [
    {
      url: "/assets/banners/big_sale.png",
      title: "New Year Sale",
      description: "Up to 50% off on selected items"
    },
    {
      url: "https://images.unsplash.com/photo-1725797951116-98dc0cce8ac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMGJhbm5lcnxlbnwxfHx8fDE3Njc5NDM2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Holiday Collection",
      description: "Discover our most popular picks"
    },
    {
      url: "/assets/banners/exclusive_deals.png",
      title: "Exclusive Deals",
      description: "Premium products at unbeatable prices"
    },
    {
      url: "/assets/banners/luxury_living.png",
      title: "Modern Living",
      description: "Elevate your space with premium decor"
    },
    {
      url: "/assets/banners/workspace.png",
      title: "Smart Workspace",
      description: "Optimize your productivity in style"
    },
    {
      url: "/assets/banners/home_banner.png",
      title: "Home & Living",
      description: "Cozy furniture for your dream home"
    },
    {
      url: "/assets/banners/tech_banner.png",
      title: "Tech Deals",
      description: "Latest gadgets at best prices"
    },
    {
      url: "/assets/banners/fashion_banner.png",
      title: "Fashion Week",
      description: "New arrivals in luxury wear"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('Thank you for subscribing to our newsletter!');
    setNewsletterEmail('');
  };

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $100'
    },
    {
      icon: Award,
      title: 'Quality Products',
      description: '100% Authentic guarantee'
    },
    {
      icon: TrendingUp,
      title: 'Best Prices',
      description: 'Competitive pricing'
    },
    {
      icon: ShoppingBag,
      title: 'Easy Returns',
      description: '30-day return policy'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-20 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Welcome to <span className="gradient-text">Phi Horizon</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover amazing products at unbeatable prices. Your one-stop shop for all your needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('products')}
                  className="px-8 py-4 gradient-primary text-white rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  Shop Now
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('products')}
                  className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-colors"
                >
                  View Deals
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px]"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-full bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeBanner}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <img
                      src={banners[activeBanner].url}
                      alt={banners[activeBanner].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-900/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white group">
                      <motion.h3
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold mb-1"
                      >
                        {banners[activeBanner].title}
                      </motion.h3>
                      <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/90"
                      >
                        {banners[activeBanner].description}
                      </motion.p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Banner Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {banners.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeBanner ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob pointer-events-none" />
        <div className="absolute top-40 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none" />
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-purple-100"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 mb-6 gradient-primary rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-purple-200">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-purple-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Side Banners */}
      <section className="py-12 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-20">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              onClick={() => onNavigate('products')}
            >
              <img
                src="https://images.unsplash.com/photo-1738520420654-87cd2ad005d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Tech Gadgets"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent flex items-center">
                <div className="p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">Tech Gadgets</h3>
                  <p className="text-lg mb-4">Latest electronics & accessories</p>
                  <span className="inline-flex items-center gap-2 text-white font-semibold">
                    Shop Now <ChevronRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              onClick={() => onNavigate('products')}
            >
              <img
                src="https://images.unsplash.com/photo-1581486125780-0cf706d8cd69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Fashion"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 to-transparent flex items-center">
                <div className="p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">Fashion & Style</h3>
                  <p className="text-lg mb-4">Trending fashion collection</p>
                  <span className="inline-flex items-center gap-2 text-white font-semibold">
                    Shop Now <ChevronRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-purple-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Discover our hand-picked selection</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard
                  product={product}
                  onView={() => onNavigate('product', product.id)}
                  onAddToCart={() => addToCart(product, 1, {})}
                  onAddToWishlist={() => addToWishlist(product)}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('products')}
              className="px-8 py-4 gradient-primary text-white rounded-full font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              View All Products
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter-section" className="py-20 gradient-primary">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-xl mb-8">Get exclusive deals and updates delivered to your inbox</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="newsletter-input flex-1"
              />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};