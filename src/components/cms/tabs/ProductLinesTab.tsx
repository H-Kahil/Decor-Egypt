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
import { ProductLine } from "../types";

interface ProductLinesTabProps {
  productLines: ProductLine[];
  productLineSearchQuery: string;
  handleProductLineSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowAddProductLineDialog: (show: boolean) => void;
  setEditingProductLine: (productLine: ProductLine | null) => void;
  setShowEditProductLineForm: (show: boolean) => void;
  setProductLines: React.Dispatch<React.SetStateAction<ProductLine[]>>;
}

const ProductLinesTab: React.FC<ProductLinesTabProps> = ({
  productLines = [],
  productLineSearchQuery = "",
  handleProductLineSearch = () => {},
  setShowAddProductLineDialog,
  setEditingProductLine = () => {},
  setShowEditProductLineForm = () => {},
  setProductLines = () => {},
}) => {
  // Filter product lines based on search query
  const filteredProductLines = productLines.filter(
    (productLine) =>
      productLine.name
        .toLowerCase()
        .includes(productLineSearchQuery.toLowerCase()) ||
      productLine.subcategoryName
        ?.toLowerCase()
        .includes(productLineSearchQuery.toLowerCase()) ||
      productLine.brandName
        ?.toLowerCase()
        .includes(productLineSearchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SearchBar
          placeholder="Search product lines..."
          value={productLineSearchQuery}
          onChange={handleProductLineSearch}
        />
        <AddButton
          label="Add Product Line"
          onClick={() => setShowAddProductLineDialog(true)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Subcategory</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProductLines.length > 0 ? (
            filteredProductLines.map((productLine) => (
              <TableRow key={productLine.id}>
                <TableCell className="font-medium">
                  {productLine.name}
                </TableCell>
                <TableCell>{productLine.subcategoryName}</TableCell>
                <TableCell>{productLine.categoryName}</TableCell>
                <TableCell>{productLine.brandName}</TableCell>
                <TableCell>
                  <StatusBadge status={productLine.status} />
                </TableCell>
                <TableCell className="text-right">
                  <ActionButtons
                    showView={false}
                    onEdit={() => {
                      setEditingProductLine(productLine);
                      setShowEditProductLineForm(true);
                    }}
                    onDelete={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete ${productLine.name}?`,
                        )
                      ) {
                        setProductLines(
                          productLines.filter((pl) => pl.id !== productLine.id),
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
                No product lines found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductLinesTab;
