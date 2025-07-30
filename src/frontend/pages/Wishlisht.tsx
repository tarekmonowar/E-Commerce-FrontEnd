import { Products as searchProducts } from "@/frontend/constant/products";
import { useState } from "react";
import type { ProductType } from "../constant/type";
import { useNavigate } from "react-router-dom";
import { Eye, Grid3X3, Heart, List, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductModal from "../components/home/products/ProductModal";

export default function Wishlisht() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [layoutType, setLayoutType] = useState<"grid" | "list">("grid");
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );

  const navigate = useNavigate();

  return (
    <section className="bg-gray-200">
      <h2 className="max-w-7xl mx-auto pt-10 text-2xl font-semibold p-5">
        Wishlist
      </h2>
      <div className="max-w-7xl mx-auto">
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
              There are{" "}
              <span className="text-red-600">{searchProducts.length}</span>{" "}
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
            {searchProducts?.map((product) => (
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
                    onClick={() => navigate(`/product/${product._id}`)}
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
                          setSelectedProduct(product);
                          setModalOpen(true);
                        }}
                      >
                        <Eye className="w-3 h-3 sm:w-5 sm:h-5" />
                      </button>

                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 text-black bg-white font-bold hover:bg-red-500 hover:text-white cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/cart`);
                        }}
                      >
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4 " />
                      </Button>

                      <Button
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
                  <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
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
                          i < Math.floor(product.ratings)
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
                      ${product.discountPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    className={` cursor-pointer text-red-500 rounded-sm border border-red-500 hover:bg-red-500 hover:border-transparent bg-transparent hover:text-white transition-colors duration-300 text-xs sm:text-sm ${
                      layoutType === "list" ? "w-52" : "w-full"
                    }`}
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    ADD TO CART
                  </Button>
                </div>
              </div>
            ))}
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
