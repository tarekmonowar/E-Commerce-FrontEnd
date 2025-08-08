/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "@/redux/api/productApi";
import { Label } from "@/components/ui/label";

import React, {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductEditSkeleton from "./utilsComponents/ProductEditSkeleton ";
import type { FormErrors, ProductFormData } from "./types/types";
import type { CustomError } from "@/frontend/types/types";

export default function EditProduct() {
  const params = useParams();
  const navigate = useNavigate();

  const {
    data,
    isLoading: productLoading,
    isError,
    error,
  } = useProductDetailsQuery(params.id!);

  console.log(data);

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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateProduct] = useUpdateProductMutation();

  // Initialize form data when product changes
  useEffect(() => {
    if (data) {
      const product = data.data;
      console.log(product);
      setFormData({
        id: product._id,
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
        category: product.category,
        brand: product.brand,
        discount: product.discount.toString(),
        description: product.description,
        photos: product.photos.map((photo) => ({
          id: photo.public_id,
          preview: photo.url,
        })),
      });
    }
  }, [data]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      formData.photos.forEach((photo) => {
        if (photo.preview && !photo.id) {
          URL.revokeObjectURL(photo.preview);
        }
      });
    };
  }, [formData.photos]);

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Product name must be at least 3 characters";
    }

    if (formData.brand?.trim() && formData.brand.trim().length < 3) {
      newErrors.brand = "Brand name must be at least 3 characters";
    }

    const price = parseFloat(formData.price);
    if (isNaN(price)) {
      newErrors.price = "Price is required";
    } else if (price <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    const stock = parseInt(formData.stock);
    if (isNaN(stock)) {
      newErrors.stock = "Stock is required";
    } else if (stock < 0) {
      newErrors.stock = "Stock must be a non-negative integer";
    }

    if (formData.discount.trim()) {
      const discount = parseInt(formData.discount);
      if (isNaN(discount)) {
        newErrors.discount = "Discount must be a number";
      } else if (discount < 0 || discount > 100) {
        newErrors.discount = "Discount must be between 0 and 100";
      }
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    } else if (formData.description.trim().length > 200) {
      newErrors.description = "Description cannot exceed 200 characters";
    }

    if (formData.photos.length === 0) {
      newErrors.photos = "At least one photo is required";
    } else if (formData.photos.length > 5) {
      newErrors.photos = "Maximum 5 photos can be added";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    field: keyof ProductFormData,
    value: string | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field in errors) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (files.length > 5) {
      toast.error("Maximum 5 photos allowed");
      return;
    }

    // Clear existing photos and revoke their URLs
    formData.photos.forEach((photo) => {
      if (!photo.id && photo.preview) {
        URL.revokeObjectURL(photo.preview);
      }
    });

    // Create new photos array
    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      photos: newPhotos,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (errors.photos) {
      setErrors((prev) => ({ ...prev, photos: undefined }));
    }

    // Reset selected image to the first one
    setSelectedImageIndex(0);
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    setFormData((prev) => {
      const updatedPhotos = [...prev.photos];
      const removedPhoto = updatedPhotos.splice(indexToRemove, 1)[0];

      // Revoke object URL if it was a new photo
      if (!removedPhoto.id && removedPhoto.preview) {
        URL.revokeObjectURL(removedPhoto.preview);
      }

      return {
        ...prev,
        photos: updatedPhotos,
      };
    });

    // Adjust selected image index
    if (selectedImageIndex >= indexToRemove) {
      setSelectedImageIndex(Math.max(0, selectedImageIndex - 1));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", formData.id || "");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("brand", formData.brand!);
      formDataToSend.append("discount", formData.discount);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("description", formData.description);

      // Append new photos
      formData.photos.forEach((photo) => {
        if (photo.file) {
          formDataToSend.append("photos", photo.file);
        }
      });

      // Append existing photo IDs to keep
      // const existingPhotoIds = formData.photos
      //   .filter((photo) => photo.id)
      //   .map((photo) => photo.id as string);

      // formDataToSend.append("existingPhotos", existingPhotoIds.join(","));
      for (const pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      await updateProduct({
        formData: formDataToSend,
        productId: params.id!,
      }).unwrap();
      toast.success(`"${formData.name}" has been updated successfully!`);
      navigate("/admin/products");
    } catch (error: any) {
      toast.error(error.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    if (data) {
      const product = data.data;
      setFormData({
        id: product._id,
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
        category: product.category,
        brand: product.brand,
        discount: product.discount.toString(),
        description: product.description,
        photos: product.photos.map((photo) => ({
          id: photo.public_id,
          preview: photo.url,
        })),
      });
    }
    setErrors({});
    setSelectedImageIndex(0);
    navigate(-1);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-0 p-4">
      {/* Left Column - Image Gallery */}

      {productLoading ? (
        <ProductEditSkeleton />
      ) : (
        <>
          <div className="p-6 pt-7 bg-[#F3F9F1] dark:bg-gray-800 rounded-sm md:col-span-2">
            <div className="flex gap-4 ">
              {/* Thumbnail Images */}
              <div className="flex flex-col gap-2 w-16">
                {formData.photos.map((photo, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer overflow-hidden border rounded-[3px] transition-all duration-200 ${
                      selectedImageIndex === index
                        ? "border-gray-700 shadow-lg"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={photo.preview}
                      alt={`${formData.name} ${index + 1}`}
                      className="w-full h-16 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src =
                          "https://placehold.co/100x100/333333/FFFFFF?text=Image+Error";
                      }}
                    />
                  </div>
                ))}

                {/* Add Photo Button - Replaces all photos */}
                {formData.photos.length < 5 && (
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoChange}
                      ref={fileInputRef}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center w-full h-16 border-2 border-dashed border-gray-400 rounded-[3px] hover:border-gray-600 cursor-pointer">
                      <span className="text-2xl text-gray-500">+</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Main Image with Zoom */}
              {formData.photos.length > 0 ? (
                <div className="flex-1 relative">
                  <div
                    className="relative w-full max-h-[50vh]  aspect-square bg-[#F3F9F1] dark:bg-gray-900 rounded-md overflow-hidden cursor-zoom-in"
                    onMouseEnter={() => setIsZooming(true)}
                    onMouseLeave={() => setIsZooming(false)}
                    onMouseMove={handleMouseMove}
                  >
                    <img
                      src={formData.photos[selectedImageIndex]?.preview}
                      alt={formData.name}
                      className="w-full h-full object-cover transition-transform duration-200"
                      style={{
                        transform: isZooming ? "scale(1.5)" : "scale(1)",
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src =
                          "https://placehold.co/600x600/333333/FFFFFF?text=Image+Error";
                      }}
                    />

                    {/* Zoom Indicator */}
                    {isZooming && (
                      <div
                        className="absolute w-24 h-24 border-2 border-white shadow-lg rounded-full pointer-events-none"
                        style={{
                          left: `${zoomPosition.x}%`,
                          top: `${zoomPosition.y}%`,
                          transform: "translate(-50%, -50%)",
                          background: "rgba(255, 255, 255, 0.3)",
                        }}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-md">
                  <p className="text-gray-500 dark:text-gray-400">
                    No images available
                  </p>
                </div>
              )}
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {formData.photos.length} / 5
                </span>
              </div>

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
                        className={`relative group rounded-sm overflow-hidden border`}
                      >
                        <img
                          src={photo.preview}
                          alt={`Product Photo ${index + 1}`}
                          className="w-full h-20 object-cover"
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
          </div>

          {/* Right Column - Edit Form */}
          <div className="p-6 pb-0 py-8 pr-10 space-y-4 md:col-span-3 ">
            <h2 className="font-extrabold text-2xl text-gray-900 dark:text-white mb-4">
              Edit Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Product Name */}
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 xl:text-[16px]">
                    Product Name *
                  </Label>
                  <Input
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
                  <Label className="text-gray-700 dark:text-gray-300 xl:text-[16px]">
                    Price *
                  </Label>
                  <Input
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
                  <Label className="text-gray-700 dark:text-gray-300 xl:text-[16px]">
                    Stock *
                  </Label>
                  <Input
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
                  <Label className="text-gray-700 dark:text-gray-300 xl:text-[16px]">
                    Category *
                  </Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    required
                    className="rounded-[5px] mt-2"
                  />
                  {errors.category && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Brand */}
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 xl:text-[16px]">
                    Brand
                  </Label>
                  <Input
                    value={formData.brand}
                    onChange={(e) => handleChange("brand", e.target.value)}
                    className="rounded-[5px] mt-2"
                  />
                  {errors.brand && (
                    <p className="text-sm text-red-500 mt-1">{errors.brand}</p>
                  )}
                </div>

                {/* Discount */}
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 xl:text-[16px]">
                    Discount (%)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={(e) => handleChange("discount", e.target.value)}
                    className="rounded-[5px] mt-2"
                  />
                  {errors.discount && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.discount}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <Label className="text-gray-700 dark:text-gray-300 xl:text-[16px]">
                  Description *
                </Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={5}
                  className="rounded-[5px] mt-2 border-black/30 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 xl:text-[15px] dark:text-white"
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-2 xl:pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className={`rounded-sm dark:text-white cursor-pointer shadow-lg transform transition-transform duration-200 hover:scale-105`}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-sm shadow-lg transform transition-transform duration-200 hover:scale-105"
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
                      Updating Product...
                    </>
                  ) : (
                    <>Update Product</>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
