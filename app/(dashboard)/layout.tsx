import type { Metadata } from "next"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { ADMIN_EMAILS } from "@/lib/constants/admins"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const metadata: Metadata = {
  title: {
    default: "Dashboard — Ship Smart Solutions",
    template: "%s — Ship Smart Solutions",
  },
  description:
    "Manage your freight quotes, track shipments, and access documents in the Ship Smart Solutions client portal.",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const user = await currentUser()
  const email = user?.emailAddresses[0]?.emailAddress

  if (!email || !ADMIN_EMAILS.includes(email)) {
    redirect("/")
  }

  return <DashboardShell>{children}</DashboardShell>
}
