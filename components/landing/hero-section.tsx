"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  Truck,
  MapPin,
  Package,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const trustSignals = [
  "No minimums",
  "Instant quoting",
  "24/7 support",
]

function seededRandom(seed: number): () => number {
  let s = seed | 0
  return () => {
    s = (s * 1664525 + 1013904223) | 0
    return (s >>> 0) / 4294967296
  }
}

const rng = seededRandom(42)
const PARTICLES = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: `${rng() * 100}%`,
  size: rng() * 4 + 2,
  delay: rng() * 15,
  duration: rng() * 10 + 12,
  drift: rng() > 0.5 ? ("particle" as const) : ("particle-drift" as const),
}))

const industries = [
  "Retail",
  "Food & Bev",
  "Pharma",
  "Auto",
  "Manufacturing",
]

const routeSteps = [
  { label: "Origin", city: "Los Angeles, CA", status: "done" },
  { label: "In Transit", city: "Cross-country", status: "active" },
  { label: "Destination", city: "New York, NY", status: "pending" },
]

const truckStats = [
  { label: "Load", value: "Reefer 53'" },
  { label: "ETA", value: "2h 14m" },
  { label: "Status", value: "On time" },
]

export function HeroSection() {
  const prefersReduced = useReducedMotion()
  const anim = !prefersReduced
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (prefersReduced) {
      setProgress(55)
      return
    }
    const t = setTimeout(() => setProgress(55), 400)
    return () => clearTimeout(t)
  }, [prefersReduced])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-card">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 0% 0%, rgba(232,115,42,0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(0,38,77,0.08) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(245,166,35,0.10) 0%, transparent 60%)",
        }}
      />

      {!prefersReduced && (
        <>
          <div className="absolute top-1/4 left-[5%] h-96 w-96 rounded-full bg-brand-secondary/15 blur-3xl animate-float" />
          <div className="absolute top-1/2 right-[10%] h-80 w-80 rounded-full bg-brand-accent/12 blur-3xl animate-float-delayed" />
          <div className="absolute bottom-1/4 left-1/3 h-96 w-96 rounded-full bg-brand-primary/5 blur-3xl animate-float-slow" />
          {PARTICLES.map((p) => (
            <span
              key={p.id}
              className="absolute rounded-full bg-brand-secondary/60"
              style={{
                left: p.left,
                bottom: "-10px",
                width: p.size,
                height: p.size,
                animation: `${p.drift} ${p.duration}s ${p.delay}s linear infinite`,
              }}
            />
          ))}
        </>
      )}

      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,38,77,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,38,77,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <div className="flex-1 flex items-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 lg:pt-32 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <motion.div
                initial={anim ? { opacity: 0, y: 10 } : undefined}
                animate={anim ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-brand-secondary/30 bg-brand-secondary/10 px-4 py-1.5 text-xs font-semibold text-brand-secondary mb-8 backdrop-blur-sm"
              >
                <ShieldCheck className="h-3 w-3" />
                Trusted by Fortune 500 companies nationwide
              </motion.div>

              <motion.h1
                initial={anim ? { opacity: 0, y: 20 } : undefined}
                animate={anim ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] as const }}
                className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-brand-primary dark:text-foreground leading-[1.02] tracking-tight"
              >
                Ship Smarter.
                <br />
                <span className="relative inline-block mt-2">
                  <span className="bg-gradient-to-r from-brand-secondary via-brand-accent to-brand-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                    Scale Faster.
                  </span>
                  <svg
                    className="absolute -bottom-3 left-0 w-full h-3 text-brand-secondary/50"
                    viewBox="0 0 200 12"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 9 Q 50 2, 100 6 T 198 4"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </motion.h1>

              <motion.p
                initial={anim ? { opacity: 0, y: 20 } : undefined}
                animate={anim ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] as const }}
                className="mt-8 text-lg sm:text-xl text-brand-muted max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Enterprise-grade freight solutions with team-driven 53&apos; reefers, dry vans, and flatbed services across all 48 states.
              </motion.p>

              <motion.div
                initial={anim ? { opacity: 0, y: 10 } : undefined}
                animate={anim ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1.5 text-xs text-brand-muted"
              >
                <span className="font-semibold text-brand-primary dark:text-foreground">Built for</span>
                {industries.map((ind, i) => (
                  <span key={ind} className="inline-flex items-center gap-x-2">
                    <span>{ind}</span>
                    {i < industries.length - 1 && (
                      <span className="h-1 w-1 rounded-full bg-brand-secondary/40" />
                    )}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={anim ? { opacity: 0, y: 20 } : undefined}
                animate={anim ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] as const }}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="group relative w-full overflow-hidden shadow-lg shadow-brand-secondary/25 hover:shadow-xl hover:shadow-brand-secondary/40"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get a Free Quote
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-secondary to-brand-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Button>
                </Link>
                <Link href="/services" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="group w-full"
                  >
                    Explore Services
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={anim ? { opacity: 0, y: 20 } : undefined}
                animate={anim ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const }}
                className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 text-sm text-brand-muted"
              >
                {trustSignals.map((signal) => (
                  <span key={signal} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-secondary" />
                    {signal}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={anim ? { opacity: 0, x: 20 } : undefined}
              animate={anim ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] as const }}
              className="relative lg:pl-8"
            >
              <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-brand-accent/20 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-brand-secondary/15 blur-2xl" />

              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-secondary/20 via-brand-primary/5 to-brand-accent/20 blur-2xl opacity-60" />

                <div className="relative rounded-2xl border border-border/80 bg-card p-6 shadow-2xl shadow-brand-primary/10">
                  <div className="flex items-center justify-between pb-4 border-b border-border-light">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-secondary to-brand-accent">
                        <Truck className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          Shipment #SSS-2847
                        </div>
                        <div className="text-xs text-brand-muted flex items-center gap-1">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status-success" />
                          </span>
                          Live tracking
                        </div>
                      </div>
                    </div>
                    <span className="rounded-full bg-status-success/10 px-2.5 py-1 text-xs font-semibold text-status-success">
                      On time
                    </span>
                  </div>

                  <div className="relative my-6 px-2">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
                    <div
                      className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-brand-secondary to-brand-accent -translate-y-1/2 transition-all duration-[1500ms] ease-out"
                      style={{ width: `${progress}%` }}
                    />

                    {!prefersReduced && (
                      <div
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                        style={{
                          left: `${progress}%`,
                          transition: "left 1500ms ease-out",
                        }}
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-card border-2 border-brand-secondary shadow-md">
                          <Truck className="h-3.5 w-3.5 text-brand-secondary" />
                        </div>
                      </div>
                    )}

                    <div className="relative flex justify-between">
                      {routeSteps.map((step) => (
                        <div key={step.label} className="flex flex-col items-center gap-2">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                              step.status === "done"
                                ? "bg-brand-secondary border-brand-secondary"
                                :                               step.status === "active"
                                ? "bg-card border-brand-secondary"
                                : "bg-card border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {step.status === "done" ? (
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            ) : step.status === "active" ? (
                              <MapPin className="h-4 w-4 text-brand-secondary" />
                            ) : (
                              <MapPin className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-semibold text-foreground">
                              {step.label}
                            </div>
                            <div className="text-[10px] text-brand-muted whitespace-nowrap">
                              {step.city}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border-light">
                    {truckStats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-[10px] text-brand-muted uppercase tracking-wider font-semibold">
                          {stat.label}
                        </div>
                        <div className="mt-1 text-sm font-bold text-foreground">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 rounded-xl border border-border/80 bg-card p-3 shadow-xl flex items-center gap-3 animate-float">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-status-success/10">
                    <Package className="h-4 w-4 text-status-success" />
                  </div>
                  <div>
                    <div className="text-[10px] text-brand-muted uppercase tracking-wider font-semibold">
                      Delivered
                    </div>
                    <div className="text-sm font-bold text-foreground">
                      12,847 loads
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-2 rounded-xl border border-border/80 bg-card p-3 shadow-xl animate-float-delayed">
                  <div className="text-[10px] text-brand-muted uppercase tracking-wider font-semibold">
                    On-time rate
                  </div>
                  <div className="text-lg font-bold bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">
                    99.2%
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  )
}
