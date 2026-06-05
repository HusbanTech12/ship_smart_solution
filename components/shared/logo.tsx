import { cn } from "@/lib/utils"

type LogoVariant = "mark" | "wordmark" | "full"
type LogoSize = "sm" | "md" | "lg" | "xl"

type LogoProps = {
  variant?: LogoVariant
  size?: LogoSize
  className?: string
  showTagline?: boolean
  tone?: "gradient" | "white" | "dark"
}

const sizeMap = {
  sm: { mark: 28, gap: "gap-2", wordTitle: "text-base", wordSub: "text-[9px]" },
  md: { mark: 36, gap: "gap-2.5", wordTitle: "text-lg", wordSub: "text-[10px]" },
  lg: { mark: 44, gap: "gap-3", wordTitle: "text-2xl", wordSub: "text-[11px]" },
  xl: { mark: 64, gap: "gap-4", wordTitle: "text-4xl", wordSub: "text-sm" },
} as const

function LogoMark({
  size = 40,
  className,
  tone = "gradient",
}: {
  size?: number
  className?: string
  tone?: "gradient" | "white" | "dark"
}) {
  const id = `ship-smart-logo-${size}-${tone}-${Math.random().toString(36).slice(2, 8)}`

  const isWhite = tone === "white"
  const isDark = tone === "dark"

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0 rounded-[22%] blur-md opacity-40",
          isWhite
            ? "bg-white"
            : isDark
              ? "bg-brand-primary"
              : "bg-gradient-to-br from-brand-secondary to-brand-accent",
        )}
      />
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center rounded-[22%] shadow-lg ring-1 ring-inset",
          isWhite
            ? "bg-white ring-white/20"
            : isDark
              ? "bg-brand-primary ring-brand-primary/20"
              : "bg-gradient-to-br from-brand-secondary via-brand-accent to-brand-secondary ring-white/20",
        )}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="h-[60%] w-[60%]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id={`${id}-sgrad`}
              x1="0"
              y1="0"
              x2="40"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              {isWhite ? (
                <>
                  <stop offset="0%" stopColor="#00264D" />
                  <stop offset="100%" stopColor="#00264D" />
                </>
              ) : isDark ? (
                <>
                  <stop offset="0%" stopColor="#E8732A" />
                  <stop offset="100%" stopColor="#F5A623" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.85" />
                </>
              )}
            </linearGradient>
          </defs>

          <path
            d="M11 13.5C11 10.4624 13.4624 8 16.5 8H22C25.866 8 29 11.134 29 15C29 18.866 25.866 22 22 22H18C15.2386 22 13 24.2386 13 27C13 29.7614 15.2386 32 18 32H25"
            stroke={`url(#${id}-sgrad)`}
            strokeWidth="3.4"
            strokeLinecap="round"
          />

          <circle
            cx="29"
            cy="10.5"
            r="2.2"
            fill={isWhite ? "#00264D" : isDark ? "#E8732A" : "#FFFFFF"}
          />
          <circle
            cx="29"
            cy="10.5"
            r="1"
            fill={isWhite ? "#FFFFFF" : "#00264D"}
            opacity={isWhite ? 0.9 : 1}
          />

          <circle
            cx="11"
            cy="32"
            r="1.6"
            fill={isWhite ? "#00264D" : isDark ? "#F5A623" : "#FFFFFF"}
            opacity="0.9"
          />
        </svg>
      </div>
    </div>
  )
}

function Wordmark({
  size = "md",
  tone = "gradient",
  showTagline = true,
  className,
}: {
  size?: LogoSize
  tone?: "gradient" | "white" | "dark"
  showTagline?: boolean
  className?: string
}) {
  const cfg = sizeMap[size]

  const isWhite = tone === "white"
  const isDark = tone === "dark"

  return (
    <div className={cn("flex flex-col leading-none", className)}>
      <div
        className={cn(
          "font-heading font-bold tracking-tight",
          cfg.wordTitle,
          isWhite
            ? "text-white"
            : isDark
              ? "text-brand-primary"
              : "text-brand-primary",
        )}
      >
        <span>Ship </span>
        <span
          className={cn(
            "bg-clip-text text-transparent",
            isWhite
              ? "bg-gradient-to-r from-brand-accent to-white"
              : "bg-gradient-to-r from-brand-secondary via-brand-accent to-brand-secondary",
          )}
        >
          Smart
        </span>
      </div>
      {showTagline && (
        <div
          className={cn(
            "mt-1 font-sans font-semibold uppercase tracking-[0.22em]",
            cfg.wordSub,
            isWhite ? "text-white/70" : "text-brand-muted",
          )}
        >
          Solutions
        </div>
      )}
    </div>
  )
}

export function Logo({
  variant = "full",
  size = "md",
  className,
  showTagline = true,
  tone = "gradient",
}: LogoProps) {
  const cfg = sizeMap[size]

  if (variant === "mark") {
    return <LogoMark size={cfg.mark} tone={tone} className={className} />
  }

  if (variant === "wordmark") {
    return (
      <Wordmark
        size={size}
        tone={tone}
        showTagline={showTagline}
        className={className}
      />
    )
  }

  return (
    <div className={cn("flex items-center", cfg.gap, className)}>
      <LogoMark size={cfg.mark} tone={tone} />
      <Wordmark size={size} tone={tone} showTagline={showTagline} />
    </div>
  )
}

export { LogoMark }
