/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useUpdateUserMutation } from "@/redux/api/userApi";
import { setUser } from "@/redux/reducer/userReducer";
import type { RootState } from "@/redux/store";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import VerifyAccount from "./VerifyAccount";
import { useSendOtpMutation } from "@/redux/api/otpApi";

const AccountDetails = () => {
  const dispatch = useDispatch();
  const [showVerification, setShowVerification] = useState(false);
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [sendOtp] = useSendOtpMutation();
  const [updateUser] = useUpdateUserMutation();

  type FormData = {
    name: string;
    phone?: string;
  };

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: undefined,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || undefined,
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
          name: formData.name,
          phone: formData.phone,
        },
      }).unwrap();
      dispatch(setUser(res.data));
      toast.success("Account Update Successful");
    } catch (error: any) {
      console.error("Update failed:", error);
      const message =
        error?.message ||
        error?.data?.message ||
        "Update failed. Please try again.";
      toast.error(message);
    }
  };

  const otpSendhandler = async () => {
    if (!user) return;
    const name = user?.name;
    const email = user?.email;

    try {
      await sendOtp({ name, email }).unwrap();
      toast.success("OTP sent you email , Please check");
      setShowVerification(true);
    } catch (error: any) {
      console.error("Update failed:", error);
      const message =
        error?.message || error?.data?.message || "OTP cannot send";
      toast.error(message);
      setShowVerification(false);
    }
  };

  if (showVerification) {
    return <VerifyAccount setShowVerification={setShowVerification} />;
  }

  return (
    <Card className="rounded-sm border-none shadow bg-white text-black">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-[18px]">
          <User className="h-6 w-6 font-bold" />
          Account Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!user?.isVerified && (
          <p className="text-[14px] bg-red-200 text-red-700 px-2 py-1 text-center w-[500px] mx-auto rounded-sm mb-6 ">
            "To access all functionalities, please complete verification first"
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Full Name *</Label>
            <input
              type="text"
              placeholder="name"
              autoComplete="name"
              name="name"
              value={formData.name}
              required
              onChange={handleChange}
              className="bg-gray-50 border border-gray-500 px-4 py-2 my-3 w-full rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2B7A0B]"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <input
              type="tel"
              placeholder="Phone"
              autoComplete="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-gray-50 border border-gray-500 px-4 py-2 my-3 w-full rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2B7A0B]"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <input
            type="email"
            placeholder="email"
            required
            value={user?.email || ""}
            readOnly
            className="bg-gray-50 border border-gray-500 px-4 py-2 my-3 w-full rounded-sm cursor-not-allowed outline-none focus:ring-0 focus:outline-none"
          />
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <input
            type="date"
            placeholder="Date of Birth"
            className="bg-gray-50 border border-gray-500 px-4 py-2 my-3 w-full rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2B7A0B]"
          />
        </div>
        <button
          onClick={handleUpdate}
          className="bg-[#1b7221] hover:bg-[#2B7A0B] cursor-pointer text-white px-5 py-2 rounded-sm"
        >
          Update Account
        </button>
        {!user?.isVerified && (
          <button
            onClick={otpSendhandler}
            className="cursor-pointer text-blue-700 font-bold  px-5 py-2 rounded-sm text-sm  border ml-10 hover:bg-gray-100"
          >
            Verify
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountDetails;
