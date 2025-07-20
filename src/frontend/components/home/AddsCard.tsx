import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import headphonesImage from "@/assets/adsCard/headphone.jpg";
import phoneImage from "@/assets/adsCard/phone-product.jpg";
import shoesRedImage from "@/assets/adsCard/shoes2.jpg";
import sneakersImage from "@/assets/adsCard/sneakers-product.jpg";
import watchImage from "@/assets/adsCard/watch-product.jpg";

// Types
type CardData = {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  buttonText: string;
  bgColor: string;
  image: string;
  discount: string;
};

type AnimatedCardProps = {
  data: CardData;
  isLarge?: boolean;
};

// Data
const leftCardData: CardData[] = [
  {
    id: 1,
    title: "Big saving days sale",
    subtitle: "Apple iPhone 15 Pro Max 256 GB",
    price: "$1,35,900.00",
    originalPrice: "Starting At Only",
    buttonText: "SHOP NOW",
    bgColor: "bg-gradient-to-br from-purple-100 via-indigo-50 to-purple-100",
    image: phoneImage,
    discount: "15% OFF",
  },
  {
    id: 2,
    title: "Premium Audio Experience",
    subtitle: "Wireless Noise Cancelling Headphones",
    price: "$24,999.00",
    originalPrice: "Starting At Only",
    buttonText: "SHOP NOW",
    bgColor: "bg-gradient-to-br from-blue-400 via-indigo-300 to-purple-200",
    image: headphonesImage,
    discount: "25% OFF",
  },
  {
    id: 3,
    title: "Luxury Collection",
    subtitle: "Premium Smart Watch Series",
    price: "$45,000.00",
    originalPrice: "Starting At Only",
    buttonText: "SHOP NOW",
    bgColor: "bg-gradient-to-br from-amber-50 via-yellow-500 to-amber-300",
    image: watchImage,
    discount: "30% OFF",
  },
];

const rightCardsData: CardData[] = [
  {
    id: 1,
    title: "Sports Collection",
    subtitle: "Premium Running Shoes",
    price: "$8,999",
    buttonText: "SHOP NOW",
    bgColor: "bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-100",
    image: sneakersImage,
    discount: "40% OFF",
  },
  {
    id: 2,
    title: "Limited Edition",
    subtitle: "Designer Sneakers",
    price: "$12,500",
    buttonText: "SHOP NOW",
    bgColor: "bg-gradient-to-br from-red-100 via-pink-50 to-red-100",
    image: shoesRedImage,
    discount: "20% OFF",
  },
];

const AddsCard = () => {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged: (s) => setCurrentSlide(s.track.details.rel),
  });

  const [, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      slider.current?.next();
    }, 4000);
    return () => clearInterval(interval);
  }, [slider]);

  const AnimatedCard: React.FC<AnimatedCardProps> = ({
    data,
    isLarge = false,
  }) => (
    <div
      className={`${
        data.bgColor
      } rounded-2xl relative overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group ${
        isLarge ? "h-[400px]" : "h-[187px]"
      }`}
    >
      <div className="flex h-full">
        <div
          className={`relative ${isLarge ? "w-1/2" : "w-2/5"} overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/5 rounded-l-2xl"></div>
          <img
            src={data.image}
            alt={data.subtitle}
            className={`h-full w-full object-cover transform transition-all duration-1000 ease-out group-hover:scale-110`}
            // style={{
            //   animation: isLarge ? "slideInFromLeft 1s ease-out  both" : "",
            // }}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce">
              {data.discount}
            </span>
          </div>
        </div>

        <div
          className={`${
            isLarge ? "w-1/2 p-6" : "w-3/5 p-3"
          } flex flex-col justify-center relative z-10`}
        >
          <div className={`space-y-2 ${!isLarge ? "text-left" : ""}`}>
            <div className="overflow-hidden">
              <h3
                className={`font-bold text-gray-700 ${
                  isLarge ? "text-lg" : "text-sm"
                }`}
                style={{
                  animation: isLarge
                    ? "slideInFromFar 1s ease-out 0.4s both"
                    : "slideInSmall 0.8s ease-out 0.2s both",
                }}
              >
                {data.title}
              </h3>
            </div>
            <div className="overflow-hidden">
              <p
                className={`text-gray-600 font-medium ${
                  isLarge ? "text-base" : "text-xs"
                }`}
                style={{
                  animation: isLarge
                    ? "slideInFromFar 1s ease-out 0.6s both"
                    : "slideInSmall 0.8s ease-out 0.3s both",
                }}
              >
                {data.subtitle}
              </p>
            </div>

            {isLarge && data.originalPrice && (
              <div className="overflow-hidden">
                <p
                  className="text-gray-500 text-sm"
                  style={{ animation: "slideInFromFar 1s ease-out 0.8s both" }}
                >
                  {data.originalPrice}
                </p>
              </div>
            )}

            <div className="overflow-hidden">
              <p
                className={`font-bold text-red-600 ${
                  isLarge ? "text-2xl" : "text-lg"
                }`}
                style={{
                  animation: isLarge
                    ? "slideInFromFar 1s ease-out 1.0s both"
                    : "slideInSmall 0.8s ease-out 0.4s both",
                }}
              >
                {data.price}
              </p>
            </div>
          </div>

          <div className="overflow-hidden mt-4">
            <button
              className={`bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isLarge ? "text-sm" : "text-xs px-3 py-1"
              }`}
              style={{
                animation: isLarge
                  ? "slideInFromFar 1s ease-out 1.2s both"
                  : "slideInSmall 0.8s ease-out 0.5s both",
              }}
            >
              {data.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
          @keyframes slideInFromFar {
            0% { transform: translateX(120px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideInSmall {
            0% { transform: translateX(80px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
            @keyframes slideInFromLeft {
           0% { transform: translateX(-120px); opacity: 0; }
           100% { transform: translateX(0); opacity: 1; }
        }
        `}
      </style>
      <div className="bg-[#f6f7f9] py-5">
        <div className="container max-w-7xl mx-auto px-4 py-12 ">
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-5">
            {/* Left slider */}
            <div className="md:col-span-3 lg:col-span-4 relative">
              <div
                ref={sliderRef}
                className="keen-slider rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.4),_0_7px_13px_-3px_rgba(0,0,0,0.3),_inset_0_-3px_0px_rgba(0,0,0,0.2)]"
              >
                {leftCardData.map((slide) => (
                  <div className="keen-slider__slide" key={slide.id}>
                    <AnimatedCard data={slide} isLarge={true} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right stack */}
            <div className="md:space-y-6 md:col-span-2 lg:col-span-2 flex flex-row gap-2 md:block">
              {rightCardsData.map((card) => (
                <div
                  key={card.id}
                  className="rounded-2xl overflow-hidden  flex-1 shadow-[0_2px_4px_rgba(0,0,0,0.4),_0_7px_13px_-3px_rgba(0,0,0,0.3),_inset_0_-3px_0px_rgba(0,0,0,0.2)]"
                >
                  <AnimatedCard data={card} isLarge={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddsCard;
