import { Skeleton } from '@/components/ui/skeleton';

export function FilterLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-20" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-full rounded-md" />
      </div>

      <div className="bg-muted h-px w-full" />

      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>

      <div className="bg-muted h-px w-full" />

      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-12" />
          ))}
        </div>
      </div>

      <div className="bg-muted h-px w-full" />

      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted h-px w-full" />

      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-2 w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>

      <div className="bg-muted h-px w-full" />

      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-4 rounded-sm" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
