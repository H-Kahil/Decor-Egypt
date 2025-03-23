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
import { Product } from "../types";

interface ProductsTabProps {
  products?: Product[];
  setProducts?: (products: Product[]) => void;
  searchQuery: string;
  setSearchQuery?: (query: string) => void;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showAddProductDialog?: boolean;
  setShowAddProductDialog: (show: boolean) => void;
  setEditingProduct?: (product: Product | null) => void;
  setShowEditProductForm?: (show: boolean) => void;
}

const ProductsTab: React.FC<ProductsTabProps> = ({
  products = [],
  setProducts = () => {},
  searchQuery = "",
  handleSearch = () => {},
  setShowAddProductDialog,
  setEditingProduct = () => {},
  setShowEditProductForm = () => {},
}) => {
  // Filter products based on search query
  const filteredProducts =
    products?.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brandName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryName?.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  // Handle edit product
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowEditProductForm(true);
  };

  // Handle delete product
  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SearchBar
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <AddButton
          label="Add Product"
          onClick={() => setShowAddProductDialog(true)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Variants</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.brandName}</TableCell>
                <TableCell>{product.categoryName}</TableCell>
                <TableCell>{product.variants?.length || 0}</TableCell>
                <TableCell>
                  <StatusBadge status={product.status} />
                </TableCell>
                <TableCell className="text-right">
                  <ActionButtons
                    onEdit={() => handleEditProduct(product)}
                    onDelete={() => handleDeleteProduct(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTab;
