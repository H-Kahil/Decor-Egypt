import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";

const SalePage = () => {
  // Sample sale products data - in a real app, this would come from an API
  const saleProducts = [
    {
      id: "1",
      title: "Modern Ergonomic Office Chair",
      price: 249.99,
      originalPrice: 299.99,
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&q=80",
      rating: 4.5,
      isNew: false,
      isSale: true,
      category: "Furniture",
      tags: ["Office", "Chair", "Ergonomic", "Modern"],
      discount: 17,
    },
    {
      id: "2",
      title: "Minimalist Wooden Coffee Table",
      price: 199.99,
      originalPrice: 249.99,
      image:
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&q=80",
      rating: 4.8,
      isNew: true,
      isSale: true,
      category: "Furniture",
      tags: ["Living Room", "Table", "Wood", "Minimalist"],
      discount: 20,
    },
    {
      id: "3",
      title: "Scandinavian Fabric Sofa",
      price: 899.99,
      originalPrice: 1099.99,
      image:
        "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&q=80",
      rating: 4.7,
      isNew: false,
      isSale: true,
      category: "Furniture",
      tags: ["Living Room", "Sofa", "Fabric", "Scandinavian"],
      discount: 18,
    },
    {
      id: "6",
      title: "Luxury King Size Bed Frame",
      price: 1299.99,
      originalPrice: 1599.99,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80",
      rating: 4.9,
      isNew: false,
      isSale: true,
      category: "Furniture",
      tags: ["Bedroom", "Bed", "Luxury", "Wood"],
      discount: 19,
    },
    {
      id: "9",
      title: "Velvet Accent Chair",
      price: 349.99,
      originalPrice: 399.99,
      image:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80",
      rating: 4.5,
      isNew: true,
      isSale: true,
      category: "Furniture",
      tags: ["Living Room", "Chair", "Velvet", "Accent"],
      discount: 13,
    },
    {
      id: "10",
      title: "Marble Kitchen Island",
      price: 1499.99,
      originalPrice: 1799.99,
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80",
      rating: 4.8,
      isNew: false,
      isSale: true,
      category: "Kitchen",
      tags: ["Kitchen", "Marble", "Island", "Luxury"],
      discount: 17,
    },
    {
      id: "12",
      title: "Outdoor Patio Furniture Set",
      price: 899.99,
      originalPrice: 1099.99,
      image:
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80",
      rating: 4.7,
      isNew: true,
      isSale: true,
      category: "Outdoor",
      tags: ["Outdoor", "Patio", "Furniture", "Set"],
      discount: 18,
    },
    {
      id: "15",
      title: "Smart LED Floor Lamp",
      price: 199.99,
      originalPrice: 249.99,
      image:
        "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&q=80",
      rating: 4.6,
      isNew: true,
      isSale: true,
      category: "Lighting",
      tags: ["Floor Lamp", "LED", "Smart", "Modern"],
      discount: 20,
    },
  ];

  // Calculate days remaining in the sale
  const saleEndDate = new Date();
  saleEndDate.setDate(saleEndDate.getDate() + 7); // Sale ends in 7 days
  const today = new Date();
  const daysRemaining = Math.ceil(
    (saleEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

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
            <BreadcrumbLink href="/sale">Sale</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Sale Banner */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/70 to-red-600/50 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1200&q=80"
            alt="Summer Sale"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 text-white">
            <Badge className="w-fit mb-4 bg-red-500 text-white border-none text-sm py-1 px-3">
              Limited Time Offer
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Summer Sale</h1>
            <p className="max-w-2xl text-white/90 text-lg mb-6">
              Up to 50% off on selected furniture and home decor items. Don't
              miss out on these amazing deals!
            </p>
            <div className="flex items-center gap-2 bg-white/20 w-fit rounded-full px-4 py-2">
              <Clock className="h-5 w-5" />
              <span className="font-medium">
                Sale ends in {daysRemaining} days
              </span>
            </div>
          </div>
        </div>

        {/* Sale Products */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Sale Products</h2>
          <ProductGrid products={saleProducts} />
        </div>

        {/* Call to Action */}
        <div className="bg-violet-50 rounded-xl p-8 mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Don't Miss Out on These Amazing Deals!
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Browse our entire collection and find the perfect pieces to
            transform your home.
          </p>
          <Button size="lg" className="gap-2">
            Shop All Products <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SalePage;
