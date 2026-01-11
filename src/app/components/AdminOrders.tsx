import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Order } from '../types';
import {
    Search,
    Filter,
    MoreVertical,
    Eye,
    Package,
    Truck,
    CheckCircle,
    Clock,
    ExternalLink,
    ChevronDown,
    ShoppingCart,
    MapPin,
    CreditCard,
    X,
    ArrowUpDown
} from 'lucide-react';

const AdminOrders: React.FC = () => {
    const { orders, updateOrderStatus } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const filteredOrders = orders.filter((o: Order) =>
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.shippingAddress.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'processing': return <Clock className="w-3.5 h-3.5" />;
            case 'shipped': return <Truck className="w-3.5 h-3.5" />;
            case 'delivered': return <CheckCircle className="w-3.5 h-3.5" />;
            default: return <Package className="w-3.5 h-3.5" />;
        }
    };

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'processing': return 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-amber-500/10';
            case 'shipped': return 'bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-blue-500/10';
            case 'delivered': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-emerald-500/10';
            case 'cancelled': return 'bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-rose-500/10';
            default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
        }
    };

    return (
        <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <ShoppingCart className="w-5 h-5 text-indigo-500" />
                        </div>
                        <h2 className="text-2xl font-black tracking-tight uppercase tracking-widest text-gray-900 text-sm">Transaction Hub</h2>
                    </div>
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">Active Stream: <span className="text-gray-900">{orders.length} Orders Pending</span></p>
                </div>
                <div className="flex gap-4">
                    <button className="btn-ghost px-6 py-3 text-sm font-black">Bulk Export CSV</button>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row gap-6">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by order nexus ID or customer identity..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-100 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-xs font-bold tracking-widest focus:border-purple-200 ring-0 transition-all placeholder-gray-500"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button className="btn-ghost flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-600">
                            <Filter className="w-4 h-4" />
                            Filter by Flow
                        </button>
                        <button className="btn-ghost flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-600">
                            <ArrowUpDown className="w-4 h-4" />
                            Timeline
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                                <th className="px-8 py-6">Order Hash</th>
                                <th className="px-8 py-6">Customer Profile</th>
                                <th className="px-8 py-6">Timestamp</th>
                                <th className="px-8 py-6">Total Value</th>
                                <th className="px-8 py-6">Current Flow Stage</th>
                                <th className="px-8 py-6 text-right">Nexus Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.map((order: Order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-mono text-xs text-purple-500 font-black">#{order.id.split('-')[1]}</span>
                                            <span className="text-[9px] text-gray-600 mt-1.5 uppercase tracking-[0.2em] font-black">
                                                {order.items.length} Units Manifested
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-extrabold text-gray-900 uppercase tracking-tight">{order.shippingAddress.label}</span>
                                            <span className="text-[10px] text-gray-600 uppercase tracking-widest font-black mt-1">{order.shippingAddress.city}, {order.shippingAddress.country}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-black text-gray-900 tracking-tighter inline-block transition-transform">${order.total.toFixed(2)}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="relative group/status">
                                            <button className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm transition-all ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                                <ChevronDown className="w-3.5 h-3.5 ml-1.5 opacity-50" />
                                            </button>

                                            {/* Premium Status Dropdown */}
                                            <div className="absolute top-full left-0 mt-3 w-48 bg-white border border-gray-100 rounded-2xl shadow-lg opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all z-20 p-2 transform origin-top scale-95 group-hover/status:scale-100 duration-300">
                                                <p className="px-3 py-2 text-[9px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-100 mb-1">Set Flow Stage</p>
                                                {(['processing', 'shipped', 'delivered', 'cancelled'] as Order['status'][]).map(status => (
                                                    <button
                                                        key={status}
                                                        onClick={() => updateOrderStatus(order.id, status)}
                                                        className="w-full text-left px-3 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 rounded-xl text-gray-600 transition-all flex items-center justify-between group/sub"
                                                    >
                                                        {status}
                                                        <div className={`w-1.5 h-1.5 rounded-full ${order.status === status ? 'bg-purple-500 shadow-sm shadow-purple-500' : 'opacity-0 group-hover/sub:opacity-100 bg-gray-200'}`}></div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="p-3 btn-ghost rounded-xl transition-all"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredOrders.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center text-gray-600 font-bold uppercase tracking-[0.2em] text-xs">No transaction records found matching your query</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modern Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedOrder(null)}></div>
                    <div className="relative bg-[#0c0c0e] border border-white/10 rounded-[2.5rem] w-full max-w-4xl shadow-[0_0_100px_-20px_rgba(99,102,241,0.3)] p-10 animate-in zoom-in-95 duration-500 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-2xl transition-all"
                        >
                            <X className="w-6 h-6 text-gray-500" />
                        </button>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-white/5 pb-8">
                            <div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-widest text-sm mb-1">Manifest #{selectedOrder.id.split('-')[1]}</h3>
                                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                    <span>{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                                    <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                                    <span className="text-purple-400">Payment: {selectedOrder.paymentMethod}</span>
                                </div>
                            </div>
                            <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border font-black text-[10px] uppercase tracking-widest shadow-xl ${getStatusColor(selectedOrder.status)}`}>
                                {getStatusIcon(selectedOrder.status)}
                                {selectedOrder.status}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div className="md:col-span-2 space-y-8">
                                <div className="bg-white/5 border border-white/5 rounded-3xl p-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
                                        <Package className="w-4 h-4" /> Manifest Content
                                    </h4>
                                    <div className="space-y-4">
                                        {selectedOrder.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 bg-white/2 rounded-2xl border border-white/5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-lg">
                                                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-xs uppercase tracking-tight text-white mb-0.5">{item.product.name}</p>
                                                        <p className="text-[10px] font-bold text-gray-500">Qty: {item.quantity} × ${item.product.price.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <p className="font-black text-xs text-white">${(item.quantity * item.product.price).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white/5 border border-white/5 rounded-3xl p-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" /> Shipping Nexus
                                    </h4>
                                    <div className="text-xs font-bold text-indigo-200 leading-relaxed uppercase tracking-tight">
                                        <p className="text-white font-black mb-1">{selectedOrder.shippingAddress.label}</p>
                                        <p>{selectedOrder.shippingAddress.street}</p>
                                        <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                                        <p>{selectedOrder.shippingAddress.country}</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-white/10 rounded-3xl p-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" /> Financial Summary
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-[10px] font-bold text-gray-400">
                                            <span>Subtotal</span>
                                            <span>${selectedOrder.subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-bold text-gray-400">
                                            <span>Logistics</span>
                                            <span>${selectedOrder.shipping.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-[11px] font-black text-white pt-3 border-t border-white/5">
                                            <span className="uppercase tracking-widest text-[9px]">Gross Total</span>
                                            <span>${selectedOrder.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
