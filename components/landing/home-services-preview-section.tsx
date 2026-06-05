"use client"

import { Snowflake, Container, Truck, ArrowRight, Check, Sparkles } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const previews = [
  {
    icon: Snowflake,
    title: "53' Reefers",
    description:
      "Temperature-controlled with real-time monitoring for perishables and pharma.",
    details: ["Team drivers", "Temp monitoring", "GPS tracking"],
    href: "/services",
    popular: true,
  },
  {
    icon: Container,
    title: "53' Dry Vans",
    description:
      "Reliable general freight shipping with maximum cube capacity.",
    details: ["Team drivers", "Max cube", "Load securement"],
    href: "/services",
  },
  {
    icon: Truck,
    title: "Flatbed & RGN",
    description:
      "Specialized open deck for oversized and heavy-haul freight.",
    details: ["Oversized loads", "Heavy haul", "Permitting"],
    href: "/services",
  },
]

export function HomeServicesPreviewSection() {
  const prefersReduced = useReducedMotion()
  const anim = !prefersReduced

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
    },
  }

  return (
    <section id="services" className="py-20 lg:py-28 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={anim ? { opacity: 0, y: 20 } : undefined}
          whileInView={anim ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-block rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-1 text-xs font-semibold text-brand-secondary mb-6">
            Our Services
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-brand-primary dark:text-foreground tracking-tight">
            Three modes. One platform.
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Pick the trailer type that fits your freight. We handle the rest.
          </p>
        </motion.div>

        <motion.div
          initial={anim ? "hidden" : undefined}
          whileInView={anim ? "visible" : undefined}
          viewport={{ once: true, margin: "-48px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {previews.map((preview) => {
            const Icon = preview.icon
            return (
              <motion.div key={preview.title} variants={anim ? cardVariants : undefined}>
                <Link
                  href={preview.href}
                  className={cn(
                    "group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300",
                    "hover:-translate-y-1.5 hover:border-brand-secondary/40 hover:shadow-xl hover:shadow-brand-secondary/10",
                  )}
                >
                  {preview.popular && (
                    <div className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-brand-secondary to-brand-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white shadow-md">
                      <Sparkles className="h-3 w-3" />
                      Most popular
                    </div>
                  )}

                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-primary/5 text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white"
                    whileHover={anim ? { scale: 1.1 } : undefined}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>

                  <h3 className="mt-5 text-lg font-semibold text-brand-primary dark:text-foreground">
                    {preview.title}
                  </h3>

                  <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                    {preview.description}
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-border-light pt-4">
                    {preview.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-2.5 text-sm text-brand-muted"
                      >
                        <Check className="h-3.5 w-3.5 text-brand-secondary shrink-0" strokeWidth={3} />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-secondary transition-all duration-200 group-hover:gap-2">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={anim ? { opacity: 0, y: 20 } : undefined}
          whileInView={anim ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <Button
            href="/services"
            variant="primary"
            size="md"
            className="shadow-lg shadow-brand-primary/10"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
