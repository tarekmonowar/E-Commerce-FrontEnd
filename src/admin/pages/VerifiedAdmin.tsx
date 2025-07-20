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

const verifiedAdmins = [
  {
    id: "A101",
    name: "Tarek Monowar",
    gender: "Male",
    email: "tarek@example.com",
  },
  {
    id: "A102",
    name: "Sarah Khan",
    gender: "Female",
    email: "sarah@example.com",
  },
  // Add more admins as needed
];

export default function VerifiedAdminTable() {
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
                Gender
              </TableHead>
              <TableHead className="dark:text-blue-300 text-blue-500 py-4 text-center">
                Email
              </TableHead>
              <TableHead className="dark:text-blue-300 text-blue-500 py-4 text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {verifiedAdmins.map((admin) => (
              <TableRow
                key={admin.id}
                className="dark:border-gray-800 border-gray-300 dark:hover:bg-gray-800"
              >
                <TableCell className="dark:text-gray-300">{admin.id}</TableCell>
                <TableCell className="text-center dark:text-gray-300 font-medium">
                  {admin.name}
                </TableCell>
                <TableCell className="text-center dark:text-gray-300 font-medium">
                  {admin.gender}
                </TableCell>
                <TableCell className="text-center dark:text-gray-300 font-medium">
                  {admin.email}
                </TableCell>

                <TableCell className="text-center">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
