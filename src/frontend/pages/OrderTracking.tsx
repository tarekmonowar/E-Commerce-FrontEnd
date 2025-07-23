import { Card } from "@/components/ui/card";
import { Check, Home, Package, Truck, X } from "lucide-react";
import { useState } from "react";

type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

interface OrderData {
  id: string;
  status: OrderStatus;
  expectedDate?: string;
  trackingNumber?: string;
}

// Mock data for demo purposes
const mockOrders: Record<string, OrderData> = {
  Y34XDHR: {
    id: "Y34XDHR",
    status: "delivered",
    expectedDate: "01/12/19",
    trackingNumber: "23409456724242342289",
  },
  ABC123: {
    id: "ABC123",
    status: "processing",
    expectedDate: "15/01/25",
    trackingNumber: "98765432109876543210",
  },
  XYZ789: {
    id: "XYZ789",
    status: "shipped",
    expectedDate: "10/01/25",
    trackingNumber: "11223344556677889900",
  },
  DEF456: {
    id: "DEF456",
    status: "cancelled",
    expectedDate: "",
    trackingNumber: "",
  },
};

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getStepStatus = (
    stepIndex: number,
    currentStatus: OrderStatus | "unknown",
  ) => {
    const statusOrder = ["processing", "shipped", "delivered"];

    if (currentStatus === "cancelled") {
      return stepIndex === 0 ? "completed" : "pending";
    }

    if (currentStatus === "unknown") {
      return "pending";
    }

    const currentIndex = statusOrder.indexOf(currentStatus);
    return stepIndex <= currentIndex ? "completed" : "pending";
  };

  const handleTrackOrder = async () => {
    if (!orderId.trim()) {
      setError("Please enter an Order ID");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      const order = mockOrders[orderId.toUpperCase()];
      if (order) {
        setOrderData(order);
        setError("");
      } else {
        setOrderData(null);
        setError("Order not found. Please check your Order ID and try again.");
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStepIcon = (step: string, status: "completed" | "pending") => {
    const iconClass = `w-6 h-6 ${
      status === "completed" ? "text-white" : "text-white"
    }`;

    switch (step) {
      case "processing":
        return <Package className={iconClass} />;
      case "shipped":
        return <Truck className={iconClass} />;
      case "delivered":
        return <Home className={iconClass} />;
      default:
        return <Package className={iconClass} />;
    }
  };

  const steps = [
    { key: "processing", label: "Order Processed" },
    { key: "shipped", label: "Order Shipped" },
    { key: "delivered", label: "Order Delivered" },
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
                disabled={isLoading}
                className="bg-black rounded-[5px] border text-white hover:bg-gray-200 hover:text-black transition-colors px-8 py-1 cursor-pointer"
              >
                {isLoading ? "Tracking..." : "Track"}
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
                ORDER #{orderData?.id}
              </h2>
            </div>
            <div className="text-right">
              {orderData?.status !== "cancelled" && (
                <>
                  <p className="text-sm text-black">
                    Expected Arrival {orderData?.expectedDate}
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
              {orderData?.status === "cancelled" && (
                <p className="text-sm text-black font-semibold">
                  Order Cancelled
                </p>
              )}
            </div>
          </div>

          {orderData?.status !== "cancelled" ? (
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-9 right-9 h-[5px] bg-gray-300 rounded-full">
                <div
                  className="h-full bg-[#26852c] rounded-full text-black transition-all duration-500"
                  style={{
                    width:
                      orderData?.status === "processing"
                        ? "0%"
                        : orderData?.status === "shipped"
                        ? "50%"
                        : orderData?.status === "delivered"
                        ? "100%"
                        : "0%",
                  }}
                />
              </div>

              {/* Steps */}
              <div className="flex justify-between relative">
                {steps.map((step, index) => {
                  const status = getStepStatus(
                    index,
                    orderData?.status ?? "unknown",
                  );
                  return (
                    <div key={step.key} className="flex flex-col items-center">
                      <div
                        className={`
                          w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-300
                          ${
                            status === "completed"
                              ? "bg-[#26852c]"
                              : "bg-blue-400"
                          }
                        `}
                      >
                        {status === "completed" ? (
                          <Check className="w-6 h-6 text-white" />
                        ) : (
                          getStepIcon(step.key, status)
                        )}
                      </div>

                      <div className="mt-4 text-center">
                        <p className="text-sm font-medium text-blue-700">
                          {step.label}
                        </p>
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
