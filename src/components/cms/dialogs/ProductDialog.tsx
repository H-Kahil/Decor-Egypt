import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Brand, Category, ProductFamily, Subcategory, Product } from "../types";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newProduct: {
    name: string;
    description: string;
    familyId: string;
    brandId: string;
    categoryId: string;
    subcategoryId: string;
    price: number;
    sku: string;
  };
  setNewProduct: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      familyId: string;
      brandId: string;
      categoryId: string;
      subcategoryId: string;
      price: number;
      sku: string;
    }>
  >;
  handleAddProduct: () => void;
  isEdit?: boolean;
  editingProduct?: Product | null;
  handleUpdateProduct?: () => void;
  families: ProductFamily[];
  brands: Brand[];
  categories: Category[];
  subcategories: Subcategory[];
}

const ProductDialog: React.FC<ProductDialogProps> = ({
  open,
  onOpenChange,
  newProduct,
  setNewProduct,
  handleAddProduct,
  isEdit = false,
  editingProduct = null,
  handleUpdateProduct = () => {},
  families = [],
  brands = [],
  categories = [],
  subcategories = [],
}) => {
  // Filter brands based on selected family
  const filteredBrands = newProduct.familyId
    ? brands.filter((brand) => brand.familyId === newProduct.familyId)
    : brands;

  // Filter categories based on selected brand
  const filteredCategories = newProduct.brandId
    ? categories.filter((category) => category.brandId === newProduct.brandId)
    : categories;

  // Filter subcategories based on selected category
  const filteredSubcategories = newProduct.categoryId
    ? subcategories.filter(
        (subcategory) => subcategory.categoryId === newProduct.categoryId,
      )
    : subcategories;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the product details"
              : "Create a new product and associate it with a subcategory"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              placeholder="Enter product name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-sku">SKU</Label>
            <Input
              id="product-sku"
              placeholder="Enter product SKU"
              value={newProduct.sku}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  sku: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-price">Price</Label>
            <Input
              id="product-price"
              type="number"
              placeholder="Enter product price"
              value={newProduct.price.toString()}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-family">Product Family</Label>
            <Select
              value={newProduct.familyId}
              onValueChange={(value) =>
                setNewProduct({
                  ...newProduct,
                  familyId: value,
                  brandId: "",
                  categoryId: "",
                  subcategoryId: "",
                })
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
            <Label htmlFor="product-brand">Brand</Label>
            <Select
              value={newProduct.brandId}
              onValueChange={(value) =>
                setNewProduct({
                  ...newProduct,
                  brandId: value,
                  categoryId: "",
                  subcategoryId: "",
                })
              }
              disabled={!newProduct.familyId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                {filteredBrands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-category">Category</Label>
            <Select
              value={newProduct.categoryId}
              onValueChange={(value) =>
                setNewProduct({
                  ...newProduct,
                  categoryId: value,
                  subcategoryId: "",
                })
              }
              disabled={!newProduct.brandId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-subcategory">Subcategory</Label>
            <Select
              value={newProduct.subcategoryId}
              onValueChange={(value) =>
                setNewProduct({
                  ...newProduct,
                  subcategoryId: value,
                })
              }
              disabled={!newProduct.categoryId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a subcategory" />
              </SelectTrigger>
              <SelectContent>
                {filteredSubcategories.map((subcategory) => (
                  <SelectItem key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              placeholder="Enter product description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: e.target.value,
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-violet-600 hover:bg-violet-700"
            onClick={() => {
              if (isEdit && handleUpdateProduct) {
                handleUpdateProduct();
              } else {
                handleAddProduct();
              }
              onOpenChange(false);
            }}
            disabled={
              !newProduct.name ||
              !newProduct.sku ||
              !newProduct.familyId ||
              !newProduct.brandId ||
              !newProduct.categoryId ||
              !newProduct.subcategoryId
            }
          >
            {isEdit ? "Update Product" : "Add Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
