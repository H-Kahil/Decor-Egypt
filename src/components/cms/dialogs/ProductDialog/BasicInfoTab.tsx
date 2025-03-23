import React from "react";
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
import { ProductLine } from "../../types";

interface BasicInfoTabProps {
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
  productLines: ProductLine[];
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
  newProduct,
  setNewProduct,
  productLines,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
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
        <div className="space-y-2">
          <Label htmlFor="product-line">Product Line</Label>
          <Select
            value={newProduct.lineId}
            onValueChange={(value) =>
              setNewProduct({ ...newProduct, lineId: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a product line" />
            </SelectTrigger>
            <SelectContent>
              {productLines.map((line) => (
                <SelectItem key={line.id} value={line.id}>
                  {line.name} ({line.brandName})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 col-span-2">
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
    </div>
  );
};

export default BasicInfoTab;
