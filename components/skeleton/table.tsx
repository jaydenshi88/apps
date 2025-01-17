import { Skeleton } from "@/components/ui/skeleton";

export function DataTableSkeleton() {
  return (
    <div className="w-full space-y-2.5 overflow-auto">
      <div className="space-y-4">
        {/* Advanced Toolbar / Toolbar Skeleton */}
        <div className="flex items-center justify-between p-4">
          <Skeleton className="h-10 w-1/4" />
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-12" />
            <Skeleton className="h-10 w-12" />
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="rounded-md border">
          <Skeleton className="h-6 w-full" /> {/* Table Header Skeleton */}
          <div className="space-y-2">
            {[...Array(5)].map(
              (
                _,
                index, // Assuming 5 rows for the skeleton
              ) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4"
                >
                  <Skeleton className="h-6 w-1/5" />
                  <Skeleton className="h-6 w-1/5" />
                  <Skeleton className="h-6 w-1/5" />
                  <Skeleton className="h-6 w-1/5" />
                  <Skeleton className="h-6 w-1/5" />
                </div>
              ),
            )}
          </div>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-1/4" />
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-12" />
            <Skeleton className="h-10 w-12" />
            <Skeleton className="h-10 w-12" />
          </div>
        </div>

        {/* Floating Bar Skeleton (Optional) */}
        <div className="rounded-md border p-4">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
