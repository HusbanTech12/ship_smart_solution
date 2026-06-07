import type { Metadata } from "next"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { MessageSquare, Phone, Mail } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { COMPANY } from "@/lib/constants/company"

export const metadata: Metadata = {
  title: "Support",
  description: "Get help from our AI assistant or connect with our 24/7 operations team.",
}

export default async function SupportPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <PageHeader
        title="Support"
        description="Get instant answers from our AI assistant, or reach a human anytime."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
            <MessageSquare className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-base font-heading font-semibold text-foreground">
            AI Assistant
          </h3>
          <p className="mt-1.5 text-sm text-brand-muted">
            Get instant answers about quotes, tracking, and services.
          </p>
          <p className="mt-4 text-xs font-medium text-brand-muted">Coming soon</p>
        </div>
        <a
          href={COMPANY.phoneHref}
          className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-secondary/40 hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary">
            <Phone className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-base font-heading font-semibold text-foreground">
            Call Operations
          </h3>
          <p className="mt-1.5 text-sm text-brand-muted">24/7 dispatch support</p>
          <p className="mt-4 text-sm font-semibold text-brand-secondary tabular-nums">
            {COMPANY.phone}
          </p>
        </a>
        <a
          href={COMPANY.emailHref}
          className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-accent/40 hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-base font-heading font-semibold text-foreground">
            Email Us
          </h3>
          <p className="mt-1.5 text-sm text-brand-muted">
            Response within 24 hours
          </p>
          <p className="mt-4 text-sm font-semibold text-brand-accent break-all">
            {COMPANY.email}
          </p>
        </a>
      </div>
      <div className="flex justify-center">
        <Button href="/dashboard" variant="outline" size="md">
          Back to Overview
        </Button>
      </div>
    </div>
  )
}
