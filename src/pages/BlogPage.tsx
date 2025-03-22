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
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

const BlogPage = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "10 Living Room Design Trends for 2023",
      excerpt:
        "Discover the hottest living room design trends that are dominating interior design this year, from curved furniture to nature-inspired elements.",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
      date: "June 15, 2023",
      readTime: "8 min read",
      author: "Nour Ibrahim",
      category: "Interior Design",
      tags: ["Living Room", "Design Trends", "Furniture"],
    },
    {
      id: 2,
      title: "How to Choose the Perfect Lighting for Each Room",
      excerpt:
        "Lighting can make or break your interior design. Learn how to select the right lighting fixtures for different rooms and create the perfect ambiance.",
      image:
        "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&q=80",
      date: "May 28, 2023",
      readTime: "6 min read",
      author: "Ahmed Hassan",
      category: "Lighting",
      tags: ["Lighting", "Interior Design", "Home Decor"],
    },
    {
      id: 3,
      title: "Small Space Solutions: Maximizing Your Apartment",
      excerpt:
        "Living in a small apartment doesn't mean sacrificing style or functionality. Discover clever storage solutions and space-saving furniture ideas.",
      image:
        "https://images.unsplash.com/photo-1595526051245-4506e0005bd0?w=600&q=80",
      date: "May 10, 2023",
      readTime: "7 min read",
      author: "Laila Mahmoud",
      category: "Small Spaces",
      tags: ["Small Spaces", "Storage Solutions", "Apartment Living"],
    },
    {
      id: 4,
      title: "The Art of Mixing Patterns and Textures",
      excerpt:
        "Learn how to confidently mix patterns and textures in your home decor to create visually interesting and cohesive spaces that reflect your personal style.",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
      date: "April 22, 2023",
      readTime: "5 min read",
      author: "Omar Farid",
      category: "Styling Tips",
      tags: ["Patterns", "Textures", "Home Styling"],
    },
    {
      id: 5,
      title: "Sustainable Furniture: Eco-Friendly Choices for Your Home",
      excerpt:
        "Discover how to make environmentally conscious decisions when furnishing your home, from sustainable materials to ethical manufacturing practices.",
      image:
        "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80",
      date: "April 5, 2023",
      readTime: "9 min read",
      author: "Nour Ibrahim",
      category: "Sustainability",
      tags: ["Eco-Friendly", "Sustainable Living", "Green Furniture"],
    },
    {
      id: 6,
      title: "Color Psychology: Choosing the Right Palette for Each Room",
      excerpt:
        "Colors can significantly impact our mood and behavior. Learn how to use color psychology to create the perfect atmosphere in every room of your home.",
      image:
        "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&q=80",
      date: "March 18, 2023",
      readTime: "7 min read",
      author: "Laila Mahmoud",
      category: "Color Theory",
      tags: ["Color Psychology", "Interior Design", "Home Decor"],
    },
  ];

  // Categories for filter
  const categories = [
    "All Categories",
    "Interior Design",
    "Lighting",
    "Small Spaces",
    "Styling Tips",
    "Sustainability",
    "Color Theory",
    "Furniture",
    "DIY Projects",
  ];

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
            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Page Header */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/70 to-violet-600/50 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=1200&q=80"
            alt="Decor Egypt Blog"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
            <p className="max-w-2xl text-white/90">
              Discover the latest trends, tips, and inspiration for creating
              your dream home.
            </p>
          </div>
        </div>

        {/* Featured Post */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-full">
              <img
                src="https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80"
                alt="Featured Post"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <Badge className="w-fit mb-4 bg-violet-100 text-violet-800 hover:bg-violet-200">
                Featured
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                Creating a Timeless Home: Design Principles That Never Go Out of
                Style
              </h2>
              <p className="text-gray-700 mb-6">
                While trends come and go, certain design principles stand the
                test of time. Learn how to create a home that feels both classic
                and contemporary with these timeless design strategies.
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <div className="flex items-center mr-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>June 28, 2023</span>
                </div>
                <div className="flex items-center mr-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>10 min read</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>Ahmed Hassan</span>
                </div>
              </div>
              <Button className="w-fit bg-violet-600 hover:bg-violet-700 text-white">
                Read Article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Blog Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className={
                  index === 0
                    ? "bg-violet-600 hover:bg-violet-700"
                    : "hover:bg-violet-50 hover:text-violet-700"
                }
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="w-full md:w-auto">
            <select className="w-full md:w-auto border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500">
              <option>Most Recent</option>
              <option>Most Popular</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-violet-100 text-violet-800 hover:bg-violet-200">
                    {post.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 mb-4">
                  {post.excerpt}
                </CardDescription>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  variant="link"
                  className="p-0 text-violet-600 hover:text-violet-800"
                >
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mb-12">
          <nav className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-violet-600 text-white hover:bg-violet-700"
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

        {/* Newsletter Signup */}
        <div className="bg-violet-50 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold text-violet-800 mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest design trends, product launches, and
            exclusive offers by subscribing to our newsletter.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <Button className="bg-violet-600 hover:bg-violet-700 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
