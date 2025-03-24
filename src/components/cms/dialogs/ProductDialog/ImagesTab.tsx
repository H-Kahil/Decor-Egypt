import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Plus, Image as ImageIcon } from "lucide-react";

interface ImagesTabProps {
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
}

const ImagesTab: React.FC<ImagesTabProps> = ({
  newProduct,
  setNewProduct,
  productVariants = [],
}) => {
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const additionalImageInputRef = useRef<HTMLInputElement>(null);

  // Initialize additionalImages array if it's undefined
  React.useEffect(() => {
    if (!newProduct.additionalImages) {
      setNewProduct({
        ...newProduct,
        additionalImages: [],
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

  // Ensure we have at least 8 slots for additional images
  const additionalImagesArray = [...(newProduct.additionalImages || [])];
  while (additionalImagesArray.length < 8) {
    additionalImagesArray.push("");
  }

  return (
    <div className="space-y-4">
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
                className="relative aspect-square border rounded-lg overflow-hidden"
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

                        setNewProduct({
                          ...newProduct,
                          additionalImages: newImages,
                        });
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
    </div>
  );
};

export default ImagesTab;
