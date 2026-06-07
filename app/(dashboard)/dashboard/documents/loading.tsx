import { SkeletonLoader } from "@/components/shared/skeleton-loader"

export default function DocumentsLoading() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="space-y-1">
        <div className="h-8 w-40 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="h-4 w-80 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
      <SkeletonLoader variant="card" className="h-64" />
    </div>
  )
}
