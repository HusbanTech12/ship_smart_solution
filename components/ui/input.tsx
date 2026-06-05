"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-lg border px-3 py-2 text-sm transition-colors duration-200 ease-out",
          "bg-white dark:bg-brand-dark",
          "text-foreground placeholder:text-brand-muted",
          "border-gray-300 dark:border-gray-600",
          "hover:border-brand-primary/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 focus-visible:border-brand-primary",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 dark:disabled:bg-gray-900",
          error &&
            "border-status-error focus-visible:ring-status-error/30 focus-visible:border-status-error",
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
    )
  },
)

Input.displayName = "Input"
