/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { RootState } from "@/redux/store";
import {
  Camera,
  ChevronRight,
  Lock,
  ShoppingBag,
  Trash2,
  Truck,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RenderContent } from "../components/My-account/RightSwitcher";
import { Link, useSearchParams } from "react-router-dom";
import { useUpdateUserImageMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { setUser } from "@/redux/reducer/userReducer";

type MenuType =
  | "account"
  | "password"
  | "billing"
  | "shipping"
  | "orders"
  | "delete";

interface MenuItem {
  id: MenuType;
  label: string;
  icon: any;
}

const menuItems: MenuItem[] = [
  { id: "account", label: "Account", icon: User },
  { id: "password", label: "Change Password", icon: Lock },
  { id: "shipping", label: "Shipping Address", icon: Truck },
  { id: "orders", label: "My Orders", icon: ShoppingBag },
  { id: "delete", label: "Delete Account", icon: Trash2 },
];

export const MyAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [updateUserImage] = useUpdateUserImageMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [uploading, setUploading] = useState(false);
  const currentTab = (searchParams.get("tab") as MenuType) || "account";
  const [activeMenu, setActiveMenu] = useState<MenuType>(currentTab);

  const handleMenuChange = (menu: MenuType) => {
    setActiveMenu(menu);
    setSearchParams({ tab: menu });
  };

  useEffect(() => {
    if (currentTab !== activeMenu) {
      setActiveMenu(currentTab);
    }
  }, [currentTab, activeMenu]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);

    try {
      const res = await updateUserImage({ id: user._id, image: file }).unwrap();
      dispatch(setUser(res.data));
      toast.success("Profile picture update successful");
    } catch (error) {
      toast.error("Failed to update profile picture.");
    } finally {
      setUploading(false);
    }
  };

  return user ? (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full bg-gray-100   lg:max-w-sm ">
            <Card className="border-0  bg-white  rounded-sm">
              <CardContent className="p-6 pt-3">
                {/* User Profile Section */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="h-28 w-28 mx-auto">
                      {user?.picture ? (
                        <img
                          src={user.picture.url}
                          className={`w-full h-full rounded-full object-cover ${
                            uploading ? "opacity-50" : ""
                          }`}
                        />
                      ) : (
                        <img
                          src={"/default-avatar.png"}
                          alt="Default Avatar"
                          className={`w-full h-full object-cover rounded-full ${
                            uploading ? "opacity-50" : ""
                          }`}
                        />
                      )}
                      {/* Spinner overlay when uploading */}
                      {uploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full">
                          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                    <label
                      htmlFor="profile-image"
                      className="absolute -bottom-1 -right-1 bg-black/80 hover:bg-black/90 text-white rounded-full p-2 cursor-pointer transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                      <input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <h2 className="text-xl font-bold mt-3 text-[#1b7221]">
                    {user?.name}{" "}
                    {user.isVerified ? (
                      <span className="text-[10px] bg-blue-300 text-blue-700 px-1 rounded-md ml-4">
                        Verified
                      </span>
                    ) : (
                      <span className="text-[10px] bg-red-200 text-red-700 px-2 rounded-md ml-4">
                        Not Verified
                      </span>
                    )}
                  </h2>
                </div>

                <Separator className="my-4" />

                {/* Navigation Menu */}
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeMenu === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMenuChange(item.id)}
                        className={`w-full flex items-center justify-between px-4 py-2 rounded-sm text-left transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-[#1b7221] text-white"
                            : "text-black hover:bg-[#c9e5cb]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            isActive ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 lg:max-w-4xl">
            <RenderContent activeMenu={activeMenu} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto p-8 text-center h-[300px]">
        <h2 className="mt-20 mb-7 text-3xl font-semibold text-gray-800">
          Please log in to access your account details
        </h2>
        <Link
          to="/sign-in"
          className="hover:bg-[#4CAF50] bg-[#2C742F] px-5 py-2 rounded-sm text-white text-lg"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};
