import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ProductLine,
  ProductFamily,
  Brand,
  Category,
  Subcategory,
} from "../../types";

interface BasicInfoTabProps {
  newProduct: {
    name: string;
    description: string;
    lineId: string;
    mainImage: string;
    additionalImages: string[];
    metadata: Record<string, string>;
    familyId?: string;
    brandId?: string;
    categoryId?: string;
    subcategoryId?: string;
  };
  setNewProduct: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      lineId: string;
      mainImage: string;
      additionalImages: string[];
      metadata: Record<string, string>;
      familyId?: string;
      brandId?: string;
      categoryId?: string;
      subcategoryId?: string;
    }>
  >;
  productLines: ProductLine[];
  families?: ProductFamily[];
  brands?: Brand[];
  categories?: Category[];
  subcategories?: Subcategory[];
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
  newProduct,
  setNewProduct,
  productLines,
  families = [],
  brands = [],
  categories = [],
  subcategories = [],
}) => {
  // Filter brands based on selected family
  const filteredBrands = newProduct.familyId
    ? brands.filter((brand) => brand.familyId === newProduct.familyId)
    : [];

  // Filter categories based on selected brand
  const filteredCategories = newProduct.brandId
    ? categories.filter((category) => category.brandId === newProduct.brandId)
    : [];

  // Filter subcategories based on selected category
  const filteredSubcategories = newProduct.categoryId
    ? subcategories.filter(
        (subcategory) => subcategory.categoryId === newProduct.categoryId,
      )
    : [];

  // Filter product lines based on selected subcategory
  const filteredProductLines = newProduct.subcategoryId
    ? productLines.filter(
        (productLine) => productLine.subcategoryId === newProduct.subcategoryId,
      )
    : [];

  // Update product line when subcategory changes
  useEffect(() => {
    if (newProduct.subcategoryId && filteredProductLines.length > 0) {
      setNewProduct({
        ...newProduct,
        lineId: "", // Reset product line when subcategory changes
      });
    }
  }, [newProduct.subcategoryId]);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Product Hierarchy Selection - Left Column */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="product-family">Product Family</Label>
            <Select
              value={newProduct.familyId || ""}
              onValueChange={(value) =>
                setNewProduct({
                  ...newProduct,
                  familyId: value,
                  brandId: "",
                  categoryId: "",
                  subcategoryId: "",
                  lineId: "",
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
              value={newProduct.brandId || ""}
              onValueChange={(value) =>
                setNewProduct({
                  ...newProduct,
                  brandId: value,
                  categoryId: "",
                  subcategoryId: "",
                  lineId: "",
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
              value={newProduct.categoryId || ""}
              onValueChange={(value) =>
                setNewProduct({
                  ...newProduct,
                  categoryId: value,
                  subcategoryId: "",
                  lineId: "",
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
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="product-subcategory">Subcategory</Label>
            <Select
              value={newProduct.subcategoryId || ""}
              onValueChange={(value) =>
                setNewProduct({
                  ...newProduct,
                  subcategoryId: value,
                  lineId: "",
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
            <Label htmlFor="product-line">Product Model</Label>
            <Select
              value={newProduct.lineId}
              onValueChange={(value) =>
                setNewProduct({ ...newProduct, lineId: value })
              }
              disabled={!newProduct.subcategoryId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a product model" />
              </SelectTrigger>
              <SelectContent>
                {filteredProductLines.map((line) => (
                  <SelectItem key={line.id} value={line.id}>
                    {line.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              placeholder="Enter product name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </div>
        </div>
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
  );
};

export default BasicInfoTab;
