import type { Metadata } from "next"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { FileText, ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { COMPANY } from "@/lib/constants/company"

export const metadata: Metadata = {
  title: "Get a Quote",
  description: "Request a freight quote for reefer, dry van, or flatbed shipments.",
}

export default async function QuotePage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <PageHeader
        title="Get a Quote"
        description="Tell us about your freight needs and we'll get back to you within 30 minutes."
      />
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-secondary/10 text-brand-secondary">
          <FileText className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-lg font-heading font-semibold text-foreground">
          Quote request form coming soon
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-brand-muted">
          Need a quote right now? Call our operations team at{" "}
          <a
            href={COMPANY.phoneHref}
            className="font-medium text-brand-primary hover:underline"
          >
            {COMPANY.phone}
          </a>{" "}
          and we&apos;ll get you a rate in minutes.
        </p>
        <div className="mt-6 flex justify-center">
          <Button href="/dashboard" variant="outline" size="md">
            Back to Overview
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}
