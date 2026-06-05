"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ShieldCheck, Clock, Zap, Users } from "lucide-react"

const milestones = [
  { year: "2014", title: "Founded", desc: "Ship Smart Solutions opens with a single reefer truck and a mission to make freight effortless." },
  { year: "2017", title: "Dry Van Division", desc: "Expanded fleet with 53' dry vans to serve general freight shippers nationwide." },
  { year: "2020", title: "Open Deck Added", desc: "Specialized open deck division launched to handle oversized and heavy-haul freight." },
  { year: "2024", title: "3,600+ Assets", desc: "Now moving 500+ loads a month with a 99%+ on-time record across all 48 states." },
]

const highlights = [
  {
    icon: ShieldCheck,
    title: "Insured & Bonded",
    desc: "$1.5M cargo coverage on every load. Full DOT and MC authority.",
  },
  {
    icon: Clock,
    title: "Always On",
    desc: "24/7 dispatch and customer support. Real humans, no phone trees.",
  },
  {
    icon: Zap,
    title: "Instant Pricing",
    desc: "Transparent quotes in under 60 seconds. No hidden fees, no surprises.",
  },
  {
    icon: Users,
    title: "Team Drivers",
    desc: "Two-driver teams cut transit times by up to 40% on long-haul lanes.",
  },
]

