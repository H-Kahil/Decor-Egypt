import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/about">About Us</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Page Header */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/70 to-violet-600/50 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80"
            alt="About Decor Egypt"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">About Decor Egypt</h1>
            <p className="max-w-2xl text-white/90">
              Discover our story, mission, and the passion behind our curated
              collection of home decor and furniture.
            </p>
          </div>
        </div>

        {/* About Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-violet-800 mb-6">
              Our Story
            </h2>
            <p className="text-lg mb-6">
              Founded in 2020, Decor Egypt began with a simple mission: to bring
              beautiful, high-quality home furnishings to Egyptian homes at
              accessible prices. What started as a small showroom in Cairo has
              grown into a nationwide brand with a robust online presence.
            </p>

            <p className="text-lg mb-10">
              Our team of passionate designers and home decor enthusiasts work
              tirelessly to curate collections that blend contemporary trends
              with timeless elegance, always with an eye for quality and
              functionality.
            </p>

            <h2 className="text-3xl font-bold text-violet-800 mb-6">
              Our Mission
            </h2>
            <p className="text-lg mb-10">
              At Decor Egypt, we believe that everyone deserves to live in a
              space that reflects their personality and meets their needs. Our
              mission is to help our customers create homes they love by
              providing thoughtfully designed furniture and decor items that
              combine style, quality, and value.
            </p>

            <h2 className="text-3xl font-bold text-violet-800 mb-6">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="bg-violet-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-violet-800 mb-3">
                  Quality
                </h3>
                <p>
                  We never compromise on the quality of our products. Each item
                  in our collection is carefully selected and tested to ensure
                  it meets our high standards.
                </p>
              </div>
              <div className="bg-violet-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-violet-800 mb-3">
                  Sustainability
                </h3>
                <p>
                  We're committed to reducing our environmental impact by
                  sourcing eco-friendly materials and working with manufacturers
                  who share our values.
                </p>
              </div>
              <div className="bg-violet-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-violet-800 mb-3">
                  Customer Focus
                </h3>
                <p>
                  Our customers are at the heart of everything we do. We strive
                  to provide exceptional service and support at every step of
                  your shopping journey.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-violet-800 mb-6">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"
                    alt="Ahmed Hassan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">Ahmed Hassan</h3>
                <p className="text-violet-600">Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nour"
                    alt="Nour Ibrahim"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">Nour Ibrahim</h3>
                <p className="text-violet-600">Creative Director</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Laila"
                    alt="Laila Mahmoud"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">Laila Mahmoud</h3>
                <p className="text-violet-600">Head of Design</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Omar"
                    alt="Omar Farid"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">Omar Farid</h3>
                <p className="text-violet-600">Operations Manager</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
