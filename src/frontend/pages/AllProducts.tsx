import { Button } from "@/components/ui/button";
import { Products as searchProducts } from "@/frontend/constant/products";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  Grid3X3,
  Heart,
  List,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductModal from "../components/home/products/ProductModal";
import type { ProductType } from "../constant/type";

export default function AllProducts() {
  const [searchParams] = useSearchParams();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );

  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(37716);
  const [minPrice, setMinPrice] = useState(2743);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [layoutType, setLayoutType] = useState<"grid" | "list">("grid");
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initialCategory = searchParams.get("category");
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
    }
  }, [searchParams]);
  console.log("Category selected:", selectedCategories);

  const AllCategories = [
    "fashion",
    "electronics",
    "bags",
    "footwear",
    "groceries",
    "beauty",
    "wellness",
    "jewellery",
    "home & garden",
    "sports",
    "automotive",
    "books",
  ];

  const handleCategoryChange = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
    console.log("Category selected:", cat);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating],
    );
    console.log("Rating selected:", rating);
  };

  const getRatingStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "fill-yellow-600 text-yellow-600" : "text-gray-400"
        }`}
      />
    ));
  };

  function toTitleCase(str: string) {
    return str
      .toLowerCase()
      .split(" ")
      .filter(Boolean) // remove empty strings if any
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex max-w-[1450px] mx-auto w-full pt-10">
        {/* Sticky Sidebar */}
        <div className="w-72 bg-gray-100 h-[90vh] rounded-sm px-5 py-6 flex-shrink-0 sticky top-32 self-start [box-shadow:rgba(9,30,66,0.25)_0px_1px_1px,rgba(9,30,66,0.13)_0px_0px_1px_1px]">
          {/* Shop by Category */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setCategoryExpanded(!categoryExpanded)}
            >
              <h3 className="text-base font-semibold text-gray-900">
                Shop by Category
              </h3>
              {categoryExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>

            {categoryExpanded && (
              <div className="mt-3 space-y-3 max-h-48 overflow-y-auto">
                {AllCategories.map((cat) => (
                  <div key={cat} className="flex items-center">
                    <input
                      type="checkbox"
                      id={cat}
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                      className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                    />
                    <label
                      htmlFor={cat}
                      className="ml-2 text-sm text-gray-700 cursor-pointer"
                    >
                      {toTitleCase(cat)}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filter By Price */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Filter By Price
            </h3>
            <div className="px-2">
              <div className="relative mb-1 h-8">
                <input
                  type="range"
                  min={2743}
                  max={37716}
                  value={minPrice}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value <= maxPrice) {
                      setMinPrice(value);
                      console.log("Min price selected:", value);
                    }
                  }}
                  className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer z-10"
                  style={{
                    background: `linear-gradient(to right, #ddd ${
                      ((minPrice - 2743) / (37716 - 2743)) * 100
                    }%, #ef4444 ${
                      ((minPrice - 2743) / (37716 - 2743)) * 100
                    }%, #ef4444 ${
                      ((maxPrice - 2743) / (37716 - 2743)) * 100
                    }%, #ddd ${((maxPrice - 2743) / (37716 - 2743)) * 100}%)`,
                  }}
                />
                <input
                  type="range"
                  min={2743}
                  max={37716}
                  value={maxPrice}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= minPrice) {
                      setMaxPrice(value);
                      console.log("Max price selected:", value);
                    }
                  }}
                  className="absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer z-20"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>From: Rs. {minPrice.toLocaleString()}</span>
                <span>To: Rs. {maxPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Filter By Rating */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Filter By Rating
            </h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`rating-${rating}`}
                    checked={selectedRatings.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="ml-2 flex items-center cursor-pointer"
                  >
                    <div className="flex">{getRatingStars(rating)}</div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 lg:pl-5">
          {/* Top Bar */}
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
                products.
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Sort By</span>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  console.log(
                    "Sort changed to:",
                    e.target.value === "asc"
                      ? "Price, Low To High"
                      : e.target.value === "dsc"
                      ? "Price, High To Low"
                      : "Default",
                  );
                }}
                className="p-2 bg-white/70 border border-gray-400 rounded cursor-pointer text-gray-900 focus:outline-none focus:border-gray-500"
              >
                <option value="">Default</option>
                <option value="asc">Price, Low To High</option>
                <option value="dsc">Price, High To Low</option>
              </select>
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
        </div>
      </div>

      {/* Modal */}
      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
