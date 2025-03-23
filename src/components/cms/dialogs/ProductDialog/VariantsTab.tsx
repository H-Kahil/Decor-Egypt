import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

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
            {/* Attributes based on family */}
            {selectedFamily === "1" && (
              <>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <Input
                    placeholder="Color"
                    value={variant.attributes["Color"] || ""}
                    onChange={(e) =>
                      updateVariantAttribute(index, "Color", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Memory</Label>
                  <Input
                    placeholder="Memory"
                    value={variant.attributes["Memory"] || ""}
                    onChange={(e) =>
                      updateVariantAttribute(index, "Memory", e.target.value)
                    }
                  />
                </div>
              </>
            )}

            {selectedFamily === "2" && (
              <>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <Input
                    placeholder="Color"
                    value={variant.attributes["Color"] || ""}
                    onChange={(e) =>
                      updateVariantAttribute(index, "Color", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Size</Label>
                  <Input
                    placeholder="Size"
                    value={variant.attributes["Size"] || ""}
                    onChange={(e) =>
                      updateVariantAttribute(index, "Size", e.target.value)
                    }
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label>SKU</Label>
              <Input
                placeholder="SKU"
                value={variant.sku}
                onChange={(e) =>
                  updateVariantField(index, "sku", e.target.value)
                }
                disabled={true}
              />
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
