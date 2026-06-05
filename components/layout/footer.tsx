"use client"

import { useState } from "react"
import { ArrowRight, Phone, Mail, MapPin, ShieldCheck, BadgeCheck, Lock, FileCheck, Send } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { COMPANY } from "@/lib/constants/company"
import { PUBLIC_NAV } from "@/lib/constants/navigation"
import { SERVICES } from "@/lib/constants/services"

type SocialIconProps = { className?: string }

function LinkedInIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function TwitterIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

function YoutubeIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const socialLinks = [
  { Icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com" },
  { Icon: TwitterIcon, label: "Twitter", href: "https://twitter.com" },
  { Icon: FacebookIcon, label: "Facebook", href: "https://facebook.com" },
  { Icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
  { Icon: YoutubeIcon, label: "YouTube", href: "https://youtube.com" },
] as const

const trustBadges = [
  { icon: ShieldCheck, label: "DOT Certified", value: "DOT #1234567" },
  { icon: BadgeCheck, label: "MC Authority", value: "MC #7654321" },
  { icon: Lock, label: "Fully Insured", value: "$1.5M Coverage" },
  { icon: FileCheck, label: "Bonded Carrier", value: "Licensed & Bonded" },
] as const

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 600))
      toast.success("Subscribed! We'll keep you posted on logistics insights.")
      setEmail("")
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="relative bg-brand-dark text-white overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a0f1e 0%, #00264d 50%, #0a0f1e 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-brand-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-secondary to-brand-accent blur-md opacity-50" />
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-secondary via-brand-accent to-brand-secondary">
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
                  <div className="flex flex-col">
                    <span className="text-lg font-display font-bold text-white leading-none tracking-tight">
                      {COMPANY.name}
                    </span>
                    <span className="text-[10px] text-brand-secondary font-medium tracking-wider uppercase mt-0.5">
                      Logistics
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                  {COMPANY.tagline}. Enterprise-grade trucking and logistics services across all 48 contiguous US states.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                    Stay in the loop
                  </p>
                  <h4 className="text-base font-heading font-semibold text-white">
                    Logistics insights, monthly
                  </h4>
                </div>
                <div className="relative flex items-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden focus-within:border-brand-secondary/50 transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none"
                    aria-label="Email for newsletter"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center h-full px-4 bg-gradient-to-r from-brand-secondary to-brand-accent text-white text-sm font-semibold transition-all duration-200 hover:brightness-110 disabled:opacity-50"
                    aria-label="Subscribe"
                  >
                    {isSubmitting ? (
                      <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  By subscribing you agree to our SMS Terms. Unsubscribe anytime.
                </p>
              </form>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">
                Services
              </h4>
              <ul className="space-y-3">
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services#${service.id}`}
                      className="group flex items-start gap-2"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary/60 group-hover:bg-brand-secondary group-hover:scale-150 transition-all duration-200" />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {service.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">
                Company
              </h4>
              <ul className="space-y-3">
                {PUBLIC_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">
                  Get in touch
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href={COMPANY.phoneHref}
                      className="group flex items-start gap-3"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 group-hover:border-brand-secondary/40 group-hover:bg-brand-secondary/10 transition-all">
                        <Phone className="h-3.5 w-3.5 text-brand-secondary" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-white tabular-nums">
                          {COMPANY.phone}
                        </div>
                        <div className="text-xs text-gray-500">24/7 operations</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={COMPANY.emailHref}
                      className="group flex items-start gap-3"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 group-hover:border-brand-secondary/40 group-hover:bg-brand-secondary/10 transition-all">
                        <Mail className="h-3.5 w-3.5 text-brand-secondary" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-white break-all">
                          {COMPANY.email}
                        </div>
                        <div className="text-xs text-gray-500">24-hour response</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <div className="group flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                        <MapPin className="h-3.5 w-3.5 text-brand-secondary" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {COMPANY.address}
                        </div>
                        <div className="text-xs text-gray-500">{COMPANY.coverage}</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                  Follow us
                </h4>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social) => {
                    const Icon = social.Icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="group flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-all duration-200 hover:border-brand-secondary/40 hover:bg-brand-secondary/10 hover:text-white hover:-translate-y-0.5"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {trustBadges.map((badge) => {
                const Icon = badge.icon
                return (
                  <div
                    key={badge.label}
                    className="group flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5 transition-all duration-200 hover:border-brand-secondary/20 hover:bg-white/[0.04]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-secondary/10 text-brand-secondary group-hover:bg-brand-secondary/20 transition-colors">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                        {badge.label}
                      </div>
                      <div className="text-xs font-semibold text-white truncate">
                        {badge.value}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
              <p className="text-xs text-gray-500">
                &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  SMS Terms
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-brand-secondary font-semibold hover:text-brand-accent transition-colors group"
                >
                  Get a free quote
                  <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
