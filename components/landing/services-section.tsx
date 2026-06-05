"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Snowflake, Container, Truck, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { SERVICES } from "@/lib/constants/services"

const iconMap = {
  reefer: Snowflake,
  "dry-van": Container,
  flatbed: Truck,
} as const

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-brand-surface to-white overflow-hidden" id="services">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(232,115,42,0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-1 text-xs font-semibold text-brand-secondary mb-6">
            Freight Solutions
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-foreground">
            Built for{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              scale
            </span>
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Comprehensive freight solutions backed by team drivers, modern
            equipment, and a 99%+ on-time delivery record.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial={prefersReduced ? undefined : "hidden"}
          animate={prefersReduced ? undefined : isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.id as keyof typeof iconMap]

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group relative bg-white rounded-2xl border border-gray-200 p-8 transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 hover:border-brand-secondary/30"
              >
                {!prefersReduced && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-brand-secondary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                )}

                <div className="relative z-10">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary/80 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-brand-secondary/20 group-hover:shadow-xl">
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <span className="inline-flex items-center justify-center rounded-full bg-brand-secondary/10 px-3 py-0.5 text-xs font-semibold text-brand-secondary mb-4">
                    0{i + 1}
                  </span>

                  <h3 className="text-xl font-heading font-semibold text-foreground">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-foreground/80"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-secondary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary transition-all duration-300 group-hover:gap-3"
                    >
                      Get a quote
                      <ArrowRight className="h-4 w-4 transition-transform duration-300" />
                    </Link>
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
