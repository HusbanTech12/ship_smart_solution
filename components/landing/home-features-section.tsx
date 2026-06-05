"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Activity, Clock, Globe, Shield, Users, Zap, ArrowUpRight } from "lucide-react"

const features = [
  {
    icon: Activity,
    title: "Real-time tracking",
    description:
      "Monitor every shipment with live GPS, temperature sensors, and automated status alerts to your dashboard.",
    highlight: "Live visibility",
  },
  {
    icon: Clock,
    title: "24/7 operations",
    description:
      "Round-the-clock dispatch and customer support. Our team is always on, so your freight never waits.",
    highlight: "Always on",
  },
  {
    icon: Users,
    title: "Team drivers",
    description:
      "Two-driver teams keep your freight moving around the clock, cutting transit times by up to 40%.",
    highlight: "Expedited lanes",
  },
  {
    icon: Globe,
    title: "Nationwide coverage",
    description:
      "All 48 contiguous states covered with our owned assets and partner network. Coast-to-coast, no dead zones.",
    highlight: "48 states",
  },
  {
    icon: Shield,
    title: "Fully insured",
    description:
      "$1.5M cargo coverage on every load plus full liability protection. Your freight is protected end-to-end.",
    highlight: "$1.5M coverage",
  },
  {
    icon: Zap,
    title: "Instant quoting",
    description:
      "Get transparent pricing in under 60 seconds. No surprises, no hidden fees, no back-and-forth emails.",
    highlight: "< 60 seconds",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function HomeFeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(232,115,42,0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-1 text-xs font-semibold text-brand-secondary mb-6">
            Why Ship Smart
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-brand-primary">
            Built for{" "}
            <span className="bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">
              serious shippers
            </span>
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Six reasons enterprise teams choose us as their logistics partner.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial={prefersReduced ? undefined : "hidden"}
          animate={prefersReduced ? undefined : isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className="group relative bg-white rounded-2xl border border-gray-200 p-8 transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-1 hover:border-brand-secondary/30"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-secondary/5 via-transparent to-brand-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary/80 shadow-md transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-secondary/20">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-gray-300 transition-all duration-300 group-hover:text-brand-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <h3 className="text-xl font-heading font-semibold text-brand-primary">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-secondary" />
                      {feature.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
