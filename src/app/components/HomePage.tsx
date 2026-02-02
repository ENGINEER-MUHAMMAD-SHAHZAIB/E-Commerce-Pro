import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, TrendingUp, Award, Truck, ChevronRight } from 'lucide-react';
import { useApp } from '../AppContext';
import { mockProducts } from '../mockData';
import { ProductCard } from './ProductCard';
import { HeroBanner } from './HeroBanner';
import { toast } from 'sonner';

interface HomePageProps {
  onNavigate: (page: string, productId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { addToCart, addToWishlist } = useApp();
  const featuredProducts = mockProducts.filter(p => p.featured).slice(0, 4);
  const [newsletterEmail, setNewsletterEmail] = React.useState('');

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
      {/* Hero Banner */}
      <HeroBanner onShopNow={() => onNavigate('products')} />

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
              className="px-8 py-4 gradient-primary text-white rounded-full font-bold uppercase tracking-wider hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              View All Products
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter-section" className="py-20 bg-[#0f0a1e] relative overflow-hidden">
        {/* Ambient Background Effects matching Footer */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-900/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-900/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-xl mb-8 text-gray-300">Get exclusive deals and updates delivered to your inbox</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="newsletter-input flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-violet-500 focus:bg-white/10"
              />
              <button type="submit" className="newsletter-button bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/25 uppercase tracking-wider font-bold">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};