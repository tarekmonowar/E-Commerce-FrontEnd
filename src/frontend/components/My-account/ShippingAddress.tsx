/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useUpdateUserMutation } from "@/redux/api/userApi";
import { setUser } from "@/redux/reducer/userReducer";
import type { RootState } from "@/redux/store";
import { Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ShippingAddress = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [updateUser] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.shippingAddress?.name || user.name || "",
        phone: user.shippingAddress?.phone || user.phone || "",
        address: user.shippingAddress?.address || "",
        city: user.shippingAddress?.city || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    if (!user?._id) return;
    try {
      const res = await updateUser({
        id: user._id,
        data: {
          shippingAddress: {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
          },
        },
      }).unwrap();

      dispatch(setUser(res.data));
      toast.success("Shipping address updated successfully!");
    } catch (error: any) {
      console.error("Update failed:", error);
      const message =
        error?.message ||
        error?.data?.message ||
        "Update failed. Please try again.";
      toast.error(message);
      setFormData({
        name: "",
        phone: "",
        address: "",
        city: "",
      });
    }
  };

  return (
    <Card className="rounded-sm border-none shadow bg-white text-black">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Full Name *</Label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-500 px-4 py-2 my-3 w-full rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2B7A0B]"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-500 px-4 py-2 my-3 w-full rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2B7A0B]"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="shippingAddress">Address *</Label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            autoComplete="street-address"
            value={formData.address}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-500 px-4 py-2 my-3 w-full rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2B7A0B]"
          />
        </div>
        <div>
          <Label htmlFor="shippingCity">Town / City *</Label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            autoComplete="address-level2"
            value={formData.city}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-500 px-4 py-2 my-3 w-full rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2B7A0B]"
          />
        </div>
        <button
          onClick={handleUpdate}
          className="bg-[#1b7221] hover:bg-[#2B7A0B] cursor-pointer text-white px-5 py-2 rounded-sm"
        >
          Update Shipping Address
        </button>
      </CardContent>
    </Card>
  );
};

export default ShippingAddress;
