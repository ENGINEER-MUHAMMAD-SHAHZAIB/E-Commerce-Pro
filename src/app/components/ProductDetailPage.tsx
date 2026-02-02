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
      <div className="bg-white">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-10">
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 items-start">
          {/* Images */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-square sm:aspect-[4/5] max-h-[400px] lg:max-h-[550px] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 mx-auto w-full"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${selectedImage === index
                    ? 'border-black scale-[0.98]'
                    : 'border-transparent hover:border-gray-200 hover:scale-[1.02]'
                    }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
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
                    <span className="inline-block px-3 py-1 bg-black text-white text-[10px] uppercase tracking-wider font-bold rounded-full mb-3">
                      -{product.discount}% OFF
                    </span>
                  )}
                </div>
                <button
                  onClick={handleAddToWishlist}
                  className="p-3 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight">{product.name}</h1>

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
                <div key={variant.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                      {variant.name}: <span className="font-normal text-gray-500 ml-2">{selectedVariants[variant.id] || 'Select'}</span>
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {variant.options.map(option => (
                      <button
                        key={option}
                        onClick={() => setSelectedVariants({ ...selectedVariants, [variant.id]: option })}
                        className={`min-w-[48px] h-10 px-4 border rounded-lg text-sm font-medium transition-all duration-200 ${selectedVariants[variant.id] === option
                          ? 'border-black bg-black text-white shadow-lg shadow-black/10'
                          : 'border-gray-200 hover:border-black text-gray-600'
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
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 py-4 bg-white border border-black text-black rounded-xl font-semibold transition-all duration-300 hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed group whitespace-nowrap"
                >
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </span>
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 py-4 bg-black text-white rounded-xl font-semibold transition-all duration-300 hover:bg-gray-900 hover:shadow-xl hover:shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-6 pb-6">
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest font-semibold">
                  <RotateCcw className="w-4 h-4" />
                  Compare
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest font-semibold">
                  <MessageCircleQuestion className="w-4 h-4" />
                  Ask a Question
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest font-semibold">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Delivery Info */}
              <div className="space-y-4 pb-8">
                <div className="flex items-start gap-4">
                  <Truck className="w-5 h-5 text-gray-900 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm uppercase tracking-wide">Estimated Delivery:</p>
                    <p className="text-sm text-gray-500">
                      {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-5 h-5 text-gray-900 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm uppercase tracking-wide">Free Shipping & Returns:</p>
                    <p className="text-sm text-gray-500">On all orders over $200.00</p>
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
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-8">
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
        <div className="">
          <div className="flex gap-4 sm:gap-6 lg:gap-8 border-b-0 overflow-x-auto scrollbar-hide">
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
                className={`pb-3 sm:pb-4 pt-4 sm:pt-6 font-semibold uppercase tracking-widest whitespace-nowrap transition-colors text-xs sm:text-sm ${activeTab === tab.id
                  ? 'text-gray-900 border-b-2 border-black'
                  : 'text-gray-400 hover:text-gray-900'
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
