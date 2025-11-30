import { Skeleton } from "@/components/ui/skeleton";
import TableHOC from "./TableHoc";
import { useGetRecentOrdersQuery } from "@/redux/api/statsApi";
import type { ColumnDef, Row } from "@tanstack/react-table";

type Sale = {
  id: string;
  amount: string;
  quantity: number;
  status: string;
};

const TableOverviewComponent = () => {
  const { data, isLoading } = useGetRecentOrdersQuery();
  const sales: Sale[] = data?.data ?? [];

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
        const status = row.original.status.toLowerCase();

        switch (status) {
          case "delivered":
            return (
              <span className="font-bold dark:text-[aqua] text-[rgb(47,0,255)]">
                Delivered
              </span>
            );
          case "cancelled":
          case "cancel":
            return <span className="paid font-bold">Cancelled</span>;
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

  // If loading, show skeleton rows matching table columns
  if (isLoading) {
    return (
      <div className="w-full space-y-2">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="flex gap-4 p-2 mt-2 ml-2 bg-slate-200 dark:bg-slate-950 rounded justify-between"
          >
            <Skeleton className="h-6 w-24 rounded" />
            <Skeleton className="h-6 w-16 rounded" />
            <Skeleton className="h-6 w-20 rounded" />
            <Skeleton className="h-6 w-32 rounded" />
          </div>
        ))}
      </div>
    );
  }

  const Table = TableHOC({
    columns,
    data: sales,
    showPagination: sales.length > 20,
    containerClassname: "w-full",
    pageSize: 20,
  });

  return <Table />;
};

export default TableOverviewComponent;
