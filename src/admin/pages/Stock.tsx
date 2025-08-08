import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/api/productApi"; // Adjust path as needed
import type { CustomError, Product } from "@/frontend/types/types";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

const Stock = () => {
  const { data, isLoading, isError, error } = useGetAllProductsQuery({
    sort: "-updatedAt",
  });

  const availableProducts =
    data?.data?.filter((p: Product) => p.stock > 0) || [];
  const unavailableProducts =
    data?.data?.filter((p: Product) => p.stock <= 0) || [];

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  const TableSkeletonRows = ({ rows = 4, columns = 5 }) => {
    return (
      <>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className="h-7 w-full rounded-sm" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  };

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
                Discount
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
            {/* Error show */}
            {isError && (
              <TableRow>
                <TableCell colSpan={8} className="text-red-500 text-center">
                  Error:{" "}
                  {
                    // Check if error is FetchBaseQueryError with data/message
                    "status" in error &&
                    error.data &&
                    typeof error.data === "object" &&
                    "message" in error.data
                      ? (error.data as { message: string }).message
                      : "Something went wrong"
                  }
                </TableCell>
              </TableRow>
            )}
            {/* loading skelton */}

            {isLoading ? (
              <TableSkeletonRows rows={20} columns={5} />
            ) : (
              unavailableProducts.map((p: Product) => (
                <TableRow
                  key={p._id}
                  className="dark:border-gray-800 border-gray-300 dark:hover:bg-gray-800"
                >
                  <TableCell className="dark:text-gray-300">{p.name}</TableCell>
                  <TableCell className="text-center dark:text-gray-300 font-medium">
                    ${p.price}
                  </TableCell>
                  <TableCell className="text-center dark:text-gray-300 font-medium">
                    {p.discount}%
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="destructive">Unavailable</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Link to={`/admin/product/${p._id}`}>
                      <Button
                        variant="link"
                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-md shadow-lg transform transition-transform duration-200 hover:scale-105"
                      >
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
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
                Discount
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
            {/* Error show */}
            {isError && (
              <TableRow>
                <TableCell colSpan={8} className="text-red-500 text-center">
                  Error:{" "}
                  {
                    // Check if error is FetchBaseQueryError with data/message
                    "status" in error &&
                    error.data &&
                    typeof error.data === "object" &&
                    "message" in error.data
                      ? (error.data as { message: string }).message
                      : "Something went wrong"
                  }
                </TableCell>
              </TableRow>
            )}
            {/* loading skelton */}
            {isLoading ? (
              <TableSkeletonRows rows={20} columns={5} />
            ) : (
              availableProducts.map((p: Product) => (
                <TableRow
                  key={p._id}
                  className="dark:border-gray-800 border-gray-300 dark:hover:bg-gray-800"
                >
                  <TableCell className="dark:text-gray-300">{p.name}</TableCell>
                  <TableCell className="text-center dark:text-gray-300 font-medium">
                    ${p.price}
                  </TableCell>
                  <TableCell className="text-center dark:text-gray-300 font-medium">
                    {p.discount}%
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="default">Available</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Link to={`/admin/product/${p._id}`}>
                      <Button
                        variant="link"
                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-md shadow-lg transform transition-transform duration-200 hover:scale-105"
                      >
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Stock;
