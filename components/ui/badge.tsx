import { cn } from "@/lib/utils"

const variants = {
  default: "bg-brand-primary/10 text-brand-primary border-brand-primary/20",
  success: "bg-status-success/10 text-status-success border-status-success/20",
  warning: "bg-status-warning/10 text-status-warning border-status-warning/20",
  error: "bg-status-error/10 text-status-error border-status-error/20",
  info: "bg-status-info/10 text-status-info border-status-info/20",
} as const

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
} as const

type BadgeVariant = keyof typeof variants
type BadgeSize = keyof typeof sizes

interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
  children: React.ReactNode
}

export function Badge({
  variant = "default",
  size = "md",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  )
}
