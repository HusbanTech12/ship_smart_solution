"use client"

import { Activity, Clock, Globe, Shield, Users, Zap, ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
    <section id="features" className="py-20 lg:py-28 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={anim ? { opacity: 0, y: 20 } : undefined}
          whileInView={anim ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-block rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-1 text-xs font-semibold text-brand-secondary mb-6">
            Why Ship Smart
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-brand-primary tracking-tight">
            Built for teams that ship every day
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Six reasons enterprise operations choose us as their logistics partner.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              className="shadow-lg shadow-brand-primary/10"
            >
              Talk to our team
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={anim ? "hidden" : undefined}
          whileInView={anim ? "visible" : undefined}
          viewport={{ once: true, margin: "-48px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={anim ? cardVariants : undefined}
                className="h-full"
              >
                <Link
                  href={feature.href}
                  className="group relative flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-secondary/40 hover:shadow-xl hover:shadow-brand-secondary/10"
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

                  <h3 className="mt-5 text-base font-semibold text-brand-primary">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="absolute right-6 bottom-6 flex items-center gap-1 text-xs font-semibold text-brand-secondary opacity-0 -translate-x-1 transition-all duration-300 pointer-fine:group-hover:opacity-100 pointer-fine:group-hover:translate-x-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-x-0">
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
