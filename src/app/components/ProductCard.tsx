import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onView: () => void;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onView,
  onAddToCart,
  onAddToWishlist
}) => {
  const handleCardClick = () => {
    onView();
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10 border border-transparent hover:border-violet-100"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {product.discount && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            -{product.discount}%
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist();
            }}
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-violet-50 hover:text-violet-600 transition-all active:scale-95"
          >
            <Heart className="w-5 h-5 text-gray-600 hover:text-violet-600 transition-colors" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView();
            }}
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-violet-50 hover:text-violet-600 transition-all active:scale-95"
          >
            <Eye className="w-5 h-5 text-gray-600 hover:text-violet-600 transition-colors" />
          </button>
        </div>

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <div className="p-5">
        <div className="text-xs font-semibold text-violet-600 mb-2 uppercase tracking-wide">{product.brand}</div>
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[48px] group-hover:text-violet-700 transition-colors leading-tight">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-md">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-yellow-700">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">({product.reviewCount} reviews)</span>
        </div>

        <div className="flex items-center justify-between mb-4 items-end">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through mb-0.5">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <div className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </div>
          </div>
          {product.stock > 0 ? (
            <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              In Stock
            </span>
          ) : (
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full uppercase tracking-wider">Out of Stock</span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          disabled={product.stock === 0}
          className="w-full py-3 gradient-primary text-white rounded-xl font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-violet-900/40 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group/btn"
        >
          <ShoppingCart className="w-4 h-4 group-hover/btn:animate-bounce" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};