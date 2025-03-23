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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BasicInfoTab from "./BasicInfoTab";
import ImagesTab from "./ImagesTab";
import VariantsTab from "./VariantsTab";
import MetadataTab from "./MetadataTab";
import { ProductLine } from "../../types";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productFormTab: string;
  setProductFormTab: (value: string) => void;
  newProduct: {
    name: string;
    description: string;
    lineId: string;
    mainImage: string;
    additionalImages: string[];
    metadata: Record<string, string>;
  };
  setNewProduct: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      lineId: string;
      mainImage: string;
      additionalImages: string[];
      metadata: Record<string, string>;
    }>
  >;
  productVariants: Array<{
    attributes: Record<string, string>;
    sku: string;
    price: string;
    stock: string;
  }>;
  setProductVariants: React.Dispatch<
    React.SetStateAction<
      Array<{
        attributes: Record<string, string>;
        sku: string;
        price: string;
        stock: string;
      }>
    >
  >;
  handleAddProduct: () => void;
  productLines: ProductLine[];
  selectedFamily: string;
  selectedProductLine: ProductLine | null;
  addVariant: () => void;
  removeVariant: (index: number) => void;
  updateVariantAttribute: (
    index: number,
    attribute: string,
    value: string,
  ) => void;
  updateVariantField: (index: number, field: string, value: string) => void;
}

const ProductDialog: React.FC<ProductDialogProps> = ({
  open,
  onOpenChange,
  productFormTab,
  setProductFormTab,
  newProduct,
  setNewProduct,
  productVariants,
  setProductVariants,
  handleAddProduct,
  productLines,
  selectedFamily,
  selectedProductLine,
  addVariant,
  removeVariant,
  updateVariantAttribute,
  updateVariantField,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Create a new product with all necessary details
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={productFormTab}
          onValueChange={setProductFormTab}
          className="w-full"
        >
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger
              value="basic"
              className="data-[state=active]:bg-violet-100"
            >
              Basic Info
            </TabsTrigger>
            <TabsTrigger
              value="images"
              className="data-[state=active]:bg-violet-100"
            >
              Images
            </TabsTrigger>
            <TabsTrigger
              value="variants"
              className="data-[state=active]:bg-violet-100"
            >
              Variants
            </TabsTrigger>
            <TabsTrigger
              value="metadata"
              className="data-[state=active]:bg-violet-100"
            >
              Metadata
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <BasicInfoTab
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              productLines={productLines}
            />
          </TabsContent>

          <TabsContent value="images">
            <ImagesTab newProduct={newProduct} setNewProduct={setNewProduct} />
          </TabsContent>

          <TabsContent value="variants">
            <VariantsTab
              productVariants={productVariants}
              selectedFamily={selectedFamily}
              addVariant={addVariant}
              removeVariant={removeVariant}
              updateVariantAttribute={updateVariantAttribute}
              updateVariantField={updateVariantField}
            />
          </TabsContent>

          <TabsContent value="metadata">
            <MetadataTab
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              selectedFamily={selectedFamily}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-violet-600 hover:bg-violet-700"
            onClick={() => {
              handleAddProduct();
              onOpenChange(false);
            }}
            disabled={
              !newProduct.name ||
              !newProduct.lineId ||
              productVariants.length === 0
            }
          >
            Add Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
