import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProductMutation } from "@/redux/api/productApi";
import React, {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Define interfaces for better type safety
interface ProductFormData {
  name: string;
  price: string;
  stock: string;
  category: string;
  brand: string;
  discount: string;
  description: string;
  photos: { file: File; preview: string }[];
}

interface FormErrors {
  name?: string;
  price?: string;
  stock?: string;
  brand?: string;
  discount?: string;
  category?: string;
  description?: string;
  photos?: string;
}

const NewProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    discount: "",
    description: "",
    photos: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [addProduct] = useCreateProductMutation();

  // Ref for file input to clear its value
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs when component unmounts or photos change
  useEffect(() => {
    return () => {
      formData.photos.forEach((photo) => URL.revokeObjectURL(photo.preview));
    };
  }, [formData.photos]);

  // Frontend form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Product name must be at least 3 characters";
    }
    // Brand validation
    if (formData.brand.trim() && formData.brand.trim().length < 3) {
      newErrors.brand = "Brand name must be at least 3 characters";
    }

    // Price validation
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    // Stock validation
    const stock = parseInt(formData.stock);
    if (isNaN(stock) || stock < 0) {
      newErrors.stock = "Stock must be a non-negative integer";
    }
    // discount validation
    if (formData.discount.trim()) {
      const discount = parseInt(formData.discount);
      if (isNaN(discount) || discount < 0 || discount > 100) {
        newErrors.discount = "Discount must be between 0 and 100";
      }
    }
    // Category validation
    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    // Description validation (optional, but can add length limits)
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    } else if (formData.description.trim().length > 200) {
      newErrors.description = "Description cannot exceed 200 characters";
    }

    // Photos validation (optional, e.g., require at least one photo)
    if (formData.photos.length === 0) {
      newErrors.photos = "At least one photo is required";
    }
    if (formData.photos.length > 5) {
      newErrors.photos = "Maximum 5 photos can add";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes for text, number, and textarea
  const handleChange = (
    field: keyof ProductFormData,
    value: string | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined, // Clear specific error
      }));
    }
  };

  // Handle photo file selection
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file), // Create a URL for image preview
    }));

    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos], // Add new photos to existing ones
    }));

    // Clear the file input value to allow selecting the same file again (if needed)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Clear photo error if any
    if (errors.photos) {
      setErrors((prev) => ({
        ...prev,
        photos: undefined,
      }));
    }
  };

  // Handle removing a photo preview
  const handleRemovePhoto = (indexToRemove: number) => {
    setFormData((prev) => {
      const updatedPhotos = prev.photos.filter(
        (_, index) => index !== indexToRemove,
      );
      // Revoke the object URL for the removed photo to free up memory
      URL.revokeObjectURL(prev.photos[indexToRemove].preview);
      return {
        ...prev,
        photos: updatedPhotos,
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("brand", formData.brand);
      data.append("discount", formData.discount);
      data.append("category", formData.category);
      data.append("description", formData.description);
      formData.photos.forEach((photo) => {
        data.append("photos", photo.file); // Append files
      });

      await addProduct(data).unwrap();

      toast.success(`"${formData.name}" has been added successfully!`);
      navigate("/admin/products");

      setFormData({
        name: "",
        price: "",
        stock: "",
        brand: "",
        discount: "",
        category: "",
        description: "",
        photos: [],
      });
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
      console.error("Add product error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center p-4 pt-3 xl:pt-5 font-sans`}
    >
      <Card
        className={`w-full max-w-5xl rounded-md bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-600 shadow-xl`}
      >
        <CardHeader className="border-gray-300 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <CardTitle
              className={`font-extrabold text-3xl xl:text-3xl text-gray-900 dark:text-white `}
            >
              Add New Product
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Product Name */}
              <div>
                <Label
                  htmlFor="name"
                  className="text-gray-700 dark:text-gray-300 xl:text-[16px]"
                >
                  Product Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  className="rounded-[5px] mt-2"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <Label
                  htmlFor="price"
                  className="text-gray-700 dark:text-gray-300 xl:text-[16px] "
                >
                  Price *
                </Label>
                <Input
                  id="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  required
                  className="rounded-[5px] mt-2"
                />
                {errors.price && (
                  <p className="text-sm text-red-500 mt-1">{errors.price}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Stock */}
              <div>
                <Label
                  htmlFor="stock"
                  className="text-gray-700 dark:text-gray-300 xl:text-[16px]"
                >
                  Stock *
                </Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleChange("stock", e.target.value)}
                  required
                  className="rounded-[5px] mt-2"
                />
                {errors.stock && (
                  <p className="text-sm text-red-500 mt-1">{errors.stock}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <Label
                  htmlFor="category"
                  className="text-gray-700 dark:text-gray-300 xl:text-[16px]"
                >
                  Category *
                </Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  required
                  className="rounded-[5px] mt-2"
                />
                {errors.category && (
                  <p className="text-sm text-red-500 mt-1">{errors.category}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Stock */}
              <div>
                <Label
                  htmlFor="stock"
                  className="text-gray-700 dark:text-gray-300 xl:text-[16px]"
                >
                  Brand
                </Label>
                <Input
                  id="brand"
                  type="text"
                  min="0"
                  value={formData.brand}
                  onChange={(e) => handleChange("brand", e.target.value)}
                  required
                  className="rounded-[5px] mt-2"
                />
                {errors.brand && (
                  <p className="text-sm text-red-500 mt-1">{errors.brand}</p>
                )}
              </div>

              {/* discount */}
              <div>
                <Label
                  htmlFor="category"
                  className="text-gray-700 dark:text-gray-300 xl:text-[16px]"
                >
                  Discount (%)
                </Label>
                <Input
                  id="discount"
                  type="number"
                  value={formData.discount}
                  onChange={(e) => handleChange("discount", e.target.value)}
                  required
                  className="rounded-[5px] mt-2"
                />
                {errors.discount && (
                  <p className="text-sm text-red-500 mt-1">{errors.discount}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <Label
                htmlFor="description"
                className="text-gray-700 dark:text-gray-300 xl:text-[16px] "
              >
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={5}
                className="rounded-[5px] mt-2 border-black/30 dark:border-gray-700 bg-gray-50 xl:text-[15px]"
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Photos */}
            <div>
              <Label
                htmlFor="photos"
                className="text-gray-700 dark:text-gray-300 xl:text-[16px]"
              >
                Product Photos *
              </Label>
              <Input
                id="photos"
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoChange}
                ref={fileInputRef} // This ref is now correctly passed
                className={`bg-gray-50 border-gray-300 text-gray-900 file:bg-blue-600 file:text-white hover:file:bg-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white/70 dark:file:bg-blue-700 dark:file:text-white dark:hover:file:bg-blue-800  file:mr-4 xl:file:mt-1  file:py-1 file:px-4 file:rounded-[7px] file:border-0 file:text-sm file:font-semibold file:cursor-pointer rounded-[5px] mt-2 `}
              />
              {errors.photos && (
                <p className="text-sm text-red-500 mt-1">{errors.photos}</p>
              )}

              {/* Photo Previews */}
              {formData.photos.length > 0 && (
                <div className="mt-4 max-h-64 overflow-y-auto pr-1">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {formData.photos.map((photo, index) => (
                      <div
                        key={index}
                        className={`relative group rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700`}
                      >
                        <img
                          src={photo.preview}
                          alt={`Product Photo ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src =
                              "https://placehold.co/100x100/333333/FFFFFF?text=Image+Error";
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(index)}
                          className="absolute top-1 right-1 cursor-pointer bg-red-600 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          title="Remove photo"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-2 xl:pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-md shadow-lg transform transition-transform duration-200 hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding Product...
                  </>
                ) : (
                  <>Add Product</>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  console.log("Form cancelled.");
                  setFormData({
                    name: "",
                    price: "",
                    stock: "",
                    category: "",
                    brand: "",
                    discount: "",
                    description: "",
                    photos: [],
                  });
                }}
                className={` rounded-md cursor-pointer shadow-lg transform transition-transform duration-200 hover:scale-105`}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewProductForm;
