"use client"

import { useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  FileText,
  Truck,
  Clock,
  FolderOpen,
  MessageSquare,
  Settings,
  PanelLeft,
  X,
  type LucideIcon,
} from "lucide-react"
import { Logo } from "@/components/shared/logo"
import { cn } from "@/lib/utils"
import { DASHBOARD_NAV } from "@/lib/constants/navigation"

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  FileText,
  Truck,
  Clock,
  FolderOpen,
  MessageSquare,
  Settings,
}

interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  isMobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname()

  const isActive = useCallback(
    (href: string) => {
      if (href === "/dashboard") {
        return pathname === "/dashboard"
      }
      return pathname === href || pathname.startsWith(`${href}/`)
    },
    [pathname],
  )

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        aria-label="Dashboard navigation"
        aria-hidden={isMobileOpen ? undefined : undefined}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card shadow-sm transition-[width,transform] duration-300 ease-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "lg:w-[72px]" : "lg:w-[260px]",
          "w-[280px]",
        )}
      >
        <div
          className={cn(
            "flex h-16 shrink-0 items-center border-b border-border px-4",
            isCollapsed ? "lg:justify-center lg:px-0" : "justify-between",
          )}
        >
          <Link
            href="/dashboard"
            onClick={onMobileClose}
            className={cn(
              "group flex items-center transition-opacity duration-200 hover:opacity-90",
              isCollapsed && "lg:gap-0",
            )}
            aria-label="Go to dashboard home"
          >
            <Logo
              variant={isCollapsed ? "mark" : "full"}
              size="md"
            />
          </Link>
          <button
            type="button"
            onClick={onMobileClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-muted hover:bg-subtle hover:text-foreground lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav
          className="flex-1 overflow-y-auto px-3 py-6"
          aria-label="Primary"
        >
          <ul className="flex flex-col gap-1">
            {DASHBOARD_NAV.map((item) => {
              const Icon = ICON_MAP[item.icon] ?? LayoutDashboard
              const active = isActive(item.href)
              return (
                <li key={item.href} className="relative">
                  {active && (
                    <motion.span
                      layoutId="sidebar-active-pill"
                      className="absolute inset-0 rounded-lg bg-brand-primary"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      aria-hidden="true"
                    />
                  )}
                  <Link
                    href={item.href}
                    onClick={onMobileClose}
                    className={cn(
                      "relative z-10 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                      isCollapsed && "lg:justify-center lg:px-0",
                      active
                        ? "text-white"
                        : "text-brand-muted hover:bg-brand-primary/5 hover:text-brand-primary dark:hover:text-foreground",
                    )}
                    aria-current={active ? "page" : undefined}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className={cn(
                        "h-[18px] w-[18px] shrink-0 transition-transform duration-200",
                        active && "scale-110",
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "truncate",
                        isCollapsed && "lg:hidden",
                      )}
                    >
                      {item.label}
                    </span>
                    {active && !isCollapsed && (
                      <motion.span
                        layoutId="sidebar-active-dot"
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-secondary"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-border p-3">
          <button
            type="button"
            onClick={onToggleCollapse}
            className={cn(
              "hidden lg:flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-brand-muted transition-colors duration-200 hover:bg-subtle hover:text-foreground",
              isCollapsed && "lg:justify-center lg:px-0",
            )}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isCollapsed}
          >
            <PanelLeft
              className={cn(
                "h-[18px] w-[18px] shrink-0 transition-transform duration-300",
                isCollapsed && "rotate-180",
              )}
              aria-hidden="true"
            />
            <span className={cn(isCollapsed && "lg:hidden")}>
              Collapse
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}
