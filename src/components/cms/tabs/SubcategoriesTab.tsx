import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchBar from "../SearchBar";
import AddButton from "../AddButton";
import StatusBadge from "../StatusBadge";
import ActionButtons from "../ActionButtons";
import { Subcategory } from "../types";

interface SubcategoriesTabProps {
  subcategories: Subcategory[];
  subcategorySearchQuery?: string;
  handleSubcategorySearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowAddSubcategoryDialog: (show: boolean) => void;
  setEditingSubcategory: (subcategory: Subcategory | null) => void;
  setShowEditSubcategoryForm: (show: boolean) => void;
  setSubcategories: React.Dispatch<React.SetStateAction<Subcategory[]>>;
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  showAddSubcategoryDialog?: boolean;
}

const SubcategoriesTab: React.FC<SubcategoriesTabProps> = ({
  subcategories,
  subcategorySearchQuery = "",
  handleSubcategorySearch,
  setShowAddSubcategoryDialog,
  setEditingSubcategory,
  setShowEditSubcategoryForm,
  setSubcategories,
  searchQuery,
  setSearchQuery,
  showAddSubcategoryDialog,
}) => {
  // Use either subcategorySearchQuery or searchQuery for backward compatibility
  const effectiveSearchQuery = subcategorySearchQuery || searchQuery || "";

  // Create an effective search handler for backward compatibility
  const effectiveSearchHandler =
    handleSubcategorySearch ||
    (setSearchQuery
      ? (e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
      : undefined);

  // Filter subcategories based on search query with null checks
  const filteredSubcategories = subcategories.filter(
    (subcategory) =>
      (subcategory.name || "")
        .toLowerCase()
        .includes(effectiveSearchQuery.toLowerCase()) ||
      (subcategory.categoryName || "")
        .toLowerCase()
        .includes(effectiveSearchQuery.toLowerCase()) ||
      (subcategory.brandName || "")
        .toLowerCase()
        .includes(effectiveSearchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SearchBar
          placeholder="Search subcategories..."
          value={effectiveSearchQuery}
          onChange={effectiveSearchHandler}
        />
        <AddButton
          label="Add Subcategory"
          onClick={() => setShowAddSubcategoryDialog(true)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Family</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSubcategories.map((subcategory) => (
            <TableRow key={subcategory.id}>
              <TableCell className="font-medium">{subcategory.name}</TableCell>
              <TableCell>{subcategory.categoryName}</TableCell>
              <TableCell>{subcategory.brandName}</TableCell>
              <TableCell>{subcategory.familyName}</TableCell>
              <TableCell>
                <StatusBadge status={subcategory.status} />
              </TableCell>
              <TableCell className="text-right">
                <ActionButtons
                  showView={false}
                  onEdit={() => {
                    setEditingSubcategory(subcategory);
                    setShowEditSubcategoryForm(true);
                  }}
                  onDelete={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to delete ${subcategory.name}?`,
                      )
                    ) {
                      setSubcategories(
                        subcategories.filter((s) => s.id !== subcategory.id),
                      );
                    }
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubcategoriesTab;
