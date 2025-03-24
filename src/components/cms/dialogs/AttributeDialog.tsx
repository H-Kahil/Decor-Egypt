import React, { useState } from "react";
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
  Attribute,
  AttributeValue,
} from "../types";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AttributeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newAttribute: {
    name: string;
    description: string;
    values: AttributeValue[];
    familyId: string;
    brandId: string;
    categoryId: string;
    subcategoryId: string;
    productLineId: string;
  };
  setNewAttribute: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      values: AttributeValue[];
      familyId: string;
      brandId: string;
      categoryId: string;
      subcategoryId: string;
      productLineId: string;
    }>
  >;
  handleAddAttribute: () => void;
  isEdit?: boolean;
  editingAttribute?: Attribute | null;
  handleUpdateAttribute?: () => void;
  families: ProductFamily[];
  brands: Brand[];
  categories: Category[];
  subcategories: Subcategory[];
  productLines: ProductLine[];
}

const AttributeDialog: React.FC<AttributeDialogProps> = ({
  open,
  onOpenChange,
  newAttribute,
  setNewAttribute,
  handleAddAttribute,
  isEdit = false,
  editingAttribute = null,
  handleUpdateAttribute = () => {},
  families = [],
  brands = [],
  categories = [],
  subcategories = [],
  productLines = [],
}) => {
  const [newValue, setNewValue] = useState("");

  // Filter brands based on selected family
  const filteredBrands = newAttribute.familyId
    ? brands.filter((brand) => brand.familyId === newAttribute.familyId)
    : brands;

  // Filter categories based on selected brand
  const filteredCategories = newAttribute.brandId
    ? categories.filter((category) => category.brandId === newAttribute.brandId)
    : categories;

  // Filter subcategories based on selected category
  const filteredSubcategories = newAttribute.categoryId
    ? subcategories.filter(
        (subcategory) => subcategory.categoryId === newAttribute.categoryId,
      )
    : subcategories;

  // Filter product lines based on selected subcategory
  const filteredProductLines = newAttribute.subcategoryId
    ? productLines.filter(
        (productLine) =>
          productLine.subcategoryId === newAttribute.subcategoryId,
      )
    : productLines;

  // Function to handle direct subcategory selection
  const handleSubcategorySelect = (subcategoryId: string) => {
    const selectedSubcategory = subcategories.find(
      (sub) => sub.id === subcategoryId,
    );
    if (!selectedSubcategory) return;

    const selectedCategory = categories.find(
      (cat) => cat.id === selectedSubcategory.categoryId,
    );
    if (!selectedCategory) return;

    const selectedBrand = brands.find(
      (brand) => brand.id === selectedCategory.brandId,
    );
    if (!selectedBrand) return;

    setNewAttribute({
      ...newAttribute,
      subcategoryId,
      categoryId: selectedCategory.id,
      brandId: selectedBrand.id,
      familyId: selectedBrand.familyId || "",
      productLineId: "", // Reset product line when subcategory changes
    });
  };

  // Function to add a new attribute value
  const addAttributeValue = () => {
    if (!newValue.trim()) return;

    // Check for duplicates
    if (
      newAttribute.values.some(
        (v) => v.value.toLowerCase() === newValue.toLowerCase(),
      )
    ) {
      alert("This value already exists");
      return;
    }

    const newAttributeValue: AttributeValue = {
      id: Date.now().toString(),
      value: newValue.trim(),
    };

    setNewAttribute({
      ...newAttribute,
      values: [...newAttribute.values, newAttributeValue],
    });

    setNewValue("");
  };

  // Function to remove an attribute value
  const removeAttributeValue = (id: string) => {
    setNewAttribute({
      ...newAttribute,
      values: newAttribute.values.filter((value) => value.id !== id),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] mx-auto p-6 bg-white rounded-lg">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold">
            {isEdit ? "Edit Attribute" : "Add New Attribute"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {isEdit
              ? "Update the attribute details and values"
              : "Create a new attribute and add values to it"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-8 py-4">
          {/* Left Column - Hierarchy Selection */}
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="attribute-family" className="font-medium">
                Product Family
              </Label>
              <Select
                value={newAttribute.familyId}
                onValueChange={(value) =>
                  setNewAttribute({
                    ...newAttribute,
                    familyId: value,
                    brandId: "",
                    categoryId: "",
                    subcategoryId: "",
                    productLineId: "",
                  })
                }
              >
                <SelectTrigger className="w-full border rounded-md">
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
              <Label htmlFor="attribute-brand" className="font-medium">
                Brand
              </Label>
              <Select
                value={newAttribute.brandId}
                onValueChange={(value) =>
                  setNewAttribute({
                    ...newAttribute,
                    brandId: value,
                    categoryId: "",
                    subcategoryId: "",
                    productLineId: "",
                  })
                }
                disabled={!newAttribute.familyId}
              >
                <SelectTrigger className="w-full border rounded-md">
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
              <Label htmlFor="attribute-category" className="font-medium">
                Category
              </Label>
              <Select
                value={newAttribute.categoryId}
                onValueChange={(value) =>
                  setNewAttribute({
                    ...newAttribute,
                    categoryId: value,
                    subcategoryId: "",
                    productLineId: "",
                  })
                }
                disabled={!newAttribute.brandId}
              >
                <SelectTrigger className="w-full border rounded-md">
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
              <Label htmlFor="attribute-subcategory" className="font-medium">
                Subcategory
              </Label>
              <Select
                value={newAttribute.subcategoryId}
                onValueChange={(value) =>
                  setNewAttribute({
                    ...newAttribute,
                    subcategoryId: value,
                    productLineId: "",
                  })
                }
                disabled={!newAttribute.categoryId}
              >
                <SelectTrigger className="w-full border rounded-md">
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
              <Label htmlFor="attribute-product-line" className="font-medium">
                Product Model
              </Label>
              <Select
                value={newAttribute.productLineId}
                onValueChange={(value) =>
                  setNewAttribute({
                    ...newAttribute,
                    productLineId: value,
                  })
                }
                disabled={!newAttribute.subcategoryId}
              >
                <SelectTrigger className="w-full border rounded-md">
                  <SelectValue placeholder="Select a product model" />
                </SelectTrigger>
                <SelectContent>
                  {filteredProductLines.map((productLine) => (
                    <SelectItem key={productLine.id} value={productLine.id}>
                      {productLine.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Column - Attribute Details */}
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="attribute-name" className="font-medium">
                Attribute Name
              </Label>
              <Input
                id="attribute-name"
                placeholder="Enter attribute name (e.g., Color, Size)"
                value={newAttribute.name}
                onChange={(e) =>
                  setNewAttribute({
                    ...newAttribute,
                    name: e.target.value,
                  })
                }
                className="w-full border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attribute-description" className="font-medium">
                Description
              </Label>
              <Textarea
                id="attribute-description"
                placeholder="Enter attribute description"
                value={newAttribute.description}
                onChange={(e) =>
                  setNewAttribute({
                    ...newAttribute,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded-md min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attribute-values" className="font-medium">
                Attribute Values
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="attribute-values"
                  placeholder="Enter a value (e.g., Red, 64GB)"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addAttributeValue();
                    }
                  }}
                  className="w-full border rounded-md"
                />
                <Button
                  type="button"
                  onClick={addAttributeValue}
                  size="icon"
                  className="bg-violet-600 hover:bg-violet-700 rounded-md"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {newAttribute.values.map((value) => (
                  <Badge
                    key={value.id}
                    variant="secondary"
                    className="flex items-center gap-1 px-3 py-1"
                  >
                    {value.value}
                    <button
                      onClick={() => removeAttributeValue(value.id)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              {newAttribute.values.length === 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  No values added yet. Add at least one value.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="hidden">
          <div className="space-y-2">
            <Label htmlFor="attribute-subcategory-direct">
              Select Subcategory Directly
            </Label>
            <Select
              value={newAttribute.subcategoryId}
              onValueChange={handleSubcategorySelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a subcategory" />
              </SelectTrigger>
              <SelectContent>
                {subcategories.map((subcategory) => (
                  <SelectItem key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Selecting a subcategory will automatically fill the hierarchy
            </p>
          </div>
        </div>
        <DialogFooter className="mt-6 space-x-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-md"
          >
            Cancel
          </Button>
          <Button
            className="bg-violet-600 hover:bg-violet-700 rounded-md"
            onClick={() => {
              if (isEdit && handleUpdateAttribute) {
                handleUpdateAttribute();
              } else {
                handleAddAttribute();
              }
              onOpenChange(false);
            }}
            disabled={
              !newAttribute.name ||
              newAttribute.values.length === 0 ||
              !newAttribute.subcategoryId
            }
          >
            {isEdit ? "Update Attribute" : "Add Attribute"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AttributeDialog;
