import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="min-h-dvh flex flex-col">
      {/* Banner skeleton */}
      <Skeleton className="h-10 w-full" />

      {/* Header skeleton */}
      <Skeleton className="h-16 w-full" />

      {/* Hero skeleton */}
      <div className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 gap-10">
        <Skeleton className="w-44 h-44 rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-10 w-32 rounded-xl" />
            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>
        </div>
      </div>

      {/* About skeleton */}
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-96" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      {/* Skills skeleton */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-1.5 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
