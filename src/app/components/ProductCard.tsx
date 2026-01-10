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
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on a button
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    onView();
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer transition-shadow hover:shadow-xl"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{product.discount}%
          </div>
        )}

        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist();
            }}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-purple-50 transition-colors"
          >
            <Heart className="w-5 h-5 text-purple-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView();
            }}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-purple-50 transition-colors"
          >
            <Eye className="w-5 h-5 text-purple-600" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-sm text-purple-600 mb-1">{product.brand}</div>
        <h3 className="font-semibold mb-2 line-clamp-2 min-h-[48px]">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xl font-bold text-purple-600">
              ${product.price.toFixed(2)}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </div>
            )}
          </div>
          {product.stock > 0 ? (
            <span className="text-xs text-green-600 font-semibold">In Stock</span>
          ) : (
            <span className="text-xs text-red-600 font-semibold">Out of Stock</span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          disabled={product.stock === 0}
          className="w-full py-2 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};