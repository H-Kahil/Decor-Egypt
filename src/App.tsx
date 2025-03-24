import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "tempo-routes";

// Lazy load pages with preloading for better performance
const Home = lazy(() => import("./components/home"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const SalePage = lazy(() => import("./pages/SalePage"));
const CMSModule = lazy(() => import("./pages/CMSModule"));

// Initialize Tempo Devtools
import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        {/* Main application routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route
          path="/category/:category/:subcategory"
          element={<CategoryPage />}
        />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cms" element={<CMSModule />} />

        {/* Add tempobook route for Tempo platform */}
        {import.meta.env.VITE_TEMPO === "true" && (
          <Route path="/tempobook/*" element={null} />
        )}

        {/* Default route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Suspense>
  );
}

export default App;
