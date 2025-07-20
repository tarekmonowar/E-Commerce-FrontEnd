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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";
const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

const products = [
  {
    _id: "1",
    name: "Puma Shoes Air Jordan Cook 2023",
    description: "Comfortable and stylish shoes for sports and casual wear.",
    category: "Footwear",
    rating: 4.5,
    price: 690,
    stock: 3,
    photo: img,
  },
  {
    _id: "2",
    name: "Macbook Pro 2023",
    description: "High performance laptop with M2 chip.",
    category: "Electronics",
    rating: 4.8,
    price: 232223,
    stock: 0,
    photo: img2,
  },
  {
    _id: "2",
    name: "Macbook Pro 2023",
    description: "High performance laptop with M2 chip.",
    category: "Electronics",
    rating: 4.8,
    price: 232223,
    stock: 0,
    photo: img2,
  },
];

const Products = () => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    setDeletingId(id);
    setTimeout(() => {
      console.log(`Deleted: ${name}`);
      setDeletingId(null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold dark:text-white mb-6">All Products</h1>

      <div className="dark:bg-gray-900 dark:border dark:border-gray-800  rounded-lg overflow-x-auto p-2">
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
            {products.map((product) => (
              <TableRow
                key={product._id}
                className="dark:border-gray-800 border-[#645f5f59] dark:hover:bg-gray-800"
              >
                <TableCell className="dark:text-white">
                  <img
                    src={product.photo}
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
                  ⭐ {product.rating}
                </TableCell>
                <TableCell className="dark:text-gray-300 font-semibold text-center">
                  ${product.price.toLocaleString()}
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
                    <Link
                      to={`/product/${product._id}`}
                      className="inline-flex items-center justify-center rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm dark:text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer shadow-lg transform transition-transform duration-200 hover:scale-105"
                    >
                      <Eye className="h-5 w-5" />
                    </Link>

                    <Link
                      to={`/edit-product/${product._id}`}
                      className="inline-flex items-center justify-center rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm dark:text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer shadow-lg transform transition-transform duration-200 hover:scale-105"
                    >
                      <Edit className="h-5 w-5" />
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="default"
                          variant="outline"
                          className="bg-transparent border-red-600 text-red-500 hover:bg-red-200 hover:text-red-700 dark:hover:bg-red-400 dark:hover:text-black cursor-pointer shadow-lg transform transition-transform duration-200 hover:scale-105"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
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
    </div>
  );
};

export default Products;
