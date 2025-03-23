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
import { Category } from "../types";

interface CategoriesTabProps {
  categories: Category[];
  categorySearchQuery?: string;
  handleCategorySearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowAddCategoryDialog: (show: boolean) => void;
  setEditingCategory: (category: Category | null) => void;
  setShowEditCategoryForm: (show: boolean) => void;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  // For backward compatibility
  searchQuery?: string;
  setSearchQuery?: (value: string) => void;
}

const CategoriesTab: React.FC<CategoriesTabProps> = ({
  categories = [],
  categorySearchQuery = "",
  handleCategorySearch,
  setShowAddCategoryDialog,
  setEditingCategory,
  setShowEditCategoryForm,
  setCategories,
  // For backward compatibility
  searchQuery,
  setSearchQuery,
}) => {
  // Use categorySearchQuery if available, otherwise fall back to searchQuery
  const effectiveSearchQuery = categorySearchQuery || searchQuery || "";

  // Create an effective search handler
  const effectiveSearchHandler =
    handleCategorySearch ||
    (setSearchQuery
      ? (e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
      : undefined);

  // Filter categories based on search query
  const filteredCategories = categories.filter(
    (category) =>
      (category.name?.toLowerCase() || "").includes(
        effectiveSearchQuery.toLowerCase(),
      ) ||
      (category.brandName?.toLowerCase() || "").includes(
        effectiveSearchQuery.toLowerCase(),
      ) ||
      (category.familyName?.toLowerCase() || "").includes(
        effectiveSearchQuery.toLowerCase(),
      ) ||
      (category.description || "")
        .toLowerCase()
        .includes(effectiveSearchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <div className="flex space-x-4">
          <SearchBar
            placeholder="Search categories..."
            value={effectiveSearchQuery}
            onChange={effectiveSearchHandler}
          />
          <AddButton
            label="Add Category"
            onClick={() => setShowAddCategoryDialog(true)}
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Family</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.brandName}</TableCell>
              <TableCell>{category.familyName}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>
                <StatusBadge status={category.status} />
              </TableCell>
              <TableCell className="text-right">
                <ActionButtons
                  showView={false}
                  onEdit={() => {
                    setEditingCategory(category);
                    setShowEditCategoryForm(true);
                  }}
                  onDelete={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to delete ${category.name}?`,
                      )
                    ) {
                      setCategories(
                        categories.filter((c) => c.id !== category.id),
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

export default CategoriesTab;
