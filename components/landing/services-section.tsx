"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Snowflake, Container, Truck } from "lucide-react"
import { SERVICES } from "@/lib/constants/services"

const iconMap = {
  reefer: Snowflake,
  "dry-van": Container,
  flatbed: Truck,
} as const

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
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
    <section id="services" className="py-20 lg:py-28 bg-brand-surface dark:bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Our Services
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto">
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
          {SERVICES.map((service) => {
            const Icon = iconMap[service.id as keyof typeof iconMap]

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group relative bg-white dark:bg-brand-dark rounded-xl border border-gray-200 dark:border-gray-800 p-6 lg:p-8 transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 group-hover:bg-brand-primary/20 transition-colors duration-300">
                  <Icon className="h-7 w-7 text-brand-primary" />
                </div>

                <h3 className="text-xl font-heading font-semibold text-foreground">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs font-medium text-brand-muted"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-secondary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
