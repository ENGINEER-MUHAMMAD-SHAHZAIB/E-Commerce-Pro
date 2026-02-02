import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Eye, Repeat } from 'lucide-react';
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

  // Get unique colors from variants
  const colorVariant = product.variants.find(v => v.name.toLowerCase() === 'color');
  const colors = colorVariant?.options || [];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-gray-50 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-white aspect-square rounded-2xl">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Discount Badge - Top Right */}
        {product.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold">
            -{product.discount}%
          </div>
        )}

        {/* Action Icons - Left Side (Visible on Hover) */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist();
            }}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            title="Add to Wishlist"
          >
            <Heart className="w-4 h-4 text-gray-700" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              // Compare functionality
            }}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            title="Compare"
          >
            <Repeat className="w-4 h-4 text-gray-700" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onView();
            }}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            title="Quick View"
          >
            <Eye className="w-4 h-4 text-gray-700" />
          </motion.button>
        </div>



        {/* Add to Cart Button - Bottom (Visible on Hover) */}
        <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            disabled={product.stock === 0}
            className="w-full py-2.5 bg-white text-gray-900 font-medium text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-b-2xl"
          >
            Add to cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 bg-gray-50">
        <h3 className="font-medium text-gray-900 mb-1 text-sm line-clamp-1">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-base font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Color Swatches */}
        {colors.length > 0 && (
          <div className="flex items-center gap-1.5">
            {colors.slice(0, 3).map((color, index) => {
              // Map color names to actual colors
              const colorMap: { [key: string]: string } = {
                'black': '#000000',
                'white': '#FFFFFF',
                'blue': '#3B82F6',
                'light blue': '#93C5FD',
                'red': '#EF4444',
                'green': '#10B981',
                'yellow': '#F59E0B',
                'purple': '#A855F7',
                'pink': '#EC4899',
                'gray': '#6B7280',
                'brown': '#92400E',
                'beige': '#D4C5B9',
                'navy': '#1E3A8A',
                'olive': '#84A98C',
                'sage': '#9CA986',
              };

              const colorValue = colorMap[color.toLowerCase()] || '#9CA3AF';
              const hasBorder = color.toLowerCase() === 'white' || color.toLowerCase() === 'beige';

              return (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full ${hasBorder ? 'border border-gray-300' : ''}`}
                  style={{ backgroundColor: colorValue }}
                  title={color}
                />
              );
            })}
            {colors.length > 3 && (
              <span className="text-xs text-gray-500">+{colors.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};