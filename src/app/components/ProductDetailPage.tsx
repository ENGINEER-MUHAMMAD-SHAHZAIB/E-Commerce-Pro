import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Truck, ShieldCheck, RotateCcw, ChevronLeft, Minus, Plus, Eye, Share2, MessageCircleQuestion } from 'lucide-react';
import { Product } from '../types';
import { mockProducts, mockReviews } from '../mockData';
import { useApp } from '../AppContext';
import { toast } from 'sonner';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onNavigate }) => {
  const { addToCart, addToWishlist } = useApp();
  const product = mockProducts.find(p => p.id === productId);
  const reviews = mockReviews.filter(r => r.productId === productId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'brand' | 'reviews' | 'questions'>('details');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Product not found</p>
          <button
            onClick={() => onNavigate('products')}
            className="px-6 py-3 gradient-primary text-white rounded-lg"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants);
    toast.success('Added to cart!');
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast.success('Added to wishlist!');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariants);
    toast.success('Proceeding to checkout...');
    // Navigate to checkout in a real app
  };

  const handleClearSelections = () => {
    setSelectedVariants({});
    toast.info('Selections cleared');
  };

  // Washing instruction icons (using Lucide icons as placeholders)
  const washingIcons = [
    { icon: '🧺', label: 'Machine wash' },
    { icon: '🚫', label: 'No bleach' },
    { icon: '⭕', label: 'No tumble dry' },
    { icon: '🚫', label: 'No iron' },
    { icon: '⭕', label: 'No dry clean' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 py-4">
          <button
            onClick={() => onNavigate('products')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Products
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-10 mb-12">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-50 rounded-lg overflow-hidden mb-4 aspect-square lg:aspect-[4/5]"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'
                    }`}
                >
                  <img src={image} alt="" className="w-full aspect-square object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-4">
            <div className="space-y-4">
              {/* Discount Badge & Wishlist */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  {product.discount && (
                    <span className="inline-block px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full mb-3">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <button
                  onClick={handleAddToWishlist}
                  className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{product.name}</h1>

              {/* Rating & Social Proof */}
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span>{Math.floor(Math.random() * 50) + 10} people are viewing this right now</span>
                </div>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-baseline gap-2 sm:gap-3">
                  {product.originalPrice && (
                    <span className="text-base sm:text-lg text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>



              {/* Variants */}
              {product.variants.map(variant => (
                <div key={variant.id}>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block font-semibold text-gray-900">
                      {variant.name}: <span className="font-normal text-gray-600">{selectedVariants[variant.id] || 'Select'}</span>
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map(option => (
                      <button
                        key={option}
                        onClick={() => setSelectedVariants({ ...selectedVariants, [variant.id]: option })}
                        className={`px-4 py-2 border-2 rounded-md transition-all text-sm ${selectedVariants[variant.id] === option
                          ? 'border-gray-900 bg-gray-50 text-gray-900'
                          : 'border-gray-300 hover:border-gray-900 text-gray-700'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Clear Button */}
              {Object.keys(selectedVariants).length > 0 && (
                <button
                  onClick={handleClearSelections}
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                  ✕ Clear
                </button>
              )}

              {/* Stock */}
              <div>
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RotateCcw className="w-4 h-4" />
                    <span>{product.stock} in stock</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <div className="w-3 h-3 bg-red-600 rounded-full" />
                    <span className="font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block font-semibold mb-3 text-gray-900">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:border-gray-900 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-base font-medium w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:border-gray-900 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2 sm:space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full py-3 sm:py-3.5 bg-white border-2 border-gray-900 text-gray-900 rounded-md text-sm sm:text-base font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="w-full py-3 sm:py-3.5 bg-gray-900 text-white rounded-md text-sm sm:text-base font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4 pb-4 border-b">
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <RotateCcw className="w-4 h-4" />
                  Compare
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <MessageCircleQuestion className="w-4 h-4" />
                  Ask a Question
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Delivery Info */}
              <div className="space-y-3 pb-4 border-b">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-gray-700 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Estimated Delivery:</p>
                    <p className="text-sm text-gray-600">
                      {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-gray-700 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Free Shipping & Returns:</p>
                    <p className="text-sm text-gray-600">On all orders over $200.00</p>
                  </div>
                </div>
              </div>

              {/* Payment Icons */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                </div>
                <p className="text-xs text-gray-500">Guaranteed safe & secure checkout</p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t">
                <div className="text-center">
                  <Truck className="w-8 h-8 mx-auto mb-2 text-gray-900" />
                  <p className="text-xs text-gray-600">Free Delivery</p>
                </div>
                <div className="text-center">
                  <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-gray-900" />
                  <p className="text-xs text-gray-600">Secure Payment</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-8 h-8 mx-auto mb-2 text-gray-900" />
                  <p className="text-xs text-gray-600">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t">
          <div className="flex gap-4 sm:gap-6 lg:gap-8 border-b overflow-x-auto scrollbar-hide">
            {[
              { id: 'details', label: 'Product details' },
              { id: 'shipping', label: 'Shipping and Returns' },
              { id: 'brand', label: 'About the brand' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'questions', label: 'Questions' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 sm:pb-4 pt-4 sm:pt-6 font-medium whitespace-nowrap transition-colors text-sm sm:text-base ${activeTab === tab.id
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-6 sm:py-8">
            {activeTab === 'details' && (
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Left: Image and Title */}
                <div>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-auto rounded-lg mb-6"
                  />
                </div>

                {/* Right: Product Details */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">The Iconic Silhouette</h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Three Column Info Grid */}
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {/* Information */}
                    <div>
                      <h3 className="font-bold mb-3 text-gray-900 text-sm sm:text-base">Information</h3>
                      <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                        <li>• Cutaway collar</li>
                        <li>• Front button fastening</li>
                        <li>• Chest patch pocket</li>
                        <li>• Long sleeves</li>
                      </ul>
                    </div>

                    {/* Composition */}
                    <div>
                      <h3 className="font-bold mb-3 text-gray-900 text-sm sm:text-base">Composition</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Cotton 100%</p>

                      <h3 className="font-bold mb-3 mt-4 sm:mt-6 text-gray-900 text-sm sm:text-base">Wearing</h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Model is 1.84 m wearing size M
                      </p>
                    </div>

                    {/* Washing Instructions */}
                    <div>
                      <h3 className="font-bold mb-3 text-gray-900 text-sm sm:text-base">Washing Instructions</h3>
                      <div className="flex gap-2 mb-3">
                        {washingIcons.map((item, index) => (
                          <div key={index} className="text-xl sm:text-2xl" title={item.label}>
                            {item.icon}
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">
                        Machine wash, no ironing, don't dry clean, don't tumble dry
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-3xl">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Shipping Information</h3>
                <p className="text-gray-600 mb-6">
                  We offer free standard shipping on all orders over $100. Orders are typically processed within 1-2 business days.
                </p>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Returns Policy</h3>
                <p className="text-gray-600">
                  We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in original condition with tags attached.
                </p>
              </div>
            )}

            {activeTab === 'brand' && (
              <div className="max-w-3xl">
                <h3 className="text-xl font-bold mb-4 text-gray-900">About {product.brand}</h3>
                <p className="text-gray-600">
                  {product.brand} is committed to creating high-quality, sustainable products that combine style with environmental responsibility.
                  Our garments are produced using sustainable fibers and processes, reducing their environmental impact.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-900">Customer Reviews</h3>
                {reviews.length > 0 ? (
                  <div className="space-y-6 max-w-3xl">
                    {reviews.map(review => (
                      <div key={review.id} className="border-b pb-6 last:border-0">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-semibold text-gray-900">
                            {review.userName[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900">{review.userName}</p>
                              {review.verified && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                    }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                )}
              </div>
            )}

            {activeTab === 'questions' && (
              <div className="max-w-3xl">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h3>
                <p className="text-gray-500">No questions yet. Be the first to ask!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
