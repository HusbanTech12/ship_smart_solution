"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border px-3 py-2 text-sm transition-colors duration-200 ease-out resize-y",
          "bg-card",
          "text-foreground placeholder:text-brand-muted",
          "border-gray-300 dark:border-gray-600",
          "hover:border-brand-primary/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 focus-visible:border-brand-primary",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-subtle",
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

Textarea.displayName = "Textarea"
