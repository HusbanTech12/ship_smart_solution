import type { Metadata } from "next"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Truck } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Shipments",
  description: "Track your active freight shipments in real time.",
}

export default async function ShipmentsPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <PageHeader
        title="Active Shipments"
        description="Real-time tracking for your in-transit and upcoming loads."
      />
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
          <Truck className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-lg font-heading font-semibold text-foreground">
          Shipment tracker coming soon
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-brand-muted">
          The live shipment tracker with status timeline and map view is on the
          way. Check the overview for your most recent loads.
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
