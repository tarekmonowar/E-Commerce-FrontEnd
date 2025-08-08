import { ChevronsDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { BsHeadset } from "react-icons/bs";
import { FaRegPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

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
];

const UtilityNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const allCategoriesRef = useRef<HTMLDivElement | null>(null);

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
    <div className=" bg-gray-50 border-b border-gray-200 relative hidden md:block">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Browse Categories Button */}
          <div className="relative " ref={allCategoriesRef}>
            <button
              className="flex items-center gap-2 bg-[#2C742F] text-white px-6 py-3 rounded-[4px] hover:bg-primary-dark transition-colors cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <BiCategory className="text-xl" />
              <span>All Categories</span>
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
                            size={22}
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
          <div className="flex items-center gap-8">
            <Link
              to="/all-products"
              className="relative inline-block py-3 text-neutral-dark transition-colors duration-300 
             after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-[2px]
             after:bg-[#236027] after:origin-center after:scale-x-0
             after:transition-transform after:duration-300 hover:after:scale-x-100 ease-in-out"
            >
              All Products
            </Link>

            <Link
              to={"/my-account"}
              className="relative inline-block py-3 text-neutral-dark transition-colors duration-300 
             after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-[2px]
             after:bg-[#236027] after:origin-center after:scale-x-0
             after:transition-transform after:duration-300 hover:after:scale-x-100 ease-in-out"
            >
              My Accounts
            </Link>
            <Link
              to={"/order-tracking"}
              className="relative inline-block py-3 text-neutral-dark transition-colors duration-300 
             after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-[2px]
             after:bg-[#236027] after:origin-center after:scale-x-0
             after:transition-transform after:duration-300 hover:after:scale-x-100 ease-in-out"
            >
              Order Tracking
            </Link>
            <Link
              to="/footerLink/contact"
              className="relative inline-block py-3 text-neutral-dark transition-colors duration-300 
             after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-[2px]
             after:bg-[#236027] after:origin-center after:scale-x-0
             after:transition-transform after:duration-300 hover:after:scale-x-100 ease-in-out"
            >
              Contact
            </Link>
            <Link
              to="/footerLink/faqs"
              className="relative inline-block py-3 text-neutral-dark transition-colors duration-300 
             after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-[2px]
             after:bg-[#236027] after:origin-center after:scale-x-0
             after:transition-transform after:duration-300  hover:after:scale-x-100 ease-in-out"
            >
              FAQ
            </Link>
          </div>

          {/* Customer Support */}
          <div className="flex items-center gap-2 text-neutral-dark">
            <BsHeadset className="text-3xl font-bold text-[#2C742F]" />
            <div className="flex flex-col">
              <span className="text-lg font-medium text-[#2C742F]">
                +0996201872
              </span>
              <span className="text-xs text-neutral">
                24 <span className="text-gray-400">/</span> 7 Customer support
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityNav;
