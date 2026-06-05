"use client"

import { Activity, Clock, Globe, Shield, Users, Zap, ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Activity,
    title: "Real-time tracking",
    description:
      "Live GPS and temperature monitoring with automated status alerts and predictive ETAs.",
    href: "/services",
    featured: true,
  },
  {
    icon: Clock,
    title: "24/7 operations",
    description: "Round-the-clock dispatch and customer support.",
    href: "/about",
  },
  {
    icon: Users,
    title: "Team drivers",
    description: "Two-driver teams cut transit times by up to 40%.",
    href: "/services",
  },
  {
    icon: Globe,
    title: "48-state coverage",
    description: "Coast-to-coast with owned assets and partner network.",
    href: "/about",
  },
  {
    icon: Shield,
    title: "Fully insured",
    description: "$1.5M cargo coverage on every load.",
    href: "/about",
  },
  {
    icon: Zap,
    title: "Instant quoting",
    description: "Transparent pricing in under 60 seconds.",
    href: "/contact",
  },
]

export function HomeFeaturesSection() {
  const prefersReduced = useReducedMotion()
  const anim = !prefersReduced

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
    },
  }

  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.div
            initial={anim ? { opacity: 0, y: 20 } : undefined}
            whileInView={anim ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary mb-3">
              Why Ship Smart
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-brand-primary tracking-tight">
              Built for teams that ship every day
            </h2>
            <p className="mt-3 text-brand-muted leading-relaxed">
              Six reasons enterprise operations choose us as their logistics partner.
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
            Talk to our team
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </motion.a>
        </div>

        <motion.div
          initial={anim ? "hidden" : undefined}
          whileInView={anim ? "visible" : undefined}
          viewport={{ once: true, margin: "-48px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-200"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.title} variants={anim ? cardVariants : undefined}>
                <Link
                  href={feature.href}
                  className={cn(
                    "group relative block border-r border-b border-gray-200 transition-all duration-300",
                    "hover:z-10 hover:bg-brand-surface hover:shadow-[inset_0_0_0_1px_rgba(232,115,42,0.15)]",
                    feature.featured
                      ? "sm:col-span-2 p-6 lg:p-10 bg-gradient-to-br from-brand-surface via-white to-brand-surface/60"
                      : "p-6 lg:p-8",
                  )}
                >
                  {feature.featured && (
                    <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 rounded-full bg-brand-secondary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand-secondary">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-secondary opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-secondary" />
                      </span>
                      Live data
                    </div>
                  )}

                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-primary/5 text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white"
                    whileHover={anim ? { scale: 1.1 } : undefined}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>

                  <h3
                    className={cn(
                      "mt-5 font-semibold text-brand-primary",
                      feature.featured ? "text-2xl" : "text-base",
                    )}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className={cn(
                      "mt-2 text-brand-muted leading-relaxed",
                      feature.featured ? "text-base max-w-md" : "text-sm",
                    )}
                  >
                    {feature.description}
                  </p>

                  <div
                    className={cn(
                      "absolute right-6 flex items-center gap-1 text-xs font-semibold text-brand-secondary opacity-0 -translate-x-1 transition-all duration-300 pointer-fine:group-hover:opacity-100 pointer-fine:group-hover:translate-x-0",
                      "bottom-6",
                      "[@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-x-0",
                    )}
                  >
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
