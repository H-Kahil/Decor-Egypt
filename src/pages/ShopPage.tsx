import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";

const ShopPage = () => {
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
            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Page Header */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/70 to-violet-600/50 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1200&q=80"
            alt="Shop All Products"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">Shop All Products</h1>
            <p className="max-w-2xl text-white/90">
              Discover our complete collection of premium furniture and home
              decor items. From modern to classic styles, find the perfect
              pieces for your space.
            </p>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "Furniture",
                image:
                  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
                link: "/category/furniture",
              },
              {
                name: "Decor",
                image:
                  "https://images.unsplash.com/photo-1545083036-61d5763e1959?w=400&q=80",
                link: "/category/decor",
              },
              {
                name: "Kitchen & Bath",
                image:
                  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80",
                link: "/category/kitchen-bath",
              },
              {
                name: "Outdoor",
                image:
                  "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80",
                link: "/category/outdoor",
              },
            ].map((category) => (
              <a
                key={category.name}
                href={category.link}
                className="relative rounded-lg overflow-hidden group h-48"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10 group-hover:from-violet-900/70 group-hover:to-violet-600/30 transition-colors duration-300"></div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 z-20 flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">
                    {category.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">All Products</h2>
          <ProductGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShopPage;