export function AboutStory() {
  const prefersReduced = useReducedMotion()
  const anim = !prefersReduced

  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <motion.div
            initial={anim ? { opacity: 0, x: -30 } : undefined}
            whileInView={anim ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="relative"
          >
            <div className="relative aspect-[5/4] rounded-2xl border border-border bg-gradient-to-br from-brand-surface via-card to-brand-surface overflow-hidden">
              <svg
                viewBox="0 0 500 400"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="truck-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00264D" />
                    <stop offset="100%" stopColor="#0a3a6b" />
                  </linearGradient>
                  <linearGradient id="trailer-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f3f4f6" />
                  </linearGradient>
                  <linearGradient id="road-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e5e7eb" />
                    <stop offset="100%" stopColor="#d1d5db" />
                  </linearGradient>
                </defs>

                <rect x="0" y="280" width="500" height="120" fill="url(#road-grad)" />
                <line x1="0" y1="340" x2="500" y2="340" stroke="#9ca3af" strokeWidth="2" strokeDasharray="20 15" />

                <ellipse cx="80" cy="100" rx="50" ry="50" fill="#fef3c7" opacity="0.4" />
                <ellipse cx="420" cy="80" rx="60" ry="60" fill="#fed7aa" opacity="0.3" />

                <motion.g
                  initial={anim ? { x: -100 } : undefined}
                  whileInView={anim ? { x: 0 } : undefined}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <rect x="60" y="160" width="220" height="120" rx="6" fill="url(#trailer-grad)" stroke="#d1d5db" strokeWidth="1.5" />
                  <rect x="80" y="180" width="40" height="80" fill="#00264D" fillOpacity="0.05" stroke="#e5e7eb" strokeWidth="1" />
                  <rect x="140" y="180" width="40" height="80" fill="#00264D" fillOpacity="0.05" stroke="#e5e7eb" strokeWidth="1" />
                  <rect x="200" y="180" width="40" height="80" fill="#00264D" fillOpacity="0.05" stroke="#e5e7eb" strokeWidth="1" />

                  <text x="170" y="225" textAnchor="middle" fill="#E8732A" fontSize="14" fontWeight="700" fontFamily="system-ui">SHIP</text>
                  <text x="170" y="245" textAnchor="middle" fill="#E8732A" fontSize="14" fontWeight="700" fontFamily="system-ui">SMART</text>

                  <path d="M 280 200 L 320 200 L 340 230 L 340 280 L 280 280 Z" fill="url(#truck-grad)" />
                  <rect x="290" y="210" width="20" height="25" fill="#60a5fa" fillOpacity="0.4" rx="2" />
                  <rect x="318" y="210" width="18" height="25" fill="#60a5fa" fillOpacity="0.4" rx="2" />

                  <circle cx="100" cy="290" r="18" fill="#1f2937" />
                  <circle cx="100" cy="290" r="8" fill="#9ca3af" />
                  <circle cx="160" cy="290" r="18" fill="#1f2937" />
                  <circle cx="160" cy="290" r="8" fill="#9ca3af" />
                  <circle cx="250" cy="290" r="18" fill="#1f2937" />
                  <circle cx="250" cy="290" r="8" fill="#9ca3af" />
                  <circle cx="310" cy="290" r="18" fill="#1f2937" />
                  <circle cx="310" cy="290" r="8" fill="#9ca3af" />
                </motion.g>

                <motion.g
                  initial={anim ? { opacity: 0 } : undefined}
                  whileInView={anim ? { opacity: 1 } : undefined}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <circle cx="380" cy="120" r="3" fill="#E8732A">
                    <animate attributeName="cy" values="120;115;120" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="410" cy="100" r="2.5" fill="#E8732A">
                    <animate attributeName="cy" values="100;95;100" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="440" cy="90" r="2" fill="#E8732A">
                    <animate attributeName="cy" values="90;85;90" dur="3s" repeatCount="indefinite" />
                  </circle>
                </motion.g>
              </svg>

              <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-border px-3 py-1 text-xs font-semibold text-brand-primary dark:text-foreground shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-status-success animate-pulse" />
                Live fleet
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 hidden sm:block">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-xl">
                <div className="text-3xl font-heading font-bold text-brand-primary dark:text-foreground">
                  99<span className="text-brand-secondary">%</span>+
                </div>
                <div className="text-xs text-brand-muted font-medium">
                  On-time delivery
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={anim ? { opacity: 0, x: 30 } : undefined}
            whileInView={anim ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] as const }}
          >
            <span className="inline-block rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-1 text-xs font-semibold text-brand-secondary mb-6">
              Our Story
            </span>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-brand-primary dark:text-foreground tracking-tight">
              Built by operators, for{" "}
              <span className="bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">
                shippers
              </span>
            </h2>
            <p className="mt-6 text-brand-muted leading-relaxed text-lg">
              Ship Smart Solutions was founded in 2014 with a simple belief: freight
              should be effortless. What started as a single reefer running lanes
              out of Illinois has grown into a 3,600-asset operation serving
              Fortune 500 shippers across all 48 contiguous states.
            </p>
            <p className="mt-4 text-brand-muted leading-relaxed">
              Today we run dedicated 53&apos; reefers, 53&apos; dry vans, and
              specialized open deck equipment with team drivers and 24/7 dispatch.
              Our customers rely on us because we treat every load like it&apos;s
              our own — and we back it up with a 99%+ on-time record.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {highlights.map((h, i) => {
                const Icon = h.icon
                return (
                  <motion.div
                    key={h.title}
                    initial={anim ? { opacity: 0, y: 16 } : undefined}
                    whileInView={anim ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    className="rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-brand-secondary/30 hover:shadow-md"
                  >
                    <Icon className="h-5 w-5 text-brand-secondary" />
                    <h3 className="mt-2 text-sm font-semibold text-brand-primary dark:text-foreground">
                      {h.title}
                    </h3>
                    <p className="mt-1 text-xs text-brand-muted leading-relaxed">
                      {h.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 lg:p-12 shadow-sm">
          <div className="text-center mb-10">
            <span className="inline-block rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-1 text-xs font-semibold text-brand-secondary mb-4">
              Milestones
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-brand-primary dark:text-foreground">
              A decade of growth
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={anim ? { opacity: 0, y: 20 } : undefined}
                whileInView={anim ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-6 border-l-2 border-brand-secondary/30"
              >
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-brand-secondary ring-4 ring-card" />
                <div className="text-xs font-mono font-bold text-brand-secondary tracking-wider">
                  {m.year}
                </div>
                <h4 className="mt-1 text-lg font-heading font-semibold text-brand-primary dark:text-foreground">
                  {m.title}
                </h4>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                  {m.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
