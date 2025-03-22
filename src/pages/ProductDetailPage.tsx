import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  ShoppingCart,
  Share2,
  Check,
  Truck,
  RotateCcw,
  Shield,
  Star,
} from "lucide-react";
import ProductCard from "@/components/products/ProductCard";

interface ProductDetailPageProps {}

const ProductDetailPage: React.FC<ProductDetailPageProps> = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Simulate fetching product data
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        // Mock data
        setProduct({
          id: productId,
          name: "Modern Ergonomic Office Chair",
          price: 249.99,
          originalPrice: 299.99,
          rating: 4.5,
          reviewCount: 127,
          sku: "CHAIR-ERG-001",
          category: "Furniture",
          subcategory: "Office",
          description:
            "Experience ultimate comfort with our ergonomic office chair. Designed with premium materials and adjustable features to support your body during long work hours. The breathable mesh back provides ventilation while the padded seat ensures comfort throughout the day.",
          features: [
            "Adjustable height and armrests",
            "Breathable mesh back",
            "Lumbar support",
            "360° swivel",
            "Durable nylon base",
            "Weight capacity: 300 lbs",
          ],
          colors: [
            { name: "Charcoal Black", hex: "#333333" },
            { name: "Navy Blue", hex: "#0A2463" },
            { name: "Light Gray", hex: "#D3D3D3" },
          ],
          sizes: [
            { name: "Standard", available: true },
            { name: "Premium", available: true },
            { name: "Deluxe", available: false },
          ],
          images: [
            {
              src: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
              alt: "Modern Ergonomic Office Chair - Front View",
            },
            {
              src: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
              alt: "Modern Ergonomic Office Chair - Side View",
            },
            {
              src: "https://images.unsplash.com/photo-1589384267710-7a170981ca78?w=800&q=80",
              alt: "Modern Ergonomic Office Chair - Back View",
            },
            {
              src: "https://images.unsplash.com/photo-1579503841516-e0bd7fca5faa?w=800&q=80",
              alt: "Modern Ergonomic Office Chair - Detail View",
            },
          ],
          specifications: [
            { name: "Dimensions", value: '26"W x 26"D x 38-42"H' },
            { name: "Weight", value: "35 lbs" },
            { name: "Material", value: "Mesh, Fabric, Nylon, Metal" },
            { name: "Assembly", value: "Required, tools included" },
            { name: "Warranty", value: "5 years limited" },
          ],
          stock: 15,
          relatedProducts: [
            {
              id: "2",
              title: "Minimalist Wooden Desk",
              price: 349.99,
              originalPrice: 399.99,
              image:
                "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80",
              rating: 4.7,
              isNew: true,
              isSale: true,
            },
            {
              id: "3",
              title: "Adjustable Monitor Stand",
              price: 79.99,
              originalPrice: 99.99,
              image:
                "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=400&q=80",
              rating: 4.3,
              isNew: false,
              isSale: true,
            },
            {
              id: "4",
              title: "Ergonomic Keyboard",
              price: 129.99,
              image:
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
              rating: 4.6,
              isNew: true,
              isSale: false,
            },
          ],
        });
        setLoading(false);
        // Set default selected color and size
        setSelectedColor("Charcoal Black");
        setSelectedSize("Standard");
      }, 800);
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product?.stock || 1)) {
      setQuantity(value);
    }
  };

  const discount =
    product?.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {!loading && product && (
          <Breadcrumb className="mb-6">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/category/${product.category.toLowerCase()}`}
              >
                {product.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/category/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}`}
              >
                {product.subcategory}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>{product.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
          </div>
        ) : product ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6">
              {/* Product Images - Left Column */}
              <div className="lg:col-span-2">
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4 bg-gray-100">
                  <img
                    src={product.images[selectedImage].src}
                    alt={product.images[selectedImage].alt}
                    className="object-cover w-full h-full"
                  />
                  {discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-medium px-2 py-1 rounded">
                      {discount}% OFF
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative rounded-md overflow-hidden aspect-square ${selectedImage === index ? "ring-2 ring-violet-600" : "ring-1 ring-gray-200"}`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details - Right Column */}
              <div className="lg:col-span-3 flex flex-col">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <span className="text-xl text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                </div>

                {/* Short Description */}
                <p className="text-gray-700 mb-6">{product.description}</p>

                <Separator className="my-6" />

                {/* Product Options */}
                <div className="space-y-6">
                  {/* SKU & Availability */}
                  <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">SKU:</span>
                      <span className="font-medium">{product.sku}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">Availability:</span>
                      <span className="font-medium text-green-600">
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Color
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color: any) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedColor === color.name ? "ring-2 ring-offset-2 ring-violet-600" : ""}`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {selectedColor === color.name && (
                            <Check
                              className={`h-5 w-5 ${parseInt(color.hex.slice(1), 16) > 0xffffff / 2 ? "text-gray-900" : "text-white"}`}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Selected:{" "}
                      <span className="font-medium">{selectedColor}</span>
                    </p>
                  </div>

                  {/* Sizes */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
                      <Button
                        variant="link"
                        className="text-sm text-violet-600 p-0"
                      >
                        Size Guide
                      </Button>
                    </div>
                    <RadioGroup
                      value={selectedSize}
                      onValueChange={setSelectedSize}
                      className="flex flex-wrap gap-2"
                    >
                      {product.sizes.map((size: any) => (
                        <div key={size.name}>
                          <RadioGroupItem
                            value={size.name}
                            id={`size-${size.name}`}
                            className="sr-only"
                            disabled={!size.available}
                          />
                          <Label
                            htmlFor={`size-${size.name}`}
                            className={`flex h-10 min-w-16 px-3 items-center justify-center rounded-md border text-sm font-medium ${!size.available ? "bg-gray-100 text-gray-400 cursor-not-allowed" : selectedSize === size.name ? "bg-violet-600 text-white border-violet-600" : "border-gray-200 text-gray-900 hover:bg-gray-50 cursor-pointer"}`}
                          >
                            {size.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {!product.sizes.find((s: any) => s.name === selectedSize)
                      ?.available && (
                      <p className="mt-2 text-sm text-red-500">
                        Selected size is currently unavailable
                      </p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Quantity
                    </h3>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="h-10 w-10 rounded-r-none"
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) =>
                          handleQuantityChange(parseInt(e.target.value) || 1)
                        }
                        className="h-10 w-16 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="h-10 w-10 rounded-l-none"
                      >
                        +
                      </Button>
                      <span className="ml-3 text-sm text-gray-500">
                        {product.stock} available
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      className="bg-violet-600 hover:bg-violet-700 text-white flex-1"
                      size="lg"
                      disabled={
                        !product.sizes.find((s: any) => s.name === selectedSize)
                          ?.available
                      }
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-violet-600 text-violet-600 hover:bg-violet-50"
                    >
                      <Heart className="mr-2 h-5 w-5" />
                      Add to Wishlist
                    </Button>
                  </div>
                </div>

                {/* Shipping & Returns */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-violet-600 mt-0.5 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium">Free Shipping</h4>
                      <p className="text-xs text-gray-500">
                        On orders over $500
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <RotateCcw className="h-5 w-5 text-violet-600 mt-0.5 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium">Easy Returns</h4>
                      <p className="text-xs text-gray-500">
                        30-day return policy
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-violet-600 mt-0.5 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium">Warranty</h4>
                      <p className="text-xs text-gray-500">
                        5-year limited warranty
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Share2 className="h-5 w-5 text-violet-600 mt-0.5 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium">Share</h4>
                      <div className="flex space-x-2 mt-1">
                        <a
                          href="#"
                          className="text-gray-400 hover:text-violet-600"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-violet-600"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-violet-600"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Tabs */}
            <div className="p-6 pt-0">
              <Tabs defaultValue="description" className="w-full mt-8">
                <TabsList className="w-full justify-start border-b mb-0 rounded-none bg-transparent">
                  <TabsTrigger
                    value="description"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
                  >
                    Features
                  </TabsTrigger>
                  <TabsTrigger
                    value="specifications"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
                  >
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
                  >
                    Reviews ({product.reviewCount})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="pt-6">
                  <div className="prose max-w-none">
                    <p>{product.description}</p>
                    <p className="mt-4">
                      Our ergonomic office chair is designed with your comfort
                      and productivity in mind. The adjustable features allow
                      you to customize the chair to your specific needs,
                      ensuring proper posture and reducing strain during long
                      work hours.
                    </p>
                    <p className="mt-4">
                      The breathable mesh back provides excellent ventilation,
                      keeping you cool throughout the day, while the padded seat
                      offers exceptional comfort. The chair's sturdy
                      construction and premium materials ensure durability and
                      long-lasting performance.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="features" className="pt-6">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="specifications" className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium mb-3">
                        Product Specifications
                      </h3>
                      <table className="w-full">
                        <tbody>
                          {product.specifications.map(
                            (spec: any, index: number) => (
                              <tr
                                key={index}
                                className={
                                  index !== product.specifications.length - 1
                                    ? "border-b border-gray-200"
                                    : ""
                                }
                              >
                                <td className="py-2 text-gray-500">
                                  {spec.name}
                                </td>
                                <td className="py-2 text-right font-medium">
                                  {spec.value}
                                </td>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium mb-3">Shipping Information</h3>
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-500">
                              Delivery Time
                            </td>
                            <td className="py-2 text-right font-medium">
                              3-5 business days
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-500">
                              Shipping Cost
                            </td>
                            <td className="py-2 text-right font-medium">
                              Free over $500
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-500">
                              Return Policy
                            </td>
                            <td className="py-2 text-right font-medium">
                              30 days
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-500">Assembly</td>
                            <td className="py-2 text-right font-medium">
                              Required, tools included
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="pt-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="bg-gray-50 rounded-lg p-6 text-center">
                        <div className="text-5xl font-bold text-gray-900 mb-2">
                          {product.rating}
                        </div>
                        <div className="flex justify-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-500 mb-4">
                          Based on {product.reviewCount} reviews
                        </p>
                        <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                          Write a Review
                        </Button>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="space-y-6">
                        {/* Sample reviews - in a real app these would come from the API */}
                        <div className="border-b border-gray-200 pb-6">
                          <div className="flex items-center mb-2">
                            <div className="flex mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <h4 className="font-medium">
                              Perfect for long work days
                            </h4>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <span>John D.</span>
                            <span className="mx-2">•</span>
                            <span>Verified Buyer</span>
                            <span className="mx-2">•</span>
                            <span>2 months ago</span>
                          </div>
                          <p className="text-gray-700">
                            I've been using this chair for about 2 months now
                            and it's been great for my back. The lumbar support
                            is excellent and the adjustable features make it
                            perfect for my home office setup. Highly recommend!
                          </p>
                        </div>

                        <div className="border-b border-gray-200 pb-6">
                          <div className="flex items-center mb-2">
                            <div className="flex mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <h4 className="font-medium">
                              Good quality, a bit difficult to assemble
                            </h4>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <span>Sarah M.</span>
                            <span className="mx-2">•</span>
                            <span>Verified Buyer</span>
                            <span className="mx-2">•</span>
                            <span>1 month ago</span>
                          </div>
                          <p className="text-gray-700">
                            The chair is very comfortable and looks great in my
                            office. The only downside was the assembly process
                            which took longer than expected. Once assembled
                            though, it's been perfect for my needs.
                          </p>
                        </div>

                        <Button variant="outline" className="w-full">
                          Load More Reviews
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Product not found
            </h2>
            <p className="text-gray-600 mt-2">
              The product you're looking for doesn't exist.
            </p>
            <Button asChild className="mt-4 bg-violet-600 hover:bg-violet-700">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        )}

        {/* Related Products */}
        {!loading && product && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {product.relatedProducts.map((relatedProduct: any) => (
                <ProductCard
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  title={relatedProduct.title}
                  price={relatedProduct.price}
                  originalPrice={relatedProduct.originalPrice}
                  image={relatedProduct.image}
                  rating={relatedProduct.rating}
                  isNew={relatedProduct.isNew}
                  isSale={relatedProduct.isSale}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
