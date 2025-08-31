import { Card } from "@/components/ui/card";
import { useLazyOrderDetailsQuery } from "@/redux/api/orderApi";
import { Check, Home, Package, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { CustomError, Order } from "../types/types";
import { toast } from "react-toastify";

type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  const [trigger, { data, error: apiError, isError, isFetching }] =
    useLazyOrderDetailsQuery();

  useEffect(() => {
    if (isError && apiError) {
      const err = apiError as CustomError;
      const message = err?.data?.message || "Something went wrong";
      toast.error(message);
      setError(message);
    }
  }, [isError, apiError]);

  const orderData = data?.data as Order;

  const getStepStatus = (stepIndex: number, currentStatus: OrderStatus) => {
    const statusOrder = ["Processing", "Shipped", "Delivered"];

    if (currentStatus === "Cancelled") {
      return stepIndex === 0 ? "Completed" : "Pending";
    }

    const currentIndex = statusOrder.indexOf(currentStatus);
    return stepIndex <= currentIndex ? "Completed" : "Pending";
  };

  const handleTrackOrder = async () => {
    if (!orderId.trim()) {
      setError("Please enter an Order ID");
      return;
    }

    setError("");
    trigger(orderId);
  };

  const getStepIcon = (step: string, status: "Completed" | "Pending") => {
    const iconClass = `w-6 h-6 ${
      status === "Completed" ? "text-white" : "text-white"
    }`;

    switch (step) {
      case "Processing":
        return <Package className={iconClass} />;
      case "Shipped":
        return <Truck className={iconClass} />;
      case "Delivered":
        return <Home className={iconClass} />;
      default:
        return <Package className={iconClass} />;
    }
  };

  const steps = [
    {
      key: "Processing",
      label: "Order Confirmed",
      text: "We have received your order",
    },
    {
      key: "Shipped",
      label: "Order Shipped",
      text: "Your package is on the way",
    },
    {
      key: "Delivered",
      label: "Order Delivered",
      text: "Package delivered successfully",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-5">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Input Form */}
        <Card className="bg-gray-50 p-5  max-w-3xl mx-auto mb-5 rounded-sm">
          <h1 className="text-3xl font-bold text-center text-black">
            Order tracking
          </h1>

          <div>
            <p className="text-black mb-4">
              To track your order please enter your Order ID in the box below
              and press the "Track" button.
            </p>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="orderId"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Order ID :
                </label>
                <input
                  id="orderId"
                  placeholder="Your Order ID..."
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full bg-gray-100 p-3 border border-gray-900 rounded-sm text-black"
                  onKeyPress={(e) => e.key === "Enter" && handleTrackOrder()}
                />
              </div>

              <button
                onClick={handleTrackOrder}
                disabled={isFetching}
                className="bg-black rounded-[5px] border text-white hover:bg-gray-200 hover:text-black transition-colors px-8 py-1 cursor-pointer"
              >
                {isFetching ? "Tracking..." : "Track"}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Progress Tracker */}

        <Card className="bg-white-100 p-8 mb-8 shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-black">
                ORDER #{orderData?._id}
              </h2>
            </div>
            <div className="text-right">
              {orderData?.status !== "Cancelled" && (
                <>
                  <p className="text-sm text-black">
                    Expected Arrival {Date.now()}
                  </p>
                  <p className="text-sm text-black">
                    Your order is{" "}
                    <span className="text-[#26852c] font-semibold">
                      {" "}
                      {orderData?.status} !
                    </span>
                  </p>
                </>
              )}
              {orderData?.status === "Cancelled" && (
                <p className="text-sm text-black font-semibold">
                  Order Cancelled
                </p>
              )}
            </div>
          </div>

          {orderData?.status !== "Cancelled" ? (
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-9 right-9 h-[5px] bg-gray-300 rounded-full">
                <div
                  className="h-full bg-[#26852c] rounded-full text-black transition-all duration-500"
                  style={{
                    width:
                      orderData?.status === "Processing"
                        ? "0%"
                        : orderData?.status === "Shipped"
                        ? "50%"
                        : orderData?.status === "Delivered"
                        ? "100%"
                        : "0%",
                  }}
                />
              </div>

              {/* Steps */}
              <div className="flex justify-between relative">
                {steps.map((step, index) => {
                  const status = getStepStatus(index, orderData?.status);
                  return (
                    <div key={step.key} className="flex flex-col items-center">
                      <div
                        className={`
                          w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-300
                          ${
                            status === "Completed"
                              ? "bg-[#26852c]"
                              : "bg-blue-400"
                          }
                        `}
                      >
                        {status === "Completed" ? (
                          <Check className="w-6 h-6 text-white" />
                        ) : (
                          getStepIcon(step.key, status)
                        )}
                      </div>

                      <div className="mt-4 text-center">
                        <p className="text-lg font-medium text-blue-700">
                          {step.label}
                        </p>
                        <p className="text-gray-600 text-[13px]">{step.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-8 -mt-5">
              <div className="flex items-center text-destructive">
                <X className="w-8 h-8 mr-3" />
                <span className="text-lg font-semibold">
                  This order has been cancelled
                </span>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default OrderTracking;
