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
  outline:
    "bg-white text-brand-primary border border-gray-200 hover:border-brand-primary hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] focus-visible:ring-brand-primary",
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

type CommonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  className?: string
  children?: React.ReactNode
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined
  }

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href"> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsLink

const baseClasses =
  "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-w-[120px]"

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = "primary",
      size = "md",
      loading = false,
      className,
      children,
      ...rest
    } = props

    const isDisabled =
      ("disabled" in rest && rest.disabled) || loading

    const classes = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      loading && "cursor-wait",
      isDisabled && "pointer-events-none opacity-50",
      className,
    )

    if ("href" in rest && rest.href !== undefined) {
      const { href, ...anchorProps } = rest as ButtonAsLink
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          aria-disabled={isDisabled || undefined}
          className={classes}
          {...anchorProps}
        >
          {loading ? (
            <>
              <Spinner size={size === "lg" ? "md" : "sm"} />
              <span className="sr-only">Loading</span>
            </>
          ) : (
            children
          )}
        </a>
      )
    }

    const buttonProps = rest as ButtonAsButton
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={buttonProps.type ?? "button"}
        disabled={isDisabled}
        className={classes}
        {...buttonProps}
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
