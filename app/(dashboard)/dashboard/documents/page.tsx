import type { Metadata } from "next"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { FolderOpen } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Documents",
  description: "Access BOLs, invoices, and compliance documents for your shipments.",
}

export default async function DocumentsPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <PageHeader
        title="Documents"
        description="BOLs, PODs, invoices, and compliance paperwork — all in one place."
      />
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
          <FolderOpen className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-lg font-heading font-semibold text-foreground">
          Document library coming soon
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-brand-muted">
          Upload, search, and download all your shipping documents in one secure
          place.
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
