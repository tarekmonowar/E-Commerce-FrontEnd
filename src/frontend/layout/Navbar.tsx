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
// import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isQuickContactOpen, setIsQuickContactOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const quickContactRef = useRef<HTMLDivElement | null>(null);
  // const { getCartCount } = useCart();
  // const { user, logOut } = useAuth();

  const user = {
    displayName: "jidjd",
    photoURL: "sfsfsf",
    email: "tarek@gmail.com",
    role: "admin",
  };

  const navigate = useNavigate();

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
      // await logOut();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <header className="font-poppins w-full fixed top-0 z-50">
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
                    className="w-15 h-15 rounded-full "
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
                      size={24}
                      className="text-[#666666] group-hover:text-[#2C742F] transition-colors"
                    />
                    {/* {getCartCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#FF8A00] text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                        {getCartCount()}
                      </span>
                    )} */}
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
                      <div className="w-6 xl:w-8 h-6 xl:h-8 rounded-full bg-[#2C742F] text-white flex items-center justify-center mb-1">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xs xl:text-xl font-bold">
                            {user.displayName
                              ? user.displayName[0].toUpperCase()
                              : "U"}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] xl:text-[13px]">
                        Account
                      </span>
                    </button>

                    {/* Account Dropdown Menu */}
                    {isUserMenuOpen && (
                      <AccountModal user={user} handleLogout={handleLogout} />
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/sign-in")}
                    className="hidden md:flex w-12 flex-col items-center cursor-pointer hover:scale-105"
                  >
                    <FiUser
                      size={24}
                      className="text-[#666666] group-hover:text-[#2C742F] transition-colors mb-1"
                    />
                    <span className="text-[10px]">Account</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

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
