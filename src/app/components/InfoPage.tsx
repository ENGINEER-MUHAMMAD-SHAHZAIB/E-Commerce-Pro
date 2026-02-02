import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, FileText, HelpCircle, Truck, RefreshCw, Mail, Info, Globe, MapPin, Phone, Heart } from 'lucide-react';

interface InfoPageProps {
    slug: string;
    onNavigate: (page: string) => void;
}

export const InfoPage: React.FC<InfoPageProps> = ({ slug, onNavigate }) => {
    const getPageContent = (slug: string) => {
        switch (slug) {
            case 'privacy-policy':
                return {
                    title: 'Privacy Policy',
                    icon: Shield,
                    content: (
                        <div className="space-y-6 text-gray-600">
                            <p>At Phi Horizon, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.</p>

                            <h3 className="text-xl font-bold text-gray-900 mt-8">1. Information We Collect</h3>
                            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact customer support. This includes your name, email address, shipping address, and payment information.</p>

                            <h3 className="text-xl font-bold text-gray-900 mt-8">2. How We Use Your Information</h3>
                            <p>We use your information to process your orders, communicate with you about your account, and send you promotional emails if you have opted in. We do not sell your personal information to third parties.</p>

                            <h3 className="text-xl font-bold text-gray-900 mt-8">3. Data Security</h3>
                            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                        </div>
                    )
                };
            case 'terms-of-service':
                return {
                    title: 'Terms of Service',
                    icon: FileText,
                    content: (
                        <div className="space-y-6 text-gray-600">
                            <p>Welcome to Phi Horizon. By accessing or using our website, you agree to be bound by these Terms of Service.</p>

                            <h3 className="text-xl font-bold text-gray-900 mt-8">1. Use of Service</h3>
                            <p>You may use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account credentials.</p>

                            <h3 className="text-xl font-bold text-gray-900 mt-8">2. Product Information</h3>
                            <p>We try to be as accurate as possible with our product descriptions and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
                        </div>
                    )
                };
            case 'shipping-info':
                return {
                    title: 'Shipping Information',
                    icon: Truck,
                    content: (
                        <div className="space-y-6 text-gray-600">
                            <div className="bg-purple-50 p-6 rounded-xl mb-8 border border-purple-100">
                                <h4 className="font-bold text-purple-900 mb-2">Free Shipping</h4>
                                <p>We offer free standard shipping on all orders over $50 within the continental US.</p>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900">Delivery Times</h3>
                            <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-600">
                                <li><strong className="text-gray-900">Standard Shipping:</strong> 3-5 business days</li>
                                <li><strong className="text-gray-900">Express Shipping:</strong> 1-2 business days</li>
                                <li><strong className="text-gray-900">International Shipping:</strong> 7-14 business days</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-900 mt-8">Order Processing</h3>
                            <p>Orders are typically processed within 24 hours of placement. You will receive a confirmation email with tracking information once your order ships.</p>
                        </div>
                    )
                };
            case 'returns':
                return {
                    title: 'Returns & Refunds',
                    icon: RefreshCw,
                    content: (
                        <div className="space-y-6 text-gray-600">
                            <p>We want you to vary happy with your purchase. If you are not completely satisfied, you may return items within 30 days of delivery.</p>

                            <h3 className="text-xl font-bold text-gray-900 mt-8">Return Policy</h3>
                            <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-600">
                                <li>Items must be unused and in original packaging with tags attached.</li>
                                <li>Return shipping is free for defective items.</li>
                                <li>Refunds are processed to the original payment method within 5-7 business days of receipt.</li>
                            </ul>
                        </div>
                    )
                };
            case 'help-center':
                return {
                    title: 'Help Center',
                    icon: HelpCircle,
                    content: (
                        <div className="space-y-8 text-gray-600">
                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                                <div className="space-y-4">
                                    <div className="border border-gray-200 bg-white rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-900">How do I track my order?</h4>
                                        <p className="text-gray-600 mt-2">You can track your order by clicking on the "Track Order" link in the header or footer and entering your order ID.</p>
                                    </div>
                                    <div className="border border-gray-200 bg-white rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-900">Do you ship internationally?</h4>
                                        <p className="text-gray-600 mt-2">Yes, we ship to most countries worldwide. International shipping costs are calculated at checkout.</p>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-purple-600" /> Contact Support
                                </h3>
                                <p className="text-gray-600 mb-4">Need further assistance? Our support team is here to help 24/7.</p>
                                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors uppercase tracking-wider font-bold text-sm">
                                    Contact Us
                                </button>
                            </section>
                        </div>
                    )
                };
            case 'cookie-policy':
                return {
                    title: 'Cookie Policy',
                    icon: FileText,
                    content: (
                        <div className="space-y-6 text-gray-600">
                            <p>This Cookie Policy explains how Phi Horizon uses cookies and similar technologies to recognize you when you visit our website.</p>

                            <h3 className="text-xl font-bold text-gray-900 mt-8">What are cookies?</h3>
                            <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. We use them to remember your preferences and improve your shopping experience.</p>
                        </div>
                    )
                };
            case 'about':
                return {
                    title: 'About Phi Horizon',
                    icon: Info,
                    content: (
                        <div className="space-y-12 text-gray-600">
                            <section className="text-center max-w-2xl mx-auto">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Redefining Modern Commerce</h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Phi Horizon isn't just a store; it's a curated experience. We believe in the power of design to elevate everyday life.
                                    From cutting-edge tech to timeless fashion, our mission is to bring you products that inspire, perform, and endure.
                                </p>
                            </section>

                            <div className="grid md:grid-cols-3 gap-8 mt-12">
                                <div className="bg-purple-50 border border-purple-100 p-8 rounded-2xl text-center hover:bg-purple-100 transition-colors group">
                                    <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-purple-600 group-hover:scale-110 transition-transform">
                                        <Shield className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Quality First</h4>
                                    <p className="text-gray-600">Every item is hand-picked and rigorously tested to meet our gold standard.</p>
                                </div>
                                <div className="bg-purple-50 border border-purple-100 p-8 rounded-2xl text-center hover:bg-purple-100 transition-colors group">
                                    <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-purple-600 group-hover:scale-110 transition-transform">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Global Vision</h4>
                                    <p className="text-gray-600">Sourcing the best trends and innovations from every corner of the world.</p>
                                </div>
                                <div className="bg-purple-50 border border-purple-100 p-8 rounded-2xl text-center hover:bg-purple-100 transition-colors group">
                                    <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-purple-600 group-hover:scale-110 transition-transform">
                                        <Heart className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Customer Loved</h4>
                                    <p className="text-gray-600">Our community is our heartbeat. We are dedicated to your satisfaction.</p>
                                </div>
                            </div>
                        </div>
                    )
                };
            case 'contact':
                return {
                    title: 'Contact Us',
                    icon: Mail,
                    content: (
                        <div className="grid md:grid-cols-2 gap-12 text-gray-600">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
                                    <p className="text-gray-600 mb-8">Have a question or just want to say hello? We'd love to hear from you.</p>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
                                                <MapPin className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Visit Us</h4>
                                                <p className="text-gray-600">123 Commerce Blvd, Suite 100<br />New York, NY 10012</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
                                                <Mail className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Email Us</h4>
                                                <p className="text-gray-600">support@phihorizon.com<br />partners@phihorizon.com</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
                                                <Phone className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Call Us</h4>
                                                <p className="text-gray-600">+1 (555) 123-4567<br />Mon-Fri, 9am - 6pm EST</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">First Name</label>
                                            <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all" placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Last Name</label>
                                            <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Email</label>
                                        <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all" placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Message</label>
                                        <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all" placeholder="How can we help you?" />
                                    </div>
                                    <button className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 uppercase tracking-wider">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    )
                };
            default:
                return {
                    title: 'Page Not Found',
                    icon: HelpCircle,
                    content: <p className="text-gray-600">The requested information page could not be found.</p>
                };
        }
    };

    const { title, icon: Icon, content } = getPageContent(slug);

    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden">
            {/* Simple Background Gradient for Light Theme */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-50 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative z-10">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => onNavigate('home')}
                    className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                >
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 md:p-12 text-white">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                                <Icon className="w-8 h-8" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        {content}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
