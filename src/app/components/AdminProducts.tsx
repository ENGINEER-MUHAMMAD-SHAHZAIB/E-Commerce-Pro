import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Product } from '../types';
import {
    Plus,
    Edit2,
    Trash2,
    Search,
    Filter,
    ChevronRight,
    Package,
    X,
    Check,
    MoreVertical,
    Layers,
    BarChart3,
    Eye,
    ArrowUpDown,
    Download,
    AlertCircle
} from 'lucide-react';

const AdminProducts: React.FC = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const filteredProducts = products.filter((p: Product) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredProducts.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredProducts.map(p => p.id));
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    const handleBulkDelete = () => {
        if (confirm(`Are you sure you want to delete ${selectedIds.length} products?`)) {
            selectedIds.forEach(id => deleteProduct(id));
            setSelectedIds([]);
        }
    };

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <Layers className="w-5 h-5 text-purple-400" />
                        </div>
                        <h2 className="text-2xl font-black tracking-tight uppercase tracking-widest text-sm">Inventory Ledger</h2>
                    </div>
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">Global Vault: <span className="text-gray-900">{products.length} Items</span></p>
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 btn-ghost px-5 py-3 text-sm rounded-2xl font-black transition-all">
                        <BarChart3 className="w-4 h-4" />
                        Market Insights
                    </button>
                    <button
                        onClick={() => {
                            setEditingProduct(null);
                            setIsModalOpen(true);
                        }}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 btn-primary px-6 py-3 text-sm rounded-2xl"
                    >
                        <Plus className="w-4 h-4" />
                        Deploy Product
                    </button>
                </div>
            </div>
            <div className="card overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row gap-6">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Query vault by identity or SKU..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-100 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-xs font-bold uppercase tracking-widest focus:border-purple-200 focus:bg-white ring-0 transition-all placeholder-gray-500 text-gray-700"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button className="btn-ghost flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-600">
                            <Filter className="w-4 h-4" />
                            Category
                        </button>
                        <button className="btn-ghost flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-600">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                                <th className="px-8 py-6 w-12">
                                    <div
                                        onClick={toggleSelectAll}
                                        className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${selectedIds.length === filteredProducts.length && filteredProducts.length > 0
                                                ? 'bg-purple-600 border-purple-600 shadow-lg shadow-purple-600/20'
                                                : 'border-gray-100 hover:border-gray-200 bg-gray-50'
                                            }`}
                                    >
                                        {selectedIds.length === filteredProducts.length && filteredProducts.length > 0 && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                </th>
                                <th className="px-8 py-6">Product Metadata</th>
                                <th className="px-8 py-6">Classification</th>
                                <th className="px-8 py-6">Price Point</th>
                                <th className="px-8 py-6">Inventory Status</th>
                                <th className="px-8 py-6 text-right">Operational Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.map((product: Product) => (
                                <tr key={product.id} className={`hover:bg-gray-50 transition-all group ${selectedIds.includes(product.id) ? 'bg-purple-50' : ''}`}>
                                    <td className="px-8 py-6">
                                        <div
                                            onClick={() => toggleSelect(product.id)}
                                            className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${selectedIds.includes(product.id)
                                                    ? 'bg-purple-600 border-purple-600 shadow-lg shadow-purple-600/20'
                                                    : 'border-gray-100 hover:border-gray-200 bg-gray-50'
                                                }`}
                                        >
                                            {selectedIds.includes(product.id) && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0 group-hover:scale-105 transition-transform duration-500 p-0.5">
                                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-[14px]" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-extrabold text-sm text-gray-900 group-hover:text-purple-600 transition-colors uppercase tracking-tight">{product.name}</p>
                                                <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-black mt-1.5 flex items-center gap-2">
                                                    <span className="text-purple-500/50">SKU</span> {product.sku}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[10px] font-black text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 uppercase tracking-widest">{product.category}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-gray-900 tracking-tight">${product.price.toLocaleString()}</span>
                                            {product.originalPrice && (
                                                <span className="text-[10px] text-gray-600 line-through font-bold mt-1">${product.originalPrice.toLocaleString()}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between gap-4 w-32">
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${product.stock > 10 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                    {product.stock} units
                                                </span>
                                                <span className="text-[9px] font-black text-gray-600">{Math.min(100, (product.stock / 100) * 100).toFixed(0)}%</span>
                                            </div>
                                            <div className="w-32 h-1.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                                <div
                                                    className={`h-full bg-gradient-to-r rounded-full transition-all duration-1000 ${product.stock > 10 ? 'from-emerald-500 to-teal-400' : 'from-rose-600 to-pink-500'}`}
                                                    style={{ width: `${Math.min(100, (product.stock / 100) * 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                            <button
                                                onClick={() => {
                                                    setEditingProduct(product);
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-3 btn-ghost rounded-xl transition-all"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-3 btn-ghost rounded-xl transition-all text-rose-600"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Floating Bulk Action Bar - Daraz/Amazon Style */}
            {selectedIds.length > 0 && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 duration-500">
                    <div className="bg-white border border-gray-100 rounded-2xl px-6 py-4 flex items-center gap-8 shadow-lg">
                        <div className="flex items-center gap-3 pr-8 border-r border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-black text-xs">
                                {selectedIds.length}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Assets Selected</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 transition-all group">
                                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                Manifest Export
                            </button>
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 transition-all group">
                                <Layers className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                Change Category
                            </button>
                            <button
                                onClick={handleBulkDelete}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-rose-600 transition-all group px-4 py-2 bg-rose-50 rounded-lg border border-rose-100"
                            >
                                <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                Purge All
                            </button>
                        </div>
                        <button
                            onClick={() => setSelectedIds([])}
                            className="p-2 hover:bg-gray-100 rounded-lg ml-4"
                        >
                            <X className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                </div>
            )}

            {/* Modern Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white border border-gray-100 rounded-[2.5rem] w-full max-w-2xl shadow-[0_10px_50px_rgba(16,24,40,0.08)] p-10 animate-in zoom-in-95 duration-500 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-2xl transition-all"
                        >
                            <X className="w-6 h-6 text-gray-500" />
                        </button>

                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-4 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-sm">
                                <Package className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black tracking-tight text-gray-900 uppercase tracking-widest text-sm">{editingProduct ? 'Update Asset' : 'Deploy New Asset'}</h3>
                                <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-1">Horizon Ledger Configuration v2.4</p>
                            </div>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); alert('Asset deployed successfully!'); setIsModalOpen(false); }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6 md:col-span-1">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2.5">Product Identity</label>
                                    <input type="text" defaultValue={editingProduct?.name} required className="w-full bg-gray-100 border border-gray-100 rounded-2xl px-5 py-4 text-xs font-bold uppercase tracking-widest focus:border-purple-200 transition-all outline-none text-gray-900" placeholder="e.g. Quantum X1 Pro" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2.5">Category Class</label>
                                    <select className="w-full bg-gray-100 border border-gray-100 rounded-2xl px-5 py-4 text-xs font-bold uppercase tracking-widest focus:border-purple-200 transition-all outline-none text-gray-900 appearance-none">
                                        <option>Electronics</option>
                                        <option>Fashion</option>
                                        <option>Home Gear</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2.5">Price Point</label>
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-purple-500 text-xs">$</span>
                                            <input type="number" defaultValue={editingProduct?.price} required className="w-full bg-gray-100 border border-gray-100 rounded-2xl pl-10 pr-5 py-4 text-xs font-bold uppercase tracking-widest focus:border-purple-200 transition-all outline-none text-gray-900" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2.5">Stock Level</label>
                                        <input type="number" defaultValue={editingProduct?.stock} required className="w-full bg-gray-100 border border-gray-100 rounded-2xl px-5 py-4 text-xs font-bold uppercase tracking-widest focus:border-purple-200 transition-all outline-none text-gray-900" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2.5">Asset SKU</label>
                                    <input type="text" defaultValue={editingProduct?.sku} required className="w-full bg-gray-100 border border-gray-100 rounded-2xl px-5 py-4 text-xs font-mono font-bold uppercase tracking-widest focus:border-purple-200 transition-all outline-none text-gray-900" placeholder="HZ-000-000" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2.5">Detailed description</label>
                                    <textarea defaultValue={editingProduct?.description} className="w-full bg-gray-100 border border-gray-100 rounded-2xl px-5 py-4 text-xs font-medium focus:border-purple-200 transition-all outline-none text-gray-900 h-32 resize-none" placeholder="Provide full technical specifications..."></textarea>
                                </div>
                            </div>

                            <div className="space-y-6 md:col-span-1">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2.5">Primary Image</label>
                                    <div className="w-full h-48 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden">
                                        {editingProduct?.images?.[0] ? (
                                            <img src={editingProduct.images[0]} alt="preview" className="max-h-full max-w-full object-contain" />
                                        ) : (
                                            <div className="text-gray-400 text-sm">No image provided</div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2.5">SKU Notes</label>
                                    <input defaultValue={editingProduct?.sku} className="w-full bg-gray-100 border border-gray-100 rounded-2xl px-5 py-4 text-xs font-mono font-bold uppercase tracking-widest focus:border-purple-200 transition-all outline-none text-gray-900" placeholder="Optional notes about SKU" />
                                </div>
                            </div>

                            <div className="col-span-1 md:col-span-2 mt-4 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 btn-ghost py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-[0.2em]"
                                >
                                    Abort Changes
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 btn-primary py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-[0.2em]"
                                >
                                    {editingProduct ? 'Commit Metadata' : 'Finalize Deployment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
