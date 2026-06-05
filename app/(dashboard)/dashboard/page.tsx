import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import {
  Truck,
  FileText,
  FolderOpen,
  TrendingUp,
  ArrowRight,
  Plus,
  Search,
  Upload,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SkeletonLoader } from "@/components/shared/skeleton-loader"
import { PageHeader } from "@/components/shared/page-header"
import { COMPANY } from "@/lib/constants/company"
import { cn, formatDate } from "@/lib/utils"
import type { ShipmentStatus } from "@/types/shipment"

export const metadata: Metadata = {
  title: "Overview",
  description: "Overview of your active shipments, pending quotes, and account metrics.",
}

type Metric = {
  label: string
  value: string
  delta: string
  trend: "up" | "down" | "flat"
  icon: typeof Truck
}

const METRICS: Metric[] = [
  {
    label: "Active Shipments",
    value: "12",
    delta: "+3 this week",
    trend: "up",
    icon: Truck,
  },
  {
    label: "Pending Quotes",
    value: "4",
    delta: "2 awaiting response",
    trend: "flat",
    icon: FileText,
  },
  {
    label: "Documents",
    value: "27",
    delta: "5 new this month",
    trend: "up",
    icon: FolderOpen,
  },
  {
    label: "On-Time Rate",
    value: "99.2%",
    delta: "Last 90 days",
    trend: "up",
    icon: TrendingUp,
  },
]

const RECENT_SHIPMENTS = [
  {
    id: "SHP-104287",
    trackingNumber: "SSS104287",
    origin: "Chicago, IL",
    destination: "Los Angeles, CA",
    serviceType: "reefer" as const,
    status: "in-transit" as ShipmentStatus,
    pickupDate: "2026-06-02",
    estimatedDelivery: "2026-06-06",
  },
  {
    id: "SHP-104281",
    trackingNumber: "SSS104281",
    origin: "Dallas, TX",
    destination: "Atlanta, GA",
    serviceType: "dry-van" as const,
    status: "delivered" as ShipmentStatus,
    pickupDate: "2026-05-28",
    estimatedDelivery: "2026-05-31",
  },
  {
    id: "SHP-104269",
    trackingNumber: "SSS104269",
    origin: "Naperville, IL",
    destination: "Denver, CO",
    serviceType: "flatbed" as const,
    status: "picked-up" as ShipmentStatus,
    pickupDate: "2026-06-04",
    estimatedDelivery: "2026-06-07",
  },
  {
    id: "SHP-104255",
    trackingNumber: "SSS104255",
    origin: "Phoenix, AZ",
    destination: "Seattle, WA",
    serviceType: "reefer" as const,
    status: "booked" as ShipmentStatus,
    pickupDate: "2026-06-06",
    estimatedDelivery: "2026-06-10",
  },
  {
    id: "SHP-104241",
    trackingNumber: "SSS104241",
    origin: "Miami, FL",
    destination: "New York, NY",
    serviceType: "dry-van" as const,
    status: "out-for-delivery" as ShipmentStatus,
    pickupDate: "2026-05-30",
    estimatedDelivery: "2026-06-04",
  },
]

const STATUS_LABEL: Record<ShipmentStatus, string> = {
  booked: "Booked",
  "picked-up": "Picked Up",
  "in-transit": "In Transit",
  "out-for-delivery": "Out for Delivery",
  delivered: "Delivered",
}

const STATUS_VARIANT: Record<
  ShipmentStatus,
  "default" | "success" | "warning" | "info"
> = {
  booked: "default",
  "picked-up": "info",
  "in-transit": "info",
  "out-for-delivery": "warning",
  delivered: "success",
}

function MetricCard({ metric }: { metric: Metric }) {
  const Icon = metric.icon
  const trendColor =
    metric.trend === "up"
      ? "text-status-success"
      : metric.trend === "down"
        ? "text-status-error"
        : "text-brand-muted"

  return (
    <div className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
            {metric.label}
          </p>
          <p className="mt-2 text-3xl font-heading font-bold text-foreground tabular-nums">
            {metric.value}
          </p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary transition-colors duration-200 group-hover:bg-brand-primary/15">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <p className={cn("mt-3 text-xs font-medium", trendColor)}>{metric.delta}</p>
    </div>
  )
}

