import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CreditCard,
  DollarSign,
  Zap,
} from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps = {}) => {
  return (
    <footer className={cn("bg-gray-900 text-white", className)}>
      {/* Community Section */}
      <div className="bg-violet-600 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Follow us on social media for design inspiration, new product
            announcements, and exclusive offers.
          </p>
          <div className="flex justify-center space-x-6">
            {["Facebook", "Instagram", "Pinterest", "Twitter"].map(
              (platform) => (
                <a
                  key={platform}
                  href={`#${platform.toLowerCase()}`}
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
                  aria-label={platform}
                >
                  <span className="sr-only">{platform}</span>
                  <Zap className="h-5 w-5" />
                </a>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Information */}
            <div>
              <h3 className="text-xl font-bold mb-4">Decor Egypt</h3>
              <p className="text-gray-400 mb-4">
                Transforming houses into homes with quality furniture and decor
                since 2010.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/faq"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link
                    to="/warranty"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Warranty
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest products and offers.
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-gray-900"
                />
                <Button className="bg-fuchsia-600 hover:bg-fuchsia-700 px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <Separator className="border-t border-gray-800 my-8" />

          {/* Bottom Footer */}
          <div className="text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Decor Egypt. All rights
              reserved.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <CreditCard className="h-6 w-6" />
              <DollarSign className="h-6 w-6" />
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 10H23"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
