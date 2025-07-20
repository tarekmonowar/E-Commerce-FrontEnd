import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Products } from "@/frontend/constant/products";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);

  const product = Products.find((item) => item._id === id);

  if (!product) return <p>Product not found</p>;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-gray-100 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="flex gap-4 bg-[#F3F9F1] p-6 rounded-md">
          {/* Thumbnails */}
          <div className="flex flex-col gap-2 w-16">
            {product.photos.map((photo, index) => (
              <div
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`cursor-pointer border rounded-[3px] overflow-hidden ${
                  selectedImageIndex === index
                    ? "border-gray-700 shadow-lg"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={photo.url}
                  alt={`${product.name}-${index}`}
                  className="w-full h-16 object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 relative">
            <div
              className="relative w-full aspect-square rounded-md overflow-hidden cursor-zoom-in"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.photos[selectedImageIndex]?.url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-200"
                style={{
                  transform: isZooming ? "scale(1.5)" : "scale(1)",
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />
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

        {/* Product Info */}
        <div className="space-y-5">
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          <div className="flex flex-wrap gap-4 items-center">
            <p className="text-muted-foreground">
              Brand:{" "}
              <span className="text-primary font-medium">{product.brand}</span>
            </p>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.ratings)
                        ? "fill-yellow-600 text-yellow-600"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm">Review ({product.numOfReviews})</span>
            </div>
          </div>

          <div className="flex gap-6 flex-wrap">
            <div>
              <span className="line-through text-muted-foreground mr-2">
                ${product.price}
              </span>
              <span className="text-xl text-red-500 font-bold">
                ${product.discountPrice}
              </span>
            </div>
            <div>
              Available:
              <span className="ml-1 font-bold text-green-700">
                {product.stock} Items
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-800 leading-relaxed">
            {product.description}
          </p>

          <p className="text-md text-blue-700">
            Free Shipping (Est. Delivery: 2–3 Days)
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-4">
            <label className="text-md font-medium">Quantity:</label>
            <div className="flex items-center border rounded-sm overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 font-bold text-xl hover:bg-gray-400 transition-colors border-r"
              >
                <Minus size={18} />
              </button>
              <span className="px-4 font-bold text-xl">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 font-bold text-xl hover:bg-gray-400 transition-colors border-l"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <Button className="rounded-sm text-white/80 hover:bg-white hover:text-black">
              <ShoppingCart className="mr-2" /> ADD TO CART
            </Button>
            <Button
              variant="outline"
              className="rounded-sm hover:bg-gray-200 hidden sm:flex"
            >
              <Heart className="w-4 h-4 mr-2" /> Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
