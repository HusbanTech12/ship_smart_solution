import type { Metadata } from "next"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Settings as SettingsIcon } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account preferences and notification settings.",
}

export default async function SettingsPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const user = await currentUser()
  const email = user?.emailAddresses[0]?.emailAddress ?? "Not provided"

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Manage your profile, notifications, and account preferences."
      />

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
            <SettingsIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-heading font-semibold text-foreground">
              Account
            </h2>
            <p className="mt-1 text-sm text-brand-muted">
              Update your name, email, and profile photo from the user menu in the
              top right.
            </p>
            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                  First Name
                </dt>
                <dd className="mt-0.5 text-sm text-foreground">
                  {user?.firstName ?? "Not set"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                  Last Name
                </dt>
                <dd className="mt-0.5 text-sm text-foreground">
                  {user?.lastName ?? "Not set"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                  Email
                </dt>
                <dd className="mt-0.5 text-sm text-foreground break-all">{email}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div className="flex justify-center">
        <Button href="/dashboard" variant="outline" size="md">
          Back to Overview
        </Button>
      </div>
    </div>
  )
}
