import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetAllProductsQuery,
  useProductPriceRangeQuery,
  useProductsCategoriesQuery,
} from "@/redux/api/productApi";
import { addToCart } from "@/redux/reducer/cartReducer.ts";
import {
  addToWishlist,
  removeFromWishlist,
  type WishlistState,
} from "@/redux/reducer/wishlistReducer.ts";
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
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductModal from "../components/home/products/ProductModal";
import AllProductsSkeleton from "../components/utils/AllProductsSkelton.tsx";
import PriceRangeSlider from "../components/utils/PriceRangeSlider";
import type {
  CartItem,
  CartReducerInitialState,
  CustomError,
  Product,
} from "../types/types";

export default function AllProducts() {
  const [searchParams] = useSearchParams();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [maxPriceInput, setMaxPriceInput] = useState(5000);
  const [minPrice, setMinPrice] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [layoutType, setLayoutType] = useState<"grid" | "list">("grid");
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchTermFromURL = searchParams.get("searchTerm") || "";

  const queryParams = useMemo(() => {
    const query: Record<string, string> = {};

    // Categories as comma-separated string if selected
    if (selectedCategories.length > 0) {
      query.category = selectedCategories.join(",");
    }

    // Ratings as comma-separated string if selected
    if (selectedRatings.length > 0) {
      query.ratings = selectedRatings.join(",");
    }
    // Price range filters
    query["discountPrice[gte]"] = String(minPrice);
    query["discountPrice[lte]"] = String(maxPrice);

    // Sorting
    if (sort === "asc") query.sort = "discountPrice"; // ascending
    else if (sort === "dsc") query.sort = "-discountPrice"; // descending
    else query.sort = "-createdAt"; // default sort

    // Search term from URL
    if (searchTermFromURL) {
      query.searchTerm = searchTermFromURL;
    }

    query.page = String(currentPage);
    return query;
  }, [
    selectedCategories,
    selectedRatings,
    minPrice,
    maxPrice,
    sort,
    searchTermFromURL,
    currentPage,
  ]);

  // {
  //     "discountPrice[gte]": "1",
  //     "discountPrice[lte]": "250",
  //     "category": "fashion,jewellery",
  //     "sort": "-discountPrice",
  //     "ratings": ratings.join(","),
  //   }

  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer,
  );

  const { wishlistItems } = useSelector(
    (state: { wishlistReducer: WishlistState }) => state.wishlistReducer,
  );
  const { data, isError, error, isLoading } =
    useGetAllProductsQuery(queryParams);
  const { data: priceRangeData } = useProductPriceRangeQuery();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useProductsCategoriesQuery();

  console.log(data);

  const products = data?.data as Product[];

  const totalProducts = data?.meta?.total || 20;
  const totalPage = data?.meta?.totalPage || 1;

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  //price range
  useEffect(() => {
    if (priceRangeData?.data) {
      const thresholds = [500, 1000, 1500, 2000, 3000, 5000, 10000];
      const rawMax = Number(priceRangeData.data.maxPrice);

      let professionalMax = thresholds.find((t) => rawMax <= t);
      if (!professionalMax) {
        professionalMax = Math.ceil(rawMax / 1000) * 1000;
      }

      setMaxPrice(professionalMax);
      setMaxPriceInput(professionalMax);
    }
  }, [priceRangeData?.data]);

  const categoriesDemo = ["fashion", "electronics", "bags"];

  const AllCategories = categoriesData?.data
    ? categoriesData.data
    : categoriesDemo;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams, currentPage]);

  useEffect(() => {
    const initialCategory = searchParams.get("category");
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
    // console.log("Category selected:", cat);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating],
    );
    // console.log("Rating selected:", rating);
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
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

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

  //*Wishlist Handler
  const addToWishlistHandler = (productId: string) => {
    const alreadyInWishlist = wishlistItems.includes(productId);

    if (alreadyInWishlist) {
      dispatch(removeFromWishlist(productId));
      toast.info("Removed from wishlist");
    } else {
      dispatch(addToWishlist(productId));
      toast.success("Added to wishlist!");
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="flex max-w-[1450px] mx-auto w-full pt-10">
        {/* Sticky Sidebar */}
        <div className=" w-40 sm:w-52 md:w-72 bg-gray-100 h-[90vh] mb-5 rounded-sm px-5 py-6 flex-shrink-0 sticky top-32 self-start [box-shadow:rgba(9,30,66,0.25)_0px_1px_1px,rgba(9,30,66,0.13)_0px_0px_1px_1px]">
          {/* Shop by Category */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setCategoryExpanded(!categoryExpanded)}
            >
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">
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
                {categoriesLoading ? (
                  <div>
                    {[...Array(6)].map(() => (
                      <div className="flex items-center gap-2 mt-2">
                        <Skeleton className="w-6 h-6 rounded bg-gray-400 " />
                        <Skeleton className="h-6 rounded bg-gray-400 w-[70%] " />
                      </div>
                    ))}
                  </div>
                ) : (
                  AllCategories?.map((cat) => (
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
                  ))
                )}
              </div>
            )}
          </div>

          {/* Filter By Price */}
          <div className="mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
              Filter By Price
            </h3>
            <div className="sm:px-2">
              <PriceRangeSlider
                min={0}
                max={maxPriceInput}
                minValue={minPrice}
                maxValue={maxPrice}
                onChange={(min, max) => {
                  setMinPrice(min);
                  setMaxPrice(max);
                }}
              />
            </div>
          </div>

          {/* Filter By Rating */}
          <div className="mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
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
                    className="ml-2 flex items-center cursor-pointer gap-1"
                  >
                    <div className="flex">{getRatingStars(rating)}</div>
                    <span className="text-sm hidden sm:block text-gray-700">
                      {" "}
                      ({rating})
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 lg:pl-5 pb-5">
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
                There are <span className="text-red-600">{totalProducts}</span>{" "}
                products.
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-gray-600 ">Sort By</span>
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
              {isLoading ? (
                <AllProductsSkeleton layoutType={layoutType} />
              ) : products && products.length > 0 ? (
                products?.map((product) => (
                  <div
                    key={product._id}
                    className={`bg-white rounded-sm [box-shadow:rgba(9,30,66,0.25)_0px_1px_1px,rgba(9,30,66,0.13)_0px_0px_1px_1px] hover:[box-shadow:rgba(0,0,0,0.25)_0px_0.0625em_0.0625em,rgba(0,0,0,0.25)_0px_0.125em_0.5em,rgba(255,255,255,0.1)_0px_0px_0px_1px_inset] transition-all duration-300 group mb-1 ${
                      layoutType === "list" ? "flex gap-10 h-[200px]" : ""
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
                          layoutType === "list" ? "h-full w-80" : "h-40 sm:h-48"
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
                              addToWishlistHandler(product._id);
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
                              i < Math.floor(product.ratings!)
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
              ) : (
                <div className="py-10  ">
                  <p className="text-gray-500 text-sm  md:text-lg font-medium">
                    No products found.
                  </p>
                  <p className="text-gray-500 text-sm  md:text-lg font-medium w-[400px] hidden md:block">
                    Please clear or change your filters.
                  </p>
                </div>
              )}
            </div>

            {totalPage > 1 && (
              <div className="my-7">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className={
                          currentPage === 1
                            ? " opacity-50 bg-gray-300 rounded mr-2 py-[5px] pr-4 border-none pointer-events-none"
                            : "cursor-pointer bg-[#236027] hover:bg-[#2C742F] text-white rounded mr-2 py-1 pr-4 border-none"
                        }
                      />
                    </PaginationItem>
                    <PaginationItem className="px-4">
                      <span className="text-red-800 font-bold">
                        {currentPage}
                      </span>{" "}
                      <span className="px-2">Of</span> {totalPage}
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className={
                          currentPage === totalPage
                            ? "pointer-events-none opacity-50 bg-gray-300 rounded ml-2 py-1 pl-4 border-none"
                            : "cursor-pointer bg-[#236027] hover:bg-[#2C742F] text-white rounded ml-2 py-1 pl-4 border-none"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
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

// //
// // ✅ Constants moved outside to avoid re-creation on each render
// const PRICE_THRESHOLDS = [500, 1000, 1500, 2000, 3000, 5000, 10000];
// const DEMO_CATEGORIES = [
//   "fashion",
//   "electronics",
//   "bags",
//   "footwear",
//   "groceries",
//   "beauty",
//   "wellness",
//   "jewellery",
//   "home & garden",
//   "sports",
//   "automotive",
//   "books",
// ];

// export const ProductsPage = () => {
//   const dispatch = useDispatch();
//   const { cartItems } = useSelector(
//     (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
//   );

//   // 🔹 Memoized Query Params
//   const queryParams = useMemo(() => {
//     const query: Record<string, string> = {};

//     if (selectedCategories.length)
//       query.category = selectedCategories.join(",");

//     if (selectedRatings.length)
//       query.ratings = selectedRatings.join(",");

//     query["discountPrice[gte]"] = String(minPrice);
//     query["discountPrice[lte]"] = String(maxPrice);

//     query.sort =
//       sort === "asc"
//         ? "discountPrice"
//         : sort === "dsc"
//         ? "-discountPrice"
//         : "-createdAt";

//     return query;
//   }, [selectedCategories, selectedRatings, minPrice, maxPrice, sort]);

//   // 🔹 API Calls
//   const { data, isError, error, isLoading } = useGetAllProductsQuery(queryParams);
//   const { data: priceRangeData } = useProductPriceRangeQuery();
//   const { data: categoriesData, isLoading: categoriesLoading } = useProductsCategoriesQuery();

//   const products = data?.data ?? [];
//   const categories = categoriesData?.data ?? DEMO_CATEGORIES;

//   // 🔹 Error Handling (cleaner)
//   useEffect(() => {
//     if (isError) {
//       const err = error as CustomError;
//       toast.error(err?.data?.message || "Something went wrong");
//     }
//   }, [isError, error]);

//   // 🔹 Price Range Normalization
//   useEffect(() => {
//     if (!priceRangeData?.data) return;
//     const rawMax = Number(priceRangeData.data.maxPrice);
//     let professionalMax = PRICE_THRESHOLDS.find((t) => rawMax <= t);
//     if (!professionalMax) professionalMax = Math.ceil(rawMax / 1000) * 1000;

//     setMaxPrice(professionalMax);
//     setMaxPriceInput(professionalMax);
//   }, [priceRangeData?.data]);

//   // 🔹 Scroll to top on param change
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [searchParams]);

//   // 🔹 Category from URL
//   useEffect(() => {
//     const initialCategory = searchParams.get("category");
//     if (initialCategory) setSelectedCategories([initialCategory]);
//   }, [searchParams]);

//   // 🔹 Handlers (memoized)
//   const handleCategoryChange = useCallback((cat: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
//     );
//   }, []);

//   const handleRatingChange = useCallback((rating: number) => {
//     setSelectedRatings((prev) =>
//       prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
//     );
//   }, []);

//   const addToCartHandler = useCallback(
//     (cartItem: CartItem) => {
//       if (cartItem.stock < 1) return toast.error("Out of Stock");

//       const alreadyInCart = cartItems.some(
//         (item) => item.productId === cartItem.productId
//       );
//       if (alreadyInCart) return toast.error("Item already in cart");

//       dispatch(addToCart(cartItem));
//       toast.success("Item added to cart!");
//     },
//     [cartItems, dispatch]
//   );

//   // 🔹 Utility rendering
//   const getRatingStars = useCallback((rating: number) => {
//     return [...Array(5)].map((_, i) => (
//       <Star
//         key={i}
//         className={`w-5 h-5 ${
//           i < rating ? "fill-yellow-600 text-yellow-600" : "text-gray-400"
//         }`}
//       />
//     ));
//   }, []);

//   return (
//     <div>
//       {isLoading ? (
//         <p>Loading products...</p> // 👉 Replace with skeleton loader
//       ) : (
//         products.map((product) => (
//           <ProductCard
//             key={product._id}
//             product={product}
//             addToCart={addToCartHandler}
//             getRatingStars={getRatingStars}
//           />
//         ))
//       )}
//     </div>
//   );
// };

// //
