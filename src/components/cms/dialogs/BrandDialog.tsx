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
import { Brand, ProductFamily } from "../types";

interface BrandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newBrand: { name: string; familyId: string; description: string };
  setNewBrand: React.Dispatch<
    React.SetStateAction<{
      name: string;
      familyId: string;
      description: string;
    }>
  >;
  handleAddBrand: () => void;
  isEdit?: boolean;
  editingBrand?: Brand | null;
  handleUpdateBrand?: () => void;
  families: ProductFamily[];
}

const BrandDialog: React.FC<BrandDialogProps> = ({
  open,
  onOpenChange,
  newBrand,
  setNewBrand,
  handleAddBrand,
  isEdit = false,
  editingBrand = null,
  handleUpdateBrand = () => {},
  families,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Brand" : "Add New Brand"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the brand details"
              : "Create a new brand and associate it with a product family"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="brand-name">Brand Name</Label>
            <Input
              id="brand-name"
              placeholder="Enter brand name"
              value={newBrand.name}
              onChange={(e) =>
                setNewBrand({ ...newBrand, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand-family">Product Family</Label>
            <Select
              value={newBrand.familyId}
              onValueChange={(value) =>
                setNewBrand({ ...newBrand, familyId: value })
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
            <Label htmlFor="brand-description">Description</Label>
            <Textarea
              id="brand-description"
              placeholder="Enter brand description"
              value={newBrand.description}
              onChange={(e) =>
                setNewBrand({
                  ...newBrand,
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
              if (isEdit && handleUpdateBrand) {
                handleUpdateBrand();
              } else {
                handleAddBrand();
              }
              onOpenChange(false);
            }}
            disabled={!newBrand.name || !newBrand.familyId}
          >
            {isEdit ? "Update Brand" : "Add Brand"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BrandDialog;
