"use client"

import { useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Menu, Search, Globe } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { DASHBOARD_NAV, PUBLIC_NAV } from "@/lib/constants/navigation"
import { COMPANY } from "@/lib/constants/company"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface DashboardTopbarProps {
  onMobileMenuClick: () => void
}

function getPageTitle(pathname: string): string {
  const match = DASHBOARD_NAV
    .slice()
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => {
      if (item.href === "/dashboard") return pathname === "/dashboard"
      return pathname === item.href || pathname.startsWith(`${item.href}/`)
    })

  return match?.label ?? "Dashboard"
}

function getBreadcrumbs(pathname: string): string[] {
  const segments = pathname.split("/").filter(Boolean)
  return segments
}

export function DashboardTopbar({ onMobileMenuClick }: DashboardTopbarProps) {
  const pathname = usePathname()

  const pageTitle = useMemo(() => getPageTitle(pathname), [pathname])
  const breadcrumbs = useMemo(() => getBreadcrumbs(pathname), [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-card/85 px-4 backdrop-blur-md sm:gap-4 sm:px-6",
      )}
    >
      <button
        type="button"
        onClick={onMobileMenuClick}
        className="-ml-1 flex h-10 w-10 items-center justify-center rounded-lg text-brand-muted transition-colors duration-200 hover:bg-subtle hover:text-foreground lg:hidden"
        aria-label="Open sidebar"
        aria-expanded={false}
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex min-w-0 flex-1 flex-col">
        {breadcrumbs.length > 1 && (
          <nav
            aria-label="Breadcrumb"
            className="hidden text-xs text-brand-muted sm:block"
          >
            <ol className="flex items-center gap-1">
              {breadcrumbs.map((segment, i) => (
                <li
                  key={`${segment}-${i}`}
                  className="flex items-center gap-1 capitalize"
                >
                  {i > 0 && (
                    <span aria-hidden="true" className="text-gray-300 dark:text-gray-600">
                      /
                    </span>
                  )}
                  <span
                    className={cn(
                      i === breadcrumbs.length - 1 && "text-brand-primary dark:text-foreground font-medium",
                    )}
                  >
                    {segment.replace(/-/g, " ")}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="truncate text-lg font-heading font-semibold text-foreground sm:text-xl">
          {pageTitle}
        </h1>
        <nav className="hidden md:flex items-center gap-1.5 mt-1.5">
          <Globe className="h-3 w-3 text-brand-muted shrink-0" aria-hidden="true" />
          {PUBLIC_NAV.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide transition-all duration-200",
                  isActive
                    ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                    : "border-transparent text-brand-muted hover:border-brand-primary/30 hover:bg-brand-primary/5 hover:text-brand-primary",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="hidden items-center md:flex">
        <label className="relative" aria-label="Search dashboard">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search shipments, quotes..."
            className="h-10 w-56 rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-brand-muted transition-colors duration-200 hover:border-brand-primary/40 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 lg:w-64"
          />
        </label>
      </div>

      <ThemeToggle />

      <button
        type="button"
        className="relative flex h-10 w-10 items-center justify-center rounded-lg text-brand-muted transition-colors duration-200 hover:bg-subtle hover:text-foreground"
        aria-label={`Notifications from ${COMPANY.name}`}
      >
        <Bell className="h-5 w-5" aria-hidden="true" />
        <span
          className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-brand-secondary ring-2 ring-white dark:ring-card"
          aria-hidden="true"
        />
      </button>

      <div className="flex items-center pl-1">
        <UserButton
          appearance={{
            elements: {
              avatarBox:
                "h-9 w-9 ring-2 ring-white dark:ring-card shadow-sm hover:ring-brand-primary/30 transition-all duration-200",
              userButtonPopoverCard:
                "shadow-xl border border-gray-200 rounded-xl",
              userButtonPopoverActionButton:
                "hover:bg-brand-primary/5 transition-colors duration-200",
              userButtonPopoverActionButtonText: "text-foreground",
              userButtonPopoverFooter: "hidden",
            },
            variables: {
              colorPrimary: "#00264D",
              colorText: "#0A0F1E",
              colorTextSecondary: "#6B7280",
              borderRadius: "0.5rem",
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            },
          }}
          showName={false}
        />
      </div>
    </header>
  )
}
