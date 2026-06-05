"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={checkboxId}
          className={cn(
            "flex items-center gap-3 cursor-pointer group",
            props.disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={cn(
              "peer h-4 w-4 shrink-0 rounded border transition-all duration-200 ease-out",
              "border-gray-300 dark:border-gray-600",
              "checked:bg-brand-primary checked:border-brand-primary",
              "hover:border-brand-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30",
              "active:scale-95",
              "disabled:cursor-not-allowed",
              error && "border-status-error",
              className,
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${checkboxId}-error` : undefined}
            {...props}
          />
          {label && (
            <span className="text-sm text-foreground group-hover:text-brand-primary transition-colors duration-200">
              {label}
            </span>
          )}
        </label>
        {error && (
          <p id={`${checkboxId}-error`} className="text-xs text-status-error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Checkbox.displayName = "Checkbox"
