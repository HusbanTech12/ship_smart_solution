"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { COMPANY } from "@/lib/constants/company"
import { PUBLIC_NAV } from "@/lib/constants/navigation"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/shared/logo"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const ADMIN_EMAILS = ["usman@elitesolutionscpa.com", "husbantech08@gmail.com"]

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useUser()
  const userEmail = user?.primaryEmailAddress?.emailAddress
  const isAdmin = userEmail ? ADMIN_EMAILS.includes(userEmail) : false

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isMobileOpen])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 transition-all duration-500 ease-out",
          "bg-brand-surface dark:bg-brand-dark/80",
        )}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 py-2">
          <Link
            href="/"
            className="group flex items-center transition-opacity duration-300 hover:opacity-90"
          >
            <Logo
              variant="full"
              size="md"
              tone="gradient"
              showTagline={false}
            />
          </Link>

          <nav
            className={cn(
              "hidden lg:flex items-center gap-1 rounded-full p-1.5 transition-all duration-500",
              "border border-brand-primary/15 bg-white/60 dark:bg-white/5",
            )}
          >
            {PUBLIC_NAV.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300",
                    isActive
                      ? "text-brand-primary bg-brand-primary/10 shadow-inner"
                      : "text-brand-muted hover:text-brand-primary hover:bg-brand-primary/5",
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-brand-primary" />
                  )}
                </Link>
              )
            })}
            {isAdmin && (
              <Link
                href="/dashboard"
                className={cn(
                  "relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  pathname.startsWith("/dashboard")
                    ? "text-brand-primary bg-brand-primary/10 shadow-inner"
                    : "text-brand-muted hover:text-brand-primary hover:bg-brand-primary/5",
                )}
              >
                Dashboard
                {pathname.startsWith("/dashboard") && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-brand-primary" />
                )}
              </Link>
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle
              className={cn(
                "border-brand-primary/20 bg-white/60 text-brand-muted hover:text-brand-primary hover:bg-brand-primary/10 dark:bg-white/5 dark:border-white/10",
              )}
            />

            <Link href="/sign-in">
              <Button
                variant="ghost"
                size="sm"
                className="border-brand-primary/20 text-brand-muted hover:text-brand-primary hover:bg-brand-primary/10"
              >
                Sign In
              </Button>
            </Link>

            <Link href="/contact" className="group relative">
              <div
                className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-brand-secondary via-brand-accent to-brand-secondary opacity-70 blur-sm transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
              <Button
                variant="secondary"
                size="sm"
                className="relative overflow-hidden shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get a Free Quote
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-accent to-brand-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 rounded-md text-brand-muted hover:text-brand-primary hover:bg-brand-primary/10 transition-colors"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed inset-x-0 top-[72px] bg-brand-dark/98 backdrop-blur-xl z-40 flex flex-col overflow-y-auto"
          >
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,115,42,0.15) 0%, transparent 60%)",
              }}
            />

            <nav className="relative flex-1 flex flex-col px-6 py-8">
              {PUBLIC_NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="border-b border-white/5 last:border-b-0"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between py-5 text-2xl font-heading font-semibold transition-colors",
                      pathname === item.href ? "text-brand-secondary" : "text-white/90 hover:text-white",
                    )}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <span className="h-2 w-2 rounded-full bg-brand-secondary" />
                    )}
                  </Link>
                </motion.div>
              ))}

              {isAdmin && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: PUBLIC_NAV.length * 0.06, duration: 0.3 }}
                  className="border-b border-white/5"
                >
                  <Link
                    href="/dashboard"
                    className={cn(
                      "flex items-center justify-between py-5 text-2xl font-heading font-semibold transition-colors",
                      pathname.startsWith("/dashboard") ? "text-brand-secondary" : "text-white/90 hover:text-white",
                    )}
                  >
                    Dashboard
                    {pathname.startsWith("/dashboard") && (
                      <span className="h-2 w-2 rounded-full bg-brand-secondary" />
                    )}
                  </Link>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: (PUBLIC_NAV.length + 1) * 0.06, duration: 0.3 }}
                className="mt-8 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <ThemeToggle className="shrink-0 border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white" />
                  <Link href="/sign-in" className="flex-1">
                    <Button variant="outline" size="lg" className="w-full border-white/20 text-white/90 hover:bg-white/10">
                      Sign In
                    </Button>
                  </Link>
                </div>
                <Link href="/contact" className="block">
                  <Button variant="secondary" size="lg" className="w-full">
                    Get a Free Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
