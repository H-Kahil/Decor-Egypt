import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCardProps {
  id?: string;
  title?: string;
  price?: number;
  originalPrice?: number;
  image?: string;
  rating?: number;
  isNew?: boolean;
  isSale?: boolean;
  onQuickView?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  title = "Modern Ergonomic Chair",
  price = 249.99,
  originalPrice = 299.99,
  image = "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&q=80",
  rating = 4.5,
  isNew = false,
  isSale = true,
  onQuickView = () => {},
  onAddToCart = () => {},
  onAddToWishlist = () => {},
}: ProductCardProps) => {
  const discount =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <div className="relative pt-4 px-4">
        {/* Status badges */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
          )}
          {isSale && discount > 0 && (
            <Badge className="bg-red-500 hover:bg-red-600">
              {discount}% Off
            </Badge>
          )}
        </div>

        {/* Wishlist button */}
        <div className="absolute top-6 right-6 z-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={() => onAddToWishlist(id)}
                >
                  <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to wishlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Product image */}
        <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-100">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />

          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white mx-2"
                    onClick={() => onQuickView(id)}
                  >
                    <Eye className="h-5 w-5 text-gray-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Quick view</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Rating */}
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-1 text-sm text-gray-500">{rating}</span>
        </div>

        {/* Title */}
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 min-h-[48px]">
          {title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          {originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => onAddToCart(id)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
