import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PromotionBannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
}

const PromotionBanner = ({
  title = "Summer Sale - Up to 50% Off",
  description = "Refresh your home with our exclusive summer collection. Limited time offers on furniture, decor, and more.",
  buttonText = "Shop Now",
  buttonLink = "/sale",
  backgroundImage = "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=80",
  backgroundColor = "#FF6B6B",
  textColor = "white",
}: PromotionBannerProps) => {
  return (
    <div
      className="w-full py-12 px-6 md:px-12 relative overflow-hidden bg-gradient-to-r from-pink-500 to-orange-500"
      style={{
        backgroundColor: backgroundColor,
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlend: "overlay",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3 tracking-tight"
            style={{ color: textColor }}
          >
            {title}
          </h2>
          <p className="text-lg max-w-xl" style={{ color: textColor }}>
            {description}
          </p>
        </div>

        <Button
          size="lg"
          className="bg-white text-black hover:bg-gray-100 font-semibold shadow-lg group"
          onClick={() => (window.location.href = buttonLink)}
        >
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-yellow-300 opacity-50"></div>
      <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-blue-400 opacity-40"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-purple-500 opacity-30"></div>
    </div>
  );
};

export default PromotionBanner;
