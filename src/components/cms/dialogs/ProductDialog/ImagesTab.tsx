import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Plus, Image as ImageIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ImagesTabProps {
  newProduct: {
    name: string;
    description: string;
    lineId: string;
    mainImage: string;
    additionalImages: string[];
    metadata: Record<string, string>;
    imageAssignment?: string;
    variantMappings?: Record<string, string>;
  };
  setNewProduct: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      lineId: string;
      mainImage: string;
      additionalImages: string[];
      metadata: Record<string, string>;
      imageAssignment?: string;
      variantMappings?: Record<string, string>;
    }>
  >;
  productVariants: Array<{
    attributes: Record<string, string>;
    sku: string;
    price: string;
    stock: string;
  }>;
}

const ImagesTab: React.FC<ImagesTabProps> = ({
  newProduct,
  setNewProduct,
  productVariants = [],
}) => {
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const additionalImageInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  // Set default image assignment if not set
  React.useEffect(() => {
    if (!newProduct.imageAssignment) {
      setNewProduct({
        ...newProduct,
        imageAssignment: "per_color",
      });
    }

    // Initialize additionalImages array if it's undefined
    if (!newProduct.additionalImages) {
      setNewProduct({
        ...newProduct,
        additionalImages: [],
      });
    }

    // Initialize variantMappings if it's undefined
    if (!newProduct.variantMappings) {
      setNewProduct({
        ...newProduct,
        variantMappings: {},
      });
    }
  }, []);

  // Handle file upload for main image
  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewProduct({
          ...newProduct,
          mainImage: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file upload for additional images
  const handleAdditionalImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImages = [...(newProduct.additionalImages || [])];
        if (index !== undefined) {
          newImages[index] = event.target?.result as string;
        } else {
          // Find the first empty slot or add to the end if less than 8 images
          const emptyIndex = newImages.findIndex((img) => !img);
          if (emptyIndex >= 0) {
            newImages[emptyIndex] = event.target?.result as string;
          } else if (newImages.length < 8) {
            newImages.push(event.target?.result as string);
          }
        }
        setNewProduct({
          ...newProduct,
          additionalImages: newImages,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Get available variant attributes based on imageAssignment
  const getVariantOptions = () => {
    if (newProduct.imageAssignment === "per_color") {
      // Get unique color values from variants
      const colorOptions = new Set<string>();
      productVariants.forEach((variant) => {
        if (variant.attributes.Color) {
          colorOptions.add(variant.attributes.Color);
        }
      });
      return Array.from(colorOptions);
    } else {
      // For per_variant, return all variant combinations
      return productVariants.map((variant, index) => {
        const attributes = Object.entries(variant.attributes)
          .filter(([_, value]) => value)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");
        return {
          id: index.toString(),
          name: attributes || `Variant ${index + 1}`,
        };
      });
    }
  };

  // Handle variant mapping for an image
  const handleVariantMapping = (imageIndex: number, variantValue: string) => {
    const newMappings = { ...(newProduct.variantMappings || {}) };
    newMappings[imageIndex.toString()] = variantValue;
    setNewProduct({
      ...newProduct,
      variantMappings: newMappings,
    });
  };

  // Ensure we have at least 8 slots for additional images
  const additionalImagesArray = [...(newProduct.additionalImages || [])];
  while (additionalImagesArray.length < 8) {
    additionalImagesArray.push("");
  }

  // Get variant options for dropdown
  const variantOptions = getVariantOptions();

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <Label className="text-lg font-medium mb-2 block">
          Image Assignment
        </Label>
        <RadioGroup
          value={newProduct.imageAssignment || "per_color"}
          onValueChange={(value) =>
            setNewProduct({
              ...newProduct,
              imageAssignment: value,
              variantMappings: {}, // Reset mappings when assignment type changes
            })
          }
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="per_color" id="per_color" />
            <Label htmlFor="per_color">Assign images per color</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="per_variant" id="per_variant" />
            <Label htmlFor="per_variant">Assign images per variant</Label>
          </div>
        </RadioGroup>
        <p className="text-sm text-gray-500 mt-1">
          {newProduct.imageAssignment === "per_color"
            ? "Each color will have its own set of images"
            : "Each variant (color + memory combination) will have its own images"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Product Image */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Main Product Image</h3>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-64 cursor-pointer"
            onClick={() => mainImageInputRef.current?.click()}
          >
            {newProduct.mainImage ? (
              <div className="relative w-full h-full">
                <img
                  src={newProduct.mainImage}
                  alt="Main"
                  className="w-full h-full object-contain rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white/90 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewProduct({ ...newProduct, mainImage: "" });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center mb-2">
                  Click to upload main product image
                </p>
                <p className="text-xs text-gray-400 text-center">
                  Recommended size: 1200 x 1200 pixels (1:1 ratio)
                </p>
                <input
                  type="file"
                  ref={mainImageInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleMainImageUpload}
                />
              </>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => mainImageInputRef.current?.click()}
              className="flex-shrink-0"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
            <input
              type="file"
              ref={mainImageInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleMainImageUpload}
            />
            <Input
              placeholder="Or enter image URL"
              value={newProduct.mainImage}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  mainImage: e.target.value,
                })
              }
              className="flex-grow"
            />
          </div>
        </div>

        {/* Gallery Images */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Gallery Images</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => additionalImageInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
            <input
              type="file"
              ref={additionalImageInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleAdditionalImageUpload(e)}
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {additionalImagesArray.map((img, index) => (
              <div
                key={index}
                className={`relative aspect-square border rounded-lg overflow-hidden ${selectedImageIndex === index ? "ring-2 ring-violet-500" : ""}`}
                onClick={() => setSelectedImageIndex(index)}
              >
                {img ? (
                  <>
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0 bg-white/80 hover:bg-white/90 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newImages = [...newProduct.additionalImages];
                        newImages[index] = "";

                        // Also remove any variant mapping for this image
                        const newMappings = {
                          ...(newProduct.variantMappings || {}),
                        };
                        delete newMappings[index.toString()];

                        setNewProduct({
                          ...newProduct,
                          additionalImages: newImages,
                          variantMappings: newMappings,
                        });

                        if (selectedImageIndex === index) {
                          setSelectedImageIndex(null);
                        }
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </>
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = (event) =>
                        handleAdditionalImageUpload(event as any, index);
                      input.click();
                    }}
                  >
                    <Plus className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">
                      Add Image
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            You can add up to 8 gallery images
          </p>
        </div>
      </div>

      {/* Variant Mapping Section */}
      {selectedImageIndex !== null &&
        newProduct.additionalImages[selectedImageIndex] && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-md font-medium mb-3">Map Image to Variant</h3>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-md overflow-hidden border">
                <img
                  src={newProduct.additionalImages[selectedImageIndex]}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <Label className="mb-1 block">
                  Assign to{" "}
                  {newProduct.imageAssignment === "per_color"
                    ? "Color"
                    : "Variant"}
                </Label>
                <Select
                  value={
                    (newProduct.variantMappings || {})[
                      selectedImageIndex.toString()
                    ] || ""
                  }
                  onValueChange={(value) =>
                    handleVariantMapping(selectedImageIndex, value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={`Select ${newProduct.imageAssignment === "per_color" ? "color" : "variant"}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {newProduct.imageAssignment === "per_color"
                      ? // Show color options
                        variantOptions.map((color, i) => (
                          <SelectItem key={i} value={color}>
                            {color}
                          </SelectItem>
                        ))
                      : // Show variant options
                        variantOptions.map((variant: any) => (
                          <SelectItem key={variant.id} value={variant.id}>
                            {variant.name}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  {newProduct.imageAssignment === "per_color"
                    ? "This image will be shown when this color is selected"
                    : "This image will be shown for this specific variant combination"}
                </p>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default ImagesTab;
