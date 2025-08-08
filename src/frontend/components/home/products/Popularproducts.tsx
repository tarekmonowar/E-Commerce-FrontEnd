import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
// @ts-expect-error TS2307: Cannot find module
import "swiper/css";
import type { CustomError, Product } from "@/frontend/types/types";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { toast } from "react-toastify";
// @ts-expect-error TS2307: Cannot find module
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import ProductsSkelton from "../../utils/ProductsSkelton";
import ProductModal from "./ProductModal";

const AllCategories = [
  "all",
  "fashion",
  "electronics",
  "bags",
  "footwear",
  "groceries",
  "beauty",
  "wellness",
  "jewellery",
];

const LatestProducts = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null,
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading, isError, error } = useGetAllProductsQuery({
    sort: "-ratings -numOfReviews",
  });

  const products = data?.data as Product[];

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const navigate = useNavigate();

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    return activeCategory === "all"
      ? products
      : products?.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <>
      <div className="bg-[#f6f7f9] py-6 ">
        <div>
          <div className="max-w-7xl mx-auto mb-6 xl:mb-10 px-5 lg:px-4">
            <h2 className="text-xl sm:text-2xl xl:text-3xl font-bold text-gray-900 mb-2">
              Popular Products
            </h2>
            <p className="text-sm sm:text-base  text-gray-600">
              Do not miss the current offers until the end of{" "}
              <span className="text-[#2C742F] font-bold">
                {new Date().toLocaleString("en-US", { month: "long" })} !
              </span>
            </p>
          </div>
          {/* Category Tabs */}
          <div className="px-5 lg:px-4 max-w-7xl mx-auto mb-6 xl:mb-10 flex flex-wrap gap-2 xl:gap-4 overflow-x-auto scrollbar-hide">
            {AllCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 sm:px-4 xl:px-5 py-2 xl:py-2 rounded-[4px] mb-1 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === category
                    ? "bg-[#236027] text-[#ffca2c]"
                    : "bg-white [box-shadow:0px_2px_8px_0px_rgba(99,99,99,0.2)] text-gray-700  hover:font-bold"
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Products Slider */}
          <div
            className="w-full overflow-x-auto relative"
            key={`${activeCategory}-${products?.map((p) => p._id).join(",")}`}
          >
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="absolute left-7 xl:left-[calc((100%-1200px)/2)] top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer transition-colors block"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <Swiper
              key={`${activeCategory}-${filteredProducts
                ?.map((p) => p._id)
                .join(",")}`}
              observer={true}
              observeParents={true}
              observeSlideChildren={true}
              onSwiper={setSwiperInstance}
              freeMode={true}
              modules={[FreeMode]}
              spaceBetween={10}
              slidesPerGroup={3}
              slidesPerView={"auto"}
              className="[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mySwiper"
            >
              {/* Dummy spacer for large screens */}
              <SwiperSlide className="!w-[calc((100%-1280px)/2)] !flex-shrink-0 hidden lg:!block" />
              {/* Dummy spacer for mobile */}
              <SwiperSlide className="!w-[10px] !flex-shrink-0 lg:!hidden" />

              {/* Product cards */}
              {isLoading ? (
                <ProductsSkelton />
              ) : (
                filteredProducts.map((product) => (
                  <SwiperSlide
                    key={product._id}
                    className="!w-64 !flex-shrink-0"
                  >
                    <div
                      className="bg-white rounded-sm [box-shadow:rgba(9,30,66,0.25)_0px_1px_1px,rgba(9,30,66,0.13)_0px_0px_1px_1px] hover:[box-shadow:rgba(0,0,0,0.25)_0px_0.0625em_0.0625em,rgba(0,0,0,0.25)_0px_0.125em_0.5em,rgba(255,255,255,0.1)_0px_0px_0px_1px_inset] transition-all duration-300 group mb-1"
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
                          className="relative h-40 sm:h-48 overflow-hidden cursor-pointer"
                          onClick={() => navigate(`/product/${product._id}`)}
                        >
                          <img
                            src={
                              hoveredProduct === product._id
                                ? product.photos[1]?.url
                                : product.photos[0]?.url
                            }
                            alt={product.name}
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
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
                                handleOpenModal(product);
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

                      <div className="p-3 sm:p-4">
                        <p className="text-xs text-gray-500 mb-1">
                          {product.brand}
                        </p>
                        <h3 className="text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base ">
                          {product.name}
                        </h3>

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
                          <span className="text-xs font-semibold text-gray-800 ml-1">
                            {product.ratings}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({product.numOfReviews})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex justify-between items-center gap-2 mb-3 pr-3">
                          <span className="text-xs sm:text-sm text-gray-400 line-through">
                            ${product.price.toLocaleString()}
                          </span>
                          <span className="text-base sm:text-lg  text-red-500">
                            ${product.discountPrice?.toLocaleString()}
                          </span>
                        </div>

                        {/* Add to Cart Button */}
                        {/* Add to Cart Button */}
                        <Button className="w-full cursor-pointer text-red-500 border rounded-sm border-red-400 hover:bg-black hover:border-transparent bg-transparent hover:text-white transition-colors transition-border duration-300 text-xs sm:text-sm">
                          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          ADD TO CART
                        </Button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              )}

              {/* Dummy spacer for mobile at the end */}
              <SwiperSlide className="!w-[10px] !flex-shrink-0 lg:!hidden" />
            </Swiper>

            <button
              onClick={() => swiperInstance?.slideNext()}
              className="absolute right-7 xl:right-24 top-1/2 hover:text-white -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-red-600 cursor-pointer transition-colors block"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
      {/* Modal */}
      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default LatestProducts;
