"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Snowflake, Container, Truck, ArrowRight, Check } from "lucide-react"
import Link from "next/link"

const previews = [
  {
    icon: Snowflake,
    title: "53' Reefers",
    blurb: "Temperature-controlled with real-time monitoring for perishables and pharma.",
    features: ["Team drivers", "Temp monitoring", "GPS tracking"],
    accent: "from-blue-500 to-cyan-500",
  },
  {
    icon: Container,
    title: "53' Dry Vans",
    blurb: "Reliable general freight shipping with maximum cube capacity.",
    features: ["Team drivers", "Max cube", "Load securement"],
    accent: "from-brand-secondary to-brand-accent",
  },
  {
    icon: Truck,
    title: "Flatbed & RGN",
    blurb: "Specialized open deck for oversized and heavy-haul freight.",
    features: ["Oversized loads", "Heavy haul", "Permitting"],
    accent: "from-amber-500 to-orange-500",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function HomeServicesPreviewSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-brand-surface to-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_50%,rgba(232,115,42,0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-1 text-xs font-semibold text-brand-secondary mb-6">
              Our Services
            </span>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-brand-primary">
              Three modes.{" "}
              <span className="bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">
                One platform.
              </span>
            </h2>
            <p className="mt-4 text-brand-muted text-lg leading-relaxed">
              Pick the trailer type that fits your freight. We handle the rest.
            </p>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 self-start md:self-auto text-sm font-semibold text-brand-secondary hover:text-brand-accent transition-colors"
          >
            View all services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial={prefersReduced ? undefined : "hidden"}
          animate={prefersReduced ? undefined : isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {previews.map((preview) => {
            const Icon = preview.icon
            return (
              <motion.div
                key={preview.title}
                variants={cardVariants}
                className="group relative bg-white rounded-2xl border border-gray-200 p-8 transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-brand-secondary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${preview.accent} shadow-lg transition-transform duration-500 group-hover:scale-110`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-heading font-semibold text-brand-primary">
                    {preview.title}
                  </h3>

                  <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                    {preview.blurb}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {preview.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-foreground/80"
                      >
                        <Check className="h-4 w-4 shrink-0 text-brand-secondary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/services"
                    className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-secondary transition-all duration-300 group-hover:gap-2.5"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
