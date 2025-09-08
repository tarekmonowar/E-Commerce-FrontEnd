import { Button } from "@/components/ui/button";
import { useGetWishlistProductsQuery } from "@/redux/api/wishlistApi";
import {
  removeFromWishlist,
  resetWishlist,
} from "@/redux/reducer/wishlistReducer";
import type { RootState } from "@/redux/store";
import { Eye, Grid3X3, Heart, List, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductModal from "../components/home/products/ProductModal";
import type {
  CartItem,
  CartReducerInitialState,
  Product,
} from "../types/types";
import AllProductsSkeleton from "../components/utils/AllProductsSkelton.tsx";
import { addToCart } from "@/redux/reducer/cartReducer.ts";

export default function Wishlist() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [layoutType, setLayoutType] = useState<"grid" | "list">("grid");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer,
  );
  const { wishlistItems } = useSelector(
    (state: RootState) => state.wishlistReducer,
  );

  // Fetch full product details from backend using RTK Query
  const { data, isLoading, isError, error } = useGetWishlistProductsQuery({
    ids: wishlistItems,
  });

  const products: Product[] = data?.data || [];

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
  }, [isError, error]);

  // Toggle wishlist
  const toggleWishlist = (productId: string) => {
    if (wishlistItems.includes(productId)) {
      dispatch(removeFromWishlist(productId));
      toast.success("Removed from wishlist");
    } else {
      toast.warn("Something went wrong. Please try again.");
    }
  };

  //reser wishlist
  const handleReset = () => {
    dispatch(resetWishlist());
    toast.info("Wishlist cleared!");
  };

  //*Cart Handler

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) {
      return toast.error("Out of Stock");
    }

    const alreadyInCart = cartItems.some(
      (item) => item.productId === cartItem.productId,
    );

    if (alreadyInCart) {
      return toast.error("Item already in cart");
    }

    dispatch(addToCart(cartItem));
    toast.success("Item added to cart!");
  };

  // If wishlist is empty
  if (!isLoading && products.length === 0) {
    return (
      <section className="bg-gray-200 min-h-[60vh] flex items-center justify-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
          Your wishlist is empty 😢
        </h2>
      </section>
    );
  }

  return (
    <section className="bg-gray-200">
      <div className=" max-w-7xl mx-auto  pt-10 flex  justify-between px-5">
        <h2 className="text-2xl font-semibold">Wishlist</h2>
        <button
          onClick={handleReset}
          className="bg-[#236027] hover:bg-[#2C742F] text-white px-4 py-2 rounded cursor-pointer"
        >
          Clear Wishlist
        </button>
      </div>
      <div className="max-w-7xl mx-auto py-4">
        <div className="flex items-center justify-between mb-6 pl-3 bg-gray-200 rounded-sm">
          <div className="flex items-center gap-4">
            {/* Layout Icons */}
            <div className="flex items-center rounded">
              <button
                onClick={() => {
                  setLayoutType("list");
                }}
                className={`p-2 rounded-full  ${
                  layoutType === "list" ? "bg-gray-300" : ""
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setLayoutType("grid");
                }}
                className={`p-2 rounded-full ${
                  layoutType === "grid" ? "bg-gray-300" : ""
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
            </div>

            {/* Product Count */}
            <span className="text-gray-600">
              There are <span className="text-red-600">{products.length}</span>{" "}
              products in your Wishlist.
            </span>
          </div>
        </div>
        <div className="px-4">
          <div
            className={
              layoutType === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                : "space-y-4"
            }
          >
            {isLoading ? (
              <AllProductsSkeleton layoutType={layoutType} />
            ) : (
              products?.map((product) => (
                <div
                  key={product._id}
                  className={`bg-white rounded-sm [box-shadow:rgba(9,30,66,0.25)_0px_1px_1px,rgba(9,30,66,0.13)_0px_0px_1px_1px] hover:[box-shadow:rgba(0,0,0,0.25)_0px_0.0625em_0.0625em,rgba(0,0,0,0.25)_0px_0.125em_0.5em,rgba(255,255,255,0.1)_0px_0px_0px_1px_inset] transition-all duration-300 group mb-1 ${
                    layoutType === "list" ? "flex gap-10 h-[220px]" : ""
                  }`}
                  onMouseEnter={() => setHoveredProduct(product._id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative overflow-hidden rounded-t-sm">
                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                      {product.discount}%
                    </div>

                    {/* Product Image */}
                    <div
                      className={`relative overflow-hidden cursor-pointer ${
                        layoutType === "list" ? "h-full w-56" : "h-40 sm:h-48"
                      }`}
                      onClick={() => {
                        setSelectedProduct(product);
                        setModalOpen(true);
                      }}
                    >
                      <img
                        src={
                          hoveredProduct === product._id
                            ? product.photos[1]?.url
                            : product.photos[0]?.url
                        }
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 transform-gpu group-hover:scale-110"
                      />

                      {/* Hover Icons */}
                      <div
                        className={`absolute inset-0 bg-black/20 flex items-center justify-center gap-2 transition-opacity duration-300 ${
                          hoveredProduct === product._id
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <button
                          className="rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 text-black bg-white font-bold hover:bg-red-500 hover:text-white cursor-pointer flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${product._id}`);
                          }}
                        >
                          <Eye className="w-3 h-3 sm:w-5 sm:h-5" />
                        </button>

                        <Button
                          size="sm"
                          variant="secondary"
                          className={`rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 font-bold  cursor-pointer ${
                            wishlistItems.includes(product._id)
                              ? "bg-gray-800 hover:bg-red-600 text-white"
                              : "bg-white text-black hover:bg-red-500 hover:text-white"
                          } `}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product._id);
                          }}
                        >
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4 " />
                        </Button>

                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCartHandler({
                              productId: product._id,
                              price: product.discountPrice!,
                              name: product.name,
                              photo: product.photos[0].url,
                              stock: product.stock,
                              quantity: 1,
                            });
                          }}
                          size="sm"
                          variant="secondary"
                          className="rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 text-black bg-white font-bold hover:bg-red-500 hover:text-white cursor-pointer"
                        >
                          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${
                      layoutType === "list" ? "flex-1 p-2" : "p-3 sm:p-4 "
                    }`}
                  >
                    <p className="text-xs text-gray-500 mb-1">
                      {product.brand}
                    </p>
                    <h3
                      className="text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base font-medium hover:text-red-500 cursor-pointer"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      {product.name}
                    </h3>

                    {layoutType === "list" && (
                      <p className="text-sm">{product.description}</p>
                    )}

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.ratings || 0)
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        {product.ratings}
                      </span>
                    </div>

                    {/* Price */}
                    <div
                      className={`flex  items-center gap-2  pr-3 ${
                        layoutType === "list"
                          ? "justify-start mb-1"
                          : "justify-between mb-3"
                      }`}
                    >
                      <span className="text-xs sm:text-sm text-gray-400 line-through">
                        ${product.price.toLocaleString()}
                      </span>
                      <span className="text-base sm:text-lg font-semibold text-red-500">
                        ${product.discountPrice?.toLocaleString()}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCartHandler({
                          productId: product._id,
                          price: product.discountPrice!,
                          name: product.name,
                          photo: product.photos[0].url,
                          stock: product.stock,
                          quantity: 1,
                        });
                      }}
                      className={` cursor-pointer text-red-500 rounded-sm border border-red-500 hover:bg-red-500 hover:border-transparent bg-transparent hover:text-white transition-colors duration-300 text-xs sm:text-sm ${
                        layoutType === "list" ? "w-52" : "w-full"
                      }`}
                    >
                      <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      ADD TO CART
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Modal */}
        <ProductModal
          product={selectedProduct}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </section>
  );
}
