import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface TrackOrderPageProps {
    onNavigate: (page: string) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ onNavigate }) => {
    const [orderId, setOrderId] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [trackingResult, setTrackingResult] = useState<any>(null);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId.trim()) {
            toast.error('Please enter an order ID');
            return;
        }

        setIsSearching(true);
        // Mock API call simulation
        setTimeout(() => {
            setIsSearching(false);
            if (orderId.length > 3) {
                setTrackingResult({
                    id: orderId,
                    status: 'shipping',
                    estimatedDelivery: 'Jan 15, 2026',
                    currentLocation: 'Distribution Center, NY',
                    steps: [
                        { title: 'Order Placed', date: 'Jan 10, 2026', completed: true, icon: Package },
                        { title: 'Processing', date: 'Jan 11, 2026', completed: true, icon: Clock },
                        { title: 'Shipped', date: 'Jan 12, 2026', completed: true, icon: Truck },
                        { title: 'Out for Delivery', date: 'Expected: Jan 15', completed: false, icon: MapPin },
                        { title: 'Delivered', date: '-', completed: false, icon: CheckCircle },
                    ]
                });
                toast.success('Order found!');
            } else {
                toast.error('Order not found. Please check the ID.');
                setTrackingResult(null);
            }
        }, 1500);
    };

    return (
        <div className="min-h-[80vh] bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900">Track Your Order</h1>
                    <p className="text-gray-600">Enter your order ID to see the current status of your shipment.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100"
                >
                    <form onSubmit={handleTrack} className="flex gap-4">
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Enter Order ID (e.g., PHI-12345)"
                            className="flex-1 px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all font-medium text-lg"
                        />
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                        >
                            {isSearching ? 'Searching...' : <><span className="hidden sm:inline">Track</span> <ArrowRight className="w-5 h-5" /></>}
                        </button>
                    </form>
                </motion.div>

                {trackingResult && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-purple-100 overflow-hidden"
                    >
                        <div className="flex flex-wrap gap-6 justify-between items-start border-b border-gray-100 pb-6 mb-8">
                            <div>
                                <p className="text-sm text-gray-500">Order ID</p>
                                <p className="text-xl font-bold text-gray-900">#{trackingResult.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Estimated Delivery</p>
                                <p className="text-xl font-bold text-purple-600">{trackingResult.estimatedDelivery}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Current Location</p>
                                <p className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                    {trackingResult.currentLocation}
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            {/* Vertical Line for Mobile */}
                            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-100 md:hidden" />

                            {/* Horizontal Line for Desktop */}
                            <div className="hidden md:block absolute top-6 left-12 right-12 h-0.5 bg-gray-100" />

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                                {trackingResult.steps.map((step: any, index: number) => {
                                    const Icon = step.icon;
                                    const isActive = step.completed || index === trackingResult.steps.findIndex((s: any) => !s.completed) - 1;

                                    return (
                                        <div key={index} className="flex md:flex-col items-center gap-4 md:text-center">
                                            <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all
                        ${step.completed
                                                    ? 'bg-purple-600 border-purple-100 text-white shadow-lg shadow-purple-200'
                                                    : 'bg-white border-gray-100 text-gray-300'}
                      `}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 md:w-full">
                                                <p className={`font-bold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                                                    {step.title}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
