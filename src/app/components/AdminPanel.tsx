import React, { useState } from 'react';
import { useApp } from '../AppContext';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminUsers from './AdminUsers';
import AdminSettings from './AdminSettings';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ChevronLeft,
  LogOut,
  Bell,
  Search,
  Menu,
  PieChart,
  Globe,
  Plus,
  ArrowUpRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  X
} from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'users' | 'settings'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { user, logout, notifications, markNotificationAsRead } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Inventory', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'users', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboard />;
      case 'products': return <AdminProducts />;
      case 'orders': return <AdminOrders />;
      case 'users': return <AdminUsers />;
      case 'settings': return <AdminSettings />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-white text-gray-900 overflow-hidden font-sans selection:bg-purple-100">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-purple-100 blur-[80px] rounded-full -mr-32 -mt-12"></div>
        <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-indigo-100 blur-[80px] rounded-full -ml-32 -mb-12"></div>
      </div>

      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? 'w-64' : 'w-20'
          } transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] bg-white/95 backdrop-blur-sm border-r border-gray-200 flex flex-col z-50 relative`}
      >
        <div className="p-6 flex items-center justify-between">
              {isSidebarOpen ? (
                <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-sm ring-1 ring-purple-50">
                P
              </div>
              <span className="font-extrabold tracking-tight text-xl text-gray-900">
                Phi<span className="text-purple-600">Admin</span>
              </span>
                </div>
              ) : (
                <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-purple-600/20 mx-auto ring-1 ring-white/20">
                  P
                </div>
              )}
        </div>

        <nav className="flex-1 px-3 py-6 space-y-2">
          {isSidebarOpen && <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-2">Main Menu</p>}
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative ${activeTab === item.id
                ? 'bg-purple-50 text-purple-700 border border-purple-100'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent'
                }`}
            >
              {activeTab === item.id && (
                <div className="absolute left-0 w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-full"></div>
              )}
              <item.icon className={`w-5 h-5 shrink-0 ${activeTab === item.id ? 'text-purple-500' : 'group-hover:scale-110 group-hover:text-purple-600 transition-all duration-300'}`} />
              {isSidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 space-y-4">
          {isSidebarOpen && (
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-gray-100 rounded-2xl p-4 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/50 blur-2xl rounded-full transition-all group-hover:scale-150"></div>
              <p className="text-xs font-bold text-purple-600 mb-1 flex items-center gap-2">
                <Globe className="w-3 h-3 text-purple-500" />
                Global Access
              </p>
              <p className="text-[10px] text-gray-600 leading-relaxed mb-3">Full control over storefront global settings.</p>
              <button className="w-full py-1.5 bg-purple-600 text-white text-[10px] font-bold rounded-lg transition-colors border border-transparent uppercase tracking-wider">Upgrade Pro</button>
            </div>
          )}

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 border border-transparent hover:border-red-100"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="font-bold text-sm">Logout Session</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40 transition-all duration-500">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all border border-transparent hover:border-gray-200 group"
            >
              <Menu className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
            </button>
            <div className="h-6 w-px bg-gray-100"></div>
            <h2 className="text-xl font-black uppercase tracking-widest text-gray-900">
              {activeTab}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center bg-gray-100 border border-gray-200 rounded-2xl px-5 py-2 group focus-within:border-purple-200 focus-within:bg-white transition-all duration-300 w-80">
              <Search className="w-4 h-4 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="text"
                placeholder="Find data, orders, tools..."
                className="bg-transparent border-none focus:ring-0 text-xs w-full ml-3 placeholder-gray-500 text-gray-700 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative p-2.5 rounded-xl transition-all border border-transparent group ${isNotificationsOpen ? 'bg-gray-100 border-gray-200' : 'hover:bg-gray-100 hover:border-gray-200'}`}
              >
                <Bell className={`w-5 h-5 ${isNotificationsOpen ? 'text-purple-500' : 'text-gray-500 group-hover:text-purple-500'} transition-colors`} />
                {unreadCount > 0 && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full border-2 border-white ring-1 ring-pink-200 animate-pulse"></span>
                )}
              </button>

              {/* Notification Popover */}
              {isNotificationsOpen && (
                <div className="absolute top-full right-0 mt-4 w-96 bg-white border border-gray-200 rounded-2xl shadow-lg z-[100] animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                    <h4 className="text-xs font-black uppercase tracking-widest">Notification Center</h4>
                    {unreadCount > 0 && <span className="text-[10px] font-black bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{unreadCount} New</span>}
                  </div>
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationAsRead(notif.id)}
                          className={`p-5 border-b border-gray-100 hover:bg-gray-50 transition-all cursor-pointer relative group ${!notif.read ? 'bg-purple-50' : ''}`}
                        >
                          {!notif.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>}
                          <div className="flex gap-4">
                            <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${notif.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                              notif.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                                'bg-blue-500/10 text-blue-500'
                              }`}>
                              {notif.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                                notif.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> :
                                  <Clock className="w-5 h-5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-gray-900 mb-1">{notif.title}</p>
                              <p className="text-[10px] text-gray-600 leading-relaxed truncate">{notif.message}</p>
                              <p className="text-[9px] text-gray-500 font-black mt-2 uppercase tracking-widest">{new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1 shrink-0"></div>
                            )}
                          </div>
                        </div>
                      ))
                      ) : (
                      <div className="p-12 text-center">
                        <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Digital silence</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-white text-center border-t border-gray-100">
                    <button className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-gray-900 transition-colors">Mark all as resolved</button>
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-8 bg-gray-100 mx-2"></div>

            <div className="flex items-center gap-4 group cursor-pointer p-1.5 pr-4 rounded-2xl hover:bg-white/5 transition-all">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 via-indigo-600 to-pink-500 p-[1px] shadow-sm group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-[11px] bg-white flex items-center justify-center font-black text-xs text-gray-900">
                  {user?.name?.[0]}
                </div>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-bold leading-none text-gray-900 transition-colors group-hover:text-purple-600">{user?.name}</p>
                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-[0.2em] font-black group-hover:text-gray-600">Admin</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-gray-50">
          <div className="max-w-[1600px] mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
