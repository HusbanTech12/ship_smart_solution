import Link from "next/link"
import type { Metadata } from "next"
import { Logo } from "@/components/shared/logo"
import { COMPANY } from "@/lib/constants/company"

export const metadata: Metadata = {
  title: "404 — Page Not Found | Ship Smart Solutions",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(249,115,22,0.5) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <Logo variant="full" size="lg" className="mb-6" />

      <h1 className="text-8xl font-display font-bold text-brand-primary">
        404
      </h1>
      <h2 className="mt-4 text-2xl font-heading font-semibold text-foreground">
        Page not found
      </h2>
      <p className="mt-2 max-w-md text-sm text-brand-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Need help? Call us at{" "}
        <a
          href={COMPANY.phoneHref}
          className="font-medium text-brand-primary hover:underline"
        >
          {COMPANY.phone}
        </a>
        .
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-primary px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-110 hover:shadow-md active:scale-[0.98]"
        >
          Back to Home
        </Link>
        <a
          href={COMPANY.phoneHref}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-card px-6 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-subtle active:scale-[0.98]"
        >
          Contact Support
        </a>
      </div>

      <p className="mt-12 text-xs text-brand-muted">
        &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
      </p>
    </div>
  )
}
