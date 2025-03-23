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
      {selectedFamily === "1" && (
        <>
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
        </>
      )}

      {selectedFamily === "2" && (
        <>
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
            <Label>Care</Label>
            <Input
              placeholder="Care instructions"
              value={newProduct.metadata?.Care || ""}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  metadata: {
                    ...newProduct.metadata,
                    Care: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Fit</Label>
            <Input
              placeholder="Fit"
              value={newProduct.metadata?.Fit || ""}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  metadata: {
                    ...newProduct.metadata,
                    Fit: e.target.value,
                  },
                })
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MetadataTab;
