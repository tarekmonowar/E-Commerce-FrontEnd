/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useUpdateUserMutation } from "@/redux/api/userApi";
import { clearUser } from "@/redux/reducer/userReducer";
import type { RootState } from "@/redux/store";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState("");
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [updateUser] = useUpdateUserMutation();

  const handleDelete = async () => {
    if (confirmation !== "DELETE") {
      toast.error("You must type 'DELETE' to confirm.");
      return;
    }
    if (!user?._id) return;

    try {
      await updateUser({
        id: user._id,
        data: { isActive: "BLOCKED" },
      }).unwrap();

      dispatch(clearUser());
      navigate("/");
      toast.success("Account Update Successful");
    } catch (error: any) {
      console.error("Update failed:", error);
      const message =
        error?.message || error?.data?.message || "Delete account failed";
      toast.error(message);
    }
  };
  return (
    <Card className="rounded-sm border-none shadow bg-white text-black">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <Trash2 className="h-5 w-5" />
          Delete Account
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-red-50 rounded-[3px]">
          <p className="text-sm text-red-800 font-medium p-3">
            Warning: This action cannot be undone
          </p>
          <p className="text-sm text-gray-800 p-3">
            Deleting your account will permanently remove all your data,
            including orders, addresses, and personal information.
          </p>
        </div>
        <div>
          <Label htmlFor="deleteConfirmation">
            Type "DELETE" to confirm account deletion *
          </Label>
          <input
            type="text"
            placeholder="type 'DELETE' "
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            required
            className="bg-gray-50 border border-gray-500 px-4 py-2 my-3 w-full rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2B7A0B]"
          />
        </div>
        <button
          onClick={handleDelete}
          className="bg-red-700 hover:bg-red-800 cursor-pointer py-2 px-4 text-white rounded-sm "
        >
          Delete
        </button>
      </CardContent>
    </Card>
  );
};

export default DeleteAccount;
