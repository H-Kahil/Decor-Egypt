import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VariantsTabProps {
  productVariants: Array<{
    attributes: Record<string, string>;
    sku: string;
    price: string;
    stock: string;
  }>;
  selectedFamily: string;
  addVariant: () => void;
  removeVariant: (index: number) => void;
  updateVariantAttribute: (
    index: number,
    attribute: string,
    value: string,
  ) => void;
  updateVariantField: (index: number, field: string, value: string) => void;
}

const VariantsTab: React.FC<VariantsTabProps> = ({
  productVariants,
  selectedFamily,
  addVariant,
  removeVariant,
  updateVariantAttribute,
  updateVariantField,
}) => {
  // Predefined options for select dropdowns
  const colorOptions = [
    "Black",
    "White",
    "Grey",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Orange",
    "Pink",
    "Brown",
    "Silver",
    "Gold",
  ];

  const memoryOptions = ["64GB", "128GB", "256GB", "512GB", "1TB", "2TB"];

  // Generate SKU based on product name and variant attributes
  const generateSKU = (index: number, productName: string) => {
    const color = productVariants[index].attributes["Color"] || "";
    const memory = productVariants[index].attributes["Memory"] || "";

    if (productName && color && memory) {
      const newSku = `${productName.replace(/\s+/g, "-").toLowerCase()}-${color.toLowerCase()}-${memory.toLowerCase()}`;
      updateVariantField(index, "sku", newSku);
    }
  };

  return (
    <div className="space-y-6">
      {productVariants.map((variant, index) => (
        <Card key={index} className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Variant {index + 1}</h4>
            {index > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-500"
                onClick={() => removeVariant(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Color selection */}
            <div className="space-y-2">
              <Label>Color</Label>
              <Select
                value={variant.attributes["Color"] || ""}
                onValueChange={(value) => {
                  updateVariantAttribute(index, "Color", value);
                  // Auto-generate SKU
                  const productName =
                    document.getElementById("product-name")?.value || "";
                  generateSKU(index, productName);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Memory selection */}
            <div className="space-y-2">
              <Label>Memory/Storage</Label>
              <Select
                value={variant.attributes["Memory"] || ""}
                onValueChange={(value) => {
                  updateVariantAttribute(index, "Memory", value);
                  // Auto-generate SKU
                  const productName =
                    document.getElementById("product-name")?.value || "";
                  generateSKU(index, productName);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select memory size" />
                </SelectTrigger>
                <SelectContent>
                  {memoryOptions.map((memory) => (
                    <SelectItem key={memory} value={memory}>
                      {memory}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>SKU</Label>
              <Input
                placeholder="Auto-generated SKU"
                value={variant.sku}
                onChange={(e) =>
                  updateVariantField(index, "sku", e.target.value)
                }
                disabled={true}
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: {variant.attributes["Model"] || "model"}-
                {variant.attributes["Color"] || "color"}-
                {variant.attributes["Memory"] || "memory"}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                placeholder="Price"
                value={variant.price}
                onChange={(e) =>
                  updateVariantField(index, "price", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Stock</Label>
              <Input
                type="number"
                placeholder="Stock"
                value={variant.stock}
                onChange={(e) =>
                  updateVariantField(index, "stock", e.target.value)
                }
              />
            </div>
          </div>
        </Card>
      ))}

      <Button variant="outline" onClick={addVariant} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Variant
      </Button>
    </div>
  );
};

export default VariantsTab;
