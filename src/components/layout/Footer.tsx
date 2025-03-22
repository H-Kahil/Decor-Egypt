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
  Mail,
  Phone,
  MapPin,
  DollarSign,
} from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps = {}) => {
  return (
    <footer className={cn("bg-primary-50 text-gray-800 pt-12 pb-6", className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-700">
              Decor Egypt
            </h3>
            <p className="mb-4">
              Your one-stop shop for home improvement and furniture with vibrant
              designs and quality products.
            </p>
            <div className="flex space-x-4 mb-6">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-primary-100 hover:bg-primary-200"
              >
                <Facebook className="h-5 w-5 text-primary-700" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-primary-100 hover:bg-primary-200"
              >
                <Instagram className="h-5 w-5 text-primary-700" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-primary-100 hover:bg-primary-200"
              >
                <Twitter className="h-5 w-5 text-primary-700" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-primary-100 hover:bg-primary-200"
              >
                <Youtube className="h-5 w-5 text-primary-700" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-700">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-primary-600 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary-600 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-primary-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary-600 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-primary-600 transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-700">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary-600 mt-0.5" />
                <span>123 Furniture Street, Cairo, Egypt</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary-600" />
                <span>+20 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary-600" />
                <span>info@decoregypt.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-700">
              Newsletter
            </h3>
            <p className="mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white border-primary-200 focus:border-primary-500"
              />
              <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-200" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Decor Egypt. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex space-x-3">
            <CreditCard className="h-6 w-6 text-gray-600" />
            <DollarSign className="h-6 w-6 text-gray-600" />
            <svg
              className="h-6 w-6 text-gray-600"
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
    </footer>
  );
};

export default Footer;
