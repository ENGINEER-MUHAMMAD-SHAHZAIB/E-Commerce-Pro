import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { AppProvider } from './AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AuthPages } from './components/AuthPages';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { ProfilePage } from './components/ProfilePage';
import { OrdersPage } from './components/OrdersPage';
import { WishlistPage } from './components/WishlistPage';
import { AdminPanel } from './components/AdminPanel';

type Page = 'home' | 'login' | 'register' | 'forgot' | 'products' | 'product' | 'cart' | 'checkout' | 'profile' | 'orders' | 'wishlist' | 'admin';
type AuthMode = 'login' | 'register' | 'forgot';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  const handleNavigate = (page: string, productId?: string) => {
    setCurrentPage(page as Page);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthModeChange = (mode: AuthMode) => {
    setAuthMode(mode);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      
      case 'login':
      case 'register':
      case 'forgot':
        return (
          <AuthPages
            mode={authMode}
            onNavigate={handleNavigate}
            onModeChange={handleAuthModeChange}
          />
        );
      
      case 'products':
        return <ProductsPage onNavigate={handleNavigate} />;
      
      case 'product':
        return <ProductDetailPage productId={selectedProductId} onNavigate={handleNavigate} />;
      
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      
      case 'orders':
        return <OrdersPage onNavigate={handleNavigate} />;
      
      case 'wishlist':
        return <WishlistPage onNavigate={handleNavigate} />;
      
      case 'admin':
        return <AdminPanel />;
      
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  // Don't show header/footer on auth pages
  const showHeaderFooter = !['login', 'register', 'forgot'].includes(currentPage);

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Toaster position="top-right" richColors />
        
        {showHeaderFooter && (
          <Header onNavigate={handleNavigate} currentPage={currentPage} />
        )}
        
        <main className="flex-1">
          {renderPage()}
        </main>
        
        {showHeaderFooter && <Footer onNavigate={handleNavigate} />}
      </div>
    </AppProvider>
  );
}

export default App;