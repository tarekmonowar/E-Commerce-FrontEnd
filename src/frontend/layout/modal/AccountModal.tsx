import { FiHeart, FiHome, FiLogOut, FiPackage, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdOutlineLocalShipping } from "react-icons/md";

type User = {
  displayName?: string | null;
  email?: string | null;
  role?: string;
};

type AccountModalProps = {
  user: User;
  handleLogout: () => void;
  setIsUserMenuOpen: () => void;
};

export default function AccountModal({
  user,
  handleLogout,
  setIsUserMenuOpen,
}: AccountModalProps) {
  return (
    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
      <div className="px-4 py-2 border-b border-gray-300">
        <p className="text-md font-medium text-gray-900">
          {user.displayName || "User"}
        </p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>

      <div className="py-1 mt-2">
        {user.role === "admin" && (
          <Link
            to="/admin"
            target="_blank"
            className="flex items-center gap-2 px-4 py-1 mx-2 rounded-md text-sm md:text-[16px]  text-white bg-[#2C742F] hover:bg-[#236027] "
            onClick={setIsUserMenuOpen}
          >
            <FiHome /> Admin Dashboard
          </Link>
        )}

        <Link
          to="/my-orders"
          className="flex items-center gap-2 px-4 py-2 mt-2  text-sm mx-2 text-gray-700 hover:bg-gray-100 "
          onClick={setIsUserMenuOpen}
        >
          <FiPackage className="text-gray-400 text-lg" />
          My Orders
        </Link>
        <Link
          to="/order-tracking"
          className="flex items-center gap-2 px-4 py-2   text-sm mx-2 text-gray-700 hover:bg-gray-100 "
          onClick={setIsUserMenuOpen}
        >
          <MdOutlineLocalShipping className="text-lg text-gray-400" />
          Order Tracking
        </Link>
        <Link
          to="/wishlist"
          className="flex items-center gap-2 px-4 py-2 text-sm mx-2 text-gray-700 hover:bg-gray-100 "
          onClick={setIsUserMenuOpen}
        >
          <FiHeart className="text-gray-400 text-lg" />
          Wishlist
        </Link>
        <Link
          to="/account"
          className="flex items-center gap-2 px-4 py-2 mx-2 text-sm text-gray-700 hover:bg-gray-100 "
          onClick={setIsUserMenuOpen}
        >
          <FiUser className="text-gray-400 text-lg" />
          My Account
        </Link>
      </div>

      <div className="border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-6 py-2 text-sm  text-red-600 hover:bg-gray-100 cursor-pointer hover:font-bold"
        >
          <FiLogOut className="text-red-400 hover:scale-120 text-lg" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
