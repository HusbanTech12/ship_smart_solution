import { isValidElement } from "react"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  hint?: string
  className?: string
  children: React.ReactNode
}

export function FormField({
  label,
  error,
  required,
  hint,
  className,
  children,
}: FormFieldProps) {
  const fieldId =
    isValidElement(children)
      ? (children.props as { id?: string }).id
      : undefined

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={fieldId}
        className="text-sm font-medium text-foreground"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-status-error" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div className="relative">{children}</div>

      {error && (
        <p
          id={fieldId ? `${fieldId}-error` : undefined}
          className="flex items-center gap-1 text-xs text-status-error"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}

      {hint && !error && (
        <p className="text-xs text-brand-muted">{hint}</p>
      )}
    </div>
  )
}
