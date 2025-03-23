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
import { Category } from "../types";

interface SubcategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newSubcategory: { name: string; categoryId: string; description: string };
  setNewSubcategory: React.Dispatch<
    React.SetStateAction<{
      name: string;
      categoryId: string;
      description: string;
    }>
  >;
  handleAddSubcategory: () => void;
  categories: Category[];
}

const SubcategoryDialog: React.FC<SubcategoryDialogProps> = ({
  open,
  onOpenChange,
  newSubcategory,
  setNewSubcategory,
  handleAddSubcategory,
  categories,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Subcategory</DialogTitle>
          <DialogDescription>
            Create a new subcategory and associate it with a category
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
            <Label htmlFor="subcategory-category">Category</Label>
            <Select
              value={newSubcategory.categoryId}
              onValueChange={(value) =>
                setNewSubcategory({
                  ...newSubcategory,
                  categoryId: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
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
              handleAddSubcategory();
              onOpenChange(false);
            }}
            disabled={!newSubcategory.name || !newSubcategory.categoryId}
          >
            Add Subcategory
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubcategoryDialog;
