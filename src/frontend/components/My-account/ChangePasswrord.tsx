/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<null | string>(null);

  const [changePassword] = useChangePasswordMutation();

  const validatePassword = (password: string): boolean => {
    const minLength = /.{8,}/;
    const uppercase = /[A-Z]/;
    const number = /\d/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      minLength.test(password) &&
      uppercase.test(password) &&
      number.test(password) &&
      specialChar.test(password)
    );
  };

  const handleChange = async () => {
    if (!newPassword || !oldPassword) {
      setError("Old password and new password are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (!validatePassword(newPassword)) {
      setError(
        "Password must be at least 8 characters,1 uppercase,1 numbers,1 special characters.",
      );
      return;
    }

    setError(null);
    try {
      await changePassword({
        oldPassword,
        newPassword,
      }).unwrap();

      toast.success("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/");
    } catch (error: any) {
      const message =
        error?.message || error?.data?.message || "Password change failed";
      toast.error(message);
    }
  };
  return (
    <Card className="rounded-sm border-none shadow bg-white text-black">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Change Password
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="currentPassword">Current Password *</Label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Password"
              required
              className="bg-gray-50 border-1 border-gray-500 px-4 py-3 my-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-[#2B7A0B]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div>
          <Label htmlFor="newPassword">New Password *</Label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password"
              required
              className="bg-gray-50 border-1 border-gray-500 px-4 py-3 my-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-[#2B7A0B]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm New Password *</Label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Password"
              required
              className="bg-gray-50 border-1 border-gray-500 px-4 py-3 my-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-[#2B7A0B]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        {error ? (
          <p className="bg-red-100 text-red-800 px-4 py-1 rounded-sm">
            {error}
          </p>
        ) : (
          <div className="text-sm text-muted-foreground">
            Password must be at least 8 characters,1 uppercase,1 numbers,1
            special characters.
          </div>
        )}
        <button
          onClick={handleChange}
          className="bg-[#1b7221] hover:bg-[#2B7A0B] cursor-pointer text-white px-5 py-2 rounded-sm"
        >
          Update Password
        </button>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
