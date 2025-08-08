/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CustomError, Product } from "@/frontend/types/types";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/api/productApi";
import { Edit, Eye, Loader, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductModalAdmin from "../components/ProductDetailsAdmin";
import { Link } from "react-router-dom";

const Products = () => {
  const { data, isLoading, isError, error } = useGetAllProductsQuery(
    { sort: "-updatedAt" },
    { refetchOnMountOrArgChange: true },
  );

  const [deleteProduct] = useDeleteProductMutation();

  const products = data?.data;

  // console.log(products);

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    setDeletingId(id);
    try {
      await deleteProduct(id).unwrap();
      toast.success(`${name} is delete successful`);
      setDeletingId("");
    } catch (error: any) {
      console.error("Delete failed:", error);
      toast.error(error.data.message);
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold dark:text-white mb-6">All Products</h1>

      <div
        className="dark:bg-gray-900 dark:border dark:border-gray-800  rounded-sm overflow-x-auto p-2"
        key={products ? products.map((p) => p._id).join(",") : "empty"}
      >
        <Table>
          <TableHeader>
            <TableRow className="dark:border-gray-800 border-[#726a6aa4] dark:hover:bg-gray-800">
              <TableHead className="dark:text-white/70 font-bold text-lg py-5">
                Photo
              </TableHead>
              <TableHead className="dark:text-white/70 font-bold text-lg py-5">
                Name
              </TableHead>
              <TableHead className="dark:text-white/70 font-bold text-lg py-5">
                Category
              </TableHead>
              <TableHead className="dark:text-white/70 font-bold text-lg py-5 text-center">
                Rating
              </TableHead>
              <TableHead className="dark:text-white/70 font-bold text-lg py-5 text-center">
                Price
              </TableHead>
              <TableHead className="dark:text-white/70 font-bold text-lg py-5 text-center">
                Discount
              </TableHead>
              <TableHead className="dark:text-white/70 font-bold text-lg py-5 text-center">
                Stock
              </TableHead>
              <TableHead className="dark:text-white/70 font-bold text-lg py-5 text-center">
                Availability
              </TableHead>
              <TableHead className="dark:text-white/70 font-bold text-lg py-5 text-center">
                Actions
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
            {isLoading &&
              Array.from({ length: 15 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 9 }).map((__, i) => (
                    <TableCell key={i}>
                      <Skeleton className="h-7 w-full rounded-sm" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {!isLoading &&
              !isError &&
              Array.isArray(products) &&
              products?.map((product) => (
                <TableRow
                  key={product._id}
                  className="dark:border-gray-800 border-[#645f5f59] dark:hover:bg-gray-800"
                >
                  <TableCell className="dark:text-white">
                    <img
                      src={product.photos[0].url}
                      alt={product.name}
                      className="h-14 w-14 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell className="dark:text-gray-300">
                    <div>
                      <div className="font-bold dark:text-gray-200 text-[17px]">
                        {product.name}
                      </div>
                      {product.description && (
                        <div className="text-sm dark:text-gray-300">
                          {product.description.split(" ").slice(0, 5).join(" ")}
                          ...
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge className="text-xs text-black">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="dark:text-gray-300 text-center">
                    ⭐ {product.ratings}
                  </TableCell>
                  <TableCell className="dark:text-gray-300 font-semibold text-center">
                    ${product.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="dark:text-gray-300 font-semibold text-center">
                    {product.discount.toLocaleString()}%
                  </TableCell>
                  <TableCell className="dark:text-gray-300 font-semibold text-center">
                    {product.stock}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={product.stock > 0 ? "default" : "destructive"}
                    >
                      {product.stock > 0 ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <Button
                        onClick={() => {
                          handleOpenModal(product);
                        }}
                        className="inline-flex items-center text-black justify-center rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm dark:text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer shadow-lg transform transition-transform duration-200 hover:scale-105"
                      >
                        <Eye className="h-5 w-5" />
                      </Button>

                      <Link
                        to={`/admin/product/${product._id}`}
                        className="inline-flex items-center text-black justify-center rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm dark:text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer shadow-lg transform transition-transform duration-200 hover:scale-105"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          {deletingId === product._id ? (
                            <>
                              <Loader className="h-5 w-5 animate-spin mr-2 text-red-500 dark:text-red-400" />
                            </>
                          ) : (
                            <Button
                              size="default"
                              variant="outline"
                              className="bg-transparent border-red-600 text-red-500 hover:bg-red-200 hover:text-red-700 dark:hover:bg-red-400 dark:hover:text-black cursor-pointer shadow-lg transform transition-transform duration-200 hover:scale-105"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          )}
                        </AlertDialogTrigger>
                        <AlertDialogContent className="dark:bg-gray-900 dark:border-gray-800 z-[200]">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="dark:text-white">
                              Delete Product
                            </AlertDialogTitle>
                            <AlertDialogDescription className="dark:text-gray-400 text-gray-800">
                              Are you sure you want to delete "{product.name}"?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-transparent border-gray-600 dark:text-gray-300 hover:bg-gray-300  dark:hover:text-gray-300 dark:hover:bg-gray-800 cursor-pointer">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDelete(product._id, product.name)
                              }
                              disabled={deletingId === product._id}
                              className="bg-red-700 hover:bg-red-600 dark:text-white cursor-pointer "
                            >
                              {deletingId === product._id
                                ? "Deleting..."
                                : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      <ProductModalAdmin
        product={selectedProduct}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Products;
