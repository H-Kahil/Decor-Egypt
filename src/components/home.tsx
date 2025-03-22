import React from "react";
import HeroSection from "./home/HeroSection";
import CategoryShowcase from "./home/CategoryShowcase";
import ProductGrid from "./products/ProductGrid";
import PromotionBanner from "./home/PromotionBanner";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <HeroSection />

        <CategoryShowcase />

        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Featured Products
            </h2>
            <ProductGrid />
          </div>
        </section>

        <PromotionBanner />

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto text-center max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
            <p className="text-gray-600 mb-12">
              We offer premium quality furniture and home decor with exceptional
              customer service.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 bg-fuchsia-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-fuchsia-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
                <p className="text-gray-600">
                  All our products are made with premium materials and built to
                  last.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 bg-fuchsia-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-fuchsia-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="text-gray-600">
                  Enjoy free shipping on all orders over $500 within the
                  country.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 bg-fuchsia-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-fuchsia-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Our customer service team is available around the clock to
                  assist you.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
