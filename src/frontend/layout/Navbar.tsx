import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import {
  FiMenu,
  FiMessageCircle,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//components imports
import MobileSidebar from "./MobileSlidebar";
import AccountModal from "./modal/AccountModal";
import ContactModal from "./modal/ContactModal";
import CartModal from "./modal/CartModal";
import UtilityNav from "./UtilityNav";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useLogoutMutation } from "@/redux/api/authApi";
import { toast } from "react-toastify";
import { clearUser } from "@/redux/reducer/userReducer";
import type { CartReducerInitialState } from "../types/types";
// import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isQuickContactOpen, setIsQuickContactOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const quickContactRef = useRef<HTMLDivElement | null>(null);

  const user = useSelector((state: RootState) => state.userReducer.user);
  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer,
  );

  const [logOut] = useLogoutMutation();

  const navigate = useNavigate();
  const Dispatch = useDispatch();

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        quickContactRef.current &&
        !quickContactRef.current.contains(event.target as Node)
      ) {
        setIsQuickContactOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("user");
      setIsUserMenuOpen(false);
      toast.success("Logout Successful");
      Dispatch(clearUser());
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Scrolling Banner */}
      <div className="bg-[#2C742F] text-white py-2 w-full overflow-hidden relative">
        <div className="relative flex-1">
          <div className="flex animate-marquee whitespace-nowrap text-sm font-medium text-[#F4C439]">
            <span className="mx-6">
              🎉 Summer Sale: Up to 70% off selected items
            </span>
            <span className="mx-6">
              🎉 Summer Sale: Up to 70% off selected items
            </span>
            <span className="mx-6">
              🎉 Summer Sale: Up to 70% off selected items
            </span>
            <span className="mx-6">
              🎉 Summer Sale: Up to 70% off selected items
            </span>
            {/* duplicated again for infinite scroll */}
            <span className="mx-6">
              🎉 Summer Sale: Up to 70% off selected items
            </span>
            <span className="mx-6">
              🎉 Summer Sale: Up to 70% off selected items
            </span>
            <span className="mx-6">
              🎉 Summer Sale: Up to 70% off selected items
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="font-poppins w-full sticky top-0 z-50">
        <div className="py-2 w-full bg-[#F3F9F1] border-b shadow-sm border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between gap-4 md:gap-8">
              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-[#333333]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <FiMenu size={24} />
              </button>

              {/* Logo */}
              <div className="w-20 hidden md:block">
                <Link to="/">
                  <img
                    src="/logo.png"
                    alt="TM E-commerce"
                    className="w-13 h-13 rounded-full "
                  />
                </Link>
              </div>

              {/* Search Bar - Hidden on Mobile */}
              <div className="flex flex-1 max-w-3xl">
                <div className="relative flex-1">
                  <div className="flex">
                    <button
                      className="hidden px-4 py-2 bg-[#F3F3F3] border border-r-0 border-gray-300 rounded-l-full text-neutral-dark hover:bg-[#9b949454] md:flex items-center gap-2 cursor-pointer"
                      onClick={() => navigate(`/all-products`)}
                    >
                      All Categories
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Search for items..."
                        className="w-full py-2 px-4 border text-[11px] sm:text-[16px] border-gray-300  rounded-r-full rounded-l-full md:rounded-l-none focus:outline-none focus:border-[#2C742F]"
                      />
                      <button className="absolute right-0 top-0 h-full px-6 bg-[#2C742F] hover:bg-[#236027] rounded-r-full  transition-colors cursor-pointer">
                        <BiSearch className="text-white text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-3 md:gap-6">
                {/*Contact Button */}
                <div className="relative hidden md:block" ref={quickContactRef}>
                  <button
                    onClick={() => setIsQuickContactOpen(!isQuickContactOpen)}
                    className="w-12 flex flex-col items-center cursor-pointer hover:scale-105"
                  >
                    <FiMessageCircle
                      size={24}
                      className="text-[#666666] group-hover:text-[#2C742F] transition-colors mb-1"
                    />
                    <span className="text-[10px] xl:text-[13px]">Contact</span>
                  </button>

                  {/* Contact Dropdown */}
                  {isQuickContactOpen && <ContactModal />}
                </div>

                {/* Cart Button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  data-cart-trigger
                  className="w-12 flex flex-col items-center cursor-pointer hover:scale-105"
                >
                  <div className="relative mb-1">
                    <FiShoppingCart
                      size={25}
                      className="text-[#666666] group-hover:text-[#2C742F] transition-colors"
                    />

                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#FF8A00] text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] xl:text-[13px]">Cart</span>
                </button>

                {/* Account Button */}
                {user ? (
                  <div className=" relative w-12" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="w-full flex flex-col items-center cursor-pointer hover:scale-105"
                    >
                      <div className="w-6 xl:w-7 h-6 xl:h-7 rounded-full bg-[#2C742F] text-white flex items-center justify-center mb-1">
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
                      <span className="text-[10px] xl:text-[13px]">
                        Account
                      </span>
                    </button>

                    {/* Account Dropdown Menu */}
                    {isUserMenuOpen && (
                      <AccountModal
                        user={user}
                        handleLogout={handleLogout}
                        setIsUserMenuOpen={() => setIsUserMenuOpen(false)}
                      />
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/sign-in")}
                    className="hidden md:flex w-12 flex-col items-center cursor-pointer hover:scale-105"
                  >
                    <FiUser
                      size={28}
                      className="text-[#666666] group-hover:text-[#2C742F] transition-colors mb-[3px]"
                    />
                    <span className="text-[10px] xl:text-[13px]">Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <UtilityNav />

        <MobileSidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </header>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
