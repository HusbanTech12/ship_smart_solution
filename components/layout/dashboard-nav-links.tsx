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
              ? "border-orange-900 bg-orange-900/10 text-orange-900"
              : "border-transparent text-orange-800 hover:border-orange-800/30 hover:bg-orange-900/5 hover:text-orange-900",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
