"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Award, Clock, Warehouse, TruckIcon, PackageCheck } from "lucide-react"
import { AnimatedCounter } from "@/components/shared/animated-counter"

const stats = [
  { icon: Award, value: 99, suffix: "%+", label: "On-Time Delivery", desc: "Industry-leading reliability" },
  { icon: TruckIcon, value: 500, suffix: "+", label: "Truckloads / Month", desc: "Growing every quarter" },
  { icon: Warehouse, value: 3700000, suffix: "", label: "Sq Ft Warehouse", desc: "Across strategic hubs", format: "compact" },
  { icon: Clock, value: 24, suffix: "/7", label: "Operations", desc: "Always available", prefix: "" },
  { icon: PackageCheck, value: 15, suffix: "M+", label: "Units / Month", desc: "Full lifecycle managed" },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const statCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, var(--surface) 0%, var(--card) 30%, #fff7ed 70%, var(--surface) 100%)",
        }}
      />

      {!prefersReduced && (
        <>
          <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-brand-secondary/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full bg-brand-accent/10 blur-3xl" />
        </>
      )}

      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,38,77,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,38,77,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-1 text-xs font-semibold text-brand-secondary mb-6 backdrop-blur-sm">
            By the Numbers
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-brand-primary dark:text-foreground">
            We{" "}
            <span className="bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">
              deliver
            </span>{" "}
            results
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Our track record speaks for itself. Here&apos;s what we&apos;ve
            accomplished for our clients.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial={prefersReduced ? undefined : "hidden"}
          animate={prefersReduced ? undefined : isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                variants={statCardVariants}
                className="group relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 text-center transition-all duration-300 hover:bg-card hover:border-brand-secondary/30 hover:shadow-xl"
              >
                {!prefersReduced && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-brand-secondary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                )}

                <div className="relative z-10">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-primary/5 border border-brand-primary/10 transition-all duration-300 group-hover:border-brand-secondary/30 group-hover:bg-brand-secondary/10">
                      <Icon className="h-6 w-6 text-brand-secondary" />
                    </div>
                  </div>

                  <div className="text-3xl sm:text-4xl font-heading font-bold text-brand-primary dark:text-foreground">
                    {stat.label === "Operations" ? (
                      "24/7"
                    ) : stat.label === "Sq Ft Warehouse" ? (
                      <><AnimatedCounter end={3.7} suffix="M+" decimals={1} /></>
                    ) : stat.label === "Units / Month" ? (
                      <><AnimatedCounter end={15} />M+</>
                    ) : (
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    )}
                  </div>

                  <div className="mt-2 text-xs sm:text-sm font-medium text-foreground">
                    {stat.label}
                  </div>

                  <p className="mt-1 text-xs text-brand-muted">{stat.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
