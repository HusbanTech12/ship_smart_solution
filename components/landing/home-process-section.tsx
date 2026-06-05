"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { ClipboardList, CalendarCheck, MapPin, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Request a quote",
    description:
      "Tell us about your freight — origin, destination, equipment, and timing. Get a transparent price in under 60 seconds.",
    detail: "Average response time: 47 seconds",
  },
  {
    icon: CalendarCheck,
    number: "02",
    title: "Schedule pickup",
    description:
      "Confirm your booking and we'll dispatch a team-driver team to your dock. Real-time updates from confirmation to pickup.",
    detail: "Same-day dispatch available",
  },
  {
    icon: MapPin,
    number: "03",
    title: "Track delivery",
    description:
      "Follow your shipment live on our portal. Get proactive ETAs and automatic delivery confirmation with proof of delivery.",
    detail: "Live GPS + temperature data",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function HomeProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(232,115,42,0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-1 text-xs font-semibold text-brand-secondary mb-6">
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-brand-primary">
            From quote to delivery{" "}
            <span className="bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">
              in three steps
            </span>
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto text-lg leading-relaxed">
            We&apos;ve stripped out the back-and-forth. No phone tag, no surprise fees, no chasing updates.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial={prefersReduced ? undefined : "hidden"}
          animate={prefersReduced ? undefined : isInView ? "visible" : "hidden"}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-brand-secondary/30 via-brand-accent/50 to-brand-secondary/30" aria-hidden="true" />

          {steps.map((step) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                variants={cardVariants}
                className="group relative bg-white rounded-2xl border border-gray-200 p-8 transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-1 hover:border-brand-secondary/30"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-secondary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-secondary to-brand-accent blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-secondary to-brand-accent shadow-lg">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <span className="text-5xl font-display font-bold bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20 bg-clip-text text-transparent">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-semibold text-brand-primary">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 pt-4 border-t border-gray-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
                    <span className="text-xs font-medium text-brand-muted">
                      {step.detail}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-brand-secondary/30 bg-white px-6 py-3 text-sm font-semibold text-brand-secondary transition-all duration-300 hover:bg-brand-secondary hover:text-white hover:shadow-lg hover:shadow-brand-secondary/30"
          >
            Ready to get started?
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
