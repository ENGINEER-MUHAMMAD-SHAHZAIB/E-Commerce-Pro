import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { User } from '../types';
import {
    Search,
    Filter,
    MoreVertical,
    Mail,
    Phone,
    MapPin,
    ShieldCheck,
    UserPlus,
    Trash2,
    Ban,
    CheckCircle2,
    Users
} from 'lucide-react';

const AdminUsers: React.FC = () => {
    // In a real app, this would come from a more robust customer state
    // For this demo, we'll use the current user and some mock customers
    const { user } = useApp();
    const [searchTerm, setSearchTerm] = useState('');

    const mockCustomers = [
        { id: '1', name: 'Zohaib Khan', email: 'zohaib@example.com', phone: '+92 300 1234567', totalOrders: 12, spent: 1250, status: 'active', registeredAt: '2023-11-20' },
        { id: '2', name: 'Ayesha Ahmed', email: 'ayesha@example.com', phone: '+92 321 7654321', totalOrders: 5, spent: 450, status: 'active', registeredAt: '2023-12-05' },
        { id: '3', name: 'Hamza Malik', email: 'hamza@example.com', phone: '+92 333 9876543', totalOrders: 0, spent: 0, status: 'inactive', registeredAt: '2024-01-10' },
        { id: '4', name: 'Sana Gul', email: 'sana@example.com', phone: '+92 345 1122334', totalOrders: 28, spent: 4200, status: 'active', registeredAt: '2023-08-15' },
        { id: '5', name: 'Bilal Peerzada', email: 'bilal@example.com', phone: '+92 301 5566778', totalOrders: 2, spent: 120, status: 'suspended', registeredAt: '2024-01-02' },
    ];

    const filteredUsers = mockCustomers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <Users className="w-5 h-5 text-purple-500" />
                        </div>
                        <h2 className="text-2xl font-black tracking-tight uppercase tracking-widest text-gray-900 text-sm">Customer Database</h2>
                    </div>
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">Registered Entities: <span className="text-gray-900">1,284 Customers</span></p>
                </div>
                <button className="btn-primary flex items-center gap-2 px-5 py-3 text-sm rounded-2xl">
                    <UserPlus className="w-4 h-4" />
                    Onboard Customer
                </button>
            </div>

            <div className="card overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row gap-6">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Query database by name or email identity..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-100 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-xs font-bold uppercase tracking-widest focus:border-purple-200 focus:bg-white ring-0 transition-all placeholder-gray-500 text-gray-700"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button className="btn-ghost flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-600">
                            <Filter className="w-4 h-4" />
                            Status Level
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                                <th className="px-8 py-6">Customer Profile</th>
                                <th className="px-8 py-6">Contact & Verification</th>
                                <th className="px-8 py-6">Status Flow</th>
                                <th className="px-8 py-6">Financial Yield</th>
                                <th className="px-8 py-6 text-right">Nexus Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-50 to-indigo-50 flex items-center justify-center font-black text-sm text-purple-500 border border-purple-100">
                                                {customer.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-sm text-gray-900 transition-colors uppercase tracking-tight">{customer.name}</p>
                                                <p className="text-[10px] text-gray-600 uppercase tracking-widest font-black mt-1">ID: HUB-{customer.id}00X</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600">
                                                <Mail className="w-3 h-3 text-purple-500/50" />
                                                {customer.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600">
                                                <Phone className="w-3 h-3 text-indigo-500/50" />
                                                {customer.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${customer.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                customer.status === 'suspended' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                    'bg-gray-50 text-gray-600 border-gray-100'
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-gray-900 tracking-tight">${customer.spent.toLocaleString()}</span>
                                            <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mt-1">{customer.totalOrders} Orders Logged</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                            <button className="p-3 btn-ghost rounded-xl transition-all">
                                                <ShieldCheck className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 btn-ghost rounded-xl transition-all text-rose-600">
                                                <Ban className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 btn-ghost rounded-xl transition-all">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
