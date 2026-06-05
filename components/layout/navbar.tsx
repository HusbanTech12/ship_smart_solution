"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight, Phone } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { COMPANY } from "@/lib/constants/company"
import { PUBLIC_NAV } from "@/lib/constants/navigation"
import { Button } from "@/components/ui/button"

function LogoMark({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-secondary to-brand-accent blur-md opacity-50" />
      <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-secondary via-brand-accent to-brand-secondary shadow-lg">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 text-white"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 17h4V5H2v12h3" />
          <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
          <circle cx="7.5" cy="17.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
      </div>
    </div>
  )
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 transition-all duration-500 ease-out",
          isScrolled
            ? "bg-brand-dark/90 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-white/5"
            : pathname === "/"
            ? "bg-transparent"
            : "bg-brand-dark/95 backdrop-blur-xl border-b border-white/5",
        )}
      />
      {!isScrolled && pathname === "/" && (
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,38,77,0.5) 0%, transparent 100%)",
          }}
        />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 py-2">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity duration-300 hover:opacity-90"
          >
            <LogoMark />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-display font-bold text-white leading-none tracking-tight">
                {COMPANY.name}
              </span>
              <span className="text-[10px] sm:text-xs text-brand-secondary font-medium tracking-wider uppercase mt-0.5">
                Logistics
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md p-1.5">
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  pathname === item.href
                    ? "text-white bg-white/10 shadow-inner"
                    : "text-white/70 hover:text-white hover:bg-white/5",
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-brand-secondary" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={COMPANY.phoneHref}
              className="hidden xl:flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-200 group"
              aria-label="Call us"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:border-brand-secondary/40 group-hover:bg-brand-secondary/10 transition-all duration-200">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <span className="font-medium tabular-nums">{COMPANY.phone}</span>
            </a>

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
            className="lg:hidden p-2 rounded-md text-white transition-colors hover:bg-white/10"
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: PUBLIC_NAV.length * 0.06, duration: 0.3 }}
                className="mt-8 space-y-4"
              >
                <Link href="/contact" className="block">
                  <Button variant="secondary" size="lg" className="w-full">
                    Get a Free Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a
                  href={COMPANY.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-3 text-sm font-medium text-white/90"
                >
                  <Phone className="h-4 w-4" />
                  {COMPANY.phone}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
