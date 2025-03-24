import React, { useState } from "react";
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
import {
  ProductLine,
  ProductFamily,
  Brand,
  Category,
  Subcategory,
} from "../../types";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newProduct: {
    name: string;
    description: string;
    lineId: string;
    mainImage: string;
    additionalImages: string[];
    metadata: Record<string, string>;
    familyId?: string;
    brandId?: string;
    categoryId?: string;
    subcategoryId?: string;
    imageAssignment?: string;
  };
  setNewProduct: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      lineId: string;
      mainImage: string;
      additionalImages: string[];
      metadata: Record<string, string>;
      familyId?: string;
      brandId?: string;
      categoryId?: string;
      subcategoryId?: string;
      imageAssignment?: string;
    }>
  >;
  handleAddProduct: () => void;
  families?: ProductFamily[];
  brands?: Brand[];
  categories?: Category[];
  subcategories?: Subcategory[];
  productLines?: ProductLine[];
  isEdit?: boolean;
  editingProduct?: any;
  handleUpdateProduct?: () => void;
}

const ProductDialog: React.FC<ProductDialogProps> = ({
  open,
  onOpenChange,
  newProduct,
  setNewProduct,
  handleAddProduct,
  families = [],
  brands = [],
  categories = [],
  subcategories = [],
  productLines = [],
  isEdit = false,
  editingProduct = null,
  handleUpdateProduct = () => {},
}) => {
  const [productFormTab, setProductFormTab] = useState("basic");
  const [productVariants, setProductVariants] = useState<
    Array<{
      attributes: Record<string, string>;
      sku: string;
      price: string;
      stock: string;
    }>
  >([
    {
      attributes: { Color: "", Memory: "", Model: "" },
      sku: "",
      price: "",
      stock: "",
    },
  ]);

  const selectedFamily = newProduct.familyId || "";
  const selectedProductLine =
    productLines.find((line) => line.id === newProduct.lineId) || null;

  // Function to add a new variant
  const addVariant = () => {
    setProductVariants([
      ...productVariants,
      {
        attributes: { Color: "", Memory: "", Model: "" },
        sku: "",
        price: "",
        stock: "",
      },
    ]);
  };

  // Function to remove a variant
  const removeVariant = (index: number) => {
    const newVariants = [...productVariants];
    newVariants.splice(index, 1);
    setProductVariants(newVariants);
  };

  // Function to update a variant attribute
  const updateVariantAttribute = (
    index: number,
    attribute: string,
    value: string,
  ) => {
    const newVariants = [...productVariants];
    newVariants[index].attributes[attribute] = value;
    setProductVariants(newVariants);
  };

  // Function to update a variant field
  const updateVariantField = (index: number, field: string, value: string) => {
    const newVariants = [...productVariants];
    newVariants[index][field as keyof (typeof newVariants)[0]] = value;
    setProductVariants(newVariants);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update product details"
              : "Create a new product with all necessary details"}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={productFormTab}
          onValueChange={setProductFormTab}
          className="w-full"
        >
          <TabsList className="w-full justify-start mb-6 border-b rounded-none bg-transparent overflow-x-auto">
            <TabsTrigger
              value="basic"
              className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
            >
              Basic Info
            </TabsTrigger>
            <TabsTrigger
              value="images"
              className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
            >
              Images
            </TabsTrigger>
            <TabsTrigger
              value="variants"
              className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
            >
              Variants
            </TabsTrigger>
            <TabsTrigger
              value="metadata"
              className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
            >
              Metadata
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <BasicInfoTab
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              productLines={productLines || []}
              families={families}
              brands={brands}
              categories={categories}
              subcategories={subcategories}
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
              isEdit ? handleUpdateProduct() : handleAddProduct();
              onOpenChange(false);
            }}
            disabled={!newProduct.name || !newProduct.lineId}
          >
            {isEdit ? "Update Product" : "Add Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
