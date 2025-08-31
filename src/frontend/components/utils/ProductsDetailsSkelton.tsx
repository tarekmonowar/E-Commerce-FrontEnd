import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <section className="bg-gray-100 pt-7">
      <div className="max-w-7xl mx-auto px-4 rounded-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-18 md:mt-0">
          {/* Image Gallery Skeleton */}
          <div className="flex gap-4 p-6 rounded-md">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 w-16">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="w-full h-16 rounded-[3px]" />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative">
              <Skeleton className="w-full aspect-square rounded-md" />
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-5 md:pt-10">
            {/* Product Title */}
            <Skeleton className="h-6 w-1/2 rounded-sm" />

            {/* Brand + Rating */}
            <div className="flex flex-wrap gap-4 items-center">
              <Skeleton className="h-4 w-24 rounded-sm" />
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-5 w-5 rounded-full" />
                  ))}
                </div>
                <Skeleton className="h-3 w-20 rounded-sm" />
              </div>
            </div>

            {/* Price + Stock */}
            <div className="flex gap-6 flex-wrap">
              <Skeleton className="h-5 w-20 rounded-sm" />
              <Skeleton className="h-5 w-28 rounded-sm" />
            </div>

            {/* Description */}
            <Skeleton className="h-20 w-full rounded-sm" />

            {/* Shipping Info */}
            <Skeleton className="h-4 w-1/3 rounded-sm" />

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-4">
              <Skeleton className="h-5 w-20 rounded-sm" />
              <div className="flex gap-2 items-center">
                <Skeleton className="h-8 w-8 rounded-sm" />
                <Skeleton className="h-6 w-6 rounded-sm" />
                <Skeleton className="h-8 w-8 rounded-sm" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mt-5 xl:mt-7">
              <Skeleton className="h-10 w-36 rounded-sm" />
              <Skeleton className="h-10 w-40 rounded-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Skeleton */}
      <div className="px-5 lg:px-4 max-w-7xl mx-auto mb-6 mt-6 flex flex-wrap gap-2 xl:gap-4 overflow-x-auto scrollbar-hide">
        <Skeleton className="h-8 w-28 rounded-[4px]" />
        <Skeleton className="h-8 w-24 rounded-[4px]" />
      </div>

      {/* Slider Skeleton */}
      <div className="w-full overflow-x-auto relative">
        {/* Left Nav Button */}
        <div className="absolute left-7 xl:left-[calc((100%-1200px)/2)] top-1/2 -translate-y-1/2 z-10">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        <div
          className="flex gap-4 px-4 max-w-7xl mx-auto "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overflow: "auto",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white h-[170px] w-64 rounded-sm shadow-sm flex-shrink-0 p-3 space-y-3 "
            >
              {/* Stars */}
              <div className="flex justify-between ">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-4 rounded-full" />
                  ))}
                </div>
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>

              {/* Comment */}
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[80%]" />
              <Skeleton className="h-3 w-[60%]" />

              {/* User */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>

        {/* Right Nav Button */}
        <div className="absolute right-7 xl:right-24 top-1/2 -translate-y-1/2 z-10">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </section>
  );
}
