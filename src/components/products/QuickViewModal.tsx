import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star, Minus, Plus, Share2 } from "lucide-react";

interface ProductColor {
  name: string;
  hex: string;
}

interface ProductSize {
  name: string;
  available: boolean;
}

interface ProductImage {
  src: string;
  alt: string;
}

interface QuickViewModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  product?: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    description: string;
    colors: ProductColor[];
    sizes: ProductSize[];
    images: ProductImage[];
    inStock: boolean;
  };
}

const QuickViewModal = ({
  open = true,
  onOpenChange,
  product = {
    id: "prod-001",
    name: "Modern Scandinavian Sofa",
    price: 1299.99,
    originalPrice: 1599.99,
    rating: 4.5,
    reviewCount: 127,
    description:
      "Elegant and comfortable three-seater sofa with solid wood legs and premium upholstery. Perfect for modern living rooms and open spaces.",
    colors: [
      { name: "Charcoal Gray", hex: "#333333" },
      { name: "Cream", hex: "#F5F5DC" },
      { name: "Navy Blue", hex: "#000080" },
      { name: "Forest Green", hex: "#228B22" },
    ],
    sizes: [
      { name: "2-Seater", available: true },
      { name: "3-Seater", available: true },
      { name: "4-Seater", available: false },
      { name: "L-Shaped", available: true },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
        alt: "Modern sofa in living room setting",
      },
      {
        src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
        alt: "Sofa detail view",
      },
      {
        src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
        alt: "Sofa with decorative pillows",
      },
    ],
    inStock: true,
  },
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0].name,
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes.find((size) => size.available)?.name || "",
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // This would integrate with cart functionality
    console.log("Added to cart:", {
      product: product.id,
      name: product.name,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl p-0 overflow-hidden bg-white"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Images Section */}
          <div className="relative bg-gray-50 flex flex-col">
            <div className="h-[400px] overflow-hidden">
              <img
                src={product.images[currentImageIndex].src}
                alt={product.images[currentImageIndex].alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-center gap-2 p-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 border-2 overflow-hidden ${currentImageIndex === index ? "border-primary" : "border-gray-200"}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="text-left">
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    {product.name}
                  </DialogTitle>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-primary"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </DialogHeader>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && (
                <span className="ml-2 px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100,
                  )}
                  % OFF
                </span>
              )}
            </div>

            <p className="mt-4 text-gray-600">{product.description}</p>

            {/* Color Selection */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedColor === color.name ? "ring-2 ring-offset-2 ring-primary" : ""}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => size.available && setSelectedSize(size.name)}
                    disabled={!size.available}
                    className={`px-4 py-2 text-sm border rounded-md ${selectedSize === size.name ? "bg-primary text-white border-primary" : size.available ? "border-gray-300 hover:border-primary" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="flex items-center mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <DialogFooter className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 gap-2 border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => console.log("Added to wishlist")}
              >
                <Heart className="h-5 w-5" />
                Add to Wishlist
              </Button>
              <Button
                className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
            </DialogFooter>

            {/* Stock Status */}
            <div className="mt-4 text-center">
              {product.inStock ? (
                <span className="text-sm text-green-600 font-medium">
                  In Stock
                </span>
              ) : (
                <span className="text-sm text-red-600 font-medium">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
