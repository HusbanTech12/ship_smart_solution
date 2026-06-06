import { Logo } from "@/components/shared/logo"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(249,115,22,0.5) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl aspect-square rounded-full opacity-[0.08] dark:opacity-[0.05]"
        style={{
          background:
            "radial-gradient(ellipse, #f97316 0%, transparent 70%)",
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
