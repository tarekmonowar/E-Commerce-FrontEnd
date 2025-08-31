import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CustomError, Order } from "@/frontend/types/types";
import { useMyOrdersQuery } from "@/redux/api/orderApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

// 🖨️ Print Function
const handlePrint = (order: Order) => {
  const printWindow = document.createElement("iframe");
  printWindow.style.position = "fixed";
  printWindow.style.right = "0";
  printWindow.style.bottom = "0";
  printWindow.style.width = "0";
  printWindow.style.height = "0";
  printWindow.style.border = "0";
  document.body.appendChild(printWindow);

  const doc = printWindow.contentWindow?.document;
  if (!doc) return;

  const itemRows = order.orderItems
    .map(
      (item) => `
      <tr>
        <td>${item.name}</td>
        <td><img src="${item.photo}" width="50" /></td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>${item.price * item.quantity}</td>
      </tr>`,
    )
    .join("");

  doc.open();
  doc.write(`
    <html>
      <head>
        <title>Order ${order._id}</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          h2 { color: #2C742F; }
          h3 { color: #000; background-color: #E5E7EB;  padding: 5px 0; border-radius: 4px;}
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        </style>
      </head>
      <body>
        <h2>Order ID: ${order._id}</h2>
        <h3>Transaction ID: ${order.transactionId}</h3>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Name:</strong> ${order.shippingInfo.name}</p>
        <p><strong>Shipping Address:</strong> ${order.shippingInfo.address}</p>
        <p><strong>Shipping Charge:</strong> $${order.shippingCharges}</p>
        <p><strong>Discount:</strong> $${order.discount}</p>
        <p><strong>Total:</strong>  $${order.total}</p>

        <h3>Items</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Photo</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>

        <p style="margin-top: 30px; font-size: 18px; text-align: center; color: #2C742F;">
          Thank you for staying with us — <strong>Tarek Monowar</strong>
        </p>
      </body>
    </html>
  `);
  doc.close();

  // Delay the print slightly to ensure content is rendered
  setTimeout(() => {
    printWindow.contentWindow?.focus();
    printWindow.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(printWindow);
    }, 500);
  }, 300); // Wait 300ms before printing
};

// 📦 Main Component
export default function Orders() {
  const { data, isLoading, isError, error } = useMyOrdersQuery();

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  const orders = data?.data as Order[];
  return (
    <section className="rounded-sm border-none shadow bg-white">
      <div className="p-6 max-w-7xl mx-auto rounded shadow-sm">
        <h1 className="text-2xl font-bold mb-4 text-black">My Orders</h1>
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-200  hover:bg-gray-300 border-b border-gray-100">
              <TableHead className="font-semibold text-black text-md">
                Order ID
              </TableHead>
              <TableHead className="font-semibold  text-black text-md">
                Total
              </TableHead>
              <TableHead className="font-semibold text-black  text-md">
                Items
              </TableHead>
              <TableHead className="font-semibold  text-black text-md">
                Status
              </TableHead>
              <TableHead className="font-semibold text-black  text-md text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 15 }).map((_, index) => (
                  <TableRow key={index} className="border-b border-gray-300">
                    <TableCell>
                      <Skeleton className="h-7 w-56 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-7 w-16 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-7 w-12 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-7 w-24 rounded" />
                    </TableCell>
                    <TableCell className="flex gap-2 justify-end">
                      <Skeleton className="h-8 w-16 rounded" />
                      <Skeleton className="h-8 w-20 rounded" />
                    </TableCell>
                  </TableRow>
                ))
              : orders?.map((order) => (
                  <TableRow
                    key={order._id}
                    className="border-b border-gray-300 hover:bg-gray-100 transition"
                  >
                    <TableCell>{order._id}</TableCell>
                    <TableCell>${order.total}</TableCell>
                    <TableCell>{order.orderItems.length}</TableCell>
                    <TableCell>
                      {(() => {
                        switch (order.status) {
                          case "Delivered":
                            return (
                              <span className="font-bold text-[14px]  text-[rgb(47,0,255)]">
                                Delivered
                              </span>
                            );
                          case "Cancelled":
                            return (
                              <span className="font-bold text-[14px] text-red-600">
                                Cancel
                              </span>
                            );
                          case "Shipped":
                            return (
                              <span className="text-green-800 text-[14px]  font-bold">
                                Shipped
                              </span>
                            );
                          case "Processing":
                            return (
                              <span className="font-bold text-[14px] text-yellow-800">
                                Processing
                              </span>
                            );
                          default:
                            return (
                              <span className="text-gray-500 text-[14px]">
                                {order.status}
                              </span>
                            );
                        }
                      })()}
                    </TableCell>

                    <TableCell className="flex gap-2 justify-end">
                      <button
                        onClick={() => handlePrint(order)}
                        className="px-4 py-1 rounded bg-black text-white hover:bg-white hover:text-black border border-black transition cursor-pointer"
                      >
                        Print
                      </button>
                      <button
                        // onClick={() => handleDetails(order)}
                        className="px-4 py-1 rounded bg-white text-black hover:bg-gray-200 font-semibold border  transition cursor-pointer"
                      >
                        Invoice
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
