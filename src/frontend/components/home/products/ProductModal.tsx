import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CartItem, Product } from "@/frontend/types/types";
import { addToCart } from "@/redux/reducer/cartReducer";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: (open: boolean) => void;
}

export default function ProductModal({
  product,
  open,
  onClose,
}: ProductModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  if (!product) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const incrementHandler = (product: Product) => {
    if (product.stock <= 0) {
      toast.error("Out of Stock");
      setQuantity(1);
      return;
    }
    if (product.stock === quantity) {
      toast.error(
        `Only ${product.stock} item${
          product.stock > 1 ? "s" : ""
        } available in stock.`,
      );
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const decrementHandler = () => {
    if (quantity <= 1) {
      toast.info("Minimum quantity is 1.");
      return;
    }
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    if (cartItem.quantity < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }

    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
    onClose(false);
    setQuantity(1);
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-5xl  !p-0 !gap-0 bg-gray-100 !border-none">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-0">
          {/* Image Gallery Section */}
          <div className="flex gap-4 p-6 pt-7 bg-[#F3F9F1] rounded-md">
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
                className="relative w-full aspect-square bg-[#F3F9F1] rounded-md overflow-hidden cursor-zoom-in"
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
            <h1 className="text-2xl font-semibold text-black mb-2 xl:mb-3">
              {product.name}
            </h1>

            <div className="flex flex-col sm:flex-row justify-left items-center gap-5 ">
              <div>
                <p className="text-gray-700">
                  Brand:{" "}
                  <span className="text-gray-950 font-medium">
                    {product.brand}
                  </span>
                </p>
              </div>

              {/* Rating */}
              <div className="flex  items-center gap-2">
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
                <span className="text-sm text-gray-950">
                  Review ({product.numOfReviews})
                </span>
              </div>
            </div>

            {/* Price */}

            <div className="flex flex-col sm:flex-row items-center gap-4 xl:gap-5">
              <div>
                <span className="text-md line-through text-muted-foreground mr-3">
                  ${product.price}
                </span>
                <span className="text-xl font-semibold text-red-500">
                  ${product.discountPrice}
                </span>
              </div>
              <div>
                <p>
                  Available In Stock:
                  <span className=" font-bold text-green-800">
                    {" "}
                    {product.stock} Items
                  </span>
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="my-5 hidden md:block">
              <p className="text-sm text-gray-800 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Free Shipping */}
            <div className="text-md text-blue-700">
              Free Shipping (Est. Delivery Time 2-3 Days)
            </div>

            {/* Quantity Selector */}
            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-4">
              <label className="text-md font-medium">Quantity:</label>
              <div>
                <button
                  onClick={() => decrementHandler()}
                  className="px-5 bg-gray-300 py-[3px] rounded-[3px] font-semibold text-xl cursor-pointer hover:bg-gray-900 hover:text-white"
                >
                  -
                </button>
                <span className="px-4 text-xl font-semibold">{quantity}</span>
                <button
                  onClick={() => incrementHandler(product)}
                  className="px-5 bg-gray-300 py-[3px] rounded-[3px] font-semibold text-xl cursor-pointer hover:bg-gray-900 hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              <div className="flex">
                <Button
                  onClick={() => {
                    addToCartHandler({
                      productId: product._id,
                      price: product.discountPrice!,
                      name: product.name,
                      photo: product.photos[0].url,
                      stock: product.stock,
                      quantity: quantity,
                    });
                  }}
                  variant="default"
                  className="mr-4 rounded-sm text-white/80 hover:bg-white bg-black hover:text-black border cursor-pointer "
                >
                  <ShoppingCart /> ADD TO CART
                </Button>
                <Button className="font-bold border text-black rounded-sm hover:bg-gray-300 cursor-pointer hidden sm:flex">
                  <Heart className="w-4 h-4" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
