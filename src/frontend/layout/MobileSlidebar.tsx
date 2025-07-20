import { StepForward } from "lucide-react";
import { useState } from "react";
import {
  FaAppleAlt,
  FaBreadSlice,
  FaCarrot,
  FaChevronDown,
  FaEgg,
  FaLeaf,
  FaMugHot,
} from "react-icons/fa";
import { GiHoneypot } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const categories = [
  {
    name: "Fresh Vegetables",
    icon: <FaCarrot className="text-[#2B7A0B]" />,
  },
  {
    name: "Fresh Fruits",
    icon: <FaAppleAlt className="text-[#FF6B6B]" />,
  },
  {
    name: "Bakery",
    icon: <FaBreadSlice className="text-[#FFB23F]" />,
  },
  {
    name: "Dairy & Eggs",
    icon: <FaEgg className="text-[#4A90E2]" />,
  },
  {
    name: "Honey",
    icon: <GiHoneypot className="text-[#D4A373]" />,
  },
  {
    name: "Tea & Coffee",
    icon: <FaMugHot className="text-[#3A5A40]" />,
  },
  {
    name: "Herbs",
    icon: <FaLeaf className="text-[#2D6A4F]" />,
  },
];

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="text-xl font-bold text-[#2C742F]">TMonowar</h2>
          <button
            onClick={onClose}
            className="p-2 bg-[#2C742F] rounded-full text-white cursor-pointer hover:bg-[#236027]"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-2">
            {/* Categories Dropdown */}
            <div className="px-4 shadow-sm">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center justify-between w-full py-3 text-left cursor-pointer"
              >
                <span className="text-gray-700 font-medium">
                  All Categories
                </span>
                <FaChevronDown
                  className={`transform transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isCategoryOpen ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className="space-y-1 pl-2 pb-3">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-3 w-full py-1 px-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                    >
                      <span className="text-xl font-bold text-[#0f4712]">
                        <StepForward className="text-[#61a827]" />
                      </span>
                      <span className="text-md font-medium text-[#236027]">
                        {category.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Links */}
            <div className=" mt-2 ">
              <Link
                to="#"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-[#236027]"
              >
                About Us
              </Link>
              <Link
                to="#"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-[#236027]"
              >
                Order Tracking
              </Link>
              <Link
                to="#"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-[#236027]"
              >
                Contact
              </Link>
              <Link
                to="#"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-[#236027]"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
