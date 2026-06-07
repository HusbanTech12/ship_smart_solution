import type { Metadata } from "next"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Clock } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Shipment History",
  description: "Browse and download records of your past freight shipments.",
}

export default async function HistoryPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <PageHeader
        title="Shipment History"
        description="Search, filter, and export records of your completed deliveries."
      />
      <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
          <Clock className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-lg font-heading font-semibold text-foreground">
          History archive coming soon
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-brand-muted">
          Full shipment history with advanced filters and CSV export is on the
          way.
        </p>
        <div className="mt-6 flex justify-center">
          <Button href="/dashboard" variant="outline" size="md">
            Back to Overview
          </Button>
        </div>
      </div>
    </div>
  )
}
