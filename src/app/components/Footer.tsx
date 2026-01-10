import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleSocialClick = (platform: string, url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    toast.success(`Opening ${platform}...`);
  };

  const handleCustomerServiceClick = (service: string) => {
    toast.info(`${service} - This feature will be available soon!`);
  };

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold gradient-text mb-4">Phi Horizon</h3>
            <p className="text-gray-400 mb-4">
              Your trusted e-commerce destination for quality products and amazing deals.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleSocialClick('Facebook', 'https://www.facebook.com')}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSocialClick('Twitter', 'https://www.twitter.com')}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                aria-label="Visit our Twitter page"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSocialClick('Instagram', 'https://www.instagram.com')}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSocialClick('YouTube', 'https://www.youtube.com')}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                aria-label="Visit our YouTube channel"
              >
                <Youtube className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="text-gray-400 hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="text-gray-400 hover:text-white transition-colors">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cart')} className="text-gray-400 hover:text-white transition-colors">
                  Cart
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('orders')} className="text-gray-400 hover:text-white transition-colors">
                  Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    handleCustomerServiceClick('Help Center');
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    handleCustomerServiceClick('Shipping Info');
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shipping Info
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    handleCustomerServiceClick('Returns');
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Returns
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    handleCustomerServiceClick('Track Order');
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Track Order
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@phihorizon.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 mt-1" />
                <span className="text-sm">123 Commerce St, Business District, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Phi Horizon E-Commerce Store. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};