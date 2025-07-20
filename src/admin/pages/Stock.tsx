import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  totalSales: number;
  stock: number;
}

const initialData = {
  available: [
    {
      id: "1",
      name: "Bluetooth Speaker",
      category: "Audio",
      price: 90,
      totalSales: 850,
      stock: 10,
    },
    {
      id: "2",
      name: "Sneakers",
      category: "Footwear",
      price: 120,
      totalSales: 560,
      stock: 12,
    },
  ],
  unavailable: [
    {
      id: "3",
      name: "Macbook Pro",
      category: "Electronics",
      price: 2500,
      totalSales: 400,
      stock: 0,
    },
    {
      id: "4",
      name: "Gaming Mouse",
      category: "Accessories",
      price: 60,
      totalSales: 600,
      stock: 0,
    },
  ],
};

const Stock = () => {
  const [availableProducts] = useState<Product[]>(initialData.available);
  const [unavailableProducts] = useState<Product[]>(initialData.unavailable);

  return (
    <div className="flex flex-col lg:flex-row gap-6 xl:mt-10">
      {/* Left: Unavailable */}
      <div className="w-full lg:w-1/2 dark:bg-gray-900 bg-white dark:border dark:border-gray-800 p-5 rounded-md shadow-xl">
        <h2 className="text-2xl xl:text-3xl font-semibold mb-5 dark:text-white">
          Unavailable Products
        </h2>
        <Table>
          <TableHeader>
            <TableRow className="dark:border-gray-800 border-gray-300 text-[15px] font-semibold">
              <TableHead className="dark:text-white">Name</TableHead>
              <TableHead className="dark:text-white text-center">
                Price
              </TableHead>
              <TableHead className="dark:text-white text-center">
                Sales
              </TableHead>
              <TableHead className="dark:text-white text-center">
                Status
              </TableHead>
              <TableHead className="dark:text-white text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {unavailableProducts.map((p) => (
              <TableRow
                key={p.id}
                className="dark:border-gray-800 border-gray-300 dark:hover:bg-gray-800"
              >
                <TableCell className="dark:text-gray-300">{p.name}</TableCell>
                <TableCell className="text-center dark:text-gray-300 font-medium">
                  ${p.price}
                </TableCell>
                <TableCell className="text-center dark:text-gray-300 font-medium">
                  {p.totalSales}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="destructive">Unavailable</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="link"
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-md shadow-lg transform transition-transform duration-200 hover:scale-105"
                    onClick={() => console.log(`Go to /products/${p.id}`)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Right: Available */}
      <div className="w-full lg:w-1/2 dark:bg-gray-900 bg-white dark:border dark:border-gray-800 p-5 rounded-md shadow-xl">
        <h2 className="text-2xl xl:text-3xl font-semibold mb-5 dark:text-white">
          Available Products
        </h2>
        <Table>
          <TableHeader>
            <TableRow className="dark:border-gray-800 border-gray-300 text-[15px] font-semibold">
              <TableHead className="dark:text-white">Name</TableHead>

              <TableHead className="dark:text-white text-center">
                Price
              </TableHead>
              <TableHead className="dark:text-white text-center">
                Sales
              </TableHead>
              <TableHead className="dark:text-white text-center">
                Status
              </TableHead>
              <TableHead className="dark:text-white text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {availableProducts.map((p) => (
              <TableRow
                key={p.id}
                className="dark:border-gray-800 border-gray-300 dark:hover:bg-gray-800"
              >
                <TableCell className="dark:text-gray-300">{p.name}</TableCell>

                <TableCell className="text-center dark:text-gray-300 font-medium">
                  ${p.price}
                </TableCell>
                <TableCell className="text-center dark:text-gray-300 font-medium">
                  {p.totalSales}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="default">Available</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="link"
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-md shadow-lg transform transition-transform duration-200 hover:scale-105"
                    onClick={() => console.log(`Go to /products/${p.id}`)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Stock;
