"use client"

import { motion, useReducedMotion } from "framer-motion"
import { MapPin, Building2, Users } from "lucide-react"
import { COMPANY } from "@/lib/constants/company"

const cities = [
  { name: "Naperville, IL", x: 360, y: 180, hub: true },
  { name: "Atlanta, GA", x: 480, y: 290 },
  { name: "Dallas, TX", x: 260, y: 320 },
  { name: "Los Angeles, CA", x: 60, y: 250 },
  { name: "Seattle, WA", x: 100, y: 60 },
  { name: "New York, NY", x: 580, y: 150 },
  { name: "Miami, FL", x: 560, y: 380 },
  { name: "Denver, CO", x: 220, y: 200 },
  { name: "Phoenix, AZ", x: 140, y: 280 },
  { name: "Chicago, IL", x: 370, y: 170 },
]

const routes = [
  ["360,180", "480,290"],
  ["360,180", "260,320"],
  ["360,180", "60,250"],
  ["360,180", "100,60"],
  ["360,180", "580,150"],
  ["360,180", "560,380"],
  ["360,180", "220,200"],
  ["360,180", "140,280"],
  ["360,180", "370,170"],
  ["480,290", "560,380"],
  ["260,320", "60,250"],
  ["100,60", "60,250"],
  ["580,150", "480,290"],
]

export function AboutHero() {
  const prefersReduced = useReducedMotion()
  const anim = !prefersReduced

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-surface via-card to-brand-surface py-20 lg:py-28">
      <div className="absolute inset-0 opacity-[0.4]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,38,77,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,38,77,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
          }}
        />
      </div>

      {!prefersReduced && (
        <>
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-brand-secondary/10 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-brand-accent/10 blur-3xl" />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={anim ? { opacity: 0, y: 10 } : undefined}
            animate={anim ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-1 text-xs font-semibold text-brand-secondary mb-6"
          >
            About Ship Smart Solutions
          </motion.span>

          <motion.h1
            initial={anim ? { opacity: 0, y: 20 } : undefined}
            animate={anim ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-brand-primary dark:text-foreground tracking-tight max-w-3xl mx-auto"
          >
            We move America.{" "}
            <span className="bg-gradient-to-r from-brand-secondary via-brand-accent to-brand-secondary bg-clip-text text-transparent">
              Smarter, faster, safer.
            </span>
          </motion.h1>

          <motion.p
            initial={anim ? { opacity: 0, y: 20 } : undefined}
            animate={anim ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="mt-6 text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed"
          >
            Ship Smart Solutions is a premier trucking and logistics partner for
            America&apos;s most demanding shippers. We move refrigerated goods,
            general freight, and oversized cargo with a 99%+ on-time record
            across all 48 contiguous states.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={anim ? { opacity: 0, x: -20 } : undefined}
            animate={anim ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-brand-secondary/40 hover:shadow-xl hover:shadow-brand-secondary/5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white shadow-lg">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-brand-primary dark:text-foreground">
                    Headquarters
                  </h3>
                  <p className="mt-1 text-sm text-brand-muted leading-relaxed">
                    {COMPANY.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-brand-secondary/40 hover:shadow-xl hover:shadow-brand-secondary/5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-secondary to-brand-accent text-white shadow-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-brand-primary dark:text-foreground">
                    Coverage Area
                  </h3>
                  <p className="mt-1 text-sm text-brand-muted leading-relaxed">
                    {COMPANY.coverage} with owned assets and partner network.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-brand-secondary/40 hover:shadow-xl hover:shadow-brand-secondary/5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent to-brand-secondary text-white shadow-lg">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-brand-primary dark:text-foreground">
                    Operations
                  </h3>
                  <p className="mt-1 text-sm text-brand-muted leading-relaxed">
                    Team drivers, 24/7 dispatch, and dedicated capacity for
                    every shipment.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={anim ? { opacity: 0, x: 20 } : undefined}
            animate={anim ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="lg:col-span-3"
          >
            <div className="relative aspect-[4/3] rounded-2xl border border-border bg-card p-6 shadow-lg overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,38,77,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,38,77,0.5) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              <svg
                viewBox="0 0 640 440"
                className="relative h-full w-full"
                aria-label="Map showing 48-state US coverage"
              >
                <defs>
                  <linearGradient id="us-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f8f9fa" />
                    <stop offset="100%" stopColor="#e5e7eb" />
                  </linearGradient>
                  <linearGradient id="route-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#E8732A" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#E8732A" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#F5A623" stopOpacity="0.6" />
                  </linearGradient>
                  <filter id="us-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
                    <feOffset dx="0" dy="4" result="offsetblur" />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.15" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  d="M 80,140 L 180,80 L 280,70 L 360,60 L 460,80 L 540,110 L 600,160 L 620,220 L 600,300 L 540,360 L 460,400 L 360,420 L 240,420 L 160,400 L 100,360 L 60,300 L 50,220 Z"
                  fill="url(#us-gradient)"
                  stroke="#00264D"
                  strokeWidth="1.5"
                  strokeOpacity="0.2"
                  filter="url(#us-shadow)"
                />

                <g stroke="url(#route-gradient)" strokeWidth="1.5" fill="none" opacity="0.7">
                  {routes.map(([from, to], i) => (
                    <motion.line
                      key={i}
                      x1={parseFloat(from.split(",")[0])}
                      y1={parseFloat(from.split(",")[1])}
                      x2={parseFloat(to.split(",")[0])}
                      y2={parseFloat(to.split(",")[1])}
                      strokeDasharray="4 4"
                      initial={anim ? { pathLength: 0, opacity: 0 } : undefined}
                      animate={anim ? { pathLength: 1, opacity: 0.7 } : undefined}
                      transition={{
                        duration: 1.5,
                        delay: 0.6 + i * 0.05,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </g>

                {cities.map((city, i) => (
                  <g key={city.name}>
                    {city.hub && (
                      <motion.circle
                        cx={city.x}
                        cy={city.y}
                        r="14"
                        fill="#E8732A"
                        fillOpacity="0.15"
                        initial={anim ? { scale: 0.8, opacity: 0 } : undefined}
                        animate={anim ? { scale: [0.8, 1.4, 0.8], opacity: [0.5, 0, 0.5] } : undefined}
                        transition={{
                          duration: 2,
                          delay: 1 + i * 0.1,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r={city.hub ? 7 : 4}
                      fill={city.hub ? "#E8732A" : "#00264D"}
                      initial={anim ? { scale: 0, opacity: 0 } : undefined}
                      animate={anim ? { scale: 1, opacity: 1 } : undefined}
                      transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                    />
                    {city.hub && (
                      <motion.text
                        x={city.x}
                        y={city.y - 16}
                        textAnchor="middle"
                        className="fill-brand-primary font-semibold"
                        style={{ fontSize: "12px" }}
                        initial={anim ? { opacity: 0 } : undefined}
                        animate={anim ? { opacity: 1 } : undefined}
                        transition={{ duration: 0.4, delay: 1.2 }}
                      >
                        HQ • Naperville, IL
                      </motion.text>
                    )}
                  </g>
                ))}
              </svg>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg border border-border-light bg-card/80 backdrop-blur-sm px-4 py-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand-secondary" />
                  <span className="text-brand-muted">Hub</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand-primary" />
                  <span className="text-brand-muted">Active Route</span>
                </div>
                <div className="text-brand-muted font-medium">
                  48 States · Coast to Coast
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
