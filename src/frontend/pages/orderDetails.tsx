/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import {
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "@/redux/api/orderApi";
import type { CustomError, Order } from "../types/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useOrderDetailsQuery(id!);
  const [UpdateOrder] = useUpdateOrderMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  const order = data?.data as Order;

  const handleCopy = (transactionId: string) => {
    navigator.clipboard.writeText(transactionId);
    setCopied(true);
    toast.success("Transaction ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCancel = async () => {
    if (order.status !== "Processing") return;
    try {
      setLoading(true);
      const orderId = id as string;
      await UpdateOrder({ orderId, status: "Cancelled" }).unwrap();
      toast.success("Order status updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="bg-gray-100 p-10 animate-pulse">
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 shadow-md rounded-md space-y-6">
          <Skeleton className="h-10 w-1/4 rounded" />
          <div className="grid grid-cols-2 gap-3 ">
            <Skeleton className="h-6 w-full xl:w-2/3 rounded" />
            <Skeleton className="h-6 w-full xl:w-2/3 rounded" />
            <Skeleton className="h-6 w-full xl:w-2/3 rounded" />
            <Skeleton className="h-6 w-full xl:w-2/3 rounded" />
            <Skeleton className="h-6 w-full xl:w-2/3 rounded" />
            <Skeleton className="h-6 w-full xl:w-2/3 rounded" />
            <Skeleton className="h-6 w-full xl:w-2/3 rounded" />
            <Skeleton className="h-6 w-full xl:w-2/3 rounded" />
          </div>
          <Skeleton className="h-8 w-1/5 rounded" />
          <Skeleton className="h-40 w-full rounded" />
          <div className="flex justify-end space-x-3">
            <Skeleton className="h-10 w-32 rounded" />
            <Skeleton className="h-10 w-32 rounded" />
          </div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="bg-gray-100 p-10 ">
        <div className="max-w-7xl bg-gray-50 mx-auto min-h-[50vh] text-red-800 p-6 rounded shadow text-center">
          <h2 className="text-2xl font-bold my-4">Failed to load order</h2>
          <p>
            {(error as any)?.data?.message ||
              "Something went wrong. Please try again."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto p-6  bg-gray-50 shadow rounded-md">
        <div className=" grid grid-cols-1 lg:grid-cols-2 justify-center ">
          <h1 className="text-3xl font-bold mb-4 lg:mb-6 text-gray-800">
            Order Details
          </h1>
          <p className="flex items-center gap-2 flex-col md:flex-row mb-3 ">
            <span className="font-semibold">Transaction ID:</span>
            <p
              onClick={() => {
                handleCopy(order.transactionId);
              }}
              title="Click to copy"
              className="text-gray-800 cursor-pointer bg-gray-200 pl-3 py-[3px] rounded"
            >
              <span>{order.transactionId}</span>
              <span className="text-sm border-1 border-gray-400 ml-2 px-1 py-[2px] rounded text-black">
                {copied ? " Copied!" : "Copy"}
              </span>
            </p>
          </p>
        </div>

        <div className="mb-6 space-y-2 xl:space-y-3 lg:grid grid-cols-2">
          <p>
            <span className="font-semibold">Order ID:</span> {order?._id}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`font-semibold ${
                order?.status === "Processing"
                  ? "text-blue-500"
                  : order?.status === "Shipped"
                  ? "text-green-800"
                  : order?.status === "Delivered"
                  ? "text-[rgb(47,0,255)]"
                  : "text-red-500"
              }`}
            >
              {order?.status}
            </span>
          </p>
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {order?.shippingInfo.name}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {order?.shippingInfo.address}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {order?.user.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {order?.shippingInfo.phone}
          </p>
          <p>
            <span className="font-semibold">Discount:</span> ${order?.discount}
          </p>
          <p>
            <span className="font-semibold">Shipping Charges:</span> $
            {order?.shippingCharges}
          </p>
          <p className="text-xl text-blue-700 mt-3">
            <span className="font-bold text-xl">Total:</span> ${order?.total}
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-3 text-gray-700 ">Items</h2>
        <table className="w-full border border-gray-300  rounded-lg overflow-hidden mb-6">
          <thead className="bg-gray-100  text-gray-700 ">
            <tr>
              <th className="py-2 px-3 border-b border-gray-300 text-left ">
                Photo
              </th>
              <th className="py-2 px-3 border-b border-gray-300 ">Name</th>
              <th className="py-2 px-3 border-b border-gray-300 ">Price</th>
              <th className="py-2 px-3 border-b border-gray-300 ">Qty</th>
              <th className="py-2 px-3 border-b border-gray-300 ">Subtotal</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 ">
            {order?.orderItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 ">
                <td className="py-2 px-3 border-b border-gray-300 text-left ">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-3 border-b border-gray-300 text-center">
                  {item.name}
                </td>

                <td className="py-2 px-3 border-b border-gray-300 text-center">
                  ${item.price}
                </td>
                <td className="py-2 px-3 border-b border-gray-300 text-center">
                  {item.quantity}
                </td>
                <td className="py-2 px-3 border-b border-gray-300 text-center">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end space-x-3">
          <div className="relative group">
            <button
              onClick={handleCancel}
              disabled={order?.status !== "Processing"}
              className={`px-4 py-2 font-semibold rounded shadow text-white flex items-center justify-center gap-2 ${
                order?.status === "Processing"
                  ? "bg-red-600 hover:bg-red-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin  h-5 w-5 text-white"
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
                  Cancelling...
                </>
              ) : (
                "Cancel Order"
              )}
            </button>
            {order?.status !== "Processing" && (
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded bg-black text-white text-sm whitespace-nowrap">
                {order?.status === "Shipped"
                  ? "Order already shipped, cannot cancel"
                  : order?.status === "Delivered"
                  ? "Order already delivered, cannot cancel"
                  : "Order already canceled"}
              </span>
            )}
          </div>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
