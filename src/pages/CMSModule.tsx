import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Import custom components
import CMSBreadcrumb from "@/components/cms/CMSBreadcrumb";
import CMSTabNavigation from "@/components/cms/CMSTabNavigation";
import ProductsTab from "@/components/cms/tabs/ProductsTab";
import OrdersTab from "@/components/cms/tabs/OrdersTab";
import FamiliesTab from "@/components/cms/tabs/FamiliesTab";
import BrandsTab from "@/components/cms/tabs/BrandsTab";
import CategoriesTab from "@/components/cms/tabs/CategoriesTab";
import SubcategoriesTab from "@/components/cms/tabs/SubcategoriesTab";
import ProductLinesTab from "@/components/cms/tabs/ProductLinesTab";
import CustomersTab from "@/components/cms/tabs/CustomersTab";
import SettingsTab from "@/components/cms/tabs/SettingsTab";

// Import dialogs
import FamilyDialog from "@/components/cms/dialogs/FamilyDialog";

// Import types
import {
  ProductFamily,
  Brand,
  Category,
  Subcategory,
  ProductLine,
  Product,
  Order,
} from "@/components/cms/types";

const CMSModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [familySearchQuery, setFamilySearchQuery] = useState("");
  const [brandSearchQuery, setBrandSearchQuery] = useState("");
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [subcategorySearchQuery, setSubcategorySearchQuery] = useState("");
  const [productLineSearchQuery, setProductLineSearchQuery] = useState("");
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");

  // State for showing/hiding dialogs
  const [showAddFamilyDialog, setShowAddFamilyDialog] = useState(false);
  const [showAddBrandDialog, setShowAddBrandDialog] = useState(false);
  const [showAddCategoryDialog, setShowAddCategoryDialog] = useState(false);
  const [showAddSubcategoryDialog, setShowAddSubcategoryDialog] =
    useState(false);
  const [showAddProductLineDialog, setShowAddProductLineDialog] =
    useState(false);
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);

  // State for editing items
  const [editingFamily, setEditingFamily] = useState<ProductFamily | null>(
    null,
  );
  const [showEditFamilyForm, setShowEditFamilyForm] = useState(false);

  // State for editing brands
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [showEditBrandForm, setShowEditBrandForm] = useState(false);

  // State for editing categories
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);

  // Sample data for product hierarchy
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
      logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=300&q=80",
      description: "Consumer electronics and software",
      status: "Active",
      familyName: "Mobile",
    },
    {
      id: "2",
      name: "Nike",
      logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
      description: "Athletic footwear and apparel",
      status: "Active",
      familyName: "Apparel",
    },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Electronics",
      description: "Electronic devices and accessories",
      status: "Active",
      familyId: "1",
      familyName: "Mobile",
      brandId: "1",
      brandName: "Apple",
    },
    {
      id: "2",
      name: "Clothing",
      description: "Apparel and fashion items",
      status: "Active",
      familyId: "2",
      familyName: "Apparel",
      brandId: "2",
      brandName: "Nike",
    },
  ]);

  const [subcategories, setSubcategories] = useState<Subcategory[]>([
    {
      id: "1",
      categoryId: "1",
      categoryName: "Electronics",
      name: "Smartphones",
      description: "Mobile phones and accessories",
      status: "Active",
      familyId: "1",
      familyName: "Mobile",
      brandId: "1",
      brandName: "Apple",
    },
    {
      id: "2",
      categoryId: "2",
      categoryName: "Clothing",
      name: "T-shirts",
      description: "Casual and formal t-shirts",
      status: "Active",
      familyId: "2",
      familyName: "Apparel",
      brandId: "2",
      brandName: "Nike",
    },
  ]);

  const [productLines, setProductLines] = useState<ProductLine[]>([
    {
      id: "1",
      subcategoryId: "1",
      subcategoryName: "Smartphones",
      categoryId: "1",
      categoryName: "Electronics",
      brandId: "1",
      brandName: "Apple",
      familyId: "1",
      familyName: "Mobile",
      name: "iPhone",
      description: "Apple iPhone product line",
      status: "Active",
    },
    {
      id: "2",
      subcategoryId: "2",
      subcategoryName: "T-shirts",
      categoryId: "2",
      categoryName: "Clothing",
      brandId: "2",
      brandName: "Nike",
      familyId: "2",
      familyName: "Apparel",
      name: "Nike Sportswear",
      description: "Nike casual sportswear line",
      status: "Active",
    },
  ]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "iPhone 13 Pro",
      sku: "IP13PRO-128-GRY",
      description: "Latest iPhone model with advanced features",
      price: 999.99,
      salePrice: 899.99,
      cost: 700.0,
      stockQuantity: 150,
      familyId: "1",
      familyName: "Mobile",
      brandId: "1",
      brandName: "Apple",
      categoryId: "1",
      categoryName: "Electronics",
      subcategoryId: "1",
      subcategoryName: "Smartphones",
      productLineId: "1",
      lineId: "1",
      lineName: "iPhone",
      images: [
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=300&q=80",
      ],
      status: "Active",
    },
    {
      id: "2",
      name: "Nike Air Max",
      sku: "NKE-AIRMAX-001",
      description: "Comfortable athletic shoes with air cushioning",
      price: 129.99,
      salePrice: 99.99,
      cost: 65.0,
      stockQuantity: 200,
      familyId: "2",
      familyName: "Apparel",
      brandId: "2",
      brandName: "Nike",
      categoryId: "2",
      categoryName: "Clothing",
      subcategoryId: "2",
      subcategoryName: "T-shirts",
      productLineId: "2",
      lineId: "2",
      lineName: "Nike Sportswear",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
      ],
      status: "Active",
    },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "ORD-2023-001",
      customer: "John Doe",
      customerEmail: "john.doe@example.com",
      date: "2023-05-15",
      total: 1099.98,
      status: "Completed",
      items: [
        {
          productId: "1",
          productName: "iPhone 13 Pro",
          quantity: 1,
          price: 999.99,
        },
        {
          productId: "2",
          productName: "Nike Air Max",
          quantity: 1,
          price: 99.99,
        },
      ],
      shippingAddress: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
      paymentMethod: "Credit Card",
    },
    {
      id: "2",
      orderNumber: "ORD-2023-002",
      customer: "Jane Smith",
      customerEmail: "jane.smith@example.com",
      date: "2023-05-16",
      total: 99.99,
      status: "Processing",
      items: [
        {
          productId: "2",
          productName: "Nike Air Max",
          quantity: 1,
          price: 99.99,
        },
      ],
      shippingAddress: {
        street: "456 Elm St",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
        country: "USA",
      },
      paymentMethod: "PayPal",
    },
  ]);

  // Function to handle adding a new family
  const handleAddFamily = (family: ProductFamily) => {
    setFamilies([...families, family]);
    setShowAddFamilyDialog(false);
  };

  // Handle search for products
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search for orders
  const handleOrderSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderSearchQuery(e.target.value);
  };

  // Handle search for families
  const handleFamilySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilySearchQuery(e.target.value);
  };

  // Handle search for brands
  const handleBrandSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandSearchQuery(e.target.value);
  };

  // Handle search for categories
  const handleCategorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategorySearchQuery(e.target.value);
  };

  // Render the appropriate tab content based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case "products":
        return (
          <ProductsTab
            products={products}
            setProducts={setProducts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            showAddProductDialog={showAddProductDialog}
            setShowAddProductDialog={setShowAddProductDialog}
          />
        );
      case "orders":
        return (
          <OrdersTab
            orders={orders}
            setOrders={setOrders}
            orderSearchQuery={orderSearchQuery}
            handleOrderSearch={handleOrderSearch}
          />
        );
      case "families":
        return (
          <FamiliesTab
            families={families}
            setFamilies={setFamilies}
            familySearchQuery={familySearchQuery}
            handleFamilySearch={handleFamilySearch}
            setShowAddFamilyDialog={setShowAddFamilyDialog}
            setEditingFamily={setEditingFamily}
            setShowEditFamilyForm={setShowEditFamilyForm}
          />
        );
      case "brands":
        return (
          <BrandsTab
            brands={brands}
            setBrands={setBrands}
            brandSearchQuery={brandSearchQuery}
            handleBrandSearch={handleBrandSearch}
            setShowAddBrandDialog={setShowAddBrandDialog}
            setEditingBrand={setEditingBrand}
            setShowEditBrandForm={setShowEditBrandForm}
          />
        );
      case "categories":
        return (
          <CategoriesTab
            categories={categories}
            setCategories={setCategories}
            categorySearchQuery={categorySearchQuery}
            handleCategorySearch={handleCategorySearch}
            setShowAddCategoryDialog={setShowAddCategoryDialog}
            setEditingCategory={setEditingCategory}
            setShowEditCategoryForm={setShowEditCategoryForm}
          />
        );
      case "subcategories":
        return (
          <SubcategoriesTab
            subcategories={subcategories}
            setSubcategories={setSubcategories}
            searchQuery={subcategorySearchQuery}
            setSearchQuery={setSubcategorySearchQuery}
            showAddSubcategoryDialog={showAddSubcategoryDialog}
            setShowAddSubcategoryDialog={setShowAddSubcategoryDialog}
          />
        );
      case "product-lines":
        return (
          <ProductLinesTab
            productLines={productLines}
            productLineSearchQuery={productLineSearchQuery}
            handleProductLineSearch={(e) =>
              setProductLineSearchQuery(e.target.value)
            }
            setProductLines={setProductLines}
            setShowAddProductLineDialog={setShowAddProductLineDialog}
            setEditingProductLine={() => {}}
            setShowEditProductLineForm={() => {}}
          />
        );
      case "customers":
        return (
          <CustomersTab
            searchQuery={customerSearchQuery}
            setSearchQuery={setCustomerSearchQuery}
          />
        );
      case "settings":
        return <SettingsTab />;
      default:
        return (
          <ProductsTab
            products={products}
            setProducts={setProducts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            showAddProductDialog={showAddProductDialog}
            setShowAddProductDialog={setShowAddProductDialog}
          />
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-6 px-4">
        <CMSBreadcrumb activeTab={activeTab} />
        <CMSTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderTabContent()}
      </main>

      {/* Dialogs */}
      <FamilyDialog
        open={showAddFamilyDialog}
        onOpenChange={setShowAddFamilyDialog}
        newFamily={{ name: "", description: "" }}
        setNewFamily={() => {}}
        handleAddFamily={handleAddFamily}
      />

      <Footer />
    </div>
  );
};

export default CMSModule;
