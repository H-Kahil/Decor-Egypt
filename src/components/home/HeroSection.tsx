import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  slides?: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    ctaText: string;
    ctaLink: string;
  }[];
  autoplay?: boolean;
  interval?: number;
}

const HeroSection = ({
  slides = [
    {
      id: "1",
      title: "Transform Your Home",
      description:
        "Discover our latest collection of modern furniture and home decor",
      imageUrl:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
      ctaText: "Shop Now",
      ctaLink: "/products/furniture",
    },
    {
      id: "2",
      title: "Summer Sale",
      description: "Up to 50% off on selected items. Limited time offer!",
      imageUrl:
        "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80",
      ctaText: "View Offers",
      ctaLink: "/sale",
    },
    {
      id: "3",
      title: "Kitchen Essentials",
      description: "Upgrade your kitchen with our premium collection",
      imageUrl:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&q=80",
      ctaText: "Explore",
      ctaLink: "/products/kitchen",
    },
  ],
  autoplay = true,
  interval = 5000,
}: HeroSectionProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gray-100">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-1000",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0",
            )}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col items-start justify-center h-full max-w-4xl px-8 mx-auto text-white md:px-12">
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
                {slide.title}
              </h1>
              <p className="mb-8 text-lg md:text-xl">{slide.description}</p>
              <Button
                size="lg"
                className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium group"
              >
                {slide.ctaText}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
