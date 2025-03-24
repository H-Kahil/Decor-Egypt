import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MetadataTabProps {
  newProduct: {
    name: string;
    description: string;
    lineId: string;
    mainImage: string;
    additionalImages: string[];
    metadata: Record<string, string>;
  };
  setNewProduct: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      lineId: string;
      mainImage: string;
      additionalImages: string[];
      metadata: Record<string, string>;
    }>
  >;
  selectedFamily: string;
}

const MetadataTab: React.FC<MetadataTabProps> = ({
  newProduct,
  setNewProduct,
  selectedFamily,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Material</Label>
        <Input
          placeholder="Material"
          value={newProduct.metadata?.Material || ""}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              metadata: {
                ...newProduct.metadata,
                Material: e.target.value,
              },
            })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Weight</Label>
        <Input
          placeholder="Weight"
          value={newProduct.metadata?.Weight || ""}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              metadata: {
                ...newProduct.metadata,
                Weight: e.target.value,
              },
            })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Dimensions</Label>
        <Input
          placeholder="Dimensions"
          value={newProduct.metadata?.Dimensions || ""}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              metadata: {
                ...newProduct.metadata,
                Dimensions: e.target.value,
              },
            })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>SKU Format</Label>
        <Input
          placeholder="SKU Format"
          value="{product_model}-{color}-{memory}"
          disabled={true}
        />
        <p className="text-xs text-gray-500 mt-1">
          This is the format used for automatic SKU generation
        </p>
      </div>
    </div>
  );
};

export default MetadataTab;
