import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsSkelton() {
  return (
    <div className="bg-[#f6f7f9]">
      <div>
        {/* Products Swiper Skeleton */}
        <div
          className="w-full overflow-x-auto  relative "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overflow: "auto",
          }}
        >
          <div className="flex px-[calc((100%-1280px)/2)] gap-4 pl-4 lg:pl-0  lg:px-4 ">
            {/* Spacer for large screens */}
            <div className="hidden lg:block w-[calc((100%-1280px)/2)] flex-shrink-0" />

            {/* Spacer for mobile */}
            <div className="lg:hidden w-[10px] flex-shrink-0" />

            {/* Product Cards */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="!w-64 !flex-shrink-0">
                <div className="bg-white rounded-sm shadow-sm group mb-1 space-y-4">
                  <Skeleton className="h-40 sm:h-48 w-full rounded-sm" />
                  <div className="space-y-2 px-4 py-[10px]">
                    <Skeleton className="h-3 w-1/3 rounded-[4px]" />
                    <Skeleton className="h-4 w-full rounded-sm" />

                    <div className="flex gap-1 pt-1">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-4 w-4 rounded-full" />
                      ))}
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <Skeleton className="h-4 w-12 rounded-sm" />
                      <Skeleton className="h-5 w-16 rounded-sm" />
                    </div>
                    <Skeleton className="h-8 w-full rounded-sm" />
                  </div>
                </div>
              </div>
            ))}

            {/* Spacer for mobile */}
            <div className="lg:hidden w-[10px] flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
