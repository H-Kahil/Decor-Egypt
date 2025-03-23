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
import { Subcategory } from "../types";

interface ProductLineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newProductLine: { name: string; subcategoryId: string; description: string };
  setNewProductLine: React.Dispatch<
    React.SetStateAction<{
      name: string;
      subcategoryId: string;
      description: string;
    }>
  >;
  handleAddProductLine: () => void;
  subcategories: Subcategory[];
}

const ProductLineDialog: React.FC<ProductLineDialogProps> = ({
  open,
  onOpenChange,
  newProductLine,
  setNewProductLine,
  handleAddProductLine,
  subcategories,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product Line/Model</DialogTitle>
          <DialogDescription>
            Create a new product line and associate it with a subcategory
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
            <Label htmlFor="product-line-subcategory">Subcategory</Label>
            <Select
              value={newProductLine.subcategoryId}
              onValueChange={(value) =>
                setNewProductLine({
                  ...newProductLine,
                  subcategoryId: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a subcategory" />
              </SelectTrigger>
              <SelectContent>
                {subcategories.map((subcategory) => (
                  <SelectItem key={subcategory.id} value={subcategory.id}>
                    {subcategory.name} ({subcategory.categoryName})
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
              handleAddProductLine();
              onOpenChange(false);
            }}
            disabled={!newProductLine.name || !newProductLine.subcategoryId}
          >
            Add Product Line
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductLineDialog;
