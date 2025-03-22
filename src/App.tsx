import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load pages for better performance
const ShopPage = lazy(() => import("./pages/ShopPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const SalePage = lazy(() => import("./pages/SalePage"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
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
          {/* Add tempobook route for Tempo platform */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
