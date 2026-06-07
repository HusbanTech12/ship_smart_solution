"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
]

export function DashboardNavLinks() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-1.5">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium tracking-wide transition-all duration-200",
            pathname === link.href
              ? "border-brand-primary bg-brand-primary/10 text-brand-primary dark:text-foreground"
              : "border-transparent text-foreground/70 hover:border-brand-primary/30 hover:bg-brand-primary/5 hover:text-brand-primary dark:hover:text-foreground",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
