import React, { useEffect, useState, useRef } from 'react';
import { ChevronUp, Flame, LayoutGrid, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingSidebarProps {
    onNavigate: (page: string) => void;
}

export const FloatingSidebar: React.FC<FloatingSidebarProps> = ({ onNavigate }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [theme, setTheme] = useState<'light' | 'footer' | 'newsletter'>('light');
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            // 1. Visibility Logic (Scroll > 300px)
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // 2. Color Logic (Footer or Newsletter Intersection)
            if (sidebarRef.current) {
                const sidebarRect = sidebarRef.current.getBoundingClientRect();
                const footer = document.getElementById('main-footer');
                const newsletter = document.getElementById('newsletter-section');

                let newTheme: 'light' | 'footer' | 'newsletter' = 'light';

                if (newsletter) {
                    const newsletterRect = newsletter.getBoundingClientRect();
                    const isOverlappingNewsletter = !(
                        sidebarRect.bottom < newsletterRect.top ||
                        sidebarRect.top > newsletterRect.bottom ||
                        sidebarRect.right < newsletterRect.left ||
                        sidebarRect.left > newsletterRect.right
                    );
                    if (isOverlappingNewsletter) newTheme = 'newsletter';
                }

                if (footer) {
                    const footerRect = footer.getBoundingClientRect();
                    const isOverlappingFooter = !(
                        sidebarRect.bottom < footerRect.top ||
                        sidebarRect.top > footerRect.bottom ||
                        sidebarRect.right < footerRect.left ||
                        sidebarRect.left > footerRect.right
                    );
                    if (isOverlappingFooter) newTheme = 'footer';
                }

                setTheme(newTheme);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Dynamic Styles based on Theme
    const isDark = theme === 'footer';
    const isPurple = theme === 'newsletter';

    let containerStyle = "bg-white/90 border-gray-200 shadow-xl";
    let buttonStyle = "bg-gray-50 text-gray-600 hover:bg-gray-100";
    let dividerStyle = "bg-gray-100";
    let trendingStyle = "text-orange-500 hover:bg-orange-50";
    let trendingIconStyle = "fill-orange-500";

    if (isDark) {
        containerStyle = "bg-gray-900/90 border-gray-700 shadow-purple-900/20";
        buttonStyle = "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white";
        dividerStyle = "bg-gray-700";
        trendingStyle = "text-orange-400 hover:bg-gray-700";
        trendingIconStyle = "fill-orange-400";
    } else if (isPurple) {
        containerStyle = "bg-purple-600/90 border-purple-400 shadow-purple-900/40";
        buttonStyle = "bg-purple-500/50 text-white hover:bg-purple-500";
        dividerStyle = "bg-purple-400";
        trendingStyle = "text-orange-300 hover:bg-purple-500";
        trendingIconStyle = "fill-orange-300";
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    ref={sidebarRef}
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`fixed left-2 bottom-6 z-40 hidden md:flex flex-col gap-1.5 p-1 backdrop-blur-sm shadow-xl rounded-lg border transition-all duration-300 ${containerStyle}`}
                >
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollToTop}
                        className={`p-1.5 rounded-md transition-colors group relative ${buttonStyle}`}
                    >
                        <ChevronUp className="w-4 h-4" />
                        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md z-50">
                            Back to Top
                        </span>
                    </motion.button>

                    <div className={`w-full h-px my-0.5 transition-colors duration-300 ${dividerStyle}`} />

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onNavigate('products')}
                        className={`p-1.5 rounded-md transition-colors group relative ${trendingStyle}`}
                    >
                        <Flame className={`w-4 h-4 ${trendingIconStyle}`} />
                        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md z-50">
                            Trending
                        </span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onNavigate('products')}
                        className={`p-1.5 rounded-md transition-colors group relative ${buttonStyle}`}
                    >
                        <LayoutGrid className="w-4 h-4" />
                        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md z-50">
                            Categories
                        </span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onNavigate('profile')}
                        className={`p-1.5 rounded-md transition-colors group relative ${buttonStyle}`}
                    >
                        <User className="w-4 h-4" />
                        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md z-50">
                            Account
                        </span>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
