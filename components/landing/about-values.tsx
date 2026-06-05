"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  Heart,
  Target,
  Eye,
  Handshake,
  Lightbulb,
  Award,
} from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Customer First",
    desc: "Every decision starts with our customers' needs. We treat every load like it's our own — because to the shipper, it is.",
  },
  {
    icon: Target,
    title: "Operational Excellence",
    desc: "99%+ on-time delivery isn't a goal, it's our baseline. We measure ourselves on the metrics that matter to you.",
  },
  {
    icon: Eye,
    title: "Radical Transparency",
    desc: "Instant quoting, real-time tracking, and proactive communication. No hidden fees, no surprises, no phone tag.",
  },
  {
    icon: Handshake,
    title: "Built on Trust",
    desc: "We're fully insured, DOT certified, and MC authorized. Long-term partnerships over short-term wins, every time.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Innovation",
    desc: "Live GPS, temperature monitoring, predictive ETAs. We invest in technology that makes freight effortless.",
  },
  {
    icon: Award,
    title: "Safety Obsessed",
    desc: "Drug-tested drivers, regularly maintained equipment, and rigorous compliance. Safety isn't a department — it's a culture.",
  },
]

export function AboutValues() {
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
    <section className="py-20 lg:py-28 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={anim ? { opacity: 0, y: 20 } : undefined}
          whileInView={anim ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-block rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-1 text-xs font-semibold text-brand-secondary mb-6">
            What We Stand For
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-brand-primary dark:text-foreground tracking-tight">
            Our core{" "}
            <span className="bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">
              values
            </span>
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Six principles that guide every load we move and every relationship
            we build.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-48px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          {values.map((value) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                variants={anim ? cardVariants : undefined}
                className="group h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-secondary/40 hover:shadow-xl hover:shadow-brand-secondary/10"
              >
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white shadow-lg transition-all duration-300 group-hover:from-brand-secondary group-hover:to-brand-accent"
                  whileHover={anim ? { scale: 1.1, rotate: 5 } : undefined}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>

                <h3 className="mt-5 text-lg font-heading font-semibold text-brand-primary dark:text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
