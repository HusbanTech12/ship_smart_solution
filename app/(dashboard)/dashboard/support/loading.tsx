import { SkeletonLoader } from "@/components/shared/skeleton-loader"

export default function SupportLoading() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="space-y-1">
        <div className="h-8 w-32 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="h-4 w-72 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonLoader key={i} variant="card" />
        ))}
      </div>
    </div>
  )
}
