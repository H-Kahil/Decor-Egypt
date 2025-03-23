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
import { ProductFamily } from "../types";

interface FamiliesTabProps {
  families: ProductFamily[];
  familySearchQuery?: string;
  handleFamilySearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowAddFamilyDialog: (show: boolean) => void;
  setEditingFamily?: (family: ProductFamily | null) => void;
  setShowEditFamilyForm?: (show: boolean) => void;
  setFamilies: React.Dispatch<React.SetStateAction<ProductFamily[]>>;
  // For backward compatibility with CMSModule.tsx
  searchQuery?: string;
  setSearchQuery?: (value: string) => void;
}

const FamiliesTab: React.FC<FamiliesTabProps> = ({
  families,
  familySearchQuery = "",
  handleFamilySearch,
  setShowAddFamilyDialog,
  setEditingFamily = () => {},
  setShowEditFamilyForm = () => {},
  setFamilies,
  // Handle backward compatibility
  searchQuery,
  setSearchQuery,
}) => {
  // Use either familySearchQuery or searchQuery (for backward compatibility)
  const effectiveSearchQuery = familySearchQuery || searchQuery || "";

  // Create a handler that works with either the new or old prop names
  const effectiveSearchHandler =
    handleFamilySearch ||
    (setSearchQuery
      ? (e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
      : () => {});

  // Filter families based on search query
  const filteredFamilies = families.filter(
    (family) =>
      family.name.toLowerCase().includes(effectiveSearchQuery.toLowerCase()) ||
      (family.description || "")
        .toLowerCase()
        .includes(effectiveSearchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SearchBar
          placeholder="Search families..."
          value={effectiveSearchQuery}
          onChange={effectiveSearchHandler}
        />
        <AddButton
          label="Add Family"
          onClick={() => setShowAddFamilyDialog(true)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFamilies.map((family) => (
            <TableRow key={family.id}>
              <TableCell className="font-medium">{family.name}</TableCell>
              <TableCell>{family.description}</TableCell>
              <TableCell>
                <StatusBadge status={family.status} />
              </TableCell>
              <TableCell className="text-right">
                <ActionButtons
                  showView={false}
                  onEdit={() => {
                    setEditingFamily(family);
                    setShowEditFamilyForm(true);
                  }}
                  onDelete={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to delete ${family.name}?`,
                      )
                    ) {
                      setFamilies(families.filter((f) => f.id !== family.id));
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

export default FamiliesTab;
