import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "../components/reviews/Reviews";
import WriteReview from "../components/reviews/WriteReview";
import type { Review } from "../constant/type";
import RelatedProducts from "../components/reviews/RelatedProducts";
import { useProductDetailsQuery } from "@/redux/api/productApi";
import type { CartItem, CustomError, Product } from "../types/types";
import { toast } from "react-toastify";
import ProductDetailsSkeleton from "../components/utils/ProductsDetailsSkelton";
import { addToCart } from "@/redux/reducer/cartReducer";
import { useDispatch } from "react-redux";

export default function ProductPage() {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);
  const writeReviewRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useProductDetailsQuery(id!);

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  const product = data?.data as Product;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    writeReviewRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <>
      {isLoading ? (
        <ProductDetailsSkeleton />
      ) : (
        <section className="bg-gray-100 pt-7">
          <div className="max-w-7xl mx-auto px-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-18 md:mt-0">
              {/* Image Gallery */}
              <div className="flex gap-4 p-6 rounded-md">
                {/* Thumbnails */}
                <div className="flex flex-col gap-2 w-16">
                  {product?.photos.map((photo, index) => (
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
                        className="w-full h-16 object-cover "
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
                      src={product?.photos[selectedImageIndex]?.url}
                      alt={product?.name}
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
              <div className="space-y-5 md:pt-10">
                <h1 className="text-2xl font-semibold">{product?.name}</h1>

                <div className="flex flex-wrap gap-4 items-center">
                  <p className="text-gray-700">
                    Brand:{" "}
                    <span className="text-gray-950 font-medium">
                      {product?.brand}
                    </span>
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product?.ratings || 0)
                              ? "fill-yellow-600 text-yellow-600"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm">
                      Review ({product?.numOfReviews})
                    </span>
                  </div>
                </div>

                <div className="flex gap-6 flex-wrap">
                  <div>
                    <span className="line-through text-muted-foreground mr-2">
                      ${product?.price}
                    </span>
                    <span className="text-xl text-red-500 font-bold">
                      ${product?.discountPrice}
                    </span>
                  </div>
                  <div>
                    Available:
                    <span className="ml-1 font-bold text-green-700">
                      {product?.stock} Items
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-800 leading-relaxed">
                  {product?.description}
                </p>

                <p className="text-md text-blue-700">
                  Free Shipping (Est. Delivery: 2–3 Days)
                </p>

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
                    <span className="px-4 text-xl font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => incrementHandler(product)}
                      className="px-5 bg-gray-300 py-[3px] rounded-[3px] font-semibold text-xl cursor-pointer hover:bg-gray-900 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 mt-5 xl:mt-7">
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
                    className="rounded-sm text-white/80 bg-black hover:bg-white hover:text-black cursor-pointer border"
                  >
                    <ShoppingCart /> ADD TO CART
                  </Button>
                  <Button className="rounded-sm border hover:bg-gray-300 hover:text-black hidden sm:flex cursor-pointer">
                    <Heart className="w-4 h-4" /> Add to Wishlist
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* review com */}
          <Reviews onEdit={handleEdit} />
          <div ref={writeReviewRef}>
            <WriteReview
              editingReview={editingReview}
              clearEditing={() => setEditingReview(null)}
            />
          </div>
          <RelatedProducts category={product.category!} />
        </section>
      )}
    </>
  );
}