function RecentShipments() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-heading font-semibold text-foreground">
            Recent Shipments
          </h2>
          <p className="mt-0.5 text-xs text-brand-muted">
            Your 5 most recent shipments
          </p>
        </div>
        <Link
          href="/dashboard/shipments"
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-secondary transition-colors duration-200 hover:text-brand-secondary/80"
        >
          View all
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>

      <div className="hidden md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-subtle text-xs uppercase tracking-wider text-brand-muted">
            <tr>
              <th className="px-6 py-3 font-semibold">Tracking</th>
              <th className="px-6 py-3 font-semibold">Route</th>
              <th className="px-6 py-3 font-semibold">Service</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">ETA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {RECENT_SHIPMENTS.map((s) => (
              <tr
                key={s.id}
                className="transition-colors duration-200 hover:bg-brand-primary/[0.02]"
              >
                <td className="px-6 py-3 font-mono text-xs font-medium text-foreground">
                  {s.trackingNumber}
                </td>
                <td className="px-6 py-3 text-brand-muted">
                  <span className="text-foreground">{s.origin}</span>
                  <span className="mx-1.5 text-gray-300 dark:text-gray-600">→</span>
                  <span className="text-foreground">{s.destination}</span>
                </td>
                <td className="px-6 py-3 capitalize text-brand-muted">
                  {s.serviceType.replace("-", " ")}
                </td>
                <td className="px-6 py-3">
                  <Badge variant={STATUS_VARIANT[s.status]} size="sm">
                    {STATUS_LABEL[s.status]}
                  </Badge>
                </td>
                <td className="px-6 py-3 text-brand-muted">
                  {formatDate(s.estimatedDelivery)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-border-light md:hidden">
        {RECENT_SHIPMENTS.map((s) => (
          <li key={s.id} className="px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-xs font-medium text-foreground">
                  {s.trackingNumber}
                </p>
                <p className="mt-1 text-sm text-foreground">
                  {s.origin} <span className="text-gray-300 dark:text-gray-600">→</span> {s.destination}
                </p>
                <p className="mt-0.5 text-xs text-brand-muted">
                  ETA {formatDate(s.estimatedDelivery)}
                </p>
              </div>
              <Badge variant={STATUS_VARIANT[s.status]} size="sm">
                {STATUS_LABEL[s.status]}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {METRICS.map((m) => (
        <MetricCard key={m.label} metric={m} />
      ))}
    </div>
  )
}

function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonLoader key={i} variant="card" />
      ))}
    </div>
  )
}

function WelcomeBanner({ firstName }: { firstName: string | null }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-secondary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h2 className="mt-2 text-2xl font-heading font-bold text-foreground sm:text-3xl">
            Welcome back{firstName ? `, ${firstName}` : ""}
          </h2>
          <p className="mt-1.5 max-w-xl text-sm text-brand-muted">
            Here&apos;s what&apos;s happening with your freight operations today. Need
            help? Reach our team at{" "}
            <a
              href={COMPANY.phoneHref}
              className="font-medium text-brand-primary dark:text-brand-secondary hover:underline"
            >
              {COMPANY.phone}
            </a>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:flex-nowrap">
          <Button href="/dashboard/quote" variant="primary" size="md">
            <Plus className="h-4 w-4" aria-hidden="true" />
            New Quote
          </Button>
          <Button href="/dashboard/shipments" variant="outline" size="md">
            <Search className="h-4 w-4" aria-hidden="true" />
            Track
          </Button>
        </div>
      </div>
    </div>
  )
}

function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <Link
        href="/dashboard/quote"
        className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-secondary/40 hover:shadow-md"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary transition-colors duration-200 group-hover:bg-brand-secondary/15">
          <FileText className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">Request a Quote</p>
          <p className="text-xs text-brand-muted">Get pricing in minutes</p>
        </div>
      </Link>
      <Link
        href="/dashboard/shipments"
        className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-md"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary transition-colors duration-200 group-hover:bg-brand-primary/15">
          <Package className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">Track Shipment</p>
          <p className="text-xs text-brand-muted">Real-time updates</p>
        </div>
      </Link>
      <Link
        href="/dashboard/documents"
        className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-accent/40 hover:shadow-md"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent transition-colors duration-200 group-hover:bg-brand-accent/15">
          <Upload className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">Upload Document</p>
          <p className="text-xs text-brand-muted">BOL, POD, invoices</p>
        </div>
      </Link>
    </div>
  )
}

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) {
    redirect("/sign-in")
  }

  const user = await currentUser()
  const firstName = user?.firstName ?? null

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:gap-8">
      <PageHeader
        title="Overview"
        description="A snapshot of your freight operations and account activity."
      />

      <WelcomeBanner firstName={firstName} />

      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsGrid />
      </Suspense>

      <QuickActions />

      <Suspense
        fallback={<SkeletonLoader variant="card" className="h-64" />}
      >
        <RecentShipments />
      </Suspense>
    </div>
  )
}
