import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ImagesTabProps {
  newProduct: {
    name: string;
    description: string;
    lineId: string;
    mainImage: string;
    additionalImages: string[];
    metadata: Record<string, string>;
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
      imageAssignment?: string;
    }>
  >;
}

const ImagesTab: React.FC<ImagesTabProps> = ({ newProduct, setNewProduct }) => {
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
  }, []);
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <Label className="text-lg font-medium mb-2 block">
          Image Assignment
        </Label>
        <RadioGroup
          value={newProduct.imageAssignment || "per_color"}
          onValueChange={(value) =>
            setNewProduct({ ...newProduct, imageAssignment: value })
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Product Image */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Main Product Image</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center h-64">
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
                  onClick={() =>
                    setNewProduct({ ...newProduct, mainImage: "" })
                  }
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center mb-2">
                  Drag and drop an image, or click to browse
                </p>
                <p className="text-xs text-gray-400 text-center">
                  Recommended size: 1200 x 1200 pixels (1:1 ratio)
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    const url = prompt("Enter image URL");
                    if (url) setNewProduct({ ...newProduct, mainImage: url });
                  }}
                >
                  Select Image
                </Button>
              </>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="main-image-url">Image URL</Label>
            <Input
              id="main-image-url"
              placeholder="Enter main image URL"
              value={newProduct.mainImage}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  mainImage: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Gallery Images */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Gallery Images</h3>
          <div className="grid grid-cols-3 gap-3">
            {newProduct.additionalImages?.map((img, index) => (
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
                      onClick={() => {
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
                ) : index < 8 || !newProduct.additionalImages ? (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100"
                    onClick={() => {
                      const url = prompt("Enter image URL");
                      if (url) {
                        const newImages = [...newProduct.additionalImages];
                        newImages[index] = url;
                        setNewProduct({
                          ...newProduct,
                          additionalImages: newImages,
                        });
                      }
                    }}
                  >
                    <Plus className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">
                      Add Image
                    </span>
                  </div>
                ) : null}
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
