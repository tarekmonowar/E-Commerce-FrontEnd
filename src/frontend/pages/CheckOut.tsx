/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNewOrderMutation } from "@/redux/api/orderApi";
import { resetCart } from "@/redux/reducer/cartReducer";
import type { RootState } from "@/redux/store";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { NewOrderRequest } from "../types/types";
import DemoPaymentToaster from "../components/utils/DemoPaymentToaster";

// Load Stripe outside component to avoid recreating it on every render
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY as string,
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    shippingInfo,
    cartItems,
    subtotal,
    discount,
    shippingCharges,
    total,
  } = useSelector((state: RootState) => state.cartReducer);

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const [newOrder] = useNewOrderMutation();

  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      if (!hasPaid) {
        navigate("/all-products");
        toast.info("Cart is empty.Please add products");
      }
    }
  }, [cartItems, hasPaid, navigate]);

  // Confirm payment on form submit
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsProcessing(true);
    setPaymentError(null);

    if (!stripe || !elements) {
      setIsProcessing(false);
      toast.error("Payment system not initialized");
      return;
    }

    try {
      // Step 2: Confirm payment with Stripe
      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Redirect here after successful payment
          return_url: window.location.origin,
        },
        redirect: "if_required",
      });

      // Step 3: Handle payment errors
      if (error) {
        console.error("Stripe error:", error);
        setPaymentError(error.message || "Payment failed");
        toast.error(error.message || "Payment failed");
        return;
      }

      // Step 4: Handle missing payment intent
      if (!paymentIntent) {
        setPaymentError("Payment processing failed");
        toast.error("Payment processing failed");
        return;
      }

      // console.log("PaymentIntent status:", paymentIntent.status);

      // Step 5: Handle successful payment
      if (paymentIntent.status === "succeeded") {
        try {
          const orderData: NewOrderRequest = {
            shippingInfo,
            orderItems: cartItems,
            subtotal,
            discount,
            shippingCharges,
            total,
            transactionId: paymentIntent.id,
          };
          // Create order in database
          await newOrder(orderData).unwrap();

          // Update state and UI
          setHasPaid(true);
          dispatch(resetCart());
          toast.success("Order placed successfully 🎉");

          // Navigate to orders page
          navigate("/my-orders");
        } catch (err: any) {
          console.error("Order creation error:", err);
          setPaymentError("Order creation failed");
          toast.error(
            err?.data?.message || err?.message || "Order creation failed",
          );
        }
      } else {
        // Handle other payment statuses
        setPaymentError(`Payment status: ${paymentIntent.status}`);
        toast.info(`Payment status: ${paymentIntent.status}`);
      }
    } catch (err: any) {
      // Handle unexpected errors
      console.error("Unexpected error:", err);
      setPaymentError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="bg-slate-100 py-10 ">
      <div className="max-w-[500px] mx-auto  p-8 bg-gray-50 rounded-md shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-gray-600 flex items-center justify-center gap-2">
          Payment Information{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zm2 2v2h16V7H4zm0 4v6h16v-6H4z" />
          </svg>
        </h2>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* Card Section with Icon */}
          <div className="space-y-1 border border-gray-300 p-4 rounded-sm shadow ">
            <PaymentElement
              options={{
                paymentMethodOrder: ["card"],
                layout: {
                  type: "tabs",
                  defaultCollapsed: false,
                },
              }}
            />
          </div>

          {/* Error message */}
          {paymentError && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-100 flex items-start">
              <svg
                className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{paymentError}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing || !stripe || !elements}
            className={`w-full py-3 px-6 rounded-[3px] text-white bg-[#236027] hover:bg-[#2C742F] cursor-pointer font-medium text-lg transition-all duration-200 flex items-center justify-center ${
              isProcessing || !stripe || !elements
                ? "cursor-not-allowed"
                : "shadow-md"
            }`}
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Processing...
              </>
            ) : (
              `Pay $${total.toFixed(2)}`
            )}
          </button>
        </form>

        <div className="pt-5 border-t border-gray-100 flex items-center justify-center gap-2">
          <p className="text-center text-gray-500 text-sm">
            Secure payment powered by
          </p>
          <span className="text-[#4a43d1] font-semibold tracking-widest text-sm">
            Stripe
          </span>
        </div>
      </div>
      <DemoPaymentToaster />
    </div>
  );
};

export default function CheckOut() {
  const location = useLocation();

  const clientSecret: string | undefined = location.state;

  if (!clientSecret) {
    toast.error("Missing payment information");
    return <Navigate to={"/shipping"} />;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
        },
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}
