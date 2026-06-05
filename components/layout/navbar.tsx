"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { COMPANY } from "@/lib/constants/company"
import { PUBLIC_NAV } from "@/lib/constants/navigation"
import { Button } from "@/components/ui/button"

const sectionIds = PUBLIC_NAV.map((item) => item.href.replace("#", ""))

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
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
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileOpen])

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" },
      )

      observer.observe(el)
      return observer
    })

    return () => {
      observers.forEach((o) => o?.disconnect())
    }
  }, [])

  const scrollTo = useCallback((href: string) => {
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsMobileOpen(false)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        isScrolled
          ? "bg-brand-primary/95 backdrop-blur-md shadow-lg"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            href="/"
            className={cn(
              "text-xl font-heading font-bold tracking-tight transition-colors duration-300",
              isScrolled ? "text-white" : "text-white",
            )}
          >
            {COMPANY.name}
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {PUBLIC_NAV.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={cn(
                  "relative text-sm font-medium transition-colors duration-200",
                  isScrolled
                    ? "text-white/80 hover:text-white"
                    : "text-white/80 hover:text-white",
                  activeSection === item.href.replace("#", "") &&
                    "text-white",
                )}
              >
                {item.label}
                {activeSection === item.href.replace("#", "") && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-brand-secondary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => scrollTo("#contact")}
            >
              Get a Free Quote
            </Button>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={cn(
              "lg:hidden p-2 rounded-md transition-colors",
              isScrolled ? "text-white" : "text-white",
            )}
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
            className="lg:hidden fixed inset-0 top-16 bg-brand-primary z-40 flex flex-col"
          >
            <nav className="flex-1 flex flex-col items-center justify-center gap-8">
              {PUBLIC_NAV.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  onClick={() => scrollTo(item.href)}
                  className="text-2xl font-heading font-semibold text-white/90 hover:text-white transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: PUBLIC_NAV.length * 0.08, duration: 0.3 }}
              >
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => scrollTo("#contact")}
                >
                  Get a Free Quote
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
