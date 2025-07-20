import type { ColumnDef, Row } from "@tanstack/react-table";
import type { ReactElement } from "react";
import TableHOC from "../components/TableHoc";

interface DataType {
  photo: ReactElement;
  name: string;
  orderId: string;
  email: string;
  amount: number;
  paymentMethod: string;
}

// Match card types to images (adjust paths as needed)
const paymentImages: Record<string, string> = {
  visa: "/card/visa.png",
  mastercard: "/card/mastercard.jpg",
  amex: "/card/amex.png",
  discover: "/card/amexcard.avif",
  default: "/card/default-card.png",
};

const img = "https://randomuser.me/api/portraits/women/54.jpg";
const img2 = "https://randomuser.me/api/portraits/women/50.jpg";
const arr: Array<DataType> = [
  {
    photo: (
      <img
        src={img}
        alt="User"
        style={{
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          padding: 0,
        }}
      />
    ),
    name: "Charasfsfsfssfsfsfsfsfsf",
    orderId: "ORD123456",
    email: "user1@example.com",
    amount: 4500,
    paymentMethod: "Mastercard",
  },

  {
    photo: (
      <img
        src={img2}
        alt="User"
        style={{ borderRadius: "50%", width: "30px", height: "30px" }}
      />
    ),
    name: "Xavirorsfsfsf",
    orderId: "ORD123457",
    email: "user2@example.com",
    amount: 6999,
    paymentMethod: "Visa",
  },
  {
    photo: (
      <img
        src={img}
        alt="User"
        style={{
          borderRadius: "50%",
          width: "30px",
          height: "30px",
        }}
      />
    ),
    name: "Xavirorssfsf",
    orderId: "ORD123458",
    email: "user3@example.com",
    amount: 6999,
    paymentMethod: "amex",
  },
];

const columns: ColumnDef<DataType>[] = [
  {
    header: "Photo",
    accessorKey: "photo",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Order ID",
    accessorKey: "orderId",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Payment Method",
    accessorKey: "paymentMethod",
    cell: ({ row }: { row: Row<DataType> }) => {
      const method = row.original.paymentMethod?.toLowerCase() || "default";
      const image = paymentImages[method] || paymentImages.default;

      return (
        <img src={image} alt={method} className="w-5 h-5 object-contain" />
      );
    },
  },
];

const Transactions = () => {
  const Table = TableHOC<DataType>({
    columns,
    data: arr,
    heading: "Recent Transaction Details",
    showPagination: arr.length > 20,
    containerClassname: "w-full",
    pageSize: 20,
    cellBorders: true,
  })();
  return (
    <div>
      <main>{Table}</main>
    </div>
  );
};

export default Transactions;
