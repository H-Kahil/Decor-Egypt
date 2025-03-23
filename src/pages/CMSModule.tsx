import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Upload,
  X,
  Image as ImageIcon,
  Check,
} from "lucide-react";

// Define interfaces for product hierarchy
interface ProductFamily {
  id: string;
  name: string;
  description?: string;
  status: string;
}

interface Brand {
  id: string;
  name: string;
  familyId: string;
  familyName: string;
  description?: string;
  status: string;
}

interface Category {
  id: string;
  name: string;
  brandId: string;
  brandName: string;
  familyId: string;
  familyName: string;
  description?: string;
  status: string;
}

interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  brandId: string;
  brandName: string;
  familyId: string;
  familyName: string;
  description?: string;
  status: string;
}

interface ProductLine {
  id: string;
  name: string;
  subcategoryId: string;
  subcategoryName: string;
  categoryId: string;
  categoryName: string;
  brandId: string;
  brandName: string;
  familyId: string;
  familyName: string;
  description?: string;
  status: string;
}

interface ProductVariant {
  id: string;
  productId: string;
  attributes: Record<string, string>;
  sku: string;
  price: number;
  stock: number;
  images: string[];
}

interface Product {
  id: string;
  name: string;
  description?: string;
  lineId: string;
  lineName: string;
  subcategoryId: string;
  subcategoryName: string;
  categoryId: string;
  categoryName: string;
  brandId: string;
  brandName: string;
  familyId: string;
  familyName: string;
  mainImage: string;
  additionalImages: string[];
  variants: ProductVariant[];
  metadata?: Record<string, string>;
  status: string;
}

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
}

const CMSModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");

  // State for showing/hiding forms
  const [showAddFamilyForm, setShowAddFamilyForm] = useState(false);
  const [showAddBrandForm, setShowAddBrandForm] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showAddSubcategoryForm, setShowAddSubcategoryForm] = useState(false);
  const [showAddProductLineForm, setShowAddProductLineForm] = useState(false);

  // State for editing items
  const [editingFamily, setEditingFamily] = useState<ProductFamily | null>(
    null,
  );
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubcategory, setEditingSubcategory] =
    useState<Subcategory | null>(null);
  const [editingProductLine, setEditingProductLine] =
    useState<ProductLine | null>(null);

  // State for showing edit forms
  const [showEditFamilyForm, setShowEditFamilyForm] = useState(false);
  const [showEditBrandForm, setShowEditBrandForm] = useState(false);
  const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);
  const [showEditSubcategoryForm, setShowEditSubcategoryForm] = useState(false);
  const [showEditProductLineForm, setShowEditProductLineForm] = useState(false);

  // State for product hierarchy
  const [families, setFamilies] = useState<ProductFamily[]>([
    {
      id: "1",
      name: "Mobile",
      description: "Mobile devices and accessories",
      status: "Active",
    },
    {
      id: "2",
      name: "Apparel",
      description: "Clothing and fashion items",
      status: "Active",
    },
  ]);

  const [brands, setBrands] = useState<Brand[]>([
    {
      id: "1",
      name: "Apple",
      familyId: "1",
      familyName: "Mobile",
      description: "Premium mobile devices",
      status: "Active",
    },
    {
      id: "2",
      name: "Samsung",
      familyId: "1",
      familyName: "Mobile",
      description: "Innovative mobile technology",
      status: "Active",
    },
    {
      id: "3",
      name: "Nike",
      familyId: "2",
      familyName: "Apparel",
      description: "Sports and casual wear",
      status: "Active",
    },
    {
      id: "4",
      name: "Adidas",
      familyId: "2",
      familyName: "Apparel",
      description: "Athletic and lifestyle apparel",
      status: "Active",
    },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Smartphones",
      brandId: "1",
      brandName: "Apple",
      familyId: "1",
      familyName: "Mobile",
      description: "Mobile phones",
      status: "Active",
    },
    {
      id: "2",
      name: "Tablets",
      brandId: "1",
      brandName: "Apple",
      familyId: "1",
      familyName: "Mobile",
      description: "Tablet devices",
      status: "Active",
    },
    {
      id: "3",
      name: "Shirts",
      brandId: "3",
      brandName: "Nike",
      familyId: "2",
      familyName: "Apparel",
      description: "Upper body clothing",
      status: "Active",
    },
    {
      id: "4",
      name: "Pants",
      brandId: "3",
      brandName: "Nike",
      familyId: "2",
      familyName: "Apparel",
      description: "Lower body clothing",
      status: "Active",
    },
  ]);

  const [subcategories, setSubcategories] = useState<Subcategory[]>([
    {
      id: "1",
      name: "iPhone",
      categoryId: "1",
      categoryName: "Smartphones",
      brandId: "1",
      brandName: "Apple",
      familyId: "1",
      familyName: "Mobile",
      description: "Apple smartphones",
      status: "Active",
    },
    {
      id: "2",
      name: "iPad",
      categoryId: "2",
      categoryName: "Tablets",
      brandId: "1",
      brandName: "Apple",
      familyId: "1",
      familyName: "Mobile",
      description: "Apple tablets",
      status: "Active",
    },
    {
      id: "3",
      name: "T-Shirts",
      categoryId: "3",
      categoryName: "Shirts",
      brandId: "3",
      brandName: "Nike",
      familyId: "2",
      familyName: "Apparel",
      description: "Short-sleeved shirts",
      status: "Active",
    },
    {
      id: "4",
      name: "Jeans",
      categoryId: "4",
      categoryName: "Pants",
      brandId: "3",
      brandName: "Nike",
      familyId: "2",
      familyName: "Apparel",
      description: "Denim pants",
      status: "Active",
    },
  ]);

  const [productLines, setProductLines] = useState<ProductLine[]>([
    {
      id: "1",
      name: "iPhone 16",
      subcategoryId: "1",
      subcategoryName: "iPhone",
      categoryId: "1",
      categoryName: "Smartphones",
      brandId: "1",
      brandName: "Apple",
      familyId: "1",
      familyName: "Mobile",
      description: "Latest iPhone model",
      status: "Active",
    },
    {
      id: "2",
      name: "iPad Pro",
      subcategoryId: "2",
      subcategoryName: "iPad",
      categoryId: "2",
      categoryName: "Tablets",
      brandId: "1",
      brandName: "Apple",
      familyId: "1",
      familyName: "Mobile",
      description: "Professional iPad model",
      status: "Active",
    },
    {
      id: "3",
      name: "Crew Neck",
      subcategoryId: "3",
      subcategoryName: "T-Shirts",
      categoryId: "3",
      categoryName: "Shirts",
      brandId: "3",
      brandName: "Nike",
      familyId: "2",
      familyName: "Apparel",
      description: "Classic crew neck t-shirts",
      status: "Active",
    },
    {
      id: "4",
      name: "Slim Fit",
      subcategoryId: "4",
      subcategoryName: "Jeans",
      categoryId: "4",
      categoryName: "Pants",
      brandId: "3",
      brandName: "Nike",
      familyId: "2",
      familyName: "Apparel",
      description: "Slim fit jeans",
      status: "Active",
    },
  ]);

  // State for products
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "iPhone 16 Pro Max",
      description: "The latest flagship iPhone with advanced features",
      lineId: "1",
      lineName: "iPhone 16",
      subcategoryId: "1",
      subcategoryName: "iPhone",
      categoryId: "1",
      categoryName: "Smartphones",
      brandId: "1",
      brandName: "Apple",
      familyId: "1",
      familyName: "Mobile",
      mainImage:
        "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80",
      additionalImages: [
        "https://images.unsplash.com/photo-1592286927505-1def25115558?w=800&q=80",
        "https://images.unsplash.com/photo-1565536421961-1f165e0c981e?w=800&q=80",
      ],
      variants: [
        {
          id: "1-1",
          productId: "1",
          attributes: { Color: "Black", Memory: "256GB" },
          sku: "IP16PMX-256-BK",
          price: 1299.99,
          stock: 25,
          images: [
            "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80",
          ],
        },
        {
          id: "1-2",
          productId: "1",
          attributes: { Color: "White", Memory: "256GB" },
          sku: "IP16PMX-256-WH",
          price: 1299.99,
          stock: 18,
          images: [
            "https://images.unsplash.com/photo-1592286927505-1def25115558?w=800&q=80",
          ],
        },
        {
          id: "1-3",
          productId: "1",
          attributes: { Color: "Black", Memory: "512GB" },
          sku: "IP16PMX-512-BK",
          price: 1499.99,
          stock: 12,
          images: [
            "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80",
          ],
        },
      ],
      metadata: {
        Material: "Glass and Aluminum",
        Weight: "240g",
        Dimensions: "160.7 x 77.6 x 7.85 mm",
      },
      status: "Active",
    },
    {
      id: "2",
      name: "Nike Crew Neck T-Shirt",
      description: "Comfortable cotton t-shirt for everyday wear",
      lineId: "3",
      lineName: "Crew Neck",
      subcategoryId: "3",
      subcategoryName: "T-Shirts",
      categoryId: "3",
      categoryName: "Shirts",
      brandId: "3",
      brandName: "Nike",
      familyId: "2",
      familyName: "Apparel",
      mainImage:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      additionalImages: [
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80",
      ],
      variants: [
        {
          id: "2-1",
          productId: "2",
          attributes: { Color: "Blue", Size: "S" },
          sku: "NK-TS-CN-S-BL",
          price: 29.99,
          stock: 45,
          images: [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
          ],
        },
        {
          id: "2-2",
          productId: "2",
          attributes: { Color: "Blue", Size: "M" },
          sku: "NK-TS-CN-M-BL",
          price: 29.99,
          stock: 38,
          images: [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
          ],
        },
        {
          id: "2-3",
          productId: "2",
          attributes: { Color: "Red", Size: "M" },
          sku: "NK-TS-CN-M-RD",
          price: 29.99,
          stock: 32,
          images: [
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
          ],
        },
      ],
      metadata: {
        Material: "100% Cotton",
        Care: "Machine wash cold",
        Fit: "Regular fit",
      },
      status: "Active",
    },
  ]);

  // Mock data for orders
  const orders: Order[] = [
    {
      id: "ORD-001",
      customer: "John Smith",
      date: "2023-10-15",
      total: 1299.99,
      status: "Delivered",
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      date: "2023-10-16",
      total: 89.97,
      status: "Processing",
    },
    {
      id: "ORD-003",
      customer: "Michael Brown",
      date: "2023-10-14",
      total: 1799.98,
      status: "Shipped",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      date: "2023-10-13",
      total: 59.99,
      status: "Cancelled",
    },
  ];

  // Form states for adding new items
  const [newFamily, setNewFamily] = useState({ name: "", description: "" });
  const [newBrand, setNewBrand] = useState({
    name: "",
    familyId: "",
    description: "",
  });
  const [newCategory, setNewCategory] = useState({
    name: "",
    brandId: "",
    description: "",
  });
  const [newSubcategory, setNewSubcategory] = useState({
    name: "",
    categoryId: "",
    description: "",
  });
  const [newProductLine, setNewProductLine] = useState({
    name: "",
    subcategoryId: "",
    description: "",
  });

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    lineId: "",
    mainImage: "",
    additionalImages: ["", "", "", "", ""],
    metadata: {},
  });

  // State for product variants
  const [productVariants, setProductVariants] = useState<
    Array<{
      attributes: Record<string, string>;
      sku: string;
      price: string;
      stock: string;
    }>
  >([{ attributes: {}, sku: "", price: "", stock: "" }]);

  // State for selected product family (to determine variant attributes)
  const [selectedFamily, setSelectedFamily] = useState<string>("");
  const [selectedProductLine, setSelectedProductLine] =
    useState<ProductLine | null>(null);

  // State for preview
  const [showPreview, setShowPreview] = useState(false);

  // Effect to update selected family when product line changes
  useEffect(() => {
    if (newProduct.lineId) {
      const productLine = productLines.find(
        (line) => line.id === newProduct.lineId,
      );
      if (productLine) {
        setSelectedProductLine(productLine);
        setSelectedFamily(productLine.familyId);
      }
    }
  }, [newProduct.lineId, productLines]);

  // Effect to generate SKUs for variants
  useEffect(() => {
    if (selectedProductLine && selectedFamily) {
      const updatedVariants = productVariants.map((variant) => {
        let sku = "";

        // Generate SKU based on family
        if (selectedFamily === "1") {
          // Mobile
          // Example: IP16PMX-256-BK for iPhone 16 Pro Max, 256GB, Black
          const brandPrefix = selectedProductLine.brandName
            .substring(0, 2)
            .toUpperCase();
          const modelPrefix = selectedProductLine.name
            .replace(/\s+/g, "")
            .substring(0, 6)
            .toUpperCase();
          const memory = variant.attributes["Memory"] || "";
          const color = variant.attributes["Color"]
            ? variant.attributes["Color"].substring(0, 2).toUpperCase()
            : "";

          sku = `${brandPrefix}-${modelPrefix}-${memory}-${color}`.replace(
            /--+/g,
            "-",
          );
        } else if (selectedFamily === "2") {
          // Apparel
          // Example: NK-TS-CN-M-BL for Nike T-Shirt Crew Neck, Medium, Blue
          const brandPrefix = selectedProductLine.brandName
            .substring(0, 2)
            .toUpperCase();
          const categoryPrefix = selectedProductLine.categoryName
            .substring(0, 2)
            .toUpperCase();
          const linePrefix = selectedProductLine.name
            .replace(/\s+/g, "-")
            .substring(0, 2)
            .toUpperCase();
          const size = variant.attributes["Size"] || "";
          const color = variant.attributes["Color"]
            ? variant.attributes["Color"].substring(0, 2).toUpperCase()
            : "";

          sku =
            `${brandPrefix}-${categoryPrefix}-${linePrefix}-${size}-${color}`.replace(
              /--+/g,
              "-",
            );
        }

        return { ...variant, sku };
      });

      setProductVariants(updatedVariants);
    }
  }, [
    selectedProductLine,
    selectedFamily,
    productVariants.map((v) => JSON.stringify(v.attributes)),
  ]);

  // Function to add a new variant
  const addVariant = () => {
    setProductVariants([
      ...productVariants,
      { attributes: {}, sku: "", price: "", stock: "" },
    ]);
  };

  // Function to remove a variant
  const removeVariant = (index: number) => {
    const newVariants = [...productVariants];
    newVariants.splice(index, 1);
    setProductVariants(newVariants);
  };

  // Function to update variant attribute
  const updateVariantAttribute = (
    index: number,
    attribute: string,
    value: string,
  ) => {
    const newVariants = [...productVariants];
    if (!newVariants[index].attributes) {
      newVariants[index].attributes = {};
    }
    newVariants[index].attributes[attribute] = value;
    setProductVariants(newVariants);
  };

  // Function to update variant field
  const updateVariantField = (index: number, field: string, value: string) => {
    const newVariants = [...productVariants];
    (newVariants[index] as any)[field] = value;
    setProductVariants(newVariants);
  };

  // Function to add a new family
  const handleAddFamily = () => {
    if (newFamily.name) {
      const newId = (families.length + 1).toString();
      setFamilies([
        ...families,
        {
          id: newId,
          name: newFamily.name,
          description: newFamily.description,
          status: "Active",
        },
      ]);
      setNewFamily({ name: "", description: "" });
    }
  };

  // Function to add a new brand
  const handleAddBrand = () => {
    if (newBrand.name && newBrand.familyId) {
      const family = families.find((f) => f.id === newBrand.familyId);
      if (family) {
        const newId = (brands.length + 1).toString();
        setBrands([
          ...brands,
          {
            id: newId,
            name: newBrand.name,
            familyId: newBrand.familyId,
            familyName: family.name,
            description: newBrand.description,
            status: "Active",
          },
        ]);
        setNewBrand({ name: "", familyId: "", description: "" });
      }
    }
  };

  // Function to add a new category
  const handleAddCategory = () => {
    if (newCategory.name && newCategory.brandId) {
      const brand = brands.find((b) => b.id === newCategory.brandId);
      if (brand) {
        const newId = (categories.length + 1).toString();
        setCategories([
          ...categories,
          {
            id: newId,
            name: newCategory.name,
            brandId: newCategory.brandId,
            brandName: brand.name,
            familyId: brand.familyId,
            familyName: brand.familyName,
            description: newCategory.description,
            status: "Active",
          },
        ]);
        setNewCategory({ name: "", brandId: "", description: "" });
      }
    }
  };

  // Function to add a new subcategory
  const handleAddSubcategory = () => {
    if (newSubcategory.name && newSubcategory.categoryId) {
      const category = categories.find(
        (c) => c.id === newSubcategory.categoryId,
      );
      if (category) {
        const newId = (subcategories.length + 1).toString();
        setSubcategories([
          ...subcategories,
          {
            id: newId,
            name: newSubcategory.name,
            categoryId: newSubcategory.categoryId,
            categoryName: category.name,
            brandId: category.brandId,
            brandName: category.brandName,
            familyId: category.familyId,
            familyName: category.familyName,
            description: newSubcategory.description,
            status: "Active",
          },
        ]);
        setNewSubcategory({ name: "", categoryId: "", description: "" });
      }
    }
  };

  // Function to add a new product line
  const handleAddProductLine = () => {
    if (newProductLine.name && newProductLine.subcategoryId) {
      const subcategory = subcategories.find(
        (s) => s.id === newProductLine.subcategoryId,
      );
      if (subcategory) {
        const newId = (productLines.length + 1).toString();
        setProductLines([
          ...productLines,
          {
            id: newId,
            name: newProductLine.name,
            subcategoryId: newProductLine.subcategoryId,
            subcategoryName: subcategory.name,
            categoryId: subcategory.categoryId,
            categoryName: subcategory.categoryName,
            brandId: subcategory.brandId,
            brandName: subcategory.brandName,
            familyId: subcategory.familyId,
            familyName: subcategory.familyName,
            description: newProductLine.description,
            status: "Active",
          },
        ]);
        setNewProductLine({ name: "", subcategoryId: "", description: "" });
      }
    }
  };

  // Function to add a new product
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.lineId && productVariants.length > 0) {
      const productLine = productLines.find(
        (line) => line.id === newProduct.lineId,
      );
      if (productLine) {
        const newId = (products.length + 1).toString();

        // Convert variants to the correct format
        const formattedVariants = productVariants.map((variant, index) => ({
          id: `${newId}-${index + 1}`,
          productId: newId,
          attributes: variant.attributes,
          sku: variant.sku,
          price: parseFloat(variant.price) || 0,
          stock: parseInt(variant.stock) || 0,
          images: [newProduct.mainImage], // Using main image for all variants for simplicity
        }));

        // Filter out empty additional images
        const filteredAdditionalImages = newProduct.additionalImages.filter(
          (img) => img.trim() !== "",
        );

        setProducts([
          ...products,
          {
            id: newId,
            name: newProduct.name,
            description: newProduct.description,
            lineId: newProduct.lineId,
            lineName: productLine.name,
            subcategoryId: productLine.subcategoryId,
            subcategoryName: productLine.subcategoryName,
            categoryId: productLine.categoryId,
            categoryName: productLine.categoryName,
            brandId: productLine.brandId,
            brandName: productLine.brandName,
            familyId: productLine.familyId,
            familyName: productLine.familyName,
            mainImage: newProduct.mainImage,
            additionalImages: filteredAdditionalImages,
            variants: formattedVariants,
            metadata: newProduct.metadata,
            status: "Active",
          },
        ]);

        // Reset form
        setNewProduct({
          name: "",
          description: "",
          lineId: "",
          mainImage: "",
          additionalImages: ["", "", "", "", ""],
          metadata: {},
        });
        setProductVariants([{ attributes: {}, sku: "", price: "", stock: "" }]);
        setSelectedFamily("");
        setSelectedProductLine(null);
        setShowPreview(false);
      }
    }
  };

  // Search handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategorySearchQuery(e.target.value);
  };

  const handleOrderSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderSearchQuery(e.target.value);
  };

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Filter categories based on search query
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
      category.brandName
        .toLowerCase()
        .includes(categorySearchQuery.toLowerCase()),
  );

  // Filter orders based on search query
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(orderSearchQuery.toLowerCase()),
  );

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
            <BreadcrumbLink href="/account">My Account</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Content Management</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Content Management System
          </h1>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full justify-start border-b mb-6 rounded-none bg-transparent overflow-x-auto">
              <TabsTrigger
                value="orders"
                className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="families"
                className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
              >
                Families
              </TabsTrigger>
              <TabsTrigger
                value="brands"
                className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
              >
                Brands
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
              >
                Categories
              </TabsTrigger>
              <TabsTrigger
                value="subcategories"
                className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
              >
                Subcategories
              </TabsTrigger>
              <TabsTrigger
                value="product-lines"
                className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
              >
                Product Lines
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
              >
                Products
              </TabsTrigger>
              <TabsTrigger
                value="customers"
                className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
              >
                Customers
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative w-64">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
                <Button
                  className="bg-violet-600 hover:bg-violet-700"
                  onClick={() => setShowPreview(true)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Variants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.brandName}</TableCell>
                      <TableCell>{product.categoryName}</TableCell>
                      <TableCell>{product.variants.length}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${product.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          {product.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative w-64">
                  <Input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-9"
                    value={orderSearchQuery}
                    onChange={handleOrderSearch}
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === "Delivered" ? "bg-green-100 text-green-800" : order.status === "Processing" ? "bg-blue-100 text-blue-800" : order.status === "Shipped" ? "bg-purple-100 text-purple-800" : "bg-red-100 text-red-800"}`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Families Tab */}
            <TabsContent value="families" className="space-y-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Product Families</h2>
                  <Button
                    className="bg-violet-600 hover:bg-violet-700"
                    onClick={() => {
                      setShowAddFamilyForm(!showAddFamilyForm);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Family
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {families.map((family) => (
                      <TableRow key={family.id}>
                        <TableCell className="font-medium">
                          {family.name}
                        </TableCell>
                        <TableCell>{family.description}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${family.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                          >
                            {family.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                setEditingFamily(family);
                                setShowEditFamilyForm(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Are you sure you want to delete ${family.name}?`,
                                  )
                                ) {
                                  setFamilies(
                                    families.filter((f) => f.id !== family.id),
                                  );
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {showAddFamilyForm && (
                  <Card className="mt-6 max-w-2xl mx-auto">
                    <CardHeader>
                      <CardTitle>Add New Product Family</CardTitle>
                      <CardDescription>
                        Create a new top-level product family (e.g., Mobile,
                        Apparel)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="family-name">Family Name</Label>
                        <Input
                          id="family-name"
                          placeholder="Enter family name"
                          value={newFamily.name}
                          onChange={(e) =>
                            setNewFamily({ ...newFamily, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="family-description">Description</Label>
                        <Textarea
                          id="family-description"
                          placeholder="Enter family description"
                          value={newFamily.description}
                          onChange={(e) =>
                            setNewFamily({
                              ...newFamily,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setShowAddFamilyForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-violet-600 hover:bg-violet-700"
                        onClick={() => {
                          handleAddFamily();
                          setShowAddFamilyForm(false);
                        }}
                        disabled={!newFamily.name}
                      >
                        Add Family
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Brands Tab */}
            <TabsContent value="brands" className="space-y-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Brands</h2>
                  <Button
                    className="bg-violet-600 hover:bg-violet-700"
                    onClick={() => {
                      setShowAddBrandForm(!showAddBrandForm);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Brand
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Family</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brands.map((brand) => (
                      <TableRow key={brand.id}>
                        <TableCell className="font-medium">
                          {brand.name}
                        </TableCell>
                        <TableCell>{brand.familyName}</TableCell>
                        <TableCell>{brand.description}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${brand.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                          >
                            {brand.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                setEditingBrand(brand);
                                setShowEditBrandForm(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Are you sure you want to delete ${brand.name}?`,
                                  )
                                ) {
                                  setBrands(
                                    brands.filter((b) => b.id !== brand.id),
                                  );
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {showAddBrandForm && (
                  <Card className="mt-6 max-w-2xl mx-auto">
                    <CardHeader>
                      <CardTitle>Add New Brand</CardTitle>
                      <CardDescription>
                        Create a new brand and associate it with a product
                        family
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="brand-name">Brand Name</Label>
                        <Input
                          id="brand-name"
                          placeholder="Enter brand name"
                          value={newBrand.name}
                          onChange={(e) =>
                            setNewBrand({ ...newBrand, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="brand-family">Product Family</Label>
                        <Select
                          value={newBrand.familyId}
                          onValueChange={(value) =>
                            setNewBrand({ ...newBrand, familyId: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a family" />
                          </SelectTrigger>
                          <SelectContent>
                            {families.map((family) => (
                              <SelectItem key={family.id} value={family.id}>
                                {family.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="brand-description">Description</Label>
                        <Textarea
                          id="brand-description"
                          placeholder="Enter brand description"
                          value={newBrand.description}
                          onChange={(e) =>
                            setNewBrand({
                              ...newBrand,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setShowAddBrandForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-violet-600 hover:bg-violet-700"
                        onClick={() => {
                          handleAddBrand();
                          setShowAddBrandForm(false);
                        }}
                        disabled={!newBrand.name || !newBrand.familyId}
                      >
                        Add Brand
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="space-y-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Categories</h2>
                  <div className="flex space-x-4">
                    <div className="relative w-64">
                      <Input
                        type="text"
                        placeholder="Search categories..."
                        className="pl-9"
                        value={categorySearchQuery}
                        onChange={handleCategorySearch}
                      />
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    </div>
                    <Button
                      className="bg-violet-600 hover:bg-violet-700"
                      onClick={() => {
                        setShowAddCategoryForm(!showAddCategoryForm);
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Category
                    </Button>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Family</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">
                          {category.name}
                        </TableCell>
                        <TableCell>{category.brandName}</TableCell>
                        <TableCell>{category.familyName}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${category.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                          >
                            {category.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                setEditingCategory(category);
                                setShowEditCategoryForm(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Are you sure you want to delete ${category.name}?`,
                                  )
                                ) {
                                  setCategories(
                                    categories.filter(
                                      (c) => c.id !== category.id,
                                    ),
                                  );
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {showAddCategoryForm && (
                  <Card className="mt-6 max-w-2xl mx-auto">
                    <CardHeader>
                      <CardTitle>Add New Category</CardTitle>
                      <CardDescription>
                        Create a new category and associate it with a brand
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="category-name">Category Name</Label>
                        <Input
                          id="category-name"
                          placeholder="Enter category name"
                          value={newCategory.name}
                          onChange={(e) =>
                            setNewCategory({
                              ...newCategory,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category-brand">Brand</Label>
                        <Select
                          value={newCategory.brandId}
                          onValueChange={(value) =>
                            setNewCategory({ ...newCategory, brandId: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a brand" />
                          </SelectTrigger>
                          <SelectContent>
                            {brands.map((brand) => (
                              <SelectItem key={brand.id} value={brand.id}>
                                {brand.name} ({brand.familyName})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category-description">
                          Description
                        </Label>
                        <Textarea
                          id="category-description"
                          placeholder="Enter category description"
                          value={newCategory.description}
                          onChange={(e) =>
                            setNewCategory({
                              ...newCategory,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setShowAddCategoryForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-violet-600 hover:bg-violet-700"
                        onClick={() => {
                          handleAddCategory();
                          setShowAddCategoryForm(false);
                        }}
                        disabled={!newCategory.name || !newCategory.brandId}
                      >
                        Add Category
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Subcategories Tab */}
            <TabsContent value="subcategories" className="space-y-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Subcategories</h2>
                  <Button
                    className="bg-violet-600 hover:bg-violet-700"
                    onClick={() => {
                      setShowAddSubcategoryForm(!showAddSubcategoryForm);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Subcategory
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Family</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subcategories.map((subcategory) => (
                      <TableRow key={subcategory.id}>
                        <TableCell className="font-medium">
                          {subcategory.name}
                        </TableCell>
                        <TableCell>{subcategory.categoryName}</TableCell>
                        <TableCell>{subcategory.brandName}</TableCell>
                        <TableCell>{subcategory.familyName}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${subcategory.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                          >
                            {subcategory.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                setEditingSubcategory(subcategory);
                                setShowEditSubcategoryForm(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Are you sure you want to delete ${subcategory.name}?`,
                                  )
                                ) {
                                  setSubcategories(
                                    subcategories.filter(
                                      (s) => s.id !== subcategory.id,
                                    ),
                                  );
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {showAddSubcategoryForm && (
                  <Card className="mt-6 max-w-2xl mx-auto">
                    <CardHeader>
                      <CardTitle>Add New Subcategory</CardTitle>
                      <CardDescription>
                        Create a new subcategory and associate it with a
                        category
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="subcategory-name">
                          Subcategory Name
                        </Label>
                        <Input
                          id="subcategory-name"
                          placeholder="Enter subcategory name"
                          value={newSubcategory.name}
                          onChange={(e) =>
                            setNewSubcategory({
                              ...newSubcategory,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subcategory-category">Category</Label>
                        <Select
                          value={newSubcategory.categoryId}
                          onValueChange={(value) =>
                            setNewSubcategory({
                              ...newSubcategory,
                              categoryId: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name} ({category.brandName})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subcategory-description">
                          Description
                        </Label>
                        <Textarea
                          id="subcategory-description"
                          placeholder="Enter subcategory description"
                          value={newSubcategory.description}
                          onChange={(e) =>
                            setNewSubcategory({
                              ...newSubcategory,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setShowAddSubcategoryForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-violet-600 hover:bg-violet-700"
                        onClick={() => {
                          handleAddSubcategory();
                          setShowAddSubcategoryForm(false);
                        }}
                        disabled={
                          !newSubcategory.name || !newSubcategory.categoryId
                        }
                      >
                        Add Subcategory
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Product Lines Tab */}
            <TabsContent value="product-lines" className="space-y-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Product Lines</h2>
                  <Button
                    className="bg-violet-600 hover:bg-violet-700"
                    onClick={() => {
                      setShowAddProductLineForm(!showAddProductLineForm);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Product Line
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Subcategory</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productLines.map((productLine) => (
                      <TableRow key={productLine.id}>
                        <TableCell className="font-medium">
                          {productLine.name}
                        </TableCell>
                        <TableCell>{productLine.subcategoryName}</TableCell>
                        <TableCell>{productLine.categoryName}</TableCell>
                        <TableCell>{productLine.brandName}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${productLine.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                          >
                            {productLine.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                setEditingProductLine(productLine);
                                setShowEditProductLineForm(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Are you sure you want to delete ${productLine.name}?`,
                                  )
                                ) {
                                  setProductLines(
                                    productLines.filter(
                                      (pl) => pl.id !== productLine.id,
                                    ),
                                  );
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {showAddProductLineForm && (
                  <Card className="mt-6 max-w-2xl mx-auto">
                    <CardHeader>
                      <CardTitle>Add New Product Line/Model</CardTitle>
                      <CardDescription>
                        Create a new product line and associate it with a
                        subcategory
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="product-line-name">
                          Product Line Name
                        </Label>
                        <Input
                          id="product-line-name"
                          placeholder="Enter product line name"
                          value={newProductLine.name}
                          onChange={(e) =>
                            setNewProductLine({
                              ...newProductLine,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-line-subcategory">
                          Subcategory
                        </Label>
                        <Select
                          value={newProductLine.subcategoryId}
                          onValueChange={(value) =>
                            setNewProductLine({
                              ...newProductLine,
                              subcategoryId: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            {subcategories.map((subcategory) => (
                              <SelectItem
                                key={subcategory.id}
                                value={subcategory.id}
                              >
                                {subcategory.name} ({subcategory.categoryName})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-line-description">
                          Description
                        </Label>
                        <Textarea
                          id="product-line-description"
                          placeholder="Enter product line description"
                          value={newProductLine.description}
                          onChange={(e) =>
                            setNewProductLine({
                              ...newProductLine,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setShowAddProductLineForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-violet-600 hover:bg-violet-700"
                        onClick={() => {
                          handleAddProductLine();
                          setShowAddProductLineForm(false);
                        }}
                        disabled={
                          !newProductLine.name || !newProductLine.subcategoryId
                        }
                      >
                        Add Product Line
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Customers Tab */}
            <TabsContent value="customers" className="space-y-6">
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Customer Management Coming Soon
                  </h3>
                  <p className="text-gray-500">
                    This feature is currently under development.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="max-w-2xl">
                <h3 className="text-lg font-medium mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="store-name">Store Name</Label>
                      <Input
                        id="store-name"
                        defaultValue="Decor Egypt"
                        className="max-w-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="store-email">Store Email</Label>
                      <Input
                        id="store-email"
                        type="email"
                        defaultValue="info@decoregypt.com"
                        className="max-w-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="store-phone">Store Phone</Label>
                      <Input
                        id="store-phone"
                        defaultValue="+20 123 456 7890"
                        className="max-w-md"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-lg font-medium mb-4">Currency Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Input
                        id="currency"
                        defaultValue="USD"
                        className="max-w-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency-symbol">Currency Symbol</Label>
                      <Input
                        id="currency-symbol"
                        defaultValue="$"
                        className="max-w-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="bg-violet-600 hover:bg-violet-700">
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CMSModule;
