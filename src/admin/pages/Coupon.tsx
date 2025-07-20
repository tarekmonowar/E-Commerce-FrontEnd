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
import { useState } from "react";
import { toast } from "react-toastify";

interface Coupon {
  id: string;
  code: string;
  amount: number;
  active: boolean;
}

const initialCoupons: Coupon[] = [
  { id: "1", code: "SUMMER20", amount: 20, active: true },
  { id: "2", code: "WELCOME50", amount: 50, active: false },
  { id: "3", code: "test", amount: 50, active: true },
  { id: "3", code: "test", amount: 50, active: true },
  { id: "3", code: "test", amount: 50, active: true },
  { id: "3", code: "test", amount: 50, active: true },
];

const Coupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [amount, setAmount] = useState("");

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setTimeout(() => {
      setCoupons((prev) => prev.filter((c) => c.id !== id));
      setDeletingId(null);
    }, 500);
  };

  const handleCreate = () => {
    if (!code || !amount) {
      return toast.error("Please enter both coupon code and amount.");
    }

    // const newCoupon: Coupon = {
    //   id: Date.now().toString(),
    //   code,
    //   amount: parseFloat(amount),
    //   active: true,
    // };

    // setCoupons((prev) => [newCoupon, ...prev]);
    toast.success(`${amount} , ${code}`);
    setCode("");
    setAmount("");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Coupon List */}
      <div className="w-full lg:w-2/3 dark:bg-gray-900  bg-white dark:border dark:border-gray-800 p-5 rounded-md shadow-2xl">
        <h2 className="text-2xl xl:text-4xl font-semibold mb-4 xl:mb-7 dark:text-white">
          All Coupons
        </h2>
        <Table>
          <TableHeader>
            <TableRow className="dark:border-gray-800 border-gray-300 font-bold xl:text-[17px]">
              <TableHead className="dark:text-white">Discount Code</TableHead>
              <TableHead className="dark:text-white">Amount</TableHead>
              <TableHead className="dark:text-white">Status</TableHead>
              <TableHead className="dark:text-white text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow
                key={coupon.id}
                className="dark:border-gray-800 border-gray-300 dark:hover:bg-gray-800"
              >
                <TableCell className="dark:text-gray-300 font-medium ">
                  {coupon.code}
                </TableCell>
                <TableCell className="dark:text-gray-300">
                  ${coupon.amount}
                </TableCell>
                <TableCell>
                  <Badge variant={coupon.active ? "default" : "destructive"}>
                    {coupon.active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="border-red-700 dark:text-white hover:bg-red-100 dark:bg-red-900 dark:hover:bg-red-400 dark:hover:text-black w-[60px] cursor-pointer"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="dark:bg-gray-900 dark:border-gray-800">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="dark:text-white">
                          Delete Coupon
                        </AlertDialogTitle>
                        <AlertDialogDescription className="dark:text-gray-400">
                          Are you sure you want to delete "
                          <span className="font-semibold">{coupon.code}</span>"?
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="dark:text-gray-300 cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(coupon.id)}
                          disabled={deletingId === coupon.id}
                          className="bg-red-700 text-white hover:bg-red-900 cursor-pointer"
                        >
                          {deletingId === coupon.id ? "Deleting..." : "Delete"}
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

      {/* Right: Create Coupon */}
      <div className="w-full lg:w-1/3 dark:bg-gray-900 dark:border dark:border-gray-800 p-6 rounded-md bg-white shadow-2xl">
        <h2 className="text-2xl font-semibold mb-5 xl:mb-10 dark:text-white mt-3">
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
              className="rounded-[7px] mt-3 border-black/30 dark:border-gray-700 bg-gray-50 xl:text-[15px]"
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
              className="rounded-[7px] mt-3 border-black/30 dark:border-gray-700 bg-gray-50 xl:text-[15px]"
            />
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleCreate}
              className="bg-blue-700 hover:bg-blue-600 text-white/80 font-bold text-[17px] mt-4 py-5 cursor-pointer"
            >
              Create Coupon
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
