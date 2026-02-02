import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface HeroBannerProps {
    onShopNow: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Product showcase images - using high-quality fashion/product images
    const productImages = [
        {
            url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
            label: 'The ReCotton Tee',
            tag: 'Sustainable Fashion'
        },
        {
            url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
            label: 'Classic Denim',
            tag: 'Timeless Style'
        },
        {
            url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
            label: 'Urban Collection',
            tag: 'New Arrivals'
        },
        {
            url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
            label: 'Premium Basics',
            tag: 'Essentials'
        }
    ];

    // Auto-scroll effect
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setScrollPosition((prev) => {
                const newPosition = prev + 1;
                // Reset when we've scrolled through all images
                if (newPosition >= productImages.length * 400) {
                    return 0;
                }
                return newPosition;
            });
        }, 30); // Smooth scrolling speed

        return () => clearInterval(interval);
    }, [isPaused, productImages.length]);

    return (
        <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 py-12 md:py-16 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="space-y-6 lg:space-y-8 z-10"
                    >
                        {/* Category Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <span className="inline-block text-sm md:text-base font-medium text-gray-700 tracking-wide uppercase">
                                New Arrivals
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
                        >
                            Autumn
                            <br />
                            Collection
                        </motion.h1>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            <button
                                onClick={onShopNow}
                                className="group inline-flex items-center gap-2 px-8 py-3.5 border-2 border-gray-900 text-gray-900 font-semibold rounded-sm hover:bg-gray-900 hover:text-white transition-all duration-300 ease-out"
                            >
                                <span className="tracking-wide">Shop Now</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Scrolling Product Showcase */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                        className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {/* Scrolling Container */}
                        <div
                            className="absolute inset-0 flex flex-col"
                            style={{
                                transform: `translateY(-${scrollPosition}px)`,
                                transition: isPaused ? 'none' : 'transform 0.1s linear'
                            }}
                        >
                            {/* Duplicate images for infinite scroll effect */}
                            {[...productImages, ...productImages, ...productImages].map((image, index) => (
                                <div
                                    key={index}
                                    className="relative flex-shrink-0 h-[400px] group cursor-pointer"
                                >
                                    <img
                                        src={image.url}
                                        alt={image.label}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Image Overlay with Product Info */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                            <p className="text-sm font-medium mb-1 opacity-90">{image.tag}</p>
                                            <h3 className="text-2xl font-bold">{image.label}</h3>
                                        </div>
                                    </div>

                                    {/* Product Tag (Always Visible on Right) */}
                                    <div className="absolute top-1/2 right-6 -translate-y-1/2 bg-white px-4 py-2 rounded-sm shadow-lg">
                                        <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                                            {image.label}
                                        </p>
                                        <button
                                            onClick={onShopNow}
                                            className="text-xs font-medium text-gray-900 hover:underline mt-1 flex items-center gap-1"
                                        >
                                            Shop Now
                                            <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Gradient Overlays for Smooth Edge Blending */}
                        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-100 to-transparent pointer-events-none z-10" />
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none z-10" />
                    </motion.div>
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-20 right-10 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 left-10 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />
        </section>
    );
};
