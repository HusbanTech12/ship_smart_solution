"use client"

import { ShoppingBag, Beef, Pill, Factory, Wrench, Car, ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"

const industries = [
  { icon: ShoppingBag, name: "Retail & E-commerce", metric: "500+ loads/mo", href: "/services" },
  { icon: Beef, name: "Food & Beverage", metric: "FDA-compliant", href: "/services" },
  { icon: Pill, name: "Pharmaceuticals", metric: "GDP certified", href: "/services" },
  { icon: Factory, name: "Manufacturing", metric: "JIT ready", href: "/services" },
  { icon: Wrench, name: "Construction", metric: "Heavy-haul", href: "/services" },
  { icon: Car, name: "Automotive", metric: "Tier-1 supplier", href: "/services" },
]

export function HomeIndustriesSection() {
  const prefersReduced = useReducedMotion()
  const anim = !prefersReduced

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  }

  const cellVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const },
    },
  }

  return (
    <section id="industries" className="py-20 lg:py-28 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <motion.div
            initial={anim ? { opacity: 0, y: 20 } : undefined}
            whileInView={anim ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary mb-3">
              Industries We Serve
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-brand-primary tracking-tight">
              Specialized for your industry
            </h2>
            <p className="mt-3 text-brand-muted leading-relaxed">
              Dedicated capacity and compliance expertise across the sectors that move America.
            </p>
          </motion.div>
          <motion.a
            initial={anim ? { opacity: 0, y: 20 } : undefined}
            whileInView={anim ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            href="/contact"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-secondary hover:text-brand-accent transition-colors"
          >
            Discuss your needs
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </motion.a>
        </div>

        <motion.div
          initial={anim ? "hidden" : undefined}
          whileInView={anim ? "visible" : undefined}
          viewport={{ once: true, margin: "-48px" }}
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {industries.map((industry) => {
            const Icon = industry.icon
            return (
              <motion.div key={industry.name} variants={anim ? cellVariants : undefined}>
                <Link
                  href={industry.href}
                  className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-secondary/40 hover:shadow-xl hover:shadow-brand-secondary/10"
                >
                  <motion.div
                    className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-primary/5 text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white"
                    whileHover={anim ? { scale: 1.1 } : undefined}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.div>

                  <h3 className="mt-4 text-sm font-semibold text-brand-primary leading-snug">
                    {industry.name}
                  </h3>

                  <p className="mt-1 text-xs text-brand-muted">
                    {industry.metric}
                  </p>

                  <ArrowRight className="absolute bottom-4 right-4 h-3.5 w-3.5 text-brand-secondary opacity-0 -translate-x-1 transition-all duration-300 pointer-fine:group-hover:opacity-100 pointer-fine:group-hover:translate-x-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-x-0" />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
