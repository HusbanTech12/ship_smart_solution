"use client"

import { useCallback, useEffect, useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { DashboardTopbar } from "@/components/layout/dashboard-topbar"
import { ErrorBoundary } from "@/components/shared/error-boundary"
import { useHydrated } from "@/hooks/useHydrated"

const COLLAPSED_STORAGE_KEY = "ship-smart-sidebar-collapsed"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === "undefined") return false
    try {
      return window.localStorage.getItem(COLLAPSED_STORAGE_KEY) === "true"
    } catch {
      return false
    }
  })
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const hydrated = useHydrated()

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(COLLAPSED_STORAGE_KEY, String(isCollapsed))
    } catch {
      /* noop */
    }
  }, [isCollapsed, hydrated])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileOpen])

  const handleToggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev)
  }, [])

  const handleMobileOpen = useCallback(() => {
    setIsMobileOpen(true)
  }, [])

  const handleMobileClose = useCallback(() => {
    setIsMobileOpen(false)
  }, [])

  return (
    <div className="flex min-h-screen w-full bg-brand-surface">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        isMobileOpen={isMobileOpen}
        onMobileClose={handleMobileClose}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar onMobileMenuClick={handleMobileOpen} />
        <main
          id="main-content"
          className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
        >
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>
    </div>
  )
}
