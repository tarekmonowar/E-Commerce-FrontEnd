import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Product } from "@/frontend/types/types";
import { Star } from "lucide-react";
import { useState } from "react";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: (open: boolean) => void;
}

export default function ProductModalAdmin({
  product,
  open,
  onClose,
}: ProductModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  if (!product) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-5xl  !p-0 !gap-0 bg-gray-100 dark:bg-gray-900 !border-none">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-0">
          {/* Image Gallery Section */}
          <div className="flex gap-4 p-6 pt-7 bg-[#F3F9F1] dark:bg-gray-900 rounded-md">
            {/* Thumbnail Images */}
            <div className="flex flex-col gap-2 w-16">
              {product.photos.map((photo, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer  overflow-hidden border rounded-[3px] transition-all duration-200 ${
                    selectedImageIndex === index
                      ? "border-gray-700 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={photo.url}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-16 object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image with Zoom */}
            <div className="flex-1 relative">
              <div
                className="relative w-full aspect-square bg-[#F3F9F1] dark:bg-gray-900 rounded-md overflow-hidden cursor-zoom-in"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={product.photos[selectedImageIndex]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-200 "
                  style={{
                    transform: isZooming ? "scale(1.5)" : "scale(1)",
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
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
          </div>

          {/* Product Details Section */}
          <div className="p-6 py-8 space-y-3 ">
            {/* Product Title and Brand */}
            <h1 className="text-2xl font-semibold text-black  dark:text-white mb-2 xl:mb-3">
              Name : {product.name}
            </h1>

            <div className=" ">
              <div>
                <p className="text-gray-700  dark:text-white/70">
                  Brand:{" "}
                  <span className="text-gray-950  dark:text-white font-medium">
                    {product.brand}
                  </span>
                </p>
                <p className="text-gray-700  dark:text-white/70 mt-3">
                  Category :{" "}
                  <span className="text-gray-950  dark:text-white font-medium ">
                    {product.category}
                  </span>
                </p>
              </div>

              {/* Rating */}
              <div className="flex  items-center gap-2 mt-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.ratings!)
                          ? "fill-yellow-600 text-yellow-600"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-950  dark:text-white">
                  Review ({product.numOfReviews})
                </span>
              </div>
            </div>

            {/* Price */}

            <div className="">
              <div>
                <span className="text-md line-through text-muted-foreground mr-5">
                  ${product.price}
                </span>
                <span className="text-xl font-semibold text-red-500">
                  ${product.discountPrice}
                </span>
              </div>
              <div className="dark:text-white mt-5">
                Discount : {product.discount}%
              </div>
              <div>
                <p className="text-black  dark:text-white/80 mt-4">
                  Available In Stock :
                  <span className=" font-bold text-green-800 dark:text-green-600">
                    {" "}
                    {product.stock} Items
                  </span>
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="my-5 hidden md:block">
              <p className="text-sm text-gray-800  dark:text-white/70 leading-relaxed">
                Description : {product.description}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
