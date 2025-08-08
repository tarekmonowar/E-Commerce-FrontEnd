import { Skeleton } from "@/components/ui/skeleton";

export default function AllProductsSkeleton({
  layoutType,
}: {
  layoutType: "list" | "grid";
}) {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`bg-white rounded-sm shadow-sm group mb-1 [box-shadow:rgba(9,30,66,0.25)_0px_1px_1px,rgba(9,30,66,0.13)_0px_0px_1px_1px] ${
            layoutType === "list" ? "flex gap-10 h-[220px]" : ""
          }`}
        >
          {/* Image Skeleton */}
          <Skeleton
            className={`rounded-t-sm ${
              layoutType === "list"
                ? "w-56 h-full rounded-l-sm"
                : "h-40 sm:h-48 w-full"
            }`}
          />

          {/* Content Skeleton */}
          <div
            className={`${
              layoutType === "list" ? "flex-1 p-2" : "p-3 sm:p-4"
            } space-y-3 flex flex-col justify-between w-full`}
          >
            {/* Brand */}
            <Skeleton className="h-3 w-1/4 rounded" />
            {/* Title */}
            <Skeleton className="h-5 w-3/4 rounded" />
            {/* Description only for list */}
            {layoutType === "list" && (
              <Skeleton className="h-10 w-full rounded" />
            )}
            {/* Ratings */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-4 rounded-full" />
              ))}
            </div>
            {/* Price */}
            <div className="flex justify-start gap-4 items-center">
              <Skeleton className="h-4 w-12 rounded" />
              <Skeleton className="h-6 w-20 rounded" />
            </div>
            {/* Add to cart button */}
            <Skeleton
              className={`h-8 rounded-sm ${
                layoutType === "list" ? "w-52" : "w-full"
              }`}
            />
          </div>
        </div>
      ))}
    </>
  );
}
