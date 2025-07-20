import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type FormData = {
  userIdOrEmail: string;
  subject: string;
  body: string;
  file: File | null;
};

export default function SendEmailForm() {
  const [formData, setFormData] = useState<FormData>({
    userIdOrEmail: "",
    subject: "",
    body: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, files } = e.target as HTMLInputElement &
      HTMLTextAreaElement;
    if (name === "file" && files && files.length > 0) {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userIdOrEmail || !formData.subject || !formData.body) {
      alert("Please fill all required fields");
      return;
    }
    setLoading(true);

    // TODO: connect with backend or RTK mutation

    setTimeout(() => {
      alert(`Email would be sent to user: ${formData.userIdOrEmail}`);
      setLoading(false);
      setFormData({ userIdOrEmail: "", subject: "", body: "", file: null });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold dark:text-white/80 mb-6 xl:mt-7">
        Send Email to User
      </h1>
      <p className="dark:text-white/70 mb-7">
        Enter UserID or Email, subject, message, and optionally attach a file.
      </p>

      <div className="dark:bg-gray-900 dark:border dark:border-gray-800 bg-white rounded-lg overflow-x-auto p-6 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            name="userIdOrEmail"
            placeholder="User ID or Email"
            value={formData.userIdOrEmail}
            onChange={handleChange}
            required
            className="mt-3"
          />

          <Input
            name="subject"
            placeholder="Email Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="mt-3"
          />

          <Textarea
            name="body"
            placeholder="Email Body"
            value={formData.body}
            onChange={handleChange}
            required
            rows={6}
            className="rounded-[7px] mt-3 border-black/30 dark:border-gray-700 bg-gray-50 xl:text-[15px] dark:text-white"
          />

          <Input
            id="photos"
            type="file"
            multiple
            accept="image/*"
            className={`bg-gray-50 border-gray-300 text-gray-900 file:bg-blue-600 file:text-white hover:file:bg-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white/70 dark:file:bg-blue-700 dark:file:text-white dark:hover:file:bg-blue-800  file:mr-4 xl:file:mt-1  file:py-1 file:px-4 file:rounded-[7px] file:border-0 file:text-sm file:font-semibold file:cursor-pointer rounded-[7px] mt-3 `}
          />

          <Button
            type="submit"
            disabled={loading}
            className="bg-green-700 hover:bg-green-600 text-white"
          >
            {loading ? "Sending..." : "Send Email"}
          </Button>
        </form>
      </div>
    </div>
  );
}
