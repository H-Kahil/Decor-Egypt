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
import { Brand, Category, ProductFamily } from "../types";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newCategory: {
    name: string;
    brandId: string;
    description: string;
    familyId: string;
  };
  setNewCategory: React.Dispatch<
    React.SetStateAction<{
      name: string;
      brandId: string;
      description: string;
      familyId: string;
    }>
  >;
  handleAddCategory: () => void;
  isEdit?: boolean;
  editingCategory?: Category | null;
  handleUpdateCategory?: () => void;
  families: ProductFamily[];
  brands: Brand[];
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({
  open,
  onOpenChange,
  newCategory,
  setNewCategory,
  handleAddCategory,
  isEdit = false,
  editingCategory = null,
  handleUpdateCategory = () => {},
  families = [],
  brands = [],
}) => {
  // Filter brands based on selected family
  const filteredBrands = newCategory.familyId
    ? brands.filter((brand) => brand.familyId === newCategory.familyId)
    : brands;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the category details"
              : "Create a new category and associate it with a brand"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
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
            <Label htmlFor="category-family">Product Family</Label>
            <Select
              value={newCategory.familyId}
              onValueChange={(value) =>
                setNewCategory({ ...newCategory, familyId: value, brandId: "" })
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
            <Label htmlFor="category-brand">Brand</Label>
            <Select
              value={newCategory.brandId}
              onValueChange={(value) =>
                setNewCategory({ ...newCategory, brandId: value })
              }
              disabled={!newCategory.familyId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                {filteredBrands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name} ({brand.familyName})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-description">Description</Label>
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-violet-600 hover:bg-violet-700"
            onClick={() => {
              if (isEdit && handleUpdateCategory) {
                handleUpdateCategory();
              } else {
                handleAddCategory();
              }
              onOpenChange(false);
            }}
            disabled={
              !newCategory.name || !newCategory.brandId || !newCategory.familyId
            }
          >
            {isEdit ? "Update Category" : "Add Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
