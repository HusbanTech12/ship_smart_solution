"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

const variants = {
  primary:
    "bg-brand-primary text-white hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-brand-primary",
  secondary:
    "bg-brand-secondary text-white hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-brand-secondary",
  ghost:
    "bg-transparent text-brand-primary border border-brand-primary/30 hover:bg-brand-primary/5 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-brand-primary",
  danger:
    "bg-status-error text-white hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-status-error",
} as const

const sizes = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
} as const

type ButtonVariant = keyof typeof variants
type ButtonSize = keyof typeof sizes

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "min-w-[120px]",
          variants[variant],
          sizes[size],
          loading && "cursor-wait",
          isDisabled && "pointer-events-none opacity-50",
          className,
        )}
        {...props}
      >
        {loading ? (
          <>
            <Spinner size={size === "lg" ? "md" : "sm"} />
            <span className="sr-only">Loading</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  },
)

Button.displayName = "Button"
