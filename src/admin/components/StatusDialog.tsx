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
import { useState } from "react";

const StatusDialog = ({ status }: { status: string }) => {
  const [selectedStatus, setSelectedStatus] = useState(status);

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    // TODO: trigger backend update if needed
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="bg-[rgba(44,104,255,0.455)] hover:bg-[rgba(29,71,179,0.455)] px-[11px] py-[8px] rounded-[8px] text-black dark:text-[rgba(255,255,255,0.76)] text-[17px] font-semibold cursor-pointer shadow-lg transform transition-transform duration-200 hover:scale-105"
        >
          Manage
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
                value="processing"
                className="dark:data-[highlighted]:bg-gray-800 cursor-pointer px-4"
              >
                Processing
              </SelectItem>
              <SelectItem
                value="shipped"
                className="dark:data-[highlighted]:bg-gray-800 cursor-pointer px-4"
              >
                Shipped
              </SelectItem>
              <SelectItem
                value="delivered"
                className="dark:data-[highlighted]:bg-gray-800 cursor-pointer px-4"
              >
                Delivered
              </SelectItem>
              <SelectItem
                value="cancel"
                className="dark:data-[highlighted]:bg-gray-800 cursor-pointer px-4"
              >
                Cancel
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent border-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer">
            Close
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              console.log("Updated to", selectedStatus);
              // Optional: API call here
            }}
            className="bg-blue-800 hover:bg-blue-700 cursor-pointer text-white"
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StatusDialog;
