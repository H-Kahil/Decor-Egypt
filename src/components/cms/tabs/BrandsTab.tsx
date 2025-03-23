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
import { Brand } from "../types";

interface BrandsTabProps {
  brands: Brand[];
  brandSearchQuery?: string;
  handleBrandSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowAddBrandDialog: (show: boolean) => void;
  setEditingBrand: (brand: Brand | null) => void;
  setShowEditBrandForm: (show: boolean) => void;
  setBrands: React.Dispatch<React.SetStateAction<Brand[]>>;
  // For backward compatibility
  searchQuery?: string;
  setSearchQuery?: (value: string) => void;
}

const BrandsTab: React.FC<BrandsTabProps> = ({
  brands = [],
  brandSearchQuery = "",
  handleBrandSearch,
  setShowAddBrandDialog,
  setEditingBrand,
  setShowEditBrandForm,
  setBrands,
  // For backward compatibility
  searchQuery,
  setSearchQuery,
}) => {
  // Use brandSearchQuery if available, otherwise fall back to searchQuery
  const effectiveSearchQuery = brandSearchQuery || searchQuery || "";

  // Create an effective search handler
  const effectiveSearchHandler =
    handleBrandSearch ||
    (setSearchQuery
      ? (e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
      : undefined);

  // Filter brands based on search query
  const filteredBrands = brands.filter(
    (brand) =>
      (brand.name?.toLowerCase() || "").includes(
        effectiveSearchQuery.toLowerCase(),
      ) ||
      (brand.familyName?.toLowerCase() || "").includes(
        effectiveSearchQuery.toLowerCase(),
      ) ||
      (brand.description || "")
        .toLowerCase()
        .includes(effectiveSearchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SearchBar
          placeholder="Search brands..."
          value={effectiveSearchQuery}
          onChange={effectiveSearchHandler}
        />
        <AddButton
          label="Add Brand"
          onClick={() => setShowAddBrandDialog(true)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Family</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBrands.map((brand) => (
            <TableRow key={brand.id}>
              <TableCell className="font-medium">{brand.name}</TableCell>
              <TableCell>{brand.familyName}</TableCell>
              <TableCell>{brand.description}</TableCell>
              <TableCell>
                <StatusBadge status={brand.status} />
              </TableCell>
              <TableCell className="text-right">
                <ActionButtons
                  showView={false}
                  onEdit={() => {
                    setEditingBrand(brand);
                    setShowEditBrandForm(true);
                  }}
                  onDelete={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to delete ${brand.name}?`,
                      )
                    ) {
                      setBrands(brands.filter((b) => b.id !== brand.id));
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

export default BrandsTab;
