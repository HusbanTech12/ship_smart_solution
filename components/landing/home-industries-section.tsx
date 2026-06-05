"use client"

import { ShoppingBag, Beef, Pill, Factory, Wrench, Car, ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
        <motion.div
          initial={anim ? { opacity: 0, y: 20 } : undefined}
          whileInView={anim ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-block rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-1 text-xs font-semibold text-brand-secondary mb-6">
            Industries We Serve
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-brand-primary dark:text-foreground tracking-tight">
            Specialized for your industry
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Dedicated capacity and compliance expertise across the sectors that move America.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              className="shadow-lg shadow-brand-primary/10"
            >
              Discuss your needs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

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
                  className="group relative flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-secondary/40 hover:shadow-xl hover:shadow-brand-secondary/10"
                >
                  <motion.div
                    className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-primary/5 text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white"
                    whileHover={anim ? { scale: 1.1 } : undefined}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.div>

                  <h3 className="mt-4 text-sm font-semibold text-brand-primary dark:text-foreground leading-snug">
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
