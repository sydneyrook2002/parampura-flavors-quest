import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/components/HomePage';
import CartPage from '@/components/CartPage';
import LoginPage from '@/components/LoginPage';
import CategoryPage from '@/components/CategoryPage';
import ProductDetailPage from '@/components/ProductDetailPage';
import AboutPage from '@/components/AboutPage';
import ContactPage from '@/components/ContactPage';

const Index = () => {
  const { page } = useCart();

  const renderPage = () => {
    switch (page) {
      case 'cart':
        return <CartPage />;
      case 'login':
        return <LoginPage />;
      case 'category':
        return <CategoryPage />;
      case 'productDetail':
        return <ProductDetailPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
};

export default Index;
