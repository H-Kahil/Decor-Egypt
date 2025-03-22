import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  Ruler,
  Truck,
  Palette,
  Home,
  Wrench,
  Clock,
  Shield,
} from "lucide-react";

const ServicesPage = () => {
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
            <BreadcrumbLink href="/services">Services</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Page Header */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/70 to-violet-600/50 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
            alt="Our Services"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="max-w-2xl text-white/90">
              Discover the comprehensive range of services we offer to help you
              create your dream home.
            </p>
          </div>
        </div>

        {/* Services Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-violet-800 mb-4">
            Complete Home Solutions
          </h2>
          <p className="text-lg text-gray-700">
            At Decor Egypt, we go beyond just selling furniture. We offer a
            comprehensive range of services to help you transform your space
            from concept to completion. Our team of experts is dedicated to
            making your home improvement journey seamless and enjoyable.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Interior Design Service */}
          <Card className="border-violet-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-violet-600" />
              </div>
              <CardTitle className="text-xl text-violet-800">
                Interior Design
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our professional designers will help you create a cohesive look
                for your space that reflects your personal style and meets your
                functional needs.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Personalized design consultations</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>3D visualization of your space</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Material and color scheme selection</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                Book a Consultation
              </Button>
            </CardFooter>
          </Card>

          {/* Measurement Service */}
          <Card className="border-violet-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Ruler className="h-6 w-6 text-violet-600" />
              </div>
              <CardTitle className="text-xl text-violet-800">
                Measurement Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our professional measurement service ensures that your furniture
                fits perfectly in your space, avoiding costly mistakes and
                returns.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Precise room measurements</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Doorway and staircase assessment</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Detailed measurement report</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                Schedule Measurement
              </Button>
            </CardFooter>
          </Card>

          {/* Delivery & Assembly */}
          <Card className="border-violet-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-violet-600" />
              </div>
              <CardTitle className="text-xl text-violet-800">
                Delivery & Assembly
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Let our professional team handle the heavy lifting. We'll
                deliver your furniture and assemble it in your home with care
                and precision.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>White glove delivery service</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Professional assembly by trained technicians</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Packaging removal and disposal</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                Learn More
              </Button>
            </CardFooter>
          </Card>

          {/* Home Staging */}
          <Card className="border-violet-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-violet-600" />
              </div>
              <CardTitle className="text-xl text-violet-800">
                Home Staging
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Selling your home? Our staging service will help you showcase
                your property's full potential and attract more buyers.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Professional property assessment</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Furniture and decor rental</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Strategic arrangement to highlight features</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                Get a Quote
              </Button>
            </CardFooter>
          </Card>

          {/* Furniture Repair */}
          <Card className="border-violet-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Wrench className="h-6 w-6 text-violet-600" />
              </div>
              <CardTitle className="text-xl text-violet-800">
                Furniture Repair
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Give your beloved furniture a new lease on life with our expert
                repair and restoration services.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Wood repair and refinishing</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Upholstery repair and replacement</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Hardware replacement and updates</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                Request Service
              </Button>
            </CardFooter>
          </Card>

          {/* Custom Furniture */}
          <Card className="border-violet-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-violet-600" />
              </div>
              <CardTitle className="text-xl text-violet-800">
                Custom Furniture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Can't find exactly what you're looking for? Our custom furniture
                service allows you to create pieces tailored to your specific
                needs and style.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Collaborative design process</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>High-quality materials and craftsmanship</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Perfect fit for your space and needs</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                Start Your Project
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Service Guarantees */}
        <div className="bg-violet-50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-violet-800 mb-6 text-center">
            Our Service Guarantees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">100% Satisfaction</h3>
              <p className="text-gray-700">
                We're not happy until you're completely satisfied with our
                service.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">On-Time Service</h3>
              <p className="text-gray-700">
                We value your time and always strive to provide punctual
                service.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Wrench className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Expert Professionals</h3>
              <p className="text-gray-700">
                Our team consists of trained and experienced professionals in
                their respective fields.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-violet-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Contact our service team today to discuss how we can help you create
            the home of your dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-violet-800 hover:bg-gray-100">
              Schedule a Service
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-violet-700"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
