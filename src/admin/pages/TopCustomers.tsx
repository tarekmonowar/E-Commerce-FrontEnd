import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const topCustomers = [
  {
    id: "C001",
    name: "Tarek Monowar",
    email: "tarek@example.com",
    gender: "Male",
    totalOrders: 12,
    totalPay: 320.5,
  },
  {
    id: "C002",
    name: "Sarah Khan",
    email: "sarah@example.com",
    gender: "Female",
    totalOrders: 18,
    totalPay: 589.75,
  },
  {
    id: "C003",
    name: "Rafiul Islam",
    email: "rafi@example.com",
    gender: "Male",
    totalOrders: 9,
    totalPay: 199.99,
  },
];

export default function TopCustomersTable() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold dark:text-white/80 mb-6 xl:mt-7">
        Top Customers
      </h1>
      <p className="dark:text-white/70 mb-7">
        List of customers with the highest total purchases and orders.
      </p>

      <div className="dark:bg-gray-900 dark:border dark:border-gray-800 bg-white rounded-lg overflow-x-auto p-2">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-gray-800 border-gray-300 xl:text-[18px] text-[15px] font-semibold ">
              <TableHead className="dark:text-blue-300 text-blue-500 py-4">
                ID
              </TableHead>
              <TableHead className="dark:text-blue-300 text-blue-500 text-center py-4">
                Name
              </TableHead>
              <TableHead className="dark:text-blue-300 text-blue-500 text-center py-4">
                Email
              </TableHead>
              <TableHead className="dark:text-blue-300 text-blue-500 text-center py-4">
                Gender
              </TableHead>
              <TableHead className="dark:text-blue-300 text-blue-500 text-center py-4">
                Total Orders
              </TableHead>
              <TableHead className="dark:text-blue-300 text-blue-500 text-center py-4">
                Total Pay
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topCustomers.map((customer) => (
              <TableRow
                key={customer.id}
                className="dark:border-gray-800 border-gray-300 dark:hover:bg-gray-800"
              >
                <TableCell className="dark:text-gray-300 py-4  xl:text-[16px]">
                  {customer.id}
                </TableCell>
                <TableCell className="text-center dark:text-gray-300 font-medium py-4 xl:text-[16px]">
                  {customer.name}
                </TableCell>
                <TableCell className="text-center dark:text-gray-300 font-medium py-4 xl:text-[16px]">
                  {customer.email}
                </TableCell>
                <TableCell className="text-center dark:text-gray-300 font-medium py-4 xl:text-[16px]">
                  {customer.gender}
                </TableCell>
                <TableCell className="text-center dark:text-gray-300 font-medium py-4 xl:text-[16px]">
                  {customer.totalOrders}
                </TableCell>
                <TableCell className="text-center dark:text-gray-300 font-medium py-4 xl:text-[16px]">
                  ${customer.totalPay.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
