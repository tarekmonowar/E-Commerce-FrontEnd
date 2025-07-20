import type { ColumnDef, Row } from "@tanstack/react-table";
import type { ReactElement } from "react";
import TableHOC from "../components/TableHoc";

import StatusDialog from "../components/StatusDialog";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
  action: ReactElement;
}

const arr: Array<DataType> = [
  {
    user: "Charasfsfsfssfsfsfsfsfsf",
    amount: 4500,
    discount: 400,
    status: "processing",
    quantity: 3,
    action: <StatusDialog status="processing" />,
  },

  {
    user: "Xavirorsfsfsf",
    amount: 6999,
    discount: 400,
    status: "shipped",
    quantity: 6,
    action: <StatusDialog status="shipped" />,
  },
  {
    user: "Xavirorssfsf",
    amount: 6999,
    discount: 400,
    status: "delivered",
    quantity: 6,
    action: <StatusDialog status="delivered" />,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: "cancel",
    quantity: 6,
    action: <StatusDialog status="cancel" />,
  },
  {
    user: "Charasfsfsfssfsfsfsfsfsf",
    amount: 4500,
    discount: 400,
    status: "processing",
    quantity: 3,
    action: <StatusDialog status="processing" />,
  },

  {
    user: "Xavirorsfsfsf",
    amount: 6999,
    discount: 400,
    status: "shipped",
    quantity: 6,
    action: <StatusDialog status="shipped" />,
  },
  {
    user: "Xavirorssfsf",
    amount: 6999,
    discount: 400,
    status: "delivered",
    quantity: 6,
    action: <StatusDialog status="delivered" />,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: "cancel",
    quantity: 6,
    action: <StatusDialog status="cancel" />,
  },
  {
    user: "Charasfsfsfssfsfsfsfsfsf",
    amount: 4500,
    discount: 400,
    status: "processing",
    quantity: 3,
    action: <StatusDialog status="processing" />,
  },

  {
    user: "Xavirorsfsfsf",
    amount: 6999,
    discount: 400,
    status: "shipped",
    quantity: 6,
    action: <StatusDialog status="shipped" />,
  },
  {
    user: "Xavirorssfsf",
    amount: 6999,
    discount: 400,
    status: "delivered",
    quantity: 6,
    action: <StatusDialog status="delivered" />,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: "cancel",
    quantity: 6,
    action: <StatusDialog status="cancel" />,
  },
  {
    user: "Charasfsfsfssfsfsfsfsfsf",
    amount: 4500,
    discount: 400,
    status: "processing",
    quantity: 3,
    action: <StatusDialog status="processing" />,
  },

  {
    user: "Xavirorsfsfsf",
    amount: 6999,
    discount: 400,
    status: "shipped",
    quantity: 6,
    action: <StatusDialog status="shipped" />,
  },
  {
    user: "Xavirorssfsf",
    amount: 6999,
    discount: 400,
    status: "delivered",
    quantity: 6,
    action: <StatusDialog status="delivered" />,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: "cancel",
    quantity: 6,
    action: <StatusDialog status="cancel" />,
  },
  {
    user: "Charasfsfsfssfsfsfsfsfsf",
    amount: 4500,
    discount: 400,
    status: "processing",
    quantity: 3,
    action: <StatusDialog status="processing" />,
  },

  {
    user: "Xavirorsfsfsf",
    amount: 6999,
    discount: 400,
    status: "shipped",
    quantity: 6,
    action: <StatusDialog status="shipped" />,
  },
  {
    user: "Xavirorssfsf",
    amount: 6999,
    discount: 400,
    status: "delivered",
    quantity: 6,
    action: <StatusDialog status="delivered" />,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: "cancel",
    quantity: 6,
    action: <StatusDialog status="cancel" />,
  },
  {
    user: "Charasfsfsfssfsfsfsfsfsf",
    amount: 4500,
    discount: 400,
    status: "processing",
    quantity: 3,
    action: <StatusDialog status="processing" />,
  },

  {
    user: "Xavirorsfsfsf",
    amount: 6999,
    discount: 400,
    status: "shipped",
    quantity: 6,
    action: <StatusDialog status="shipped" />,
  },
  {
    user: "Xavirorssfsf",
    amount: 6999,
    discount: 400,
    status: "delivered",
    quantity: 6,
    action: <StatusDialog status="delivered" />,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: "cancel",
    quantity: 6,
    action: <StatusDialog status="cancel" />,
  },
  {
    user: "Charasfsfsfssfsfsfsfsfsf",
    amount: 4500,
    discount: 400,
    status: "processing",
    quantity: 3,
    action: <StatusDialog status="processing" />,
  },

  {
    user: "Xavirorsfsfsf",
    amount: 6999,
    discount: 400,
    status: "shipped",
    quantity: 6,
    action: <StatusDialog status="shipped" />,
  },
  {
    user: "Xavirorssfsf",
    amount: 6999,
    discount: 400,
    status: "delivered",
    quantity: 6,
    action: <StatusDialog status="delivered" />,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: "cancel",
    quantity: 6,
    action: <StatusDialog status="cancel" />,
  },
  {
    user: "Charasfsfsfssfsfsfsfsfsf",
    amount: 4500,
    discount: 400,
    status: "processing",
    quantity: 3,
    action: <StatusDialog status="processing" />,
  },

  {
    user: "Xavirorsfsfsf",
    amount: 6999,
    discount: 400,
    status: "shipped",
    quantity: 6,
    action: <StatusDialog status="shipped" />,
  },
  {
    user: "Xavirorssfsf",
    amount: 6999,
    discount: 400,
    status: "delivered",
    quantity: 6,
    action: <StatusDialog status="delivered" />,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: "cancel",
    quantity: 6,
    action: <StatusDialog status="cancel" />,
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
        case "delivered":
          return (
            <span className="font-bold dark:text-[aqua] text-[rgb(47,0,255)]">
              Delivered
            </span>
          );
        case "cancel":
          return <span className="paid font-bold">Cancel</span>;
        case "shipped":
          return (
            <span className="text-green-800 dark:text-[rgb(0,195,0)] font-bold">
              Shipped
            </span>
          );
        case "processing":
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
  const Table = TableHOC<DataType>({
    columns,
    data: arr,
    heading: "Recent Orders Details",
    showPagination: arr.length > 15,
    containerClassname: "w-full overflow-x-auto",
    pageSize: 15,
    cellBorders: true,
  })();
  return (
    <div>
      <main className="p-3">{Table}</main>
    </div>
  );
};

export default Orders;
