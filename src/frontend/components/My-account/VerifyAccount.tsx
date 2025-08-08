/* eslint-disable @typescript-eslint/no-explicit-any */
import { useVerifyOtpMutation } from "@/redux/api/otpApi";
import { getUser } from "@/redux/api/userApi";
import { clearUser, setUser } from "@/redux/reducer/userReducer";
import type { RootState } from "@/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface VerifyAccountProps {
  setShowVerification: (value: boolean) => void;
}

const VerifyAccount: React.FC<VerifyAccountProps> = ({
  setShowVerification,
}) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [verifyOtp] = useVerifyOtpMutation();

  const otpVerifyHandler = async () => {
    if (!user) return;
    const email = user?.email;

    try {
      await verifyOtp({ email, otp }).unwrap();
      toast.success("Verification Success");
      const user = await getUser();
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
      setShowVerification(false);
    } catch (error: any) {
      console.error("Update failed:", error);
      const message =
        error?.message || error?.data?.message || "Verification failed";
      toast.error(message);
    }
  };
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-[#1b7221]">
        Verify Your Account
      </h2>
      <p className="mb-4 text-sm text-gray-600">
        Enter the OTP sent to your email.
      </p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="w-full border px-3 py-2 mb-4 rounded focus:outline-none focus:ring-1 focus:ring-[#2B7A0B]"
      />
      <button
        onClick={otpVerifyHandler}
        className="bg-[#1b7221] text-white px-4 py-2 rounded hover:bg-[#2B7A0B] cursor-pointer"
      >
        Submit OTP
      </button>
      <button className=" px-4 py-[6px] rounded border ml-4 hover:bg-gray-100 cursor-pointer">
        Back
      </button>
    </div>
  );
};

export default VerifyAccount;
