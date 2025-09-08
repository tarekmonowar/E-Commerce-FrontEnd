/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { CartReducerInitialState } from "../types/types";
import { toast } from "react-toastify";
import { BiArrowBack } from "react-icons/bi";
import { server, type RootState } from "@/redux/store";
import { setUser } from "@/redux/reducer/userReducer";
import { useUpdateUserMutation } from "@/redux/api/userApi";
import { saveShippingInfo } from "@/redux/reducer/cartReducer";
import axios from "axios";

export default function Shipping() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: RootState) => state.userReducer.user);
  const { cartItems, coupon } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer,
  );
  const [updateUser] = useUpdateUserMutation();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pinCode: null,
  });

  useEffect(() => {
    if (user) {
      setShippingInfo({
        name: user.shippingAddress?.name || user.name || "",
        phone: user.shippingAddress?.phone || user.phone || "",
        address: user.shippingAddress?.address || "",
        city: user.shippingAddress?.city || "",
        pinCode: null,
      });
    }
  }, [user]);

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (cartItems.length <= 0) {
      toast.error("Please add Item to cart..");
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?._id) {
      toast.error("User not found");
      return;
    }

    try {
      setLoading(true);
      const updatedUser = await updateUser({
        id: user._id,
        data: {
          shippingAddress: {
            name: shippingInfo.name,
            phone: shippingInfo.phone,
            address: shippingInfo.address,
            city: shippingInfo.city,
          },
        },
      }).unwrap();

      dispatch(saveShippingInfo(shippingInfo));
      dispatch(setUser(updatedUser.data));

      const { data } = await axios.post(
        `${server}/api/v1/payment/intent`,
        {
          cartItems,
          shippingInfo,
          coupon,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      navigate("/pay", {
        state: data.data,
      });
      toast.success("Shipping address updated & payment session started!");
    } catch (error: any) {
      const errorData = error;
      console.error(errorData);

      let message = "Registration failed.";
      if (errorData?.data.errorSource?.length > 0) {
        const seen = new Set();
        message = errorData.data.errorSource
          .filter((e: any) => {
            if (seen.has(e.path)) return false;
            seen.add(e.path);
            return true;
          })
          .map((e: any) => `${e.message}`)
          .join(", ");
      } else {
        message = error?.message || error?.data?.message;
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-slate-100 pb-20 xl:pb-36 xl:pt-4">
      <button
        className="fixed top-40 left-8 w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white shadow-md border-none outline-none cursor-pointer hover:translate-x-[-0.25rem] transition-transform duration-300"
        onClick={() => navigate("/cart")}
      >
        <BiArrowBack />
      </button>

      <form
        onSubmit={submitHandler}
        className="max-w-5xl w-full flex flex-col items-center gap-6 pb-10"
      >
        <h1 className="text-2xl  tracking-[3px] mt-5 xl:mt-7 text-center text-gray-600">
          Shipping Address
        </h1>
        <p className="text-sm text-gray-600 text-center px-4">
          ⚠️ Please fill your shipping address carefully. Your order will be
          delivered to this address.
        </p>

        <input
          required
          type="text"
          placeholder="name"
          name="name"
          value={shippingInfo.name}
          onChange={changeHandler}
          className="border border-gray-400 px-4 py-3 lg:w-[420px] outline-none text-[1rem] rounded-sm"
        />
        <input
          required
          type="text"
          placeholder="Phone"
          name="phone"
          value={shippingInfo.phone}
          onChange={changeHandler}
          className="border border-gray-400 px-4 py-3 lg:w-[420px] outline-none text-[1rem] rounded-sm"
        />
        <input
          required
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
          className="border border-gray-400 px-4 py-3 lg:w-[420px] outline-none text-[1rem] rounded-sm"
        />

        <input
          required
          type="text"
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
          className="border border-gray-400 px-4 py-3 lg:w-[420px] outline-none text-[1rem] rounded-sm"
        />

        <input
          required
          type="number"
          placeholder="Pin Code"
          name="pinCode"
          value={shippingInfo.pinCode!}
          onChange={changeHandler}
          className="border border-gray-400 px-4 py-3 lg:w-[420px] outline-none text-[1rem] rounded-sm"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-3 lg:w-[420px] cursor-pointer bg-[#236027] hover:bg-[#2C742F] text-lg text-white rounded text-[1.05rem] uppercase tracking-[2px] flex items-center justify-center gap-2"
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}
