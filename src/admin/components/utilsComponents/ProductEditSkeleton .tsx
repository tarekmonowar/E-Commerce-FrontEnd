import { Skeleton } from "@/components/ui/skeleton";

const ProductEditSkeleton = () => {
  return (
    <div className="flex justify-center w-7xl gap-5">
      {/* Left Skeleton - Image Gallery */}
      <div className="p-6 pt-7 bg-[#F3F9F1] dark:bg-gray-800 rounded-md w-[40%] -ml-7">
        <div className="flex gap-4 ">
          <div className="flex flex-col gap-2 w-16">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="w-full h-16 rounded-[3px]" />
            ))}
            <Skeleton className="w-full h-16 border-2 border-dashed border-gray-400 rounded-[3px]" />
          </div>
          <div className="flex-1">
            <Skeleton className="w-full aspect-square rounded-md h-[40vh]" />
          </div>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-full h-20 rounded-sm" />
            ))}
          </div>
        </div>
      </div>

      {/* Right Skeleton - Form */}
      <div className=" space-y-2 w-[60%] h-[] pr-8">
        <Skeleton className="h-8 w-40 rounded-sm mb-4" />

        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          ))}

          <div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-36 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditSkeleton;
