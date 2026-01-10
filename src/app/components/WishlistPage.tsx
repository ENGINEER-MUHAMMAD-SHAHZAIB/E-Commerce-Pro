import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { useApp } from '../AppContext';
import { toast } from 'sonner';

interface WishlistPageProps {
  onNavigate: (page: string, productId?: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onNavigate }) => {
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  const handleAddToCart = (item: typeof wishlist[0]) => {
    addToCart(item.product, 1, {});
    toast.success('Added to cart!');
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
          <h2 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8">Save your favorite items here</p>
          <button
            onClick={() => onNavigate('products')}
            className="px-8 py-4 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist ({wishlist.length} items)</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-48 object-cover cursor-pointer group-hover:scale-110 transition-transform duration-500"
                  onClick={() => onNavigate('product', item.productId)}
                />
                <button
                  onClick={() => {
                    removeFromWishlist(item.productId);
                    toast.success('Removed from wishlist');
                  }}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
                {item.product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{item.product.discount}%
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="text-sm text-purple-600 mb-1">{item.product.brand}</div>
                <h3 
                  className="font-semibold mb-2 line-clamp-2 cursor-pointer hover:text-purple-600 transition-colors"
                  onClick={() => onNavigate('product', item.productId)}
                >
                  {item.product.name}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xl font-bold text-purple-600">
                      ${item.product.price.toFixed(2)}
                    </div>
                    {item.product.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ${item.product.originalPrice.toFixed(2)}
                      </div>
                    )}
                  </div>
                  {item.product.stock > 0 ? (
                    <span className="text-xs text-green-600 font-semibold">In Stock</span>
                  ) : (
                    <span className="text-xs text-red-600 font-semibold">Out of Stock</span>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={item.product.stock === 0}
                  className="w-full py-2 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
