// Define interfaces for product hierarchy
export interface ProductFamily {
  id: string;
  name: string;
  description?: string;
  status: string;
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
  familyId?: string;
  familyName?: string;
  description?: string;
  status: string;
}

export interface Category {
  id: string;
  name: string;
  brandId?: string;
  brandName?: string;
  familyId?: string;
  familyName?: string;
  description?: string;
  status: string;
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
  categoryName?: string;
  brandId?: string;
  brandName?: string;
  familyId?: string;
  familyName?: string;
  description?: string;
  status: string;
}

export interface ProductLine {
  id: string;
  name: string;
  subcategoryId: string;
  subcategoryName?: string;
  categoryId?: string;
  categoryName?: string;
  brandId?: string;
  brandName?: string;
  familyId?: string;
  familyName?: string;
  description?: string;
  status: string;
}

export interface AttributeValue {
  id: string;
  value: string;
}

export interface Attribute {
  id: string;
  name: string;
  description?: string;
  values: AttributeValue[];
  familyId?: string;
  familyName?: string;
  brandId?: string;
  brandName?: string;
  categoryId?: string;
  categoryName?: string;
  subcategoryId?: string;
  subcategoryName?: string;
  productLineId?: string;
  productLineName?: string;
  status: string;
}

export interface ProductVariant {
  id: string;
  productId?: string;
  name?: string;
  attributes?: Record<string, string>;
  sku: string;
  price: number;
  stock?: number;
  images?: string[];
}

export interface Product {
  id: string;
  name: string;
  sku?: string;
  description?: string;
  price?: number;
  salePrice?: number;
  cost?: number;
  stockQuantity?: number;
  lineId?: string;
  lineName?: string;
  productLineId?: string;
  subcategoryId?: string;
  subcategoryName?: string;
  categoryId?: string;
  categoryName?: string;
  brandId?: string;
  brandName?: string;
  familyId?: string;
  familyName?: string;
  mainImage?: string;
  images?: string[];
  additionalImages?: string[];
  variants?: ProductVariant[];
  metadata?: Record<string, string>;
  status: string;
}

export interface Order {
  id: string;
  orderNumber?: string;
  customerName?: string;
  customerEmail?: string;
  orderDate?: string;
  totalAmount?: number;
  items?: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod?: string;
  customer?: string;
  date?: string;
  total?: number;
  status: string;
}
