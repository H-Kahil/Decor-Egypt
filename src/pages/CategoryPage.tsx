import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

interface CategoryPageProps {}

const CategoryPage: React.FC<CategoryPageProps> = () => {
  const { category, subcategory } = useParams<{
    category: string;
    subcategory?: string;
  }>();
  const [categoryData, setCategoryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const categoryImages = {
    furniture:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
    decor:
      "https://images.unsplash.com/photo-1545083036-61d5763e1959?w=1200&q=80",
    "kitchen-bath":
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80",
    outdoor:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
  };

  const categoryDescriptions = {
    furniture:
      "Transform your space with our premium furniture collection. From modern minimalist designs to classic elegance, find pieces that reflect your personal style.",
    decor:
      "Add personality to your home with our curated decor items. Discover unique pieces that make a statement and bring your interior vision to life.",
    "kitchen-bath":
      "Elevate your kitchen and bathroom with our functional yet stylish collection. Quality products designed for everyday use and lasting beauty.",
    outdoor:
      "Create your perfect outdoor oasis with our weather-resistant furniture and accessories. Designed for comfort and built to last through the seasons.",
  };

  // Simulate fetching category data
  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        // Mock data
        setCategoryData({
          name: category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "",
          description:
            categoryDescriptions[
              category as keyof typeof categoryDescriptions
            ] || "",
          image: categoryImages[category as keyof typeof categoryImages] || "",
          subcategories: [
            { id: "sub1", name: "Living Room", count: 42 },
            { id: "sub2", name: "Bedroom", count: 38 },
            { id: "sub3", name: "Dining", count: 24 },
            { id: "sub4", name: "Office", count: 18 },
          ],
        });
        setLoading(false);
      }, 500);
    };

    if (category) {
      fetchCategoryData();
    }
  }, [category, subcategory]);

  // Format the category and subcategory for display
  const formatName = (name?: string) => {
    if (!name) return "";
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formattedCategory = formatName(category);
  const formattedSubcategory = formatName(subcategory);

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
          <BreadcrumbItem>
            <BreadcrumbLink href={`/category/${category}`}>
              {formattedCategory}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {subcategory && (
            <BreadcrumbItem>
              <BreadcrumbLink href={`/category/${category}/${subcategory}`}>
                {formattedSubcategory}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
          </div>
        ) : categoryData ? (
          <>
            {/* Category Header */}
            <div className="relative rounded-xl overflow-hidden mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-900/70 to-violet-600/50 z-10"></div>
              <img
                src={categoryData.image}
                alt={categoryData.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 text-white">
                <h1 className="text-4xl font-bold mb-4">
                  {subcategory ? formattedSubcategory : categoryData.name}
                </h1>
                <p className="max-w-2xl text-white/90">
                  {categoryData.description}
                </p>
              </div>
            </div>

            {/* Subcategories (only show if we're at the top level category) */}
            {!subcategory && categoryData.subcategories && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">
                  Browse Subcategories
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categoryData.subcategories.map((sub: any) => (
                    <a
                      key={sub.id}
                      href={`/category/${category}/${sub.name.toLowerCase().replace(/ /g, "-")}`}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 text-center group"
                    >
                      <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-violet-200 transition-colors">
                        <span className="text-violet-600 text-xl font-bold">
                          {sub.name.charAt(0)}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900">{sub.name}</h3>
                      <p className="text-sm text-gray-500">{sub.count} items</p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <Separator className="my-8" />

            {/* Product Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {subcategory
                  ? `${formattedSubcategory} Products`
                  : `All ${categoryData.name} Products`}
              </h2>
              <ProductGrid />
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Category not found
            </h2>
            <p className="text-gray-600 mt-2">
              The category you're looking for doesn't exist.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
