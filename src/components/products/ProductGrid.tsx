import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, Grid3X3, LayoutGrid } from "lucide-react";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";

interface ProductGridProps {
  products?: Array<{
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    isNew?: boolean;
    isSale?: boolean;
    category?: string;
    tags?: string[];
  }>;
  categories?: Array<{
    id: string;
    name: string;
    count: number;
  }>;
  onFilterChange?: (filters: any) => void;
}

const ProductGrid = ({
  products = [
    {
      id: "1",
      title: "Modern Ergonomic Office Chair",
      price: 249.99,
      originalPrice: 299.99,
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80",
      rating: 4.5,
      isNew: false,
      isSale: true,
      category: "Furniture",
      tags: ["Office", "Chair", "Ergonomic"],
    },
    {
      id: "2",
      title: "Minimalist Wooden Coffee Table",
      price: 199.99,
      originalPrice: 249.99,
      image:
        "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&q=80",
      rating: 4.8,
      isNew: true,
      isSale: true,
      category: "Furniture",
      tags: ["Living Room", "Table", "Wood"],
    },
    {
      id: "3",
      title: "Scandinavian Fabric Sofa",
      price: 899.99,
      originalPrice: 1099.99,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
      rating: 4.7,
      isNew: false,
      isSale: true,
      category: "Furniture",
      tags: ["Living Room", "Sofa", "Fabric"],
    },
    {
      id: "4",
      title: "Modern Pendant Light Fixture",
      price: 129.99,
      originalPrice: 159.99,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80",
      rating: 4.3,
      isNew: false,
      isSale: false,
      category: "Lighting",
      tags: ["Ceiling", "Light", "Modern"],
    },
    {
      id: "5",
      title: "Ceramic Plant Pot Set",
      price: 49.99,
      originalPrice: 59.99,
      image:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80",
      rating: 4.6,
      isNew: true,
      isSale: false,
      category: "Decor",
      tags: ["Plant", "Ceramic", "Decor"],
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
      tags: ["Bedroom", "Bed", "Luxury"],
    },
    {
      id: "7",
      title: "Geometric Area Rug 5x8",
      price: 179.99,
      originalPrice: 219.99,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
      rating: 4.4,
      isNew: false,
      isSale: false,
      category: "Decor",
      tags: ["Rug", "Floor", "Geometric"],
    },
    {
      id: "8",
      title: "Smart Home Thermostat",
      price: 149.99,
      originalPrice: 179.99,
      image:
        "https://images.unsplash.com/photo-1621274147744-cfb5753dfe1f?w=400&q=80",
      rating: 4.7,
      isNew: true,
      isSale: false,
      category: "Smart Home",
      tags: ["Thermostat", "Smart", "Home"],
    },
  ],
  categories = [
    { id: "cat1", name: "Furniture", count: 42 },
    { id: "cat2", name: "Lighting", count: 18 },
    { id: "cat3", name: "Decor", count: 36 },
    { id: "cat4", name: "Smart Home", count: 12 },
    { id: "cat5", name: "Kitchen", count: 24 },
    { id: "cat6", name: "Bathroom", count: 16 },
  ],
  onFilterChange = () => {},
}: ProductGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Filter tags that could be applied
  const availableTags = [
    "New Arrivals",
    "On Sale",
    "Bestsellers",
    "Eco-Friendly",
    "Living Room",
    "Bedroom",
    "Office",
    "Kitchen",
    "Bathroom",
    "Wood",
    "Metal",
    "Fabric",
    "Glass",
    "Ceramic",
  ];

  const handleQuickView = (id: string) => {
    setSelectedProduct(id);
    setQuickViewOpen(true);
  };

  const handleAddToCart = (id: string) => {
    // This would integrate with cart functionality
    console.log(`Added product ${id} to cart`);
  };

  const handleAddToWishlist = (id: string) => {
    // This would integrate with wishlist functionality
    console.log(`Added product ${id} to wishlist`);
  };

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 2000]);
    setSelectedCategory("all");
    setSortBy("featured");
    setActiveFilters([]);
  };

  // Get the selected product for quick view
  const productForQuickView = products.find((p) => p.id === selectedProduct);

  // Mock data for quick view modal
  const quickViewProduct = productForQuickView
    ? {
        id: productForQuickView.id,
        name: productForQuickView.title,
        price: productForQuickView.price,
        originalPrice: productForQuickView.originalPrice,
        rating: productForQuickView.rating,
        reviewCount: Math.floor(Math.random() * 200) + 10,
        description:
          "High-quality product with premium materials and elegant design. Perfect for modern homes and spaces.",
        colors: [
          { name: "Charcoal Gray", hex: "#333333" },
          { name: "Cream", hex: "#F5F5DC" },
          { name: "Navy Blue", hex: "#000080" },
          { name: "Forest Green", hex: "#228B22" },
        ],
        sizes: [
          { name: "Small", available: true },
          { name: "Medium", available: true },
          { name: "Large", available: false },
          { name: "X-Large", available: true },
        ],
        images: [
          {
            src: productForQuickView.image,
            alt: productForQuickView.title,
          },
          {
            src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
            alt: "Product detail view",
          },
          {
            src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
            alt: "Product in context",
          },
        ],
        inStock: true,
      }
    : undefined;

  return (
    <div className="w-full bg-white">
      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal size={16} />
            Filters
          </Button>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-none"
            >
              <Grid3X3 size={16} />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-none"
            >
              <LayoutGrid size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Active Filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="flex items-center gap-1 bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
              onClick={() => toggleFilter(filter)}
            >
              {filter}
              <span className="cursor-pointer">×</span>
            </Badge>
          ))}
          <Button
            variant="link"
            size="sm"
            onClick={clearFilters}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Clear All
          </Button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="w-full md:w-64 shrink-0 bg-white p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-indigo-600"
              >
                Reset
              </Button>
            </div>

            <Separator className="my-4" />

            {/* Categories Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Categories</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === "all"}
                      onChange={() => setSelectedCategory("all")}
                      className="mr-2 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>All Categories</span>
                  </label>
                  <span className="text-sm text-gray-500">
                    {categories.reduce((sum, cat) => sum + cat.count, 0)}
                  </span>
                </div>

                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        className="mr-2 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>{category.name}</span>
                    </label>
                    <span className="text-sm text-gray-500">
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Price Range</h4>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 2000]}
                  max={2000}
                  step={10}
                  value={priceRange}
                  onValueChange={(value) =>
                    setPriceRange(value as [number, number])
                  }
                  className="my-6"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">${priceRange[0]}</span>
                  <span className="text-sm font-medium">${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Tags Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Product Tags</h4>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={
                      activeFilters.includes(tag) ? "default" : "outline"
                    }
                    className={`cursor-pointer ${activeFilters.includes(tag) ? "bg-indigo-600 hover:bg-indigo-700" : "hover:bg-gray-100"}`}
                    onClick={() => toggleFilter(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Availability Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Availability</h4>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.includes("In Stock")}
                    onChange={() => toggleFilter("In Stock")}
                    className="mr-2 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>In Stock</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.includes("On Sale")}
                    onChange={() => toggleFilter("On Sale")}
                    className="mr-2 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>On Sale</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.includes("New Arrivals")}
                    onChange={() => toggleFilter("New Arrivals")}
                    className="mr-2 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>New Arrivals</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 bg-gray-100">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                All Products
              </TabsTrigger>
              <TabsTrigger
                value="featured"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Featured
              </TabsTrigger>
              <TabsTrigger
                value="bestsellers"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Bestsellers
              </TabsTrigger>
              <TabsTrigger
                value="new"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                New Arrivals
              </TabsTrigger>
              <TabsTrigger
                value="sale"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                On Sale
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              {products.length > 0 ? (
                <div
                  className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-6`}
                >
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      image={product.image}
                      rating={product.rating}
                      isNew={product.isNew}
                      isSale={product.isSale}
                      onQuickView={handleQuickView}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No products found matching your criteria.
                  </p>
                  <Button
                    variant="link"
                    onClick={clearFilters}
                    className="mt-2 text-indigo-600 hover:text-indigo-800"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Other tab contents would be similar but with filtered products */}
            <TabsContent value="featured" className="mt-0">
              <div
                className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-6`}
              >
                {products
                  .filter((_, index) => index % 2 === 0)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      image={product.image}
                      rating={product.rating}
                      isNew={product.isNew}
                      isSale={product.isSale}
                      onQuickView={handleQuickView}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="bestsellers" className="mt-0">
              <div
                className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-6`}
              >
                {products
                  .filter((product) => product.rating >= 4.5)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      image={product.image}
                      rating={product.rating}
                      isNew={product.isNew}
                      isSale={product.isSale}
                      onQuickView={handleQuickView}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="mt-0">
              <div
                className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-6`}
              >
                {products
                  .filter((product) => product.isNew)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      image={product.image}
                      rating={product.rating}
                      isNew={product.isNew}
                      isSale={product.isSale}
                      onQuickView={handleQuickView}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="sale" className="mt-0">
              <div
                className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-6`}
              >
                {products
                  .filter((product) => product.isSale)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      image={product.image}
                      rating={product.rating}
                      isNew={product.isNew}
                      isSale={product.isSale}
                      onQuickView={handleQuickView}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="mx-1">...</span>
              <Button variant="outline" size="sm">
                8
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          open={quickViewOpen}
          onOpenChange={setQuickViewOpen}
          product={quickViewProduct}
        />
      )}
    </div>
  );
};

export default ProductGrid;
