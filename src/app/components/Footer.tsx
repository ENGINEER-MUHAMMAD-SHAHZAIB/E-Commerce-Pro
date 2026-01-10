import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface FooterProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleSocialClick = (platform: string, url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    toast.success(`Opening ${platform}...`);
  };

  return (
    <footer id="main-footer" className="relative mt-20 bg-[#0f0a1e] text-white overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 md:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-3xl font-bold gradient-text mb-6 inline-block">Phi Horizon</h3>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-sm">
              Your trusted e-commerce destination for quality products and amazing deals. Experience the future of shopping.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com' },
                { icon: Twitter, label: 'Twitter', url: 'https://www.twitter.com' },
                { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com' },
                { icon: Youtube, label: 'YouTube', url: 'https://www.youtube.com' }
              ].map((social) => (
                <button
                  key={social.label}
                  onClick={() => handleSocialClick(social.label, social.url)}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500 hover:bg-violet-500/10 transition-all duration-300 group"
                  aria-label={`Visit our ${social.label} page`}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white/90">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { label: 'Home', value: 'home' },
                { label: 'Products', value: 'products' },
                { label: 'Cart', value: 'cart' },
                { label: 'Orders', value: 'orders' }
              ].map((link) => (
                <li key={link.value}>
                  <button
                    onClick={() => onNavigate(link.value)}
                    className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-violet-400 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white/90">Customer Service</h4>
            <ul className="space-y-4">
              {[
                { label: 'Help Center', value: 'help-center' },
                { label: 'Shipping Info', value: 'shipping-info' },
                { label: 'Returns', value: 'returns' },
                { label: 'Track Order', value: 'track-order', isDirect: true }
              ].map((link) => (
                <li key={link.value}>
                  <button
                    onClick={() => link.isDirect ? onNavigate(link.value) : onNavigate('info', link.value)}
                    className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-violet-400 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white/90">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-gray-400 group cursor-default">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-violet-500/10 transition-colors">
                  <Mail className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Email Us</div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">support@phihorizon.com</span>
                </div>
              </li>
              <li className="flex items-start gap-4 text-gray-400 group cursor-default">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-violet-500/10 transition-colors">
                  <Phone className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Call Us</div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">+1 (555) 123-4567</span>
                </div>
              </li>
              <li className="flex items-start gap-4 text-gray-400 group cursor-default">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-violet-500/10 transition-colors">
                  <MapPin className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Visit Us</div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">123 Commerce St, NY</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Phi Horizon. Crafted with <span className="text-pink-500">♥</span> for better shopping.
            </p>
            <div className="flex gap-8">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((policy) => (
                <button
                  key={policy}
                  onClick={() => onNavigate('info', policy.toLowerCase().replace(/ /g, '-'))}
                  className="text-gray-500 hover:text-violet-400 text-sm transition-colors"
                >
                  {policy}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};