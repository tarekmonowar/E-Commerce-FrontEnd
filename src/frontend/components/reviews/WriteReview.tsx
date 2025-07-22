import { useRating } from "6pp";
import type { Review } from "@/frontend/constant/type";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

export default function WriteReview({
  editingReview,
  clearEditing,
}: {
  editingReview: Review | null;
  clearEditing: () => void;
}) {
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);
  const {
    Ratings: RatingsEditable,
    rating,
    setRating,
  } = useRating({
    IconFilled: <FaStar />,
    IconOutline: <FaRegStar />,
    value: 0,
    selectable: true,
    styles: {
      fontSize: "1.75rem",
      color: "coral",
      justifyContent: "flex-start",
    },
  });

  // when editingReview changes, set values
  useEffect(() => {
    if (editingReview) {
      setReviewComment(editingReview.comment);
      setRating(editingReview.rating);
    }
  }, [editingReview, setRating]);

  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReviewSubmitLoading(true);

    const res = {
      comment: reviewComment,
      rating,
    };

    if (editingReview) {
      console.log("Updating review:", editingReview._id, res);
      // Call API to update existing review here
    } else {
      console.log("Creating new review:", res);
      // Call API to create new review
    }

    setReviewSubmitLoading(false);
    setRating(0);
    setReviewComment("");
    clearEditing();

    // responseToast(res, null, "");

    // API call to submit review
  };

  return (
    <div className="px-5 lg:px-4 max-w-7xl mx-auto mb-6 mt-6  gap-2 xl:gap-4 overflow-x-auto scrollbar-hide bg-gray-200 rounded-sm">
      <h2 className="px-5 pt-6 text-2xl">Write a Review</h2>
      <form onSubmit={submitReview} className="p-5 text-2xl">
        <textarea
          autoFocus={false}
          value={reviewComment}
          onChange={(e) => setReviewComment(e.target.value)}
          placeholder="Review..."
          className=" border border-gray-500 text-lg mb-3 rounded-sm w-full h-32 p-4 text-gray-600 "
        ></textarea>
        <RatingsEditable />
        <button
          disabled={reviewSubmitLoading}
          type="submit"
          className="bg-[#236027] text-[#ffca2c] px-4 py-1 rounded-sm mt-5 cursor-pointer hover:bg-[#436e46]"
        >
          {editingReview ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}
