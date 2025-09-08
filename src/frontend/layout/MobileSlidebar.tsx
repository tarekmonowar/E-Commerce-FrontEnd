import type { RootState } from "@/redux/store";
import { useState } from "react";
import { FaChevronDown, FaRegPlusSquare } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  handleLogout: () => void;
};

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
const MobileSidebar = ({
  isOpen,
  onClose,
  handleLogout,
}: MobileSidebarProps) => {
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleLogoutClick = () => {
    handleLogout();
    onClose();
  };
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          {user ? (
            <>
              <div className="h-10 w-10">
                {" "}
                {user.picture ? (
                  <img
                    src={user.picture.url}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <img
                    src="/default-avatar.png"
                    alt="Default Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>
              <p className="text-sm">{user.name}</p>
            </>
          ) : (
            <h2 className="text-xl font-bold text-[#2C742F]">E-Commerce</h2>
          )}
          <button
            onClick={onClose}
            className="p-2 bg-[#2C742F] rounded-full text-white cursor-pointer hover:bg-[#236027]"
          >
            <IoClose className="text-xl" />
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
                    <div
                      key={index}
                      className="relative px-4 py-[4px] text-gray-700 hover:bg-gray-100 group"
                    >
                      <Link
                        to={`/all-products?category=${category.name.toLowerCase()}`}
                        onClick={onClose}
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
            </div>

            {/* Other Links */}
            {user ? (
              <div className="mt-3 font-semibold">
                <Link
                  to="/"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-[#236027]"
                  onClick={onClose}
                >
                  Home
                </Link>
                <Link
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-[#236027]"
                  to="/my-account"
                  onClick={onClose}
                >
                  My Account
                </Link>
                <Link
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-[#236027]"
                  to="/my-orders"
                  onClick={onClose}
                >
                  My Orders
                </Link>
                <Link
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-[#236027]"
                  to="/wishlist"
                  onClick={onClose}
                >
                  Wishlist
                </Link>
                <button
                  className="block px-4 py-3 w-full text-left cursor-pointer text-red-400 hover:bg-gray-200 hover:text-red-700"
                  onClick={handleLogoutClick}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className=" mt-2 font-semibold ">
                <Link
                  to="/"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-[#236027]"
                  onClick={onClose}
                >
                  Home
                </Link>
                <Link
                  to="/sign-in"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-[#236027]"
                  onClick={onClose}
                >
                  Sign In
                </Link>
                <Link
                  to="/footerLink/contact"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-[#236027]"
                  onClick={onClose}
                >
                  Contact
                </Link>
                <Link
                  to="/footerLink/about-us"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-[#236027]"
                  onClick={onClose}
                >
                  About Us
                </Link>
                <Link
                  to="/wishlist"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-[#236027]"
                  onClick={onClose}
                >
                  Wishlist
                </Link>
                <Link
                  to="/footerLink/faqs"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-[#236027]"
                  onClick={onClose}
                >
                  FAQ
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
