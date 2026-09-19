import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-8">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-4 w-96" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border border-border rounded-2xl p-6 space-y-4 min-h-[380px]">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
