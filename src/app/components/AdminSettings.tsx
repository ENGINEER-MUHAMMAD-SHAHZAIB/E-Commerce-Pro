import React from 'react';
import {
    Settings,
    Globe,
    CreditCard,
    Bell,
    Shield,
    Smartphone,
    Truck,
    Palette,
    Eye,
    Lock,
    Zap
} from 'lucide-react';

const AdminSettings: React.FC = () => {
    return (
        <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <Settings className="w-5 h-5 text-indigo-500" />
                        </div>
                        <h2 className="text-2xl font-black tracking-tight uppercase tracking-widest text-gray-900 text-sm">Nexus Configuration</h2>
                    </div>
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">Core Parameters: <span className="text-gray-900">v4.2.0 Stable Build</span></p>
                </div>
                <button className="btn-primary px-6 py-3 rounded-2xl text-sm font-black">Propagate All Changes</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Navigation Sidebar for Settings */}
                <div className="lg:col-span-1 space-y-4">
                    {[
                        { icon: Globe, label: 'Global Storefront', desc: 'Regional, currency & language', active: true },
                        { icon: Palette, label: 'Design System', desc: 'Gradients, glass & theme', active: false },
                        { icon: CreditCard, label: 'Payment Gateway', desc: 'Secure financial nexus', active: false },
                        { icon: Truck, label: 'Logistics Matrix', desc: 'Shipping routes & zones', active: false },
                        { icon: Bell, label: 'Alert Protocols', desc: 'Push & SMTP configuration', active: false },
                        { icon: Shield, label: 'Security & Access', desc: 'Admin roles & 2FA', active: false },
                    ].map((item, i) => (
                        <div key={i} className={`p-5 rounded-3xl border transition-all cursor-pointer group ${item.active ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100 shadow-sm' : 'bg-white border-gray-100 hover:border-gray-200'
                            }`}>
                            <div className="flex items-center gap-4">
                                <item.icon className={`w-5 h-5 ${item.active ? 'text-purple-500' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                <div>
                                    <p className={`text-xs font-black uppercase tracking-widest ${item.active ? 'text-gray-900' : 'text-gray-600'}`}>{item.label}</p>
                                    <p className="text-[10px] font-bold text-gray-600 mt-1 uppercase tracking-tight">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Configuration Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="card p-8 space-y-8 relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-purple-100 blur-[100px] rounded-full -mr-32 -mt-32"></div>

                        <div>
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-amber-400" />
                                Global Parameters
                            </h3>
                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Primary storefront identity and regional mapping.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Store Identity Name</label>
                                <input type="text" defaultValue="Horizon E-Commerce" className="w-full bg-gray-100 border border-gray-100 rounded-2xl px-5 py-4 text-xs font-bold text-gray-900 focus:border-purple-200 transition-all outline-none" />
                            </div>
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Primary Support Email</label>
                                <input type="email" defaultValue="support@horizon.com" className="w-full bg-gray-100 border border-gray-100 rounded-2xl px-5 py-4 text-xs font-bold text-gray-900 focus:border-purple-200 transition-all outline-none" />
                            </div>
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Default Transaction Currency</label>
                                <select className="w-full bg-gray-100 border border-gray-100 rounded-2xl px-5 py-4 text-xs font-bold text-gray-900 focus:border-purple-200 transition-all outline-none appearance-none">
                                    <option>USD ($) - United States Dollar</option>
                                    <option>PKR (₨) - Pakistani Rupee</option>
                                    <option>EUR (€) - Euro</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Operational Region</label>
                                <input type="text" defaultValue="Global Distributed Hubs" className="w-full bg-gray-100 border border-gray-100 rounded-2xl px-5 py-4 text-xs font-bold text-gray-900 focus:border-purple-200 transition-all outline-none" />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-1">Advanced Mode Engine</h4>
                                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">Enables raw catalog manipulation and beta features.</p>
                                </div>
                                <div className="w-14 h-7 bg-purple-50 rounded-full p-1 border border-purple-100 relative cursor-pointer shadow-inner">
                                    <div className="w-5 h-5 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-1">Search Engine Indexing</h4>
                                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">Allow web crawlers to map the store hierarchy.</p>
                                </div>
                                <div className="w-14 h-7 bg-gray-100 rounded-full p-1 border border-gray-100 relative cursor-pointer">
                                    <div className="w-5 h-5 bg-white rounded-full absolute left-1 top-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-rose-50 to-transparent border border-rose-100 rounded-[2.5rem] p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-rose-50 rounded-2xl">
                                <Lock className="w-6 h-6 text-rose-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-rose-600 uppercase tracking-widest leading-none">Security Restricted Zone</h3>
                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mt-1">Actions below cannot be reversed easily.</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <button className="px-6 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border border-rose-100">Purge Cached Data</button>
                            <button className="px-6 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border border-rose-100">Deactivate Storefront</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
