import type { Review } from "@/frontend/constant/type";
import RatingsComponent from "./ratings";
import { reviews } from "../../constant/rating";
// @ts-expect-error TS2307: Cannot find module
import "swiper/css";
// @ts-expect-error TS2307: Cannot find module
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FiEdit } from "react-icons/fi";

const user = {
  _id: "user_001",
};

export default function Reviews({
  onEdit,
}: {
  onEdit: (review: Review) => void;
}) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("all");

  const filteredReview =
    activeTab === "all"
      ? reviews
      : reviews.filter((review) => review.user._id === user._id);
  return (
    <>
      <div className="px-5 lg:px-4 max-w-7xl mx-auto mb-6 mt-6 flex flex-wrap gap-2 xl:gap-4 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3 sm:px-4 xl:px-5 py-2 xl:py-2 rounded-[4px] mb-1 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === "all"
              ? "bg-[#236027] text-[#ffca2c]"
              : "bg-white [box-shadow:0px_2px_8px_0px_rgba(99,99,99,0.2)] text-gray-700  hover:font-bold"
          }`}
        >
          All Reviews <span>({reviews.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("myReview")}
          className={`px-3 sm:px-4 xl:px-5 py-2 xl:py-2 rounded-[4px] mb-1 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === "myReview"
              ? "bg-[#236027] text-[#ffca2c]"
              : "bg-white [box-shadow:0px_2px_8px_0px_rgba(99,99,99,0.2)] text-gray-700  hover:font-bold"
          }`}
        >
          My Review
        </button>
      </div>
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
          <SwiperSlide className="!w-[calc((100%-1280px)/2)] !flex-shrink-0 hidden lg:!block" />
          {/* Dummy spacer for mobile */}
          <SwiperSlide className="!w-[10px] !flex-shrink-0 lg:!hidden" />

          {filteredReview.map((review, index) => (
            <SwiperSlide key={index} className="!w-64 !flex-shrink-0">
              <ReviewCard review={review} user={user} onEdit={onEdit} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={() => swiperInstance?.slideNext()}
          className="absolute right-7 xl:right-24 top-1/2 hover:text-white -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-red-600 cursor-pointer transition-colors block"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </>
  );
}

const ReviewCard = ({
  review,
  user,
  onEdit,
}: {
  review: Review;
  user?: { _id: string };
  onEdit: (review: Review) => void;
}) => (
  <div className="bg-white h-[170px] rounded-sm [box-shadow:rgba(9,30,66,0.25)_0px_1px_1px,rgba(9,30,66,0.13)_0px_0px_1px_1px] hover:[box-shadow:rgba(0,0,0,0.25)_0px_0.0625em_0.0625em,rgba(0,0,0,0.25)_0px_0.125em_0.5em,rgba(255,255,255,0.1)_0px_0px_0px_1px_inset] transition-all duration-300 group mb-1">
    <div className="pt-3 pl-4 text-sm flex justify-between">
      <RatingsComponent value={review.rating} />
      {user && user._id === review.user._id && (
        <button
          onClick={() => onEdit(review)}
          className="mr-4 cursor-pointer hover:bg-gray-500 bg-gray-200 p-1 rounded-full"
        >
          <FiEdit size={20} />
        </button>
      )}
    </div>
    <p className="p-3 text-sm text-justify">
      {review.comment.split(" ").slice(0, 15).join(" ")}
      {review.comment.split(" ").length > 15 ? "..." : ""}
    </p>

    <div className="flex items-center gap-4 px-3">
      <img
        className="h-10 w-10 rounded-full"
        src={review.user.photo}
        alt="User"
      />
      <small>{review.user.name}</small>
    </div>
  </div>
);
