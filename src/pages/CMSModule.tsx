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
import AttributesTab from "@/components/cms/tabs/AttributesTab";
import InventoryTab from "@/components/cms/tabs/InventoryTab";

// Import dialogs
import FamilyDialog from "@/components/cms/dialogs/FamilyDialog";
import BrandDialog from "@/components/cms/dialogs/BrandDialog";
import CategoryDialog from "@/components/cms/dialogs/CategoryDialog";
import SubcategoryDialog from "@/components/cms/dialogs/SubcategoryDialog";
import ProductDialog from "@/components/cms/dialogs/ProductDialog/index";
import ProductLineDialog from "@/components/cms/dialogs/ProductLineDialog";
import AttributeDialog from "@/components/cms/dialogs/AttributeDialog";

// Import types
import {
  ProductFamily,
  Brand,
  Category,
  Subcategory,
  ProductLine,
  Product,
  Order,
  Attribute,
} from "@/components/cms/types";

const CMSModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState("families");
  const [attributeSearchQuery, setAttributeSearchQuery] = useState("");
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
  const [showAddAttributeDialog, setShowAddAttributeDialog] = useState(false);

  // State for new family
  const [newFamily, setNewFamily] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });

  // State for editing items
  const [editingFamily, setEditingFamily] = useState<ProductFamily | null>(
    null,
  );
  const [showEditFamilyForm, setShowEditFamilyForm] = useState(false);

  // State for new brand
  const [newBrand, setNewBrand] = useState<{
    name: string;
    description: string;
    familyId: string;
  }>({
    name: "",
    description: "",
    familyId: "",
  });

  // State for editing brands
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [showEditBrandForm, setShowEditBrandForm] = useState(false);

  // State for new category
  const [newCategory, setNewCategory] = useState<{
    name: string;
    description: string;
    familyId: string;
    brandId: string;
  }>({
    name: "",
    description: "",
    familyId: "",
    brandId: "",
  });

  // State for editing categories
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);

  // State for new subcategory
  const [newSubcategory, setNewSubcategory] = useState<{
    name: string;
    description: string;
    familyId: string;
    brandId: string;
    categoryId: string;
  }>({
    name: "",
    description: "",
    familyId: "",
    brandId: "",
    categoryId: "",
  });

  // State for editing subcategories
  const [editingSubcategory, setEditingSubcategory] =
    useState<Subcategory | null>(null);
  const [showEditSubcategoryForm, setShowEditSubcategoryForm] = useState(false);

  // State for new product
  const [newProduct, setNewProduct] = useState<{
    name: string;
    description: string;
    familyId: string;
    brandId: string;
    categoryId: string;
    subcategoryId: string;
    price: number;
    sku: string;
  }>({
    name: "",
    description: "",
    familyId: "",
    brandId: "",
    categoryId: "",
    subcategoryId: "",
    price: 0,
    sku: "",
  });

  // State for new product line
  const [newProductLine, setNewProductLine] = useState<{
    name: string;
    description: string;
    familyId: string;
    brandId: string;
    categoryId: string;
    subcategoryId: string;
  }>({
    name: "",
    description: "",
    familyId: "",
    brandId: "",
    categoryId: "",
    subcategoryId: "",
  });

  // State for editing products
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showEditProductForm, setShowEditProductForm] = useState(false);

  // State for editing product lines
  const [editingProductLine, setEditingProductLine] =
    useState<ProductLine | null>(null);
  const [showEditProductLineForm, setShowEditProductLineForm] = useState(false);

  // State for new attribute
  const [newAttribute, setNewAttribute] = useState<{
    name: string;
    description: string;
    values: { id: string; value: string }[];
    familyId: string;
    brandId: string;
    categoryId: string;
    subcategoryId: string;
    productLineId: string;
  }>({
    name: "",
    description: "",
    values: [],
    familyId: "",
    brandId: "",
    categoryId: "",
    subcategoryId: "",
    productLineId: "",
  });

  // State for editing attributes
  const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(
    null,
  );
  const [showEditAttributeForm, setShowEditAttributeForm] = useState(false);

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

  const [attributes, setAttributes] = useState<Attribute[]>([
    {
      id: "1",
      name: "Color",
      description: "Available colors for the product",
      values: [
        { id: "1", value: "Red" },
        { id: "2", value: "Blue" },
        { id: "3", value: "Green" },
      ],
      familyId: "1",
      familyName: "Mobile",
      brandId: "1",
      brandName: "Apple",
      categoryId: "1",
      categoryName: "Electronics",
      subcategoryId: "1",
      subcategoryName: "Smartphones",
      productLineId: "1",
      productLineName: "iPhone",
      status: "Active",
    },
    {
      id: "2",
      name: "Size",
      description: "Available sizes for the product",
      values: [
        { id: "1", value: "Small" },
        { id: "2", value: "Medium" },
        { id: "3", value: "Large" },
      ],
      familyId: "2",
      familyName: "Apparel",
      brandId: "2",
      brandName: "Nike",
      categoryId: "2",
      categoryName: "Clothing",
      subcategoryId: "2",
      subcategoryName: "T-shirts",
      productLineId: "2",
      productLineName: "Nike Sportswear",
      status: "Active",
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
  const handleAddFamily = () => {
    const newFamilyItem: ProductFamily = {
      id: Date.now().toString(),
      name: newFamily.name,
      description: newFamily.description,
      status: "Active",
    };
    setFamilies([...families, newFamilyItem]);
    setNewFamily({ name: "", description: "" });
    setShowAddFamilyDialog(false);
  };

  // Function to handle updating a family
  const handleUpdateFamily = () => {
    if (editingFamily) {
      const updatedFamilies = families.map((family) =>
        family.id === editingFamily.id
          ? {
              ...family,
              name: newFamily.name,
              description: newFamily.description,
            }
          : family,
      );
      setFamilies(updatedFamilies);
      setEditingFamily(null);
      setNewFamily({ name: "", description: "" });
      setShowEditFamilyForm(false);
    }
  };

  // Function to handle adding a new brand
  const handleAddBrand = () => {
    const familyName =
      families.find((f) => f.id === newBrand.familyId)?.name || "";
    const newBrandItem: Brand = {
      id: Date.now().toString(),
      name: newBrand.name,
      description: newBrand.description,
      status: "Active",
      familyId: newBrand.familyId,
      familyName: familyName,
      logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=300&q=80",
    };
    setBrands([...brands, newBrandItem]);
    setNewBrand({ name: "", description: "", familyId: "" });
    setShowAddBrandDialog(false);
  };

  // Function to handle updating a brand
  const handleUpdateBrand = () => {
    if (editingBrand) {
      const familyName =
        families.find((f) => f.id === newBrand.familyId)?.name || "";
      const updatedBrands = brands.map((brand) =>
        brand.id === editingBrand.id
          ? {
              ...brand,
              name: newBrand.name,
              description: newBrand.description,
              familyId: newBrand.familyId,
              familyName: familyName,
            }
          : brand,
      );
      setBrands(updatedBrands);
      setEditingBrand(null);
      setNewBrand({ name: "", description: "", familyId: "" });
      setShowEditBrandForm(false);
    }
  };

  // Function to handle adding a new category
  const handleAddCategory = () => {
    const familyName =
      families.find((f) => f.id === newCategory.familyId)?.name || "";
    const brandName =
      brands.find((b) => b.id === newCategory.brandId)?.name || "";
    const newCategoryItem: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      description: newCategory.description,
      status: "Active",
      familyId: newCategory.familyId,
      familyName: familyName,
      brandId: newCategory.brandId,
      brandName: brandName,
    };
    setCategories([...categories, newCategoryItem]);
    setNewCategory({ name: "", description: "", familyId: "", brandId: "" });
    setShowAddCategoryDialog(false);
  };

  // Function to handle updating a category
  const handleUpdateCategory = () => {
    if (editingCategory) {
      const familyName =
        families.find((f) => f.id === newCategory.familyId)?.name || "";
      const brandName =
        brands.find((b) => b.id === newCategory.brandId)?.name || "";
      const updatedCategories = categories.map((category) =>
        category.id === editingCategory.id
          ? {
              ...category,
              name: newCategory.name,
              description: newCategory.description,
              familyId: newCategory.familyId,
              familyName: familyName,
              brandId: newCategory.brandId,
              brandName: brandName,
            }
          : category,
      );
      setCategories(updatedCategories);
      setEditingCategory(null);
      setNewCategory({ name: "", description: "", familyId: "", brandId: "" });
      setShowEditCategoryForm(false);
    }
  };

  // Function to handle adding a new subcategory
  const handleAddSubcategory = () => {
    const familyName =
      families.find((f) => f.id === newSubcategory.familyId)?.name || "";
    const brandName =
      brands.find((b) => b.id === newSubcategory.brandId)?.name || "";
    const categoryName =
      categories.find((c) => c.id === newSubcategory.categoryId)?.name || "";
    const newSubcategoryItem: Subcategory = {
      id: Date.now().toString(),
      name: newSubcategory.name,
      description: newSubcategory.description,
      status: "Active",
      familyId: newSubcategory.familyId,
      familyName: familyName,
      brandId: newSubcategory.brandId,
      brandName: brandName,
      categoryId: newSubcategory.categoryId,
      categoryName: categoryName,
    };
    setSubcategories([...subcategories, newSubcategoryItem]);
    setNewSubcategory({
      name: "",
      description: "",
      familyId: "",
      brandId: "",
      categoryId: "",
    });
    setShowAddSubcategoryDialog(false);
  };

  // Function to handle updating a subcategory
  const handleUpdateSubcategory = () => {
    if (editingSubcategory) {
      const familyName =
        families.find((f) => f.id === newSubcategory.familyId)?.name || "";
      const brandName =
        brands.find((b) => b.id === newSubcategory.brandId)?.name || "";
      const categoryName =
        categories.find((c) => c.id === newSubcategory.categoryId)?.name || "";
      const updatedSubcategories = subcategories.map((subcategory) =>
        subcategory.id === editingSubcategory.id
          ? {
              ...subcategory,
              name: newSubcategory.name,
              description: newSubcategory.description,
              familyId: newSubcategory.familyId,
              familyName: familyName,
              brandId: newSubcategory.brandId,
              brandName: brandName,
              categoryId: newSubcategory.categoryId,
              categoryName: categoryName,
            }
          : subcategory,
      );
      setSubcategories(updatedSubcategories);
      setEditingSubcategory(null);
      setNewSubcategory({
        name: "",
        description: "",
        familyId: "",
        brandId: "",
        categoryId: "",
      });
      setShowEditSubcategoryForm(false);
    }
  };

  // Function to handle adding a new product
  const handleAddProduct = () => {
    const familyName =
      families.find((f) => f.id === newProduct.familyId)?.name || "";
    const brandName =
      brands.find((b) => b.id === newProduct.brandId)?.name || "";
    const categoryName =
      categories.find((c) => c.id === newProduct.categoryId)?.name || "";
    const subcategoryName =
      subcategories.find((s) => s.id === newProduct.subcategoryId)?.name || "";

    const newProductItem: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description,
      sku: newProduct.sku,
      price: newProduct.price,
      status: "Active",
      familyId: newProduct.familyId,
      familyName: familyName,
      brandId: newProduct.brandId,
      brandName: brandName,
      categoryId: newProduct.categoryId,
      categoryName: categoryName,
      subcategoryId: newProduct.subcategoryId,
      subcategoryName: subcategoryName,
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
      ],
    };

    setProducts([...products, newProductItem]);
    setNewProduct({
      name: "",
      description: "",
      familyId: "",
      brandId: "",
      categoryId: "",
      subcategoryId: "",
      price: 0,
      sku: "",
    });
    setShowAddProductDialog(false);
  };

  // Function to handle updating a product
  const handleUpdateProduct = () => {
    if (editingProduct) {
      const familyName =
        families.find((f) => f.id === newProduct.familyId)?.name || "";
      const brandName =
        brands.find((b) => b.id === newProduct.brandId)?.name || "";
      const categoryName =
        categories.find((c) => c.id === newProduct.categoryId)?.name || "";
      const subcategoryName =
        subcategories.find((s) => s.id === newProduct.subcategoryId)?.name ||
        "";

      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              name: newProduct.name,
              description: newProduct.description,
              sku: newProduct.sku,
              price: newProduct.price,
              familyId: newProduct.familyId,
              familyName: familyName,
              brandId: newProduct.brandId,
              brandName: brandName,
              categoryId: newProduct.categoryId,
              categoryName: categoryName,
              subcategoryId: newProduct.subcategoryId,
              subcategoryName: subcategoryName,
            }
          : product,
      );

      setProducts(updatedProducts);
      setEditingProduct(null);
      setNewProduct({
        name: "",
        description: "",
        familyId: "",
        brandId: "",
        categoryId: "",
        subcategoryId: "",
        price: 0,
        sku: "",
      });
      setShowEditProductForm(false);
    }
  };

  // Function to handle adding a new product line
  const handleAddProductLine = () => {
    const familyName =
      families.find((f) => f.id === newProductLine.familyId)?.name || "";
    const brandName =
      brands.find((b) => b.id === newProductLine.brandId)?.name || "";
    const categoryName =
      categories.find((c) => c.id === newProductLine.categoryId)?.name || "";
    const subcategoryName =
      subcategories.find((s) => s.id === newProductLine.subcategoryId)?.name ||
      "";

    const newProductLineItem: ProductLine = {
      id: Date.now().toString(),
      name: newProductLine.name,
      description: newProductLine.description,
      status: "Active",
      familyId: newProductLine.familyId,
      familyName: familyName,
      brandId: newProductLine.brandId,
      brandName: brandName,
      categoryId: newProductLine.categoryId,
      categoryName: categoryName,
      subcategoryId: newProductLine.subcategoryId,
      subcategoryName: subcategoryName,
    };

    setProductLines([...productLines, newProductLineItem]);
    setNewProductLine({
      name: "",
      description: "",
      familyId: "",
      brandId: "",
      categoryId: "",
      subcategoryId: "",
    });
    setShowAddProductLineDialog(false);
  };

  // Function to handle adding a new attribute
  const handleAddAttribute = () => {
    const familyName =
      families.find((f) => f.id === newAttribute.familyId)?.name || "";
    const brandName =
      brands.find((b) => b.id === newAttribute.brandId)?.name || "";
    const categoryName =
      categories.find((c) => c.id === newAttribute.categoryId)?.name || "";
    const subcategoryName =
      subcategories.find((s) => s.id === newAttribute.subcategoryId)?.name ||
      "";
    const productLineName =
      productLines.find((p) => p.id === newAttribute.productLineId)?.name || "";

    const newAttributeItem: Attribute = {
      id: Date.now().toString(),
      name: newAttribute.name,
      description: newAttribute.description,
      values: newAttribute.values,
      status: "Active",
      familyId: newAttribute.familyId,
      familyName: familyName,
      brandId: newAttribute.brandId,
      brandName: brandName,
      categoryId: newAttribute.categoryId,
      categoryName: categoryName,
      subcategoryId: newAttribute.subcategoryId,
      subcategoryName: subcategoryName,
      productLineId: newAttribute.productLineId,
      productLineName: productLineName,
    };

    setAttributes([...attributes, newAttributeItem]);
    setNewAttribute({
      name: "",
      description: "",
      values: [],
      familyId: "",
      brandId: "",
      categoryId: "",
      subcategoryId: "",
      productLineId: "",
    });
    setShowAddAttributeDialog(false);
  };

  // Function to handle updating an attribute
  const handleUpdateAttribute = () => {
    if (editingAttribute) {
      const familyName =
        families.find((f) => f.id === newAttribute.familyId)?.name || "";
      const brandName =
        brands.find((b) => b.id === newAttribute.brandId)?.name || "";
      const categoryName =
        categories.find((c) => c.id === newAttribute.categoryId)?.name || "";
      const subcategoryName =
        subcategories.find((s) => s.id === newAttribute.subcategoryId)?.name ||
        "";
      const productLineName =
        productLines.find((p) => p.id === newAttribute.productLineId)?.name ||
        "";

      const updatedAttributes = attributes.map((attribute) =>
        attribute.id === editingAttribute.id
          ? {
              ...attribute,
              name: newAttribute.name,
              description: newAttribute.description,
              values: newAttribute.values,
              familyId: newAttribute.familyId,
              familyName: familyName,
              brandId: newAttribute.brandId,
              brandName: brandName,
              categoryId: newAttribute.categoryId,
              categoryName: categoryName,
              subcategoryId: newAttribute.subcategoryId,
              subcategoryName: subcategoryName,
              productLineId: newAttribute.productLineId,
              productLineName: productLineName,
            }
          : attribute,
      );

      setAttributes(updatedAttributes);
      setEditingAttribute(null);
      setNewAttribute({
        name: "",
        description: "",
        values: [],
        familyId: "",
        brandId: "",
        categoryId: "",
        subcategoryId: "",
        productLineId: "",
      });
      setShowEditAttributeForm(false);
    }
  };

  // Function to handle updating a product line
  const handleUpdateProductLine = () => {
    if (editingProductLine) {
      const familyName =
        families.find((f) => f.id === newProductLine.familyId)?.name || "";
      const brandName =
        brands.find((b) => b.id === newProductLine.brandId)?.name || "";
      const categoryName =
        categories.find((c) => c.id === newProductLine.categoryId)?.name || "";
      const subcategoryName =
        subcategories.find((s) => s.id === newProductLine.subcategoryId)
          ?.name || "";

      const updatedProductLines = productLines.map((productLine) =>
        productLine.id === editingProductLine.id
          ? {
              ...productLine,
              name: newProductLine.name,
              description: newProductLine.description,
              familyId: newProductLine.familyId,
              familyName: familyName,
              brandId: newProductLine.brandId,
              brandName: brandName,
              categoryId: newProductLine.categoryId,
              categoryName: categoryName,
              subcategoryId: newProductLine.subcategoryId,
              subcategoryName: subcategoryName,
            }
          : productLine,
      );

      setProductLines(updatedProductLines);
      setEditingProductLine(null);
      setNewProductLine({
        name: "",
        description: "",
        familyId: "",
        brandId: "",
        categoryId: "",
        subcategoryId: "",
      });
      setShowEditProductLineForm(false);
    }
  };

  // Effect to set newFamily when editingFamily changes
  React.useEffect(() => {
    if (editingFamily) {
      setNewFamily({
        name: editingFamily.name,
        description: editingFamily.description || "",
      });
    }
  }, [editingFamily]);

  // Effect to set newBrand when editingBrand changes
  React.useEffect(() => {
    if (editingBrand) {
      setNewBrand({
        name: editingBrand.name,
        description: editingBrand.description || "",
        familyId: editingBrand.familyId || "",
      });
    }
  }, [editingBrand]);

  // Effect to set newCategory when editingCategory changes
  React.useEffect(() => {
    if (editingCategory) {
      setNewCategory({
        name: editingCategory.name,
        description: editingCategory.description || "",
        familyId: editingCategory.familyId || "",
        brandId: editingCategory.brandId || "",
      });
    }
  }, [editingCategory]);

  // Effect to set newSubcategory when editingSubcategory changes
  React.useEffect(() => {
    if (editingSubcategory) {
      setNewSubcategory({
        name: editingSubcategory.name,
        description: editingSubcategory.description || "",
        familyId: editingSubcategory.familyId || "",
        brandId: editingSubcategory.brandId || "",
        categoryId: editingSubcategory.categoryId || "",
      });
    }
  }, [editingSubcategory]);

  // Effect to set newProduct when editingProduct changes
  React.useEffect(() => {
    if (editingProduct) {
      setNewProduct({
        name: editingProduct.name,
        description: editingProduct.description || "",
        familyId: editingProduct.familyId || "",
        brandId: editingProduct.brandId || "",
        categoryId: editingProduct.categoryId || "",
        subcategoryId: editingProduct.subcategoryId || "",
        price: editingProduct.price || 0,
        sku: editingProduct.sku || "",
      });
    }
  }, [editingProduct]);

  // Effect to set newAttribute when editingAttribute changes
  React.useEffect(() => {
    if (editingAttribute) {
      setNewAttribute({
        name: editingAttribute.name,
        description: editingAttribute.description || "",
        values: editingAttribute.values || [],
        familyId: editingAttribute.familyId || "",
        brandId: editingAttribute.brandId || "",
        categoryId: editingAttribute.categoryId || "",
        subcategoryId: editingAttribute.subcategoryId || "",
        productLineId: editingAttribute.productLineId || "",
      });
    }
  }, [editingAttribute]);

  // Effect to set newProductLine when editingProductLine changes
  React.useEffect(() => {
    if (editingProductLine) {
      setNewProductLine({
        name: editingProductLine.name,
        description: editingProductLine.description || "",
        familyId: editingProductLine.familyId || "",
        brandId: editingProductLine.brandId || "",
        categoryId: editingProductLine.categoryId || "",
        subcategoryId: editingProductLine.subcategoryId || "",
      });
    }
  }, [editingProductLine]);

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

  // Handle search for attributes
  const handleAttributeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttributeSearchQuery(e.target.value);
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
            setEditingProduct={setEditingProduct}
            setShowEditProductForm={setShowEditProductForm}
          />
        );
      case "inventory":
        return (
          <InventoryTab
            products={products}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
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
            subcategorySearchQuery={subcategorySearchQuery}
            handleSubcategorySearch={(e) =>
              setSubcategorySearchQuery(e.target.value)
            }
            searchQuery={subcategorySearchQuery}
            setSearchQuery={setSubcategorySearchQuery}
            showAddSubcategoryDialog={showAddSubcategoryDialog}
            setShowAddSubcategoryDialog={setShowAddSubcategoryDialog}
            setEditingSubcategory={setEditingSubcategory}
            setShowEditSubcategoryForm={setShowEditSubcategoryForm}
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
            setEditingProductLine={setEditingProductLine}
            setShowEditProductLineForm={setShowEditProductLineForm}
          />
        );
      case "attributes":
        return (
          <AttributesTab
            attributes={attributes}
            attributeSearchQuery={attributeSearchQuery}
            handleAttributeSearch={handleAttributeSearch}
            setAttributes={setAttributes}
            setShowAddAttributeDialog={setShowAddAttributeDialog}
            setEditingAttribute={setEditingAttribute}
            setShowEditAttributeForm={setShowEditAttributeForm}
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
            setEditingProduct={setEditingProduct}
            setShowEditProductForm={setShowEditProductForm}
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
        newFamily={newFamily}
        setNewFamily={setNewFamily}
        handleAddFamily={handleAddFamily}
      />

      {/* Edit Family Dialog */}
      <FamilyDialog
        open={showEditFamilyForm}
        onOpenChange={setShowEditFamilyForm}
        newFamily={newFamily}
        setNewFamily={setNewFamily}
        handleAddFamily={handleAddFamily}
        isEdit={true}
        editingFamily={editingFamily}
        handleUpdateFamily={handleUpdateFamily}
      />

      {/* Brand Dialogs */}
      <BrandDialog
        open={showAddBrandDialog}
        onOpenChange={setShowAddBrandDialog}
        newBrand={newBrand}
        setNewBrand={setNewBrand}
        handleAddBrand={handleAddBrand}
        families={families}
      />

      <BrandDialog
        open={showEditBrandForm}
        onOpenChange={setShowEditBrandForm}
        newBrand={newBrand}
        setNewBrand={setNewBrand}
        handleAddBrand={handleAddBrand}
        isEdit={true}
        editingBrand={editingBrand}
        handleUpdateBrand={handleUpdateBrand}
        families={families}
      />

      {/* Category Dialogs */}
      <CategoryDialog
        open={showAddCategoryDialog}
        onOpenChange={setShowAddCategoryDialog}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        handleAddCategory={handleAddCategory}
        families={families}
        brands={brands}
      />

      <CategoryDialog
        open={showEditCategoryForm}
        onOpenChange={setShowEditCategoryForm}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        handleAddCategory={handleAddCategory}
        isEdit={true}
        editingCategory={editingCategory}
        handleUpdateCategory={handleUpdateCategory}
        families={families}
        brands={brands}
      />

      {/* Subcategory Dialogs */}
      <SubcategoryDialog
        open={showAddSubcategoryDialog}
        onOpenChange={setShowAddSubcategoryDialog}
        newSubcategory={newSubcategory}
        setNewSubcategory={setNewSubcategory}
        handleAddSubcategory={handleAddSubcategory}
        families={families}
        brands={brands}
        categories={categories}
      />

      <SubcategoryDialog
        open={showEditSubcategoryForm}
        onOpenChange={setShowEditSubcategoryForm}
        newSubcategory={newSubcategory}
        setNewSubcategory={setNewSubcategory}
        handleAddSubcategory={handleAddSubcategory}
        isEdit={true}
        editingSubcategory={editingSubcategory}
        handleUpdateSubcategory={handleUpdateSubcategory}
        families={families}
        brands={brands}
        categories={categories}
      />

      {/* Product Dialogs */}
      <ProductDialog
        open={showAddProductDialog}
        onOpenChange={setShowAddProductDialog}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        handleAddProduct={handleAddProduct}
        families={families}
        brands={brands}
        categories={categories}
        subcategories={subcategories}
      />

      <ProductDialog
        open={showEditProductForm}
        onOpenChange={setShowEditProductForm}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        handleAddProduct={handleAddProduct}
        isEdit={true}
        editingProduct={editingProduct}
        handleUpdateProduct={handleUpdateProduct}
        families={families}
        brands={brands}
        categories={categories}
        subcategories={subcategories}
      />

      {/* Product Line Dialogs */}
      <ProductLineDialog
        open={showAddProductLineDialog}
        onOpenChange={setShowAddProductLineDialog}
        newProductLine={newProductLine}
        setNewProductLine={setNewProductLine}
        handleAddProductLine={handleAddProductLine}
        families={families}
        brands={brands}
        categories={categories}
        subcategories={subcategories}
      />

      <ProductLineDialog
        open={showEditProductLineForm}
        onOpenChange={setShowEditProductLineForm}
        newProductLine={newProductLine}
        setNewProductLine={setNewProductLine}
        handleAddProductLine={handleAddProductLine}
        isEdit={true}
        editingProductLine={editingProductLine}
        handleUpdateProductLine={handleUpdateProductLine}
        families={families}
        brands={brands}
        categories={categories}
        subcategories={subcategories}
      />

      {/* Attribute Dialogs */}
      <AttributeDialog
        open={showAddAttributeDialog}
        onOpenChange={setShowAddAttributeDialog}
        newAttribute={newAttribute}
        setNewAttribute={setNewAttribute}
        handleAddAttribute={handleAddAttribute}
        families={families}
        brands={brands}
        categories={categories}
        subcategories={subcategories}
        productLines={productLines}
      />

      <AttributeDialog
        open={showEditAttributeForm}
        onOpenChange={setShowEditAttributeForm}
        newAttribute={newAttribute}
        setNewAttribute={setNewAttribute}
        handleAddAttribute={handleAddAttribute}
        isEdit={true}
        editingAttribute={editingAttribute}
        handleUpdateAttribute={handleUpdateAttribute}
        families={families}
        brands={brands}
        categories={categories}
        subcategories={subcategories}
        productLines={productLines}
      />

      <Footer />
    </div>
  );
};

export default CMSModule;
