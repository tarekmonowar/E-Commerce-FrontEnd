/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import GenerateCoupon from "../components/utilsComponents/GenerateCoupon";
import {
  useAllCouponsQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useUpdateCouponStatusMutation,
} from "@/redux/api/couponApi";
import { Loader } from "lucide-react";
import type { CustomError } from "@/frontend/types/types";
import { Skeleton } from "@/components/ui/skeleton";

const Coupons = () => {
  const [code, setCode] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [blockId, setBlockId] = useState<string | null>(null);

  const [createCoupon] = useCreateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();
  const [updateCouponStatus] = useUpdateCouponStatusMutation();
  const { data, isLoading, isError, error } = useAllCouponsQuery();
  const coupons = data?.data;

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  //create handler
  const handleCreate = async () => {
    if (!code || !amount) {
      return toast.info("Please enter both coupon code and amount.");
    }

    const trimmedCode = code.trim();
    if (trimmedCode.length < 2 || trimmedCode.length > 15) {
      return toast.warning("Coupon code must be between 2 and 15 characters.");
    }

    try {
      setLoading(true);

      const numericAmount = Number(amount);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        toast.warning("Amount must be a positive number.");
        return;
      }
      await createCoupon({ code: code.trim(), amount: numericAmount }).unwrap();

      toast.success(`Coupon created: ${code} (${numericAmount})`);
      setCode("");
      setAmount("");
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "Something went wrong while creating coupon.";
      toast.error(errorMessage);
      console.error("Create failed:", err);
    } finally {
      setLoading(false);
    }
  };

  //Delete handler
  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteCoupon(id).unwrap();
      toast.success("Coupon delete successful");
      setDeletingId("");
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "Something went wrong while delete coupon.";
      toast.error(errorMessage);
      console.error("Delete failed:", err);
    } finally {
      setDeletingId("");
    }
  };

  //Update active/block
  const handleActive = async (id: string, isActive: boolean) => {
    try {
      setBlockId(id);
      await updateCouponStatus({ id, isActive }).unwrap();
      toast.success(
        isActive
          ? "Coupon activated successfully"
          : "Coupon blocked successfully",
      );
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "Something went wrong while updating coupon.";
      toast.error(errorMessage);
      console.error("Update failed:", err);
    } finally {
      setBlockId("");
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-5 xl:gap-15">
        {/* Left: Coupon List */}
        <div className="w-full dark:bg-gray-900  bg-white dark:border dark:border-gray-800 p-5 rounded-md shadow-2xl">
          <GenerateCoupon />
        </div>

        {/* Right: Create Coupon */}
        <div className="w-full dark:bg-gray-900 dark:border dark:border-gray-800 p-6 rounded-sm bg-white shadow-2xl">
          <h2 className="text-3xl font-semibold mb-5 xl:mb-10 dark:text-white">
            Create New Coupon
          </h2>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="code"
                className="text-gray-700 dark:text-gray-300 xl:text-[17px] "
              >
                Coupon Code
              </Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="rounded-[4px] mt-3 border-black/30 dark:border-gray-700 bg-gray-50 xl:text-[15px]"
              />
            </div>
            <div>
              <Label
                htmlFor="amount"
                className="text-gray-700 dark:text-gray-300 xl:text-[17px] "
              >
                Amount ($)
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-[4px] mt-3 border-black/30 dark:border-gray-700 bg-gray-50 xl:text-[15px]"
              />
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleCreate}
                disabled={loading}
                className={`bg-blue-700 hover:bg-blue-600 text-white/80 font-bold text-[17px] mt-4 py-5 cursor-pointer rounded-sm transition-colors flex items-center justify-center gap-2 ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin mr-2 h-5 w-5 ml-3 text-white"
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
                    <span>Creating...</span>
                  </>
                ) : (
                  "Create Coupon"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full my-10 dark:bg-gray-900  bg-white dark:border dark:border-gray-800 p-5 rounded-md shadow-2xl">
        <h2 className="text-2xl xl:text-4xl font-semibold mb-4 xl:mb-7 dark:text-white">
          All Coupons
        </h2>
        <Table>
          <TableHeader>
            <TableRow className="dark:border-gray-800 border-gray-300 font-bold xl:text-[18px] dark:bg-gray-800 bg-gray-200 ">
              <TableHead className="dark:text-white">Discount Code</TableHead>
              <TableHead className="dark:text-white">Amount</TableHead>
              <TableHead className="dark:text-white">Status</TableHead>
              <TableHead className="dark:text-white text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? [...Array(8)].map((_, i) => (
                  <TableRow
                    key={i}
                    className="dark:border-gray-800 border-gray-300"
                  >
                    <TableCell>
                      <Skeleton className="h-7 w-[100px] rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-7 w-[60px] rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-7 w-[50px] rounded-full" />
                    </TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Skeleton className="h-9 w-[68px] rounded-sm" />
                      <Skeleton className="h-9 w-[67px] rounded-sm" />
                    </TableCell>
                  </TableRow>
                ))
              : coupons?.map((coupon) => (
                  <TableRow
                    key={coupon._id}
                    className="dark:border-gray-800 border-gray-300 dark:hover:bg-gray-800"
                  >
                    <TableCell className="dark:text-gray-300 font-medium ">
                      {coupon.code}
                    </TableCell>
                    <TableCell className="dark:text-gray-300">
                      ${coupon.amount}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={coupon.isActive ? "default" : "destructive"}
                      >
                        {coupon.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center space-x-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            className={`${
                              coupon.isActive
                                ? "bg-blue-700 hover:bg-blue-600 text-md px-5"
                                : "bg-green-800 hover:bg-green-700"
                            } cursor-pointer text-white rounded-sm shadow-lg py-[18px] transform transition-transform duration-200 hover:scale-105 w-[70px] `}
                          >
                            {blockId === coupon._id ? (
                              <Loader className="h-5 w-5 animate-spin text-white" />
                            ) : coupon.isActive ? (
                              "Block"
                            ) : (
                              "Active"
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="dark:bg-gray-900 dark:border-gray-800">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="dark:text-white">
                              Confirm {coupon.isActive ? "Block" : "Activate"}
                            </AlertDialogTitle>
                            <AlertDialogDescription className="dark:text-gray-400">
                              Are you sure you want to{" "}
                              {coupon.isActive ? "block" : "activate"} this
                              Coupon?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="dark:text-gray-300 cursor-pointer">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleActive(coupon._id, !coupon.isActive)
                              }
                              disabled={blockId === coupon._id}
                              className={`${
                                coupon.isActive
                                  ? "bg-blue-700 hover:bg-blue-600"
                                  : "bg-green-800 hover:bg-green-700"
                              } text-white cursor-pointer`}
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      {/* Action - Delete */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="border-red-700 dark:text-white hover:bg-red-100 dark:bg-red-900 rounded-sm dark:hover:bg-red-400 dark:hover:text-black w-[60px] cursor-pointer"
                          >
                            {deletingId === coupon._id ? (
                              <>
                                <Loader className="h-5 w-5 animate-spin mr-2 text-black dark:text-white" />
                              </>
                            ) : (
                              "Delete"
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="dark:bg-gray-900 dark:border-gray-800">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="dark:text-white">
                              Delete Coupon
                            </AlertDialogTitle>
                            <AlertDialogDescription className="dark:text-gray-400">
                              Are you sure you want to delete "
                              <span className="font-semibold">
                                {coupon.code}
                              </span>
                              "? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="dark:text-gray-300 cursor-pointer">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(coupon._id)}
                              disabled={deletingId === coupon._id}
                              className="bg-red-700 text-white hover:bg-red-900 cursor-pointer"
                            >
                              {deletingId === coupon._id
                                ? "Deleting..."
                                : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Coupons;
