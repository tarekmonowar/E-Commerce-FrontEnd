import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type OrderItem = {
  _id: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
};

type OrderData = {
  _id: string;
  shippingInfo: {
    address: string;
  };
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  orderItems: OrderItem[];
};

const user = {
  name: "Tarek Monowar",
};
// 🧪 Mock Data
const orders: OrderData[] = [
  {
    _id: "68552bccff9ad2888f855bde",
    shippingInfo: {
      address: "jaintapur,sylhet",
    },
    subtotal: 4466,
    tax: 804,
    shippingCharges: 0,
    discount: 0,
    total: 5270,
    status: "processing",
    orderItems: [
      {
        _id: "68552bccff9ad2888f855bdf",
        name: "FCK",
        photo: "uploads\\3b4bc01d-4da7-420a-8359-926f199a35cf.png",
        price: 3455,
        quantity: 1,
        productId: "685463f7148a2a1a508a397f",
      },
      {
        _id: "68552bccff9ad2888f855be0",
        name: "man camera",
        photo: "uploads\\6c0e7322-6041-4aca-9460-88516e8acffe.jpg",
        price: 1011,
        quantity: 1,
        productId: "6835938a8d9a0b42b228546e",
      },
    ],
  },
  {
    _id: "68552bccff9ad888f855bde",
    shippingInfo: {
      address: "jaintapur,sylhet",
    },
    subtotal: 4466,
    tax: 804,
    shippingCharges: 0,
    discount: 0,
    total: 5270,
    status: "shipped",
    orderItems: [
      {
        _id: "68552bccff9ad2888f855bdf",
        name: "FCK",
        photo: "uploads\\3b4bc01d-4da7-420a-8359-926f199a35cf.png",
        price: 3455,
        quantity: 1,
        productId: "685463f7148a2a1a508a397f",
      },
      {
        _id: "68552bccff9ad2888f855be0",
        name: "man camera",
        photo: "uploads\\6c0e7322-6041-4aca-9460-88516e8acffe.jpg",
        price: 1011,
        quantity: 1,
        productId: "6835938a8d9a0b42b228546e",
      },
    ],
  },
  {
    _id: "68552bccff9ad28asf855bde",
    shippingInfo: {
      address: "jaintapur,sylhet",
    },
    subtotal: 4466,
    tax: 804,
    shippingCharges: 0,
    discount: 0,
    total: 5270,
    status: "delivered",
    orderItems: [
      {
        _id: "68552bccff9ad2888f855bdf",
        name: "FCK",
        photo: "uploads\\3b4bc01d-4da7-420a-8359-926f199a35cf.png",
        price: 3455,
        quantity: 1,
        productId: "685463f7148a2a1a508a397f",
      },
      {
        _id: "68552bccff9ad2888f855be0",
        name: "man camera",
        photo: "uploads\\6c0e7322-6041-4aca-9460-88516e8acffe.jpg",
        price: 1011,
        quantity: 1,
        productId: "6835938a8d9a0b42b228546e",
      },
    ],
  },
];

// 🖨️ Print Function
const handlePrint = (order: OrderData) => {
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
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        </style>
      </head>
      <body>
        <h2>Order ID: ${order._id}</h2>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>User Name:</strong> ${user.name}</p>
        <p><strong>Shipping Address:</strong> ${order.shippingInfo.address}</p>
        <p><strong>Total:</strong> $${order.total}</p>

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
            {orders.map((order) => (
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
                      case "delivered":
                        return (
                          <span className="font-bold text-[14px]  text-[rgb(47,0,255)]">
                            Delivered
                          </span>
                        );
                      case "cancel":
                        return (
                          <span className="font-bold text-[14px] text-red-500">
                            Cancel
                          </span>
                        );
                      case "shipped":
                        return (
                          <span className="text-green-800 text-[14px]  font-bold">
                            Shipped
                          </span>
                        );
                      case "processing":
                        return (
                          <span className="font-bold text-[14px] text-orange-600">
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

                <TableCell className="flex gap-2 justify-center">
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
                    Details
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
