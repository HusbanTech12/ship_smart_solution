import { cn } from "@/lib/utils"

interface SkeletonLoaderProps {
  rows?: number
  className?: string
  variant?: "text" | "card" | "circle"
}

export function SkeletonLoader({
  rows = 3,
  className,
  variant = "text",
}: SkeletonLoaderProps) {
  if (variant === "circle") {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
      </div>
    )
  }

  if (variant === "card") {
    return (
      <div className={cn("rounded-xl border border-border p-6 space-y-4", className)}>
        <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
        <div className="h-8 w-1/4 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
    )
  }

  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-3 rounded bg-gray-200 dark:bg-gray-700 animate-pulse",
            i === rows - 1 ? "w-2/3" : "w-full",
          )}
        />
      ))}
    </div>
  )
}
