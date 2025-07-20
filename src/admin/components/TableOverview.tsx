import TableHOC from "./TableHoc";
import { resentSales } from "../components/constants";
import type { ColumnDef, Row } from "@tanstack/react-table";
type Sale = {
  id: string;
  amount: string;
  quantity: number;
  status: string;
};

const columns: ColumnDef<Sale, unknown>[] = [
  {
    accessorKey: "id",
    header: "ORDER ID",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },

  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }: { row: Row<Sale> }) => {
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
          return <span className="red font-bold">Processing</span>;
        default:
          return <span className="text-gray-500">{row.original.status}</span>;
      }
    },
  },
];
const TableOverview = TableHOC({
  columns,
  data: resentSales,
  showPagination: resentSales.length > 20,
  containerClassname: "w-full",
  pageSize: 20,
});

export default TableOverview;
