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

const linkVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useUser()
  const userEmail = user?.primaryEmailAddress?.emailAddress
  const isAdmin = userEmail ? ADMIN_EMAILS.includes(userEmail) : false

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      <div
        className={cn(
          "absolute inset-0 transition-all duration-500",
          isScrolled
            ? "bg-transparent backdrop-blur-md"
            : "bg-transparent",
        )}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            href="/"
            className="group flex items-center shrink-0 transition-opacity hover:opacity-85"
          >
            <Logo
              variant="full"
              size="md"
              tone="white"
              showTagline={false}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {PUBLIC_NAV.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium tracking-wide transition-all duration-200",
                    isActive
                      ? "border-orange-900 bg-orange-900/10 text-orange-900"
                      : "border-transparent text-orange-800 hover:border-orange-800/30 hover:bg-orange-900/5 hover:text-orange-900",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            {isAdmin && (
              <Link
                href="/dashboard"
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium tracking-wide transition-all duration-200",
                  pathname.startsWith("/dashboard")
                    ? "border-orange-900 bg-orange-900/10 text-orange-900"
                    : "border-transparent text-orange-800 hover:border-orange-800/30 hover:bg-orange-900/5 hover:text-orange-900",
                )}
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle
              className="text-orange-800 hover:text-orange-900 transition-colors"
            />

            <Link href="/sign-in">
              <Button
                variant="ghost"
                size="sm"
                className="text-orange-800 hover:text-orange-900 hover:bg-orange-900/10 border border-orange-800/30"
              >
                Sign In
              </Button>
            </Link>

            <Link href="/contact">
              <Button variant="primary" size="sm" className="shadow-sm hover:shadow-md">
                Get a Free Quote
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2.5 -mr-2 rounded-lg text-orange-800 hover:text-orange-900 hover:bg-orange-900/10 transition-colors"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            className="lg:hidden fixed inset-x-0 top-16 bg-white dark:bg-brand-dark border-t border-gray-200 dark:border-gray-800 z-40 flex flex-col"
          >
            <nav className="flex-1 flex flex-col px-6 py-6 overflow-y-auto">
              {PUBLIC_NAV.map((item, i) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between py-4 text-lg font-medium border-b border-gray-100 dark:border-gray-800 transition-colors",
                        isActive
                          ? "text-brand-primary"
                          : "text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-white",
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                      )}
                    </Link>
                  </motion.div>
                )
              })}

              {isAdmin && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: PUBLIC_NAV.length * 0.05, duration: 0.25 }}
                >
                  <Link
                    href="/dashboard"
                    className={cn(
                      "flex items-center justify-between py-4 text-lg font-medium border-b border-gray-100 dark:border-gray-800 transition-colors",
                      pathname.startsWith("/dashboard")
                        ? "text-brand-primary"
                        : "text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-white",
                    )}
                  >
                    Dashboard
                    {pathname.startsWith("/dashboard") && (
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                    )}
                  </Link>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ delay: (PUBLIC_NAV.length + (isAdmin ? 1 : 0)) * 0.05, duration: 0.25 }}
                className="mt-auto pt-6 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <ThemeToggle className="shrink-0 text-gray-500 dark:text-gray-400" />
                  <Link href="/sign-in" className="flex-1">
                    <Button variant="outline" size="md" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                </div>
                <Link href="/contact" className="block">
                  <Button variant="primary" size="md" className="w-full shadow-sm">
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
