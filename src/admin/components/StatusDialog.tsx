/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "@/frontend/types/types";
import { useUpdateOrderMutation } from "@/redux/api/orderApi";
import { useState } from "react";
import { toast } from "react-toastify";

const StatusDialog = ({ status, id }: { status: OrderStatus; id: string }) => {
  const [UpdateOrder] = useUpdateOrderMutation();

  const [selectedStatus, setSelectedStatus] = useState(status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = (value: OrderStatus) => {
    setSelectedStatus(value);
  };

  const updateHandler = async () => {
    try {
      setLoading(true);
      const orderId = id;
      await UpdateOrder({ orderId, status: selectedStatus }).unwrap();
      toast.success("Order status updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          disabled={loading}
          className={`w-[90px] bg-[rgba(44,104,255,0.455)] hover:bg-[rgba(29,71,179,0.455)] px-2 py-[8px] rounded-[5px] text-black dark:text-[rgba(255,255,255,0.76)] text-[17px] font-semibold cursor-pointer shadow-lg transform transition-transform duration-200 hover:scale-105 ${
            loading ? "cursor-not-allowed opacity-60" : ""
          }`}
        >
          {loading ? (
            <svg
              className="animate-spin h-6 w-6 text-black dark:text-white mx-auto"
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
          ) : (
            "Manage"
          )}
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="dark:bg-gray-900 dark:border-blue-500 bg-gray-300 z-[200]">
        <AlertDialogHeader>
          <AlertDialogTitle className="dark:text-white ">
            Update Order Status
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="py-2">
          <Select value={selectedStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full dark:bg-gray-950 dark:text-white/70 bg-gray-50 text-black font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-900 bg-gray-300 dark:text-white/70 font-bold z-[201] ">
              <SelectItem
                value={OrderStatus.PROCESSING}
                className="dark:data-[highlighted]:bg-gray-800 cursor-pointer px-4"
              >
                Processing
              </SelectItem>
              <SelectItem
                value={OrderStatus.SHIPPED}
                className="dark:data-[highlighted]:bg-gray-800 cursor-pointer px-4"
              >
                Shipped
              </SelectItem>
              <SelectItem
                value={OrderStatus.DELIVERED}
                className="dark:data-[highlighted]:bg-gray-800 cursor-pointer px-4"
              >
                Delivered
              </SelectItem>
              <SelectItem
                value={OrderStatus.CANCELLED}
                className="dark:data-[highlighted]:bg-gray-800 cursor-pointer px-4"
              >
                Canceled
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent border-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer">
            Close
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={updateHandler}
            className="bg-blue-800 hover:bg-blue-700 cursor-pointer text-white"
          >
            Update
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StatusDialog;
