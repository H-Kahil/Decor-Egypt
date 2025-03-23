import { Suspense, lazy, useEffect } from "react";
import { useRoutes, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load pages with preloading for better performance
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

// Preload functions to improve page load times
const preloadShopPage = () => import("./pages/ShopPage");
const preloadCategoryPage = () => import("./pages/CategoryPage");
const preloadProductDetailPage = () => import("./pages/ProductDetailPage");
const preloadAboutPage = () => import("./pages/AboutPage");
const preloadServicesPage = () => import("./pages/ServicesPage");
const preloadBlogPage = () => import("./pages/BlogPage");
const preloadContactPage = () => import("./pages/ContactPage");
const preloadFAQPage = () => import("./pages/FAQPage");
const preloadSalePage = () => import("./pages/SalePage");
const preloadCMSModule = () => import("./pages/CMSModule");

function App() {
  const location = useLocation();

  // Preload all pages when the app loads
  useEffect(() => {
    // Preload all pages in the background
    const timer = setTimeout(() => {
      preloadShopPage();
      preloadCategoryPage();
      preloadProductDetailPage();
      preloadAboutPage();
      preloadServicesPage();
      preloadBlogPage();
      preloadContactPage();
      preloadFAQPage();
      preloadSalePage();
      preloadCMSModule();
    }, 1000); // Start preloading after 1 second

    return () => clearTimeout(timer);
  }, []);

  // Preload specific pages based on current location
  useEffect(() => {
    if (location.pathname === "/") {
      // Preload common pages from home page
      preloadShopPage();
      preloadAboutPage();
      preloadSalePage();
      preloadCategoryPage(); // Always preload category page for better navigation
    } else if (location.pathname.includes("/shop")) {
      // Preload product-related pages
      preloadCategoryPage();
      preloadProductDetailPage();
    } else if (location.pathname.includes("/category")) {
      // Preload product detail page when on category page
      preloadProductDetailPage();
    }
  }, [location.pathname]);

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
          <Route path="/cms" element={<CMSModule />} />
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
