import { Skeleton } from "@/components/ui/skeleton";

export const NCardSkeleton = () => {
  return (
    <div className="pt-10">
      <div className="mx-auto h-[600px] w-[800px] flex-col gap-4 overflow-auto bg-primary-foreground">
        <div className="p-4">
          {/* Title and Description Skeleton */}
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          {/* Form Fields Skeleton */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            {/* Additional Fields */}
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
          {/* Submit Button Skeleton */}
          <Skeleton className="h-10 w-full mt-4" />
        </div>
        {/* Contacts Section Skeleton */}
        <div className="flex justify-between pt-4">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-10 w-20" />
        </div>
        {/* Contacts Carousel Skeleton */}
        <div className="flex w-full items-center justify-center space-y-2 pt-4">
          <Skeleton className="h-40 w-full max-w-xs" />
        </div>
      </div>
    </div>
  );
};
