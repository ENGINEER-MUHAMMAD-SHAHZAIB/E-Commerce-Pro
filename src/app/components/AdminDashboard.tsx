import React from 'react';
import { useApp } from '../AppContext';
import { Order, Product } from '../types';
import {
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    AlertTriangle,
    Zap,
    Activity,
    Calendar,
    Layers,
    ExternalLink
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const { orders, products } = useApp();

    const stats = [
        { label: 'Revenue', value: `$${orders.reduce((acc: number, o: Order) => acc + o.total, 0).toLocaleString()}`, icon: DollarSign, change: '+12.5%', trend: 'up', gradient: 'from-purple-600 to-indigo-600', shadow: 'shadow-purple-600/20' },
        { label: 'Orders', value: orders.length, icon: ShoppingBag, change: '+8.2%', trend: 'up', gradient: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/20' },
        { label: 'Customers', value: '1,284', icon: Users, change: '-3.1%', trend: 'down', gradient: 'from-pink-600 to-rose-400', shadow: 'shadow-pink-600/20' },
        { label: 'Store Items', value: products.length, icon: Layers, change: '+2.4%', trend: 'up', gradient: 'from-emerald-500 to-teal-400', shadow: 'shadow-emerald-500/20' },
    ];

    const lowStockProducts = products.filter(p => p.stock < 10);

    return (
        <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-[2rem] border border-gray-100 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-64 h-64 bg-purple-100 blur-3xl rounded-full -mr-20 -mt-20 transition-all duration-700"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">Welcome back to <span className="heading-gradient">Horizon Pro</span></h1>
                    <p className="text-gray-600 font-medium max-w-lg">Your store is performing <span className="text-emerald-500 font-bold">12% better</span> today. Check your low stock alerts and new orders below.</p>
                </div>
                <div className="flex gap-4 relative z-10">
                    <button className="btn-primary flex items-center gap-2 px-5 py-2 text-sm">
                        <Zap className="w-4 h-4" />
                        Live Preview
                    </button>
                    <button className="btn-ghost flex items-center gap-2 px-5 py-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        View Reports
                    </button>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="card group relative overflow-hidden">
                        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-gray-50 rounded-full transition-transform duration-700"></div>
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg ${stat.shadow} group-hover:scale-110 transition-all duration-500`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                                {stat.change}
                                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-1">{stat.label}</h3>
                        <p className="text-3xl font-black text-gray-900 tracking-tighter">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sales Chart Mockup - Large & Modern */}
                <div className="lg:col-span-8 card p-8 overflow-hidden relative group">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-500/10 rounded-xl">
                                <Activity className="w-5 h-5 text-purple-400" />
                            </div>
                            <h3 className="font-black text-xl tracking-tight uppercase tracking-widest text-sm">Revenue Analytics</h3>
                        </div>
                        <div className="flex bg-gray-100 rounded-xl p-1 border border-gray-100">
                            {['Day', 'Week', 'Month', 'Year'].map((t) => (
                                <button key={t} className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${t === 'Week' ? 'bg-white text-black shadow-lg' : 'text-gray-600 hover:text-gray-900'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Visual Mock Chart */}
                    <div className="h-[300px] flex items-end gap-3 px-4 mt-12 relative">
                        <div className="absolute inset-0 flex flex-col justify-between py-2 overflow-hidden opacity-20">
                            {[...Array(5)].map((_, i) => <div key={i} className="w-full h-px bg-white/10"></div>)}
                        </div>
                        {[40, 70, 45, 90, 65, 85, 100, 75, 55, 80, 60, 95].map((h, i) => (
                            <div key={i} className="flex-1 group/bar relative">
                                <div
                                    className="w-full bg-gradient-to-t from-purple-600/20 to-indigo-500/20 rounded-t-xl transition-all duration-1000 origin-bottom hover:from-purple-500 hover:to-indigo-400 hover:shadow-lg hover:shadow-purple-500/20 group-hover/bar:bg-white/10 cursor-pointer"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-2 py-1 rounded-lg text-[10px] font-black opacity-0 group-hover/bar:opacity-100 transition-opacity">
                                        ${(h * 123).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-6 px-4">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                            <span key={m} className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{m}</span>
                        ))}
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="card p-8 relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3 text-rose-400">
                                <div className="p-3 bg-rose-500/10 rounded-xl">
                                    <AlertTriangle className="w-5 h-5" />
                                </div>
                                <h3 className="font-black text-sm uppercase tracking-widest">Stock Alerts</h3>
                            </div>
                            <span className="bg-rose-100 text-rose-600 text-[10px] font-black px-2.5 py-1 rounded-full animate-bounce">
                                {lowStockProducts.length}
                            </span>
                        </div>

                        <div className="space-y-4">
                            {lowStockProducts.slice(0, 4).map((p) => (
                                <div key={p.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl hover:bg-gray-100 transition-all group/item border border-gray-100">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-xs truncate group-hover/item:text-purple-600 transition-colors uppercase tracking-tight">{p.name}</p>
                                        <p className="text-[10px] font-black text-rose-600 mt-1 uppercase tracking-widest">{p.stock} units left</p>
                                    </div>
                                    <button className="p-2 btn-ghost rounded-lg text-gray-600 transition-all">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {lowStockProducts.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                                        <Zap className="w-8 h-8" />
                                    </div>
                                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Inventory Healthy</p>
                                </div>
                            )}
                        </div>
                        <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-black text-[10px] rounded-xl transition-all uppercase tracking-[0.2em] border border-white/5">
                            Restock Management
                        </button>
                    </div>

                    {/* Quick Conversion Card */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-600/20 relative overflow-hidden group">
                        <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl transition-all group-hover:scale-150"></div>
                        <div className="relative z-10">
                            <h4 className="text-xl font-black mb-1 uppercase tracking-tight leading-tight">Order Recovery</h4>
                            <p className="text-indigo-200 text-xs font-bold mb-6">Automate emails to 42 abandoned carts.</p>
                            <button className="bg-white text-indigo-600 font-black px-6 py-2.5 rounded-xl text-[10px] uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95">Launch Campaign</button>
                        </div>
                        <div className="absolute right-4 bottom-4 opacity-20">
                            <Activity className="w-24 h-24" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Table Section */}
            <div className="card overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center font-black">
                            <ShoppingBag className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-extrabold text-lg tracking-tight uppercase tracking-widest text-gray-900">Real-time Orders</h3>
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Updated 5 seconds ago</p>
                        </div>
                    </div>
                    <button className="btn-ghost flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest border border-gray-100">
                        Export Dataset
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                                <th className="px-8 py-5">System ID</th>
                                <th className="px-8 py-5">Customer Information</th>
                                <th className="px-8 py-5">Flow Status</th>
                                <th className="px-8 py-5">Gross Amount</th>
                                <th className="px-8 py-5 text-right">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.slice(0, 5).map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-all group">
                                    <td className="px-8 py-6 font-mono text-[11px] text-purple-600 font-bold rounded-l-2xl">
                                        #{order.id.split('-')[1]}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black border border-gray-100 group-hover:scale-110 transition-transform">
                                                {order.shippingAddress.label[0]}
                                            </div>
                                            <div>
                                                <span className="text-sm font-bold text-gray-900 block">{order.shippingAddress.label}</span>
                                                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest mt-0.5">{order.shippingAddress.city}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                order.status === 'processing' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                    'bg-indigo-50 text-indigo-600 border-indigo-100'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-black text-gray-900 tracking-tight">
                                        ${order.total.toFixed(2)}
                                    </td>
                                    <td className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">
                                        <div className="flex items-center justify-end gap-3 group/link">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                            <div className="p-2 bg-gray-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ExternalLink className="w-3 h-3 text-gray-600" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-16 text-center text-gray-600 font-bold uppercase tracking-[0.2em] text-xs">No transaction records detected</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
