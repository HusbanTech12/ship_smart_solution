import { Logo } from "@/components/shared/logo"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-brand-surface">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,115,42,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,38,77,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,38,77,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,38,77,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <a
        href="#auth-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      <main
        id="auth-content"
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mb-8 flex flex-col items-center gap-3">
          <Logo
            variant="full"
            size="lg"
            tone="gradient"
            showTagline
          />
        </div>
        {children}
        <p className="mt-8 text-center text-xs text-brand-muted">
          &copy; {new Date().getFullYear()} Ship Smart Solutions. All rights reserved.
        </p>
      </main>
    </div>
  )
}
