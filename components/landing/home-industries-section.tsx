"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { ShoppingBag, Beef, Pill, Factory, Wrench, Truck, ArrowUpRight } from "lucide-react"

const industries = [
  {
    icon: ShoppingBag,
    name: "Retail & E-commerce",
    description: "Time-sensitive fulfillment for big-box and DTC brands. Peak-season ready.",
    metric: "500+ loads/mo",
  },
  {
    icon: Beef,
    name: "Food & Beverage",
    description: "Temperature-controlled reefer for perishables, frozen, and prepared foods.",
    metric: "FDA-compliant",
  },
  {
    icon: Pill,
    name: "Pharmaceuticals",
    description: "GDP-compliant cold chain with full chain-of-custody and validation.",
    metric: "GDP certified",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    description: "Just-in-time industrial freight with dedicated capacity and predictable ETAs.",
    metric: "JIT ready",
  },
  {
    icon: Wrench,
    name: "Construction",
    description: "Flatbed, step deck, and RGN for heavy equipment, materials, and oversized loads.",
    metric: "Heavy-haul",
  },
  {
    icon: Truck,
    name: "Automotive",
    description: "Specialized automotive transport including parts, finished vehicles, and assemblies.",
    metric: "Tier-1 supplier",
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

export function HomeIndustriesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-brand-surface to-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_50%,rgba(232,115,42,0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-1 text-xs font-semibold text-brand-secondary mb-6">
            Industries We Serve
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-brand-primary">
            Specialized for{" "}
            <span className="bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">
              your industry
            </span>
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Dedicated capacity and compliance expertise across the sectors that move America.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial={prefersReduced ? undefined : "hidden"}
          animate={prefersReduced ? undefined : isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {industries.map((industry) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.name}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1 hover:border-brand-secondary/40"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-primary/95 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-secondary/10 transition-all duration-500 group-hover:bg-white/10 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-brand-secondary transition-colors duration-500 group-hover:text-white" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-gray-300 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <h3 className="text-lg font-heading font-semibold text-brand-primary transition-colors duration-500 group-hover:text-white">
                    {industry.name}
                  </h3>

                  <p className="mt-2 text-sm text-brand-muted leading-relaxed transition-colors duration-500 group-hover:text-white/80">
                    {industry.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-gray-100 transition-colors duration-500 group-hover:border-white/10">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary transition-colors duration-500 group-hover:text-brand-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-secondary transition-colors duration-500 group-hover:bg-brand-accent" />
                      {industry.metric}
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
