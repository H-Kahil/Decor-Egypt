import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  url: string;
}

interface CategoryShowcaseProps {
  title?: string;
  categories?: CategoryItem[];
  className?: string;
}

const CategoryShowcase = ({
  title = "Shop by Category",
  categories = [
    {
      id: "1",
      name: "Furniture",
      icon: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",
      color: "bg-amber-100",
      url: "/category/furniture",
    },
    {
      id: "2",
      name: "Lighting",
      icon: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&q=80",
      color: "bg-blue-100",
      url: "/category/lighting",
    },
    {
      id: "3",
      name: "Decor",
      icon: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80",
      color: "bg-rose-100",
      url: "/category/decor",
    },
    {
      id: "4",
      name: "Kitchen",
      icon: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=300&q=80",
      color: "bg-green-100",
      url: "/category/kitchen",
    },
    {
      id: "5",
      name: "Bathroom",
      icon: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&q=80",
      color: "bg-purple-100",
      url: "/category/bathroom",
    },
    {
      id: "6",
      name: "Outdoor",
      icon: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=300&q=80",
      color: "bg-yellow-100",
      url: "/category/outdoor",
    },
  ],
  className,
}: CategoryShowcaseProps) => {
  return (
    <section className={cn("py-12 px-4 bg-white", className)}>
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <a
            href="/categories"
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View all categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.url}
              className="group flex flex-col items-center transition-transform hover:scale-105"
            >
              <div
                className={cn(
                  "w-full aspect-square rounded-xl overflow-hidden mb-3 relative",
                  category.color,
                )}
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
