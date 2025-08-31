import type { ColumnDef, Row } from "@tanstack/react-table";
import { useEffect, useState, type ReactElement } from "react";
import TableHOC from "../components/TableHoc";

import StatusDialog from "../components/StatusDialog";
import { useAllOrdersQuery } from "@/redux/api/orderApi";
import type { CustomError, OrderStatus } from "@/frontend/types/types";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: OrderStatus;
  action: ReactElement;
}

const arr: Array<DataType> = [
  {
    user: "Charasfsfsfssfsfsfsfsfsf",
    amount: 4500,
    discount: 400,
    status: "Processing",
    quantity: 3,
    action: <StatusDialog status={"Processing"} id={"dd"} />,
  },
];

const columns: ColumnDef<DataType>[] = [
  {
    header: "Order ID",
    accessorKey: "user",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Discount",
    accessorKey: "discount",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },

  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }: { row: Row<DataType> }) => {
      const status = row.original.status;

      switch (status) {
        case "Delivered":
          return (
            <span className="font-bold dark:text-[aqua] text-[rgb(47,0,255)]">
              Delivered
            </span>
          );
        case "Cancelled":
          return <span className="paid font-bold">Canceled</span>;
        case "Shipped":
          return (
            <span className="text-green-800 dark:text-[rgb(0,195,0)] font-bold">
              Shipped
            </span>
          );
        case "Processing":
          return <span className="red font-bold text-[17px]">Processing</span>;
        default:
          return <span className="text-gray-500">{row.original.status}</span>;
      }
    },
  },
  {
    header: "Action",
    accessorKey: "action",
  },
];

const Orders = () => {
  const { data, isLoading, isError, error } = useAllOrdersQuery();

  const orders = data?.data;

  const [rows, setRows] = useState<DataType[]>(arr);

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  useEffect(() => {
    if (orders) {
      setRows(
        orders.map((i) => ({
          user: i._id,
          amount: i.total,
          discount: i.discount,
          status: i.status as OrderStatus,
          quantity: i.orderItems.length,
          action: <StatusDialog status={i.status as OrderStatus} id={i._id} />,
        })),
      );
    } else {
      console.log("No products yet or products undefined");
    }
  }, [orders]);

  const Table = TableHOC<DataType>({
    columns,
    data: rows,
    heading: "Recent Orders Details",
    showPagination: rows.length > 15,
    containerClassname: "w-full overflow-x-auto",
    pageSize: 15,
    cellBorders: true,
  })();
  return (
    <div>
      <main className="p-3">{isLoading ? <Skeleton /> : Table}</main>
    </div>
  );
};

export default Orders;
