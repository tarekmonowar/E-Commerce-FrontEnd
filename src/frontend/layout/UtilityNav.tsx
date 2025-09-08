import type { WishlistState } from "@/redux/reducer/wishlistReducer";
import { ChevronsDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { BsHeadset } from "react-icons/bs";
import { FaRegPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const categories = [
  {
    name: "Fashion",
    icon: FaRegPlusSquare,
    color: "text-green-600",
  },
  {
    name: "Groceries",
    icon: FaRegPlusSquare,
  },
  {
    name: "Beauty",
    icon: FaRegPlusSquare,
    color: "text-red-800",
  },
  {
    name: "Footwear",
    icon: FaRegPlusSquare,
    color: "text-blue-800",
  },
  {
    name: "Electronics",
    icon: FaRegPlusSquare,
    color: "text-amber-600",
  },

  {
    name: "Jewellery",
    icon: FaRegPlusSquare,
    color: "text-[#2C742F]",
  },
  {
    name: "Gifts",
    icon: FaRegPlusSquare,
    color: "text-blue-700",
  },
];

const UtilityNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const allCategoriesRef = useRef<HTMLDivElement | null>(null);

  const { wishlistItems } = useSelector(
    (state: { wishlistReducer: WishlistState }) => state.wishlistReducer,
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        allCategoriesRef.current &&
        !allCategoriesRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className=" bg-gray-50 border-b border-gray-200 relative ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Browse Categories Button */}
          <div className="relative hidden md:block" ref={allCategoriesRef}>
            <button
              className="flex items-center gap-2 bg-[#2C742F] text-white px-6 py-3 rounded-[4px] hover:bg-primary-dark transition-colors cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <BiCategory className="text-xl" />
              <span>
                <span className="hidden lg:inline">All</span> Categories
              </span>
              <ChevronsDown
                className={`transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-56 bg-white mt-2  border border-gray-100 rounded-md shadow-2xl py-2 z-50">
                <div className="flex flex-col py-2  transition-colors ">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="relative px-4 py-[7px] text-gray-700 hover:bg-gray-100 group"
                    >
                      <Link
                        to={`/all-products?category=${category.name.toLowerCase()}`}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <category.icon
                            size={14}
                            className={`${category.color} group-hover:scale-110 transition-transform`}
                          />
                          <span className="font-medium  transition-colors">
                            {category.name}
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Center Menu Items */}
          <div className="flex items-center gap-3 sm:gap-5 md:gap-8 px-3 text-sm lg:text-[16px]">
            <Link
              to="/all-products"
              className="relative inline-block py-3 text-neutral-dark transition-colors duration-300 
             after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-[2px]
             after:bg-[#236027] after:origin-center after:scale-x-0
             after:transition-transform after:duration-300 hover:after:scale-x-100 ease-in-out"
            >
              <span className="hidden lg:inline">All</span> Products
            </Link>

            <Link
              to={"/my-account"}
              className="relative inline-block py-3 text-neutral-dark transition-colors duration-300 
             after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-[2px]
             after:bg-[#236027] after:origin-center after:scale-x-0
             after:transition-transform after:duration-300 hover:after:scale-x-100 ease-in-out"
            >
              <span className="hidden lg:inline">My</span> Accounts
            </Link>
            <Link
              to={"/order-tracking"}
              className="relative inline-block py-3 text-neutral-dark transition-colors duration-300 
             after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-[2px]
             after:bg-[#236027] after:origin-center after:scale-x-0
             after:transition-transform after:duration-300 hover:after:scale-x-100 ease-in-out"
            >
              <span className="hidden lg:inline">Order</span> Tracking
            </Link>
            <Link
              to="/footerLink/contact"
              className="relative hidden [@media(min-width:399px)]:inline-block py-3 text-neutral-dark transition-colors duration-300 
             after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-[2px]
             after:bg-[#236027] after:origin-center after:scale-x-0
             after:transition-transform after:duration-300 hover:after:scale-x-100 ease-in-out"
            >
              Contact
            </Link>
            <div className="relative">
              <Link
                to="/wishlist"
                className="relative inline-block py-3 text-neutral-dark transition-colors duration-300 
             after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-[2px]
             after:bg-[#236027] after:origin-center after:scale-x-0
             after:transition-transform after:duration-300  hover:after:scale-x-100 ease-in-out"
              >
                Wishlist
              </Link>
              {wishlistItems.length > 0 && (
                <span className="absolute top-0 -right-1 bg-[#2C742F] text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </div>
          </div>

          {/* Customer Support */}
          <div className="items-center gap-2 md:gap-1 lg:gap-2  text-neutral-dark hidden [@media(min-width:520px)]:flex">
            <BsHeadset className="text-2xl sm:text-xl lg:text-3xl font-bold text-[#2C742F]" />
            <div className="flex flex-col">
              <span className="text-sm sm:text-[12px] lg:text-lg font-medium text-[#2C742F]">
                +099620187
              </span>
              <span className="text-xs text-neutral">
                24 <span className="text-gray-400">/</span> 7{" "}
                <span className="hidden lg:inline ">Customer</span> support
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityNav;
