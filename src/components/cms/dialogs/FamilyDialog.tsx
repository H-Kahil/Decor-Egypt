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

interface FamilyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newFamily: { name: string; description: string };
  setNewFamily: React.Dispatch<
    React.SetStateAction<{ name: string; description: string }>
  >;
  handleAddFamily: () => void;
}

const FamilyDialog: React.FC<FamilyDialogProps> = ({
  open,
  onOpenChange,
  newFamily,
  setNewFamily,
  handleAddFamily,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product Family</DialogTitle>
          <DialogDescription>
            Create a new top-level product family (e.g., Mobile, Apparel)
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="family-name">Family Name</Label>
            <Input
              id="family-name"
              placeholder="Enter family name"
              value={newFamily.name}
              onChange={(e) =>
                setNewFamily({ ...newFamily, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="family-description">Description</Label>
            <Textarea
              id="family-description"
              placeholder="Enter family description"
              value={newFamily.description}
              onChange={(e) =>
                setNewFamily({
                  ...newFamily,
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
              handleAddFamily();
              onOpenChange(false);
            }}
            disabled={!newFamily.name}
          >
            Add Family
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FamilyDialog;
