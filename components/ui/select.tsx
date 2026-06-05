"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-lg border px-3 py-2 text-sm transition-colors duration-200 ease-out appearance-none",
          "bg-white",
          "text-foreground",
          "border-gray-300",
          "hover:border-brand-primary/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 focus-visible:border-brand-primary",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
          error &&
            "border-status-error focus-visible:ring-status-error/30 focus-visible:border-status-error",
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      >
        {children}
      </select>
    )
  },
)

Select.displayName = "Select"
