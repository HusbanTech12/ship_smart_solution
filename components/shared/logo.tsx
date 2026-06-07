"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { useHydrated } from "@/hooks/useHydrated"

type LogoVariant = "mark" | "wordmark" | "full"
type LogoSize = "sm" | "md" | "lg" | "xl"
type LogoMode = "auto" | "gradient" | "white" | "dark"

type LogoProps = {
  variant?: LogoVariant
  size?: LogoSize
  className?: string
  showTagline?: boolean
  mode?: LogoMode
  forceTheme?: "light" | "dark"
}

const sizeMap = {
  sm: { mark: 28, gap: "gap-2", wordTitle: "text-base", wordSub: "text-[9px]" },
  md: { mark: 36, gap: "gap-2.5", wordTitle: "text-lg", wordSub: "text-[10px]" },
  lg: { mark: 44, gap: "gap-3", wordTitle: "text-2xl", wordSub: "text-[11px]" },
  xl: { mark: 64, gap: "gap-4", wordTitle: "text-4xl", wordSub: "text-sm" },
} as const

function useResolvedTone(mode: LogoMode, forcedTheme?: "light" | "dark") {
  const { resolvedTheme } = useTheme()
  const mounted = useHydrated()

  return useMemo(() => {
    if (mode !== "auto") return mode
    if (!mounted) return "gradient"
    const theme = forcedTheme ?? resolvedTheme
    return theme === "dark" ? "white" : "dark"
  }, [mode, resolvedTheme, forcedTheme, mounted])
}

function LogoMark({
  size = 40,
  className,
  tone = "gradient",
}: {
  size?: number
  className?: string
  tone?: "gradient" | "white" | "dark"
}) {
  const src =
    tone === "white" || tone === "dark"
      ? "/logo-mark-white.svg"
      : "/logo-mark.svg"

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
    >
      {tone !== "dark" && (
        <div
          className="absolute -inset-1 rounded-[22%] blur-md opacity-30"
          style={{
            background:
              tone === "white"
                ? "#F97316"
                : "linear-gradient(135deg, #FB923C, #FDE68A)",
          }}
        />
      )}
      <Image
        src={src}
        alt="Ship Smart Solutions"
        width={size}
        height={size}
        className="h-full w-full"
        unoptimized
        priority
      />
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

  return (
    <div className={cn("flex flex-col leading-none", className)}>
      <div
        className={cn(
          "font-heading font-bold tracking-tight",
          cfg.wordTitle,
          isWhite
            ? "text-white"
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
  mode = "auto",
  forceTheme,
}: LogoProps) {
  const tone = useResolvedTone(mode, forceTheme)
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
