/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { useEffect } from "react";
import type { CustomError, User } from "@/frontend/types/types";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function VerifiedAdminTable() {
  const { data, isLoading, isError, error } = useGetAllUsersQuery({
    sort: "-updatedAt",
    role: "ADMIN,SUPER_ADMIN",
  });

  const [updateUser] = useUpdateUserMutation();

  const allAdmin = data?.data;

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  const handleMakeAdmin = async (admin: User) => {
    try {
      await updateUser({
        id: admin._id,
        data: { role: "USER" },
      }).unwrap();

      toast.success(`${admin.name} has been demoted from Admin to User`);
    } catch (error: any) {
      toast.error(error.data.message || "Failed to update user role");
    }
  };

  const handleToggleUserStatus = async (user: User) => {
    const newStatus = user.isActive === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    try {
      await updateUser({
        id: user._id,
        data: { isActive: newStatus },
      }).unwrap();

      toast.success(`${user.name} is now ${newStatus}`);
    } catch (error: any) {
      toast.error(error.data.message || "Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold dark:text-white/80 mb-6 xl:mt-7">
        Verified Admin
      </h1>
      <p className="dark:text-white/70 mb-7">
        A verified admin can acces this admin dashboard
      </p>

      <div className="dark:bg-gray-900 dark:border dark:border-gray-800 bg-white rounded-lg overflow-x-auto p-2">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-gray-800 border-gray-300 text-[15px] xl:text-[18px] font-semibold">
              <TableHead className="dark:text-blue-300 text-blue-500 py-4">
                User ID
              </TableHead>
              <TableHead className="dark:text-blue-300 text-blue-500 py-4 text-center">
                Name
              </TableHead>
              <TableHead className="dark:text-blue-300 text-blue-500 py-4 text-center">
                Email
              </TableHead>
              <TableHead className="dark:text-blue-300 text-blue-500 py-4 text-center">
                Auths
              </TableHead>
              <TableHead className="dark:text-blue-300 text-blue-500 py-4 text-center">
                Active
              </TableHead>
              <TableHead className="dark:text-blue-300 text-blue-500 py-4 text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
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

            {isLoading
              ? Array.from({ length: 15 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 6 }).map((__, i) => (
                      <TableCell key={i}>
                        <Skeleton className="h-7 w-full rounded-sm " />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : allAdmin?.map((admin) => (
                  <TableRow
                    key={admin._id}
                    className="dark:border-gray-800 border-gray-300 dark:hover:bg-gray-800"
                  >
                    <TableCell className="dark:text-gray-300">
                      {admin._id}
                    </TableCell>
                    <TableCell className="text-center dark:text-gray-300 font-medium">
                      {admin.name}
                    </TableCell>
                    <TableCell className="text-center dark:text-gray-300 font-medium">
                      {admin.email}
                    </TableCell>

                    <TableCell className="text-center dark:text-gray-300 font-medium">
                      {admin.auths.map((auth) => auth.provider).join(" , ")}
                    </TableCell>

                    <TableCell className="text-center dark:text-gray-300 font-medium">
                      <Badge
                        variant={
                          admin.isActive === "ACTIVE"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {admin.isActive}
                      </Badge>
                    </TableCell>

                    {/* <TableCell className="text-center">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-md shadow-lg transform transition-transform duration-200 hover:scale-105"
                        >
                          Action
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="dark:bg-gray-900 dark:border-gray-800">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="dark:text-white">
                            Confirm Role Change
                          </AlertDialogTitle>
                          <AlertDialogDescription className="dark:text-gray-400">
                            Are you sure you want to make this admin a normal
                            user?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="dark:text-gray-300 cursor-pointer">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell> */}
                    <TableCell className="text-center space-x-2">
                      {/* Action - Make Admin */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 cursor-pointer text-white rounded-md shadow-lg transform transition-transform duration-200 hover:scale-105"
                          >
                            Action
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="dark:bg-gray-900 dark:border-gray-800">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="dark:text-white">
                              Confirm Promotion
                            </AlertDialogTitle>
                            <AlertDialogDescription className="dark:text-gray-400">
                              Are you sure you want to make this admin as normal
                              User ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="dark:text-gray-300 cursor-pointer">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                              onClick={() => handleMakeAdmin(admin)}
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      {/* Block/Activate User */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            className={`${
                              admin.isActive === "ACTIVE"
                                ? "bg-yellow-600 hover:bg-yellow-700 text-md px-5"
                                : "bg-blue-600 hover:bg-blue-700"
                            } cursor-pointer text-white rounded-md shadow-lg transform transition-transform duration-200 hover:scale-105`}
                          >
                            {admin.isActive === "ACTIVE" ? "Block" : "Activate"}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="dark:bg-gray-900 dark:border-gray-800">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="dark:text-white">
                              Confirm{" "}
                              {admin.isActive === "ACTIVE"
                                ? "Block"
                                : "Activate"}
                            </AlertDialogTitle>
                            <AlertDialogDescription className="dark:text-gray-400">
                              Are you sure you want to{" "}
                              {admin.isActive === "ACTIVE"
                                ? "block"
                                : "activate"}{" "}
                              this User?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="dark:text-gray-300 cursor-pointer">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className={`${
                                admin.isActive === "ACTIVE"
                                  ? "bg-red-600 hover:bg-red-700"
                                  : "bg-yellow-600 hover:bg-yellow-700"
                              } text-white cursor-pointer`}
                              onClick={() => handleToggleUserStatus(admin)}
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
