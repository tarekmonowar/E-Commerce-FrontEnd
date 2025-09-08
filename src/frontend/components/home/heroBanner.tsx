import { Button } from "@/components/ui/button";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Shield,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const banners = [
  {
    id: 1,
    title: "Tarek Monowar E-Commerce",
    subtitle: "Premium Quality Products",
    description:
      "Discover amazing deals on top-quality products. Shop with confidence and enjoy fast delivery to your doorstep.",
    bgGradient: "from-sky-700 via-indigo-800 to-blue-900",
    image: "./banner/bannerImage1.avif",
    features: ["Fast Delivery", "Quality Assured", "Best Prices"],
    bottomBadges: [
      { text: "Certified Products", icon: Shield },
      { text: "Fast Delivery", icon: Truck },
    ],
  },
  {
    id: 2,
    title: "Tarek Monowar Store",
    subtitle: "Fashion & Electronics",
    description:
      "Explore our vast collection of fashion, electronics, and lifestyle products. Everything you need in one place.",
    bgGradient: "from-slate-700 via-gray-800 to-cyan-900",
    image: "./banner/bannerImage2.avif",
    features: ["Latest Fashion", "Electronics", "Home & Living"],
    bottomBadges: [
      { text: "Premium Quality", icon: Award },

      { text: "Secure Payment", icon: Star },
    ],
  },
  {
    id: 3,
    title: "Tarek Monowar Shop",
    subtitle: "Special Offers Daily",
    description:
      "Don't miss out on our daily special offers. Save big on your favorite brands and discover new products every day.",

    bgGradient: "from-cyan-700 via-teal-600 to-emerald-500",
    image: "./banner/bannerImage3.avif",
    features: ["Daily Deals", "Big Savings", "New Arrivals"],
    bottomBadges: [
      { text: "Money Back", icon: Shield },
      { text: "24/7 Support", icon: Award },
    ],
  },
  {
    id: 4,
    title: "Tarek Monowar Market",
    subtitle: "Your Shopping Destination",
    description:
      "Experience seamless online shopping with our user-friendly platform. Quality products, competitive prices.",
    bgGradient: "from-emerald-800 via-green-900 to-slate-900",
    image: "./banner/bannerimage5.png",
    features: ["Easy Shopping", "Secure Payment", "24/7 Support"],
    bottomBadges: [
      { text: "Global Shipping", icon: Truck },
      { text: "Top Rated", icon: Star },
    ],
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  //for side banner
  const getPrevIndex = () =>
    (currentSlide - 1 + banners.length) % banners.length;
  const getNextIndex = () => (currentSlide + 1) % banners.length;

  //main banner code
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    mode: "snap",
    created: () => setCurrentSlide(0),
    slideChanged: (s) => setCurrentSlide(s.track.details.rel),
  });

  // Autoplay
  useEffect(() => {
    if (!instanceRef.current) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);

    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]  rounded-lg shadow-2xl ">
      {/* Right Side Banner */}
      <div className="absolute hidden [@media(min-width:1880px)]:flex right-[calc((100%-1280px)/2-12%)] sm:right-[calc((100%-1280px)/2-18%)] md:right-[calc((100%-1280px)/2-20%)] top-0 w-[20%] h-full z-20 items-center justify-center mr-4 ">
        <div
          className={`w-full h-[70%] sm:h-[75%] md:h-[80%] bg-gradient-to-br ${
            banners[getNextIndex()].bgGradient
          } cursor-pointer transition-all duration-700 hover:scale-105 shadow-lg hover:shadow-2xl rounded-r-2xl group`}
        >
          <div className="relative w-full h-full p-4 text-white overflow-hidden rounded-r-2xl">
            <div className="absolute inset-0 bg-black/30 rounded-r-2xl" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold truncate">
                  {banners[getNextIndex()].title.split(" ")[0]}
                </h3>
                <p className="text-xs opacity-90 truncate">
                  {banners[getNextIndex()].subtitle}
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center my-2 sm:my-3 md:my-4">
                <img
                  src={banners[getNextIndex()].image}
                  alt={banners[getNextIndex()].title}
                  className="w-full h-16 sm:h-20 md:h-24 lg:h-32 object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* left Side Banner */}
      <div className="absolute hidden [@media(min-width:1880px)]:flex  left-[calc((100%-1280px)/2-12%)] sm:left-[calc((100%-1280px)/2-18%)] md:left-[calc((100%-1280px)/2-20%)] top-0 w-[15%] sm:w-[18%] md:w-[20%] h-full z-20 items-center justify-center ml-4">
        <div
          className={`w-full h-[70%] sm:h-[75%] md:h-[80%] bg-gradient-to-br ${
            banners[getPrevIndex()].bgGradient
          } cursor-pointer transition-all duration-700 hover:scale-105 shadow-lg hover:shadow-2xl rounded-l-2xl group`}
        >
          <div className="relative w-full h-full p-2 sm:p-3 md:p-4 lg:p-6 text-white overflow-hidden rounded-l-2xl">
            <div className="absolute inset-0 bg-black/30 rounded-l-2xl"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-1 sm:mb-2 truncate">
                  {banners[getPrevIndex()].title.split(" ")[0]}
                </h3>
                <p className="text-xs sm:text-sm opacity-90 truncate">
                  {banners[getPrevIndex()].subtitle}
                </p>
              </div>

              <div className="flex-1 flex items-center justify-center my-2 sm:my-3 md:my-4">
                <img
                  src={banners[getPrevIndex()].image}
                  alt={banners[getPrevIndex()].title}
                  className="w-full h-16 sm:h-20 md:h-24 lg:h-32 object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Banner div */}
      <div
        ref={sliderRef}
        className="keen-slider h-full rounded-lg w-[70%] sm:w-[64%] md:w-[60%] shadow-[0_2px_4px_rgba(0,0,0,0.4),_0_7px_13px_-3px_rgba(0,0,0,0.3),_inset_0_-3px_0px_rgba(0,0,0,0.2)]"
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`keen-slider__slide relative min-w-full  h-full bg-gradient-to-r ${banner.bgGradient} flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20`}
          >
            {/* Left side: Text & buttons */}
            <div className="flex-1 text-white z-10">
              <div className="max-w-xl lg:max-w-2xl">
                <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  {banner.subtitle}
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                  {banner.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 line-clamp-2 sm:line-clamp-none">
                  {banner.description}
                </p>
                {/* Features */}
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
                  {banner.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1.5 sm:px-4 sm:py-2"
                    >
                      {index === 0 && (
                        <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                      {index === 1 && (
                        <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                      {index === 2 && (
                        <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                      <span className="text-xs sm:text-sm font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Buttons */}
                <div className="flex flex-row space-y-2 sm:space-y-0 gap-2 sm:gap-0 sm:space-x-4 pb-2">
                  <Link to="/all-products">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                      Shop Now
                    </Button>
                  </Link>
                  <Link to="/all-products">
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white cursor-pointer px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
                    >
                      View Products
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side: Image */}
            <div className="hidden md:flex flex-1 justify-end items-center">
              <div className="relative w-80 h-80 xl:w-96 xl:h-96">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="relative w-full h-full object-cover rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Bottom badges */}
            <div className="hidden lg:flex absolute bottom-3 right-20 flex-wrap gap-2 sm:gap-3 z-10">
              {banner.bottomBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-1.5 bg-white [box-shadow:0px_2px_8px_0px_rgba(99,99,99,0.2)] text-gray-700 backdrop-blur-sm px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs xl:text-sm font-medium shadow-lg"
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 z-10 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 z-10 cursor-pointer"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Dots */}
      <div className="hidden xl:flex absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2  space-x-2 sm:space-x-3 z-10">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
