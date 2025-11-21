import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
// @ts-expect-error TS2307: Cannot find module
import "swiper/css";
// @ts-expect-error TS2307: Cannot find module
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import ProductModal from "./ProductModal";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import type {
  CartItem,
  CartReducerInitialState,
  CustomError,
  Product,
} from "@/frontend/types/types";
import { toast } from "react-toastify";
import ProductsSkelton from "../../utils/ProductsSkelton";
import { addToCart } from "@/redux/reducer/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
  type WishlistState,
} from "@/redux/reducer/wishlistReducer";

const FootwearProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null,
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer,
  );

  const { wishlistItems } = useSelector(
    (state: { wishlistReducer: WishlistState }) => state.wishlistReducer,
  );
  const { data, isLoading, isError, error } = useGetAllProductsQuery({
    category: "footwear",
    sort: "createdAt",
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
  const dispatch = useDispatch();

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
    <>
      <div className="bg-[#f6f7f9] py-6 ">
        <div>
          <div className="flex justify-between max-w-7xl mx-auto mb-5 xl:mb-8 px-5 lg:px-4">
            <div>
              <h2 className="text-xl sm:text-2xl xl:text-3xl font-bold text-gray-900 mb-2">
                Footwears
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Step into comfort and style with footwear designed for everyday
                wear.
              </p>
            </div>
            <div>
              <Link
                to={`/all-products?category=footwear`}
                className="flex items-center gap-1 text-md bg-gray-200 py-1 px-2 rounded-[3px] cursor-pointer hover:bg-gray-300 transition-colors"
              >
                View All <HiArrowLongRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Products Slider */}
          <div className="w-full overflow-x-auto relative">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="absolute left-7 xl:left-[calc((100%-1200px)/2)] top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer transition-colors block"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <Swiper
              onSwiper={setSwiperInstance}
              freeMode={true}
              modules={[FreeMode]}
              spaceBetween={10}
              slidesPerGroup={3}
              slidesPerView={"auto"}
              className="[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mySwiper"
            >
              {/* Dummy spacer for large screens */}
              <SwiperSlide className="!w-[calc((100%-1280px)/2)] !flex-shrink-0 hidden lg:!block ml-2" />

              {/* Product cards */}
              {isLoading ? (
                <ProductsSkelton />
              ) : (
                products?.map((product) => (
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
                          onClick={() => handleOpenModal(product)}
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
                          <span className="text-xs text-gray-500 ml-1">
                            {product.ratings}
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
                          className="w-full cursor-pointer text-black  rounded-sm border-[1px] border-black hover:bg-black hover:border-transparent bg-transparent hover:text-white transition-colors transition-border duration-300 text-xs sm:text-sm"
                        >
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

export default FootwearProducts;
