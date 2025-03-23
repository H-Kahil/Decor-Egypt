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
import {
  Brand,
  Category,
  ProductFamily,
  Subcategory,
  ProductLine,
} from "../types";

interface ProductLineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newProductLine: {
    name: string;
    description: string;
    familyId: string;
    brandId: string;
    categoryId: string;
    subcategoryId: string;
  };
  setNewProductLine: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      familyId: string;
      brandId: string;
      categoryId: string;
      subcategoryId: string;
    }>
  >;
  handleAddProductLine: () => void;
  isEdit?: boolean;
  editingProductLine?: ProductLine | null;
  handleUpdateProductLine?: () => void;
  families: ProductFamily[];
  brands: Brand[];
  categories: Category[];
  subcategories: Subcategory[];
}

const ProductLineDialog: React.FC<ProductLineDialogProps> = ({
  open,
  onOpenChange,
  newProductLine,
  setNewProductLine,
  handleAddProductLine,
  isEdit = false,
  editingProductLine = null,
  handleUpdateProductLine = () => {},
  families = [],
  brands = [],
  categories = [],
  subcategories = [],
}) => {
  // Filter brands based on selected family
  const filteredBrands = newProductLine.familyId
    ? brands.filter((brand) => brand.familyId === newProductLine.familyId)
    : brands;

  // Filter categories based on selected brand
  const filteredCategories = newProductLine.brandId
    ? categories.filter(
        (category) => category.brandId === newProductLine.brandId,
      )
    : categories;

  // Filter subcategories based on selected category
  const filteredSubcategories = newProductLine.categoryId
    ? subcategories.filter(
        (subcategory) => subcategory.categoryId === newProductLine.categoryId,
      )
    : subcategories;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Product Line" : "Add New Product Line"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the product line details"
              : "Create a new product line and associate it with a subcategory"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="product-line-name">Product Line Name</Label>
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
            <Label htmlFor="product-family">Product Family</Label>
            <Select
              value={newProductLine.familyId}
              onValueChange={(value) =>
                setNewProductLine({
                  ...newProductLine,
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
              value={newProductLine.brandId}
              onValueChange={(value) =>
                setNewProductLine({
                  ...newProductLine,
                  brandId: value,
                  categoryId: "",
                  subcategoryId: "",
                })
              }
              disabled={!newProductLine.familyId}
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
              value={newProductLine.categoryId}
              onValueChange={(value) =>
                setNewProductLine({
                  ...newProductLine,
                  categoryId: value,
                  subcategoryId: "",
                })
              }
              disabled={!newProductLine.brandId}
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
              value={newProductLine.subcategoryId}
              onValueChange={(value) =>
                setNewProductLine({
                  ...newProductLine,
                  subcategoryId: value,
                })
              }
              disabled={!newProductLine.categoryId}
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
            <Label htmlFor="product-line-description">Description</Label>
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-violet-600 hover:bg-violet-700"
            onClick={() => {
              if (isEdit && handleUpdateProductLine) {
                handleUpdateProductLine();
              } else {
                handleAddProductLine();
              }
              onOpenChange(false);
            }}
            disabled={
              !newProductLine.name ||
              !newProductLine.familyId ||
              !newProductLine.brandId ||
              !newProductLine.categoryId ||
              !newProductLine.subcategoryId
            }
          >
            {isEdit ? "Update Product Line" : "Add Product Line"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductLineDialog;
