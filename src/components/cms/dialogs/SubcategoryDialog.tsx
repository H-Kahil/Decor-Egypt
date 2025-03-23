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
import { Category, Brand, ProductFamily, Subcategory } from "../types";

interface SubcategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newSubcategory: {
    name: string;
    categoryId: string;
    description: string;
    familyId: string;
    brandId: string;
  };
  setNewSubcategory: React.Dispatch<
    React.SetStateAction<{
      name: string;
      categoryId: string;
      description: string;
      familyId: string;
      brandId: string;
    }>
  >;
  handleAddSubcategory: () => void;
  isEdit?: boolean;
  editingSubcategory?: Subcategory | null;
  handleUpdateSubcategory?: () => void;
  families: ProductFamily[];
  brands: Brand[];
  categories: Category[];
}

const SubcategoryDialog: React.FC<SubcategoryDialogProps> = ({
  open,
  onOpenChange,
  newSubcategory,
  setNewSubcategory,
  handleAddSubcategory,
  isEdit = false,
  editingSubcategory = null,
  handleUpdateSubcategory = () => {},
  families = [],
  brands = [],
  categories = [],
}) => {
  // Filter brands based on selected family
  const filteredBrands = newSubcategory.familyId
    ? brands.filter((brand) => brand.familyId === newSubcategory.familyId)
    : brands;

  // Filter categories based on selected brand
  const filteredCategories = newSubcategory.brandId
    ? categories.filter(
        (category) => category.brandId === newSubcategory.brandId,
      )
    : categories;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Subcategory" : "Add New Subcategory"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the subcategory details"
              : "Create a new subcategory and associate it with a category"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="subcategory-name">Subcategory Name</Label>
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
            <Label htmlFor="subcategory-family">Product Family</Label>
            <Select
              value={newSubcategory.familyId}
              onValueChange={(value) =>
                setNewSubcategory({
                  ...newSubcategory,
                  familyId: value,
                  brandId: "",
                  categoryId: "",
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
            <Label htmlFor="subcategory-brand">Brand</Label>
            <Select
              value={newSubcategory.brandId}
              onValueChange={(value) =>
                setNewSubcategory({
                  ...newSubcategory,
                  brandId: value,
                  categoryId: "",
                })
              }
              disabled={!newSubcategory.familyId}
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
            <Label htmlFor="subcategory-category">Category</Label>
            <Select
              value={newSubcategory.categoryId}
              onValueChange={(value) =>
                setNewSubcategory({
                  ...newSubcategory,
                  categoryId: value,
                })
              }
              disabled={!newSubcategory.brandId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name} ({category.brandName})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subcategory-description">Description</Label>
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-violet-600 hover:bg-violet-700"
            onClick={() => {
              if (isEdit && handleUpdateSubcategory) {
                handleUpdateSubcategory();
              } else {
                handleAddSubcategory();
              }
              onOpenChange(false);
            }}
            disabled={!newSubcategory.name || !newSubcategory.categoryId}
          >
            {isEdit ? "Update Subcategory" : "Add Subcategory"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubcategoryDialog;
