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

function StepConnector() {
  return (
    <div className="hidden md:flex items-center justify-center self-center -mx-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
        <ArrowRight className="h-4 w-4 text-brand-secondary/60" />
      </div>
    </div>
  )
}

export function HomeProcessSection() {
  return (
    <section id="process" className="py-20 lg:py-28 bg-white">
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

        <div className="flex flex-col md:flex-row md:items-stretch gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="contents">
                <div className="group relative flex flex-1 flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-secondary/40 hover:shadow-lg hover:shadow-brand-secondary/5">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-primary/5 text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-3xl font-bold leading-none text-brand-secondary/20 select-none">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-brand-primary">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm text-brand-muted leading-relaxed flex-1">
                    {step.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">
                      {step.meta}
                    </p>
                  </div>
                </div>
                {i < steps.length - 1 && <StepConnector />}
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
