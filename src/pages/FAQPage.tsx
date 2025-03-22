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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, Mail } from "lucide-react";

const FAQPage = () => {
  // FAQ categories and questions
  const faqCategories = [
    {
      id: "ordering",
      name: "Ordering & Payment",
      questions: [
        {
          id: "order-process",
          question: "How do I place an order?",
          answer:
            "You can place an order through our website by browsing our products, adding items to your cart, and proceeding to checkout. You'll need to create an account or log in, provide shipping information, and select a payment method to complete your purchase.",
        },
        {
          id: "payment-methods",
          question: "What payment methods do you accept?",
          answer:
            "We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and cash on delivery (for eligible areas). All online payments are processed through secure payment gateways to ensure your information is protected.",
        },
        {
          id: "order-confirmation",
          question: "How will I know if my order has been confirmed?",
          answer:
            "Once you've placed your order, you'll receive an order confirmation email with your order number and details. You can also check your order status by logging into your account on our website and visiting the 'My Orders' section.",
        },
        {
          id: "order-cancel",
          question: "Can I cancel or modify my order after it's been placed?",
          answer:
            "You can cancel or modify your order within 24 hours of placing it, provided it hasn't been shipped yet. To do so, please contact our customer service team with your order number. After 24 hours or if the order has been shipped, cancellations may not be possible.",
        },
        {
          id: "discount-codes",
          question: "How do I use a discount code?",
          answer:
            "To use a discount code, add items to your cart and proceed to checkout. On the payment page, you'll find a field labeled 'Discount Code' or 'Promo Code' where you can enter your code. Click 'Apply' to see the discount reflected in your total before completing the purchase.",
        },
      ],
    },
    {
      id: "shipping",
      name: "Shipping & Delivery",
      questions: [
        {
          id: "delivery-time",
          question: "How long will it take to receive my order?",
          answer:
            "Standard delivery typically takes 3-5 business days within major cities in Egypt, and 5-7 business days for other areas. Express delivery options (1-2 business days) are available for an additional fee. Delivery times may vary based on product availability and your location.",
        },
        {
          id: "shipping-cost",
          question: "How much does shipping cost?",
          answer:
            "Shipping costs are calculated based on your location, the size and weight of the items, and your chosen delivery method. You can see the exact shipping cost during checkout before completing your purchase. We offer free shipping on orders over EGP 5,000.",
        },
        {
          id: "track-order",
          question: "How can I track my order?",
          answer:
            "Once your order has been shipped, you'll receive a shipping confirmation email with a tracking number and link. You can also track your order by logging into your account on our website and visiting the 'My Orders' section.",
        },
        {
          id: "delivery-areas",
          question: "Which areas do you deliver to?",
          answer:
            "We currently deliver to all major cities and most areas within Egypt. If you're unsure whether we deliver to your location, you can check by entering your address during checkout or contacting our customer service team.",
        },
        {
          id: "delivery-schedule",
          question: "Can I schedule a specific delivery date or time?",
          answer:
            "Yes, for larger furniture items, we offer scheduled delivery where you can select a preferred date from available options. For specific time slots, please contact our customer service team after placing your order, and we'll do our best to accommodate your request based on availability.",
        },
      ],
    },
    {
      id: "returns",
      name: "Returns & Refunds",
      questions: [
        {
          id: "return-policy",
          question: "What is your return policy?",
          answer:
            "We accept returns within 30 days of delivery for most items in their original condition with all packaging and tags. Custom-made or personalized items, clearance items, and certain hygiene products cannot be returned unless they're defective.",
        },
        {
          id: "return-process",
          question: "How do I return an item?",
          answer:
            "To initiate a return, log into your account, go to 'My Orders,' select the order containing the item you wish to return, and click 'Return Item.' Follow the instructions to complete the return request. Once approved, you'll receive return shipping instructions or information about our pickup service.",
        },
        {
          id: "refund-time",
          question: "How long does it take to process a refund?",
          answer:
            "Once we receive and inspect your return (usually within 3-5 business days), we'll process your refund. The time it takes for the refund to appear in your account depends on your payment method: credit/debit cards typically take 5-10 business days, while other methods may vary.",
        },
        {
          id: "damaged-items",
          question: "What if I receive a damaged or defective item?",
          answer:
            "If you receive a damaged or defective item, please contact our customer service team within 48 hours of delivery with photos of the damage. We'll arrange for a replacement or refund as quickly as possible at no additional cost to you.",
        },
        {
          id: "return-shipping",
          question: "Who pays for return shipping?",
          answer:
            "For standard returns, customers are responsible for return shipping costs unless the item is defective, damaged, or was sent incorrectly. For defective or incorrectly shipped items, we'll cover the return shipping costs or arrange for a pickup service.",
        },
      ],
    },
    {
      id: "products",
      name: "Products & Services",
      questions: [
        {
          id: "product-warranty",
          question: "Do your products come with a warranty?",
          answer:
            "Yes, most of our furniture products come with a manufacturer's warranty ranging from 1 to 5 years, depending on the item. The specific warranty information is listed on each product page. Warranty covers manufacturing defects but not damage from normal wear and tear or improper use.",
        },
        {
          id: "assembly-service",
          question: "Do you offer furniture assembly services?",
          answer:
            "Yes, we offer professional assembly services for most furniture items. This service can be added during checkout for an additional fee. Our trained technicians will assemble your furniture in your home and remove all packaging materials.",
        },
        {
          id: "product-dimensions",
          question: "Where can I find detailed product dimensions?",
          answer:
            "Detailed product dimensions are listed in the 'Specifications' section of each product page. If you need additional measurements or have specific questions about a product's dimensions, please contact our customer service team.",
        },
        {
          id: "product-materials",
          question: "What materials are used in your furniture?",
          answer:
            "We use a variety of high-quality materials in our furniture, including solid wood, engineered wood, metal, glass, and various upholstery fabrics. The specific materials used for each product are listed in the product description and specifications on the product page.",
        },
        {
          id: "custom-furniture",
          question: "Do you offer custom furniture options?",
          answer:
            "Yes, we offer custom furniture services for select product categories. This includes custom dimensions, material choices, and finishes. Please contact our design team to discuss your specific requirements and get a quote for custom furniture pieces.",
        },
      ],
    },
    {
      id: "account",
      name: "Account & Orders",
      questions: [
        {
          id: "create-account",
          question: "How do I create an account?",
          answer:
            "To create an account, click on the 'Account' icon in the top right corner of our website and select 'Register.' Fill in your personal information, create a password, and submit the form. You'll receive a confirmation email to verify your account.",
        },
        {
          id: "forgot-password",
          question: "I forgot my password. How can I reset it?",
          answer:
            "If you've forgotten your password, click on the 'Account' icon, select 'Sign In,' and then click on 'Forgot Password.' Enter your email address, and we'll send you instructions to reset your password.",
        },
        {
          id: "view-order-history",
          question: "How can I view my order history?",
          answer:
            "To view your order history, log into your account and navigate to the 'My Orders' section. Here, you'll find a list of all your past and current orders, including order status, details, and tracking information.",
        },
        {
          id: "update-account",
          question: "How do I update my account information?",
          answer:
            "To update your account information, log into your account and go to the 'Account Settings' or 'Profile' section. Here, you can update your personal information, change your password, and manage your saved addresses and payment methods.",
        },
        {
          id: "newsletter-subscription",
          question:
            "How do I subscribe to or unsubscribe from your newsletter?",
          answer:
            "To subscribe to our newsletter, enter your email in the newsletter subscription box in the footer of our website. To unsubscribe, click the 'Unsubscribe' link at the bottom of any newsletter email, or log into your account, go to 'Communication Preferences,' and update your subscription settings.",
        },
      ],
    },
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
            <BreadcrumbLink href="/faq">FAQs</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Page Header */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/70 to-violet-600/50 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80"
            alt="Frequently Asked Questions"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="max-w-2xl text-white/90">
              Find answers to common questions about our products, services,
              ordering, shipping, and more.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              placeholder="Search for answers..."
              className="pl-10 py-6 text-lg border-violet-200 focus-visible:ring-violet-500"
            />
            <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-violet-600 hover:bg-violet-700 text-white">
              Search
            </Button>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {faqCategories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              className="h-auto py-4 border-violet-200 hover:bg-violet-50 hover:border-violet-300 flex flex-col items-center justify-center text-center"
            >
              <span className="font-bold text-violet-800">{category.name}</span>
              <span className="text-sm text-gray-500 mt-1">
                {category.questions.length} questions
              </span>
            </Button>
          ))}
        </div>

        {/* FAQ Accordions */}
        <div className="max-w-4xl mx-auto mb-16">
          {faqCategories.map((category) => (
            <div key={category.id} className="mb-10">
              <h2 className="text-2xl font-bold text-violet-800 mb-6">
                {category.name}
              </h2>
              <Accordion
                type="single"
                collapsible
                className="border rounded-lg overflow-hidden"
              >
                {category.questions.map((faq, index) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className={index !== 0 ? "border-t" : ""}
                  >
                    <AccordionTrigger className="px-6 py-4 hover:bg-violet-50 hover:no-underline">
                      <span className="text-left font-medium">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 bg-violet-50/50">
                      <p className="text-gray-700">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="bg-violet-50 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold text-violet-800 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            If you couldn't find the answer to your question, our customer
            support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-violet-600 hover:bg-violet-700 text-white">
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
            <Button
              variant="outline"
              className="border-violet-600 text-violet-600 hover:bg-violet-50"
            >
              Live Chat
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
