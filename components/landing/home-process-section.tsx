"use client"

import { ClipboardList, CalendarCheck, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Request a quote",
    description:
      "Tell us about your freight — origin, destination, equipment, and timing. Get a transparent price in under 60 seconds.",
    meta: "47s avg response",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Schedule pickup",
    description:
      "Confirm your booking and we'll dispatch a team-driver team to your dock. Real-time updates from confirmation to pickup.",
    meta: "Same-day dispatch",
  },
  {
    number: "03",
    icon: MapPin,
    title: "Track delivery",
    description:
      "Follow your shipment live on our portal. Get proactive ETAs and automatic delivery confirmation with proof of delivery.",
    meta: "Live GPS + temp data",
  },
]

export function HomeProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-brand-primary tracking-tight">
            From quote to delivery in three steps
          </h2>
          <p className="mt-3 text-brand-muted leading-relaxed">
            We&apos;ve stripped out the back-and-forth. No phone tag, no surprise fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="group relative rounded-lg border border-gray-200 bg-white p-6 transition-colors duration-200 hover:border-brand-primary/30"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-primary text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-mono font-semibold text-gray-300">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-brand-primary">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                  {step.description}
                </p>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  <p className="text-xs font-medium text-brand-secondary">
                    {step.meta}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-secondary hover:text-brand-accent transition-colors"
          >
            Ready to get started?
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
