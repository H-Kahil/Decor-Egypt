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
import { Attribute } from "../types";
import { Badge } from "@/components/ui/badge";

interface AttributesTabProps {
  attributes: Attribute[];
  attributeSearchQuery: string;
  handleAttributeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowAddAttributeDialog: (show: boolean) => void;
  setEditingAttribute: (attribute: Attribute | null) => void;
  setShowEditAttributeForm: (show: boolean) => void;
  setAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>;
}

const AttributesTab: React.FC<AttributesTabProps> = ({
  attributes = [],
  attributeSearchQuery = "",
  handleAttributeSearch = () => {},
  setShowAddAttributeDialog,
  setEditingAttribute = () => {},
  setShowEditAttributeForm = () => {},
  setAttributes = () => {},
}) => {
  // Filter attributes based on search query
  const filteredAttributes = attributes.filter(
    (attribute) =>
      attribute.name
        .toLowerCase()
        .includes(attributeSearchQuery.toLowerCase()) ||
      attribute.subcategoryName
        ?.toLowerCase()
        .includes(attributeSearchQuery.toLowerCase()) ||
      attribute.productLineName
        ?.toLowerCase()
        .includes(attributeSearchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SearchBar
          placeholder="Search attributes..."
          value={attributeSearchQuery}
          onChange={handleAttributeSearch}
        />
        <AddButton
          label="Add Attribute"
          onClick={() => setShowAddAttributeDialog(true)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Values</TableHead>
            <TableHead>Product Model</TableHead>
            <TableHead>Subcategory</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAttributes.length > 0 ? (
            filteredAttributes.map((attribute) => (
              <TableRow key={attribute.id}>
                <TableCell className="font-medium">{attribute.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {attribute.values.map((value) => (
                      <Badge key={value.id} variant="outline" className="mr-1">
                        {value.value}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{attribute.productLineName}</TableCell>
                <TableCell>{attribute.subcategoryName}</TableCell>
                <TableCell>
                  <StatusBadge status={attribute.status} />
                </TableCell>
                <TableCell className="text-right">
                  <ActionButtons
                    showView={false}
                    onEdit={() => {
                      setEditingAttribute(attribute);
                      setShowEditAttributeForm(true);
                    }}
                    onDelete={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete ${attribute.name}?`,
                        )
                      ) {
                        setAttributes(
                          attributes.filter((a) => a.id !== attribute.id),
                        );
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No attributes found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttributesTab;
