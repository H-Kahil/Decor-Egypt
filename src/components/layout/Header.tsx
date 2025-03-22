import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface HeaderProps {
  logo?: string;
  categories?: Category[];
}

interface Category {
  name: string;
  subcategories: Subcategory[];
  featured?: FeaturedItem[];
}

interface Subcategory {
  name: string;
  items: string[];
}

interface FeaturedItem {
  name: string;
  description: string;
  image: string;
}

const Header = ({ logo = "", categories = defaultCategories }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // You can add additional search logic here if needed
    console.log("Searching for:", e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search submission logic here
    console.log("Search submitted:", searchValue);
    // You could redirect to a search results page
    // window.location.href = `/search?q=${encodeURIComponent(searchValue)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Single row header with logo, navigation, search, and icons */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link to="/" className="flex items-center mr-4">
          <span className="text-2xl font-bold text-fuchsia-600">
            Decor Egypt
          </span>
        </Link>

        {/* Navigation links - desktop */}
        <NavigationMenu className="hidden md:flex flex-1 justify-center">
          <NavigationMenuList className="flex-wrap gap-0">
            <NavigationMenuItem>
              <Link
                to="/"
                className="text-sm px-3 py-1 block hover:bg-violet-100 hover:text-violet-800 rounded-md"
                onClick={() => window.scrollTo(0, 0)}
              >
                Home
              </Link>
            </NavigationMenuItem>
            {categories.map((category, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger className="bg-transparent hover:bg-violet-100 hover:text-violet-800 text-sm h-8 px-3">
                  <Link
                    to={`/category/${category.name.toLowerCase().replace(/ /g, "-")}`}
                    onClick={() => window.scrollTo(0, 0)}
                    onMouseEnter={() => {
                      const link = `/category/${category.name.toLowerCase().replace(/ /g, "-")}`;
                      const linkEl = document.createElement("link");
                      linkEl.rel = "prefetch";
                      linkEl.href = link;
                      document.head.appendChild(linkEl);
                    }}
                  >
                    {category.name}
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white p-4 w-[600px] lg:w-[800px]">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-3 grid grid-cols-3 gap-4">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <div key={subIndex} className="space-y-2">
                          <h3 className="font-medium text-violet-800 border-b border-violet-200 pb-1">
                            {subcategory.name}
                          </h3>
                          <ul className="space-y-1">
                            {subcategory.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={`/category/${category.name.toLowerCase().replace(/ /g, "-")}/${subcategory.name.toLowerCase().replace(/ /g, "-")}/${item.toLowerCase().replace(/ /g, "-")}`}
                                    className="text-sm hover:text-violet-600 block py-1"
                                    onClick={() => window.scrollTo(0, 0)}
                                    onMouseEnter={() => {
                                      const link = `/category/${category.name.toLowerCase().replace(/ /g, "-")}/${subcategory.name.toLowerCase().replace(/ /g, "-")}/${item.toLowerCase().replace(/ /g, "-")}`;
                                      const linkEl =
                                        document.createElement("link");
                                      linkEl.rel = "prefetch";
                                      linkEl.href = link;
                                      document.head.appendChild(linkEl);
                                    }}
                                  >
                                    {item}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {category.featured && (
                      <div className="col-span-1 bg-violet-50 p-3 rounded-lg">
                        <h3 className="font-medium text-violet-800 mb-2">
                          Featured
                        </h3>
                        {category.featured.map((item, index) => (
                          <div key={index} className="mb-3 last:mb-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="rounded-md w-full h-24 object-cover mb-2"
                            />
                            <h4 className="text-sm font-medium">{item.name}</h4>
                            <p className="text-xs text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <Link
                to="/about"
                className="text-sm px-3 py-1 block hover:bg-violet-100 hover:text-violet-800 rounded-md"
                onClick={() => window.scrollTo(0, 0)}
                onMouseEnter={() => {
                  const linkEl = document.createElement("link");
                  linkEl.rel = "prefetch";
                  linkEl.href = "/about";
                  document.head.appendChild(linkEl);
                }}
              >
                About
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/services"
                className="text-sm px-3 py-1 block hover:bg-violet-100 hover:text-violet-800 rounded-md"
                onClick={() => window.scrollTo(0, 0)}
                onMouseEnter={() => {
                  const linkEl = document.createElement("link");
                  linkEl.rel = "prefetch";
                  linkEl.href = "/services";
                  document.head.appendChild(linkEl);
                }}
              >
                Services
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/blog"
                className="text-sm px-3 py-1 block hover:bg-violet-100 hover:text-violet-800 rounded-md"
                onClick={() => window.scrollTo(0, 0)}
                onMouseEnter={() => {
                  const linkEl = document.createElement("link");
                  linkEl.rel = "prefetch";
                  linkEl.href = "/blog";
                  document.head.appendChild(linkEl);
                }}
              >
                Blog
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/contact"
                className="text-sm px-3 py-1 block hover:bg-violet-100 hover:text-violet-800 rounded-md"
                onClick={() => window.scrollTo(0, 0)}
                onMouseEnter={() => {
                  const linkEl = document.createElement("link");
                  linkEl.rel = "prefetch";
                  linkEl.href = "/contact";
                  document.head.appendChild(linkEl);
                }}
              >
                Contact
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/sale"
                className="text-red-600 text-sm px-3 py-1 block hover:bg-red-50 rounded-md"
                onClick={() => window.scrollTo(0, 0)}
                onMouseEnter={() => {
                  const linkEl = document.createElement("link");
                  linkEl.rel = "prefetch";
                  linkEl.href = "/sale";
                  document.head.appendChild(linkEl);
                }}
              >
                Sale
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search and icons */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Search - desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:block relative w-40 lg:w-56"
          >
            <Input
              type="text"
              placeholder="Search..."
              className="h-8 text-xs pr-8 border-violet-200 focus-visible:ring-violet-500"
              value={searchValue}
              onChange={handleSearch}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-transparent border-none p-0"
            >
              <Search className="h-4 w-4 text-gray-500" />
            </button>
          </form>

          {/* Search icon - mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-1"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Wishlist */}
          <Button variant="ghost" size="sm" className="p-1" asChild>
            <Link to="/wishlist">
              <Heart className="h-4 w-4 text-gray-700" />
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>

          {/* User account */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1">
                <User className="h-4 w-4 text-gray-700" />
                <span className="sr-only">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Link to="/account" className="w-full">
                  My Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/orders" className="w-full">
                  My Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/login" className="w-full">
                  Sign In
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/register" className="w-full">
                  Register
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <Button variant="ghost" size="sm" className="relative p-1" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile search dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <Input
              type="text"
              placeholder="Search for products..."
              className="flex-1 border-violet-300 focus-visible:ring-violet-500"
              autoFocus
              value={searchValue}
              onChange={handleSearch}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-50 flex flex-col transition-transform duration-300 ease-in-out transform md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-fuchsia-600">
              Decor Egypt
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="overflow-y-auto flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="font-medium text-lg block py-2"
                onClick={() => window.scrollTo(0, 0)}
              >
                Home
              </Link>
            </li>
            {categories.map((category, index) => (
              <li key={index} className="border-b border-gray-100 pb-4">
                <h3 className="font-medium text-lg mb-2">{category.name}</h3>
                <ul className="space-y-2 pl-4">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={`/category/${category.name.toLowerCase().replace(/ /g, "-")}/${subcategory.name.toLowerCase().replace(/ /g, "-")}`}
                        className="text-violet-700 font-medium"
                        onClick={() => window.scrollTo(0, 0)}
                        onMouseEnter={() => {
                          const link = `/category/${category.name.toLowerCase().replace(/ /g, "-")}/${subcategory.name.toLowerCase().replace(/ /g, "-")}`;
                          const linkEl = document.createElement("link");
                          linkEl.rel = "prefetch";
                          linkEl.href = link;
                          document.head.appendChild(linkEl);
                        }}
                      >
                        {subcategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li>
              <Link
                to="/about"
                className="font-medium text-lg block py-2"
                onClick={() => window.scrollTo(0, 0)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="font-medium text-lg block py-2"
                onClick={() => window.scrollTo(0, 0)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="font-medium text-lg block py-2"
                onClick={() => window.scrollTo(0, 0)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="font-medium text-lg block py-2"
                onClick={() => window.scrollTo(0, 0)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="font-medium text-lg block py-2"
                onClick={() => window.scrollTo(0, 0)}
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/sale"
                className="text-red-600 font-medium block py-2"
                onClick={() => window.scrollTo(0, 0)}
              >
                Sale
              </Link>
            </li>
          </ul>
        </div>
        <div className="border-t border-gray-100 p-4 space-y-2">
          <Link to="/account" className="flex items-center py-2">
            <User className="h-5 w-5 mr-3 text-violet-700" />
            <span>My Account</span>
          </Link>
          <Link to="/wishlist" className="flex items-center py-2">
            <Heart className="h-5 w-5 mr-3 text-violet-700" />
            <span>Wishlist</span>
          </Link>
          <Link to="/cart" className="flex items-center py-2">
            <ShoppingCart className="h-5 w-5 mr-3 text-violet-700" />
            <span>Cart</span>
            <span className="ml-auto bg-violet-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

// Default data for the header
const defaultCategories: Category[] = [
  {
    name: "Furniture",
    subcategories: [
      {
        name: "Living Room",
        items: [
          "Sofas",
          "Coffee Tables",
          "TV Stands",
          "Bookshelves",
          "Armchairs",
        ],
      },
      {
        name: "Bedroom",
        items: ["Beds", "Mattresses", "Nightstands", "Dressers", "Wardrobes"],
      },
      {
        name: "Dining",
        items: [
          "Dining Tables",
          "Dining Chairs",
          "Buffets & Sideboards",
          "Bar Stools",
        ],
      },
    ],
    featured: [
      {
        name: "Modern Living Room Set",
        description: "Contemporary design for your home",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",
      },
    ],
  },
  {
    name: "Decor",
    subcategories: [
      {
        name: "Wall Decor",
        items: ["Wall Art", "Mirrors", "Clocks", "Wallpaper", "Wall Shelves"],
      },
      {
        name: "Textiles",
        items: [
          "Curtains",
          "Rugs",
          "Throw Pillows",
          "Blankets",
          "Table Linens",
        ],
      },
      {
        name: "Accessories",
        items: ["Vases", "Candles", "Photo Frames", "Decorative Bowls"],
      },
    ],
    featured: [
      {
        name: "Bohemian Collection",
        description: "Add vibrant colors to your space",
        image:
          "https://images.unsplash.com/photo-1545083036-61d5763e1959?w=300&q=80",
      },
    ],
  },
  {
    name: "Kitchen & Bath",
    subcategories: [
      {
        name: "Kitchen",
        items: [
          "Cookware",
          "Bakeware",
          "Small Appliances",
          "Kitchen Storage",
          "Dinnerware",
        ],
      },
      {
        name: "Bathroom",
        items: [
          "Towels",
          "Shower Curtains",
          "Bath Accessories",
          "Bath Storage",
        ],
      },
      {
        name: "Organization",
        items: ["Pantry", "Closet", "Laundry", "Garage"],
      },
    ],
    featured: [
      {
        name: "Premium Bath Collection",
        description: "Luxury for your bathroom",
        image:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&q=80",
      },
    ],
  },
  {
    name: "Outdoor",
    subcategories: [
      {
        name: "Patio Furniture",
        items: [
          "Outdoor Seating",
          "Outdoor Dining",
          "Hammocks",
          "Outdoor Cushions",
        ],
      },
      {
        name: "Garden",
        items: ["Planters", "Garden Tools", "Outdoor Lighting", "Garden Decor"],
      },
      {
        name: "Outdoor Recreation",
        items: ["Grills", "Fire Pits", "Outdoor Games", "Pool Accessories"],
      },
    ],
    featured: [
      {
        name: "Summer Patio Collection",
        description: "Create your perfect outdoor oasis",
        image:
          "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=300&q=80",
      },
    ],
  },
];

export default Header;
