"use client"

import { Award, Clock, Warehouse, TruckIcon, PackageCheck } from "lucide-react"
import { AnimatedCounter } from "@/components/shared/animated-counter"

const stats = [
  { icon: Award, value: 99, suffix: "%+", label: "On-Time Delivery" },
  { icon: TruckIcon, value: 500, suffix: "+", label: "Truckloads / Month" },
  { icon: Warehouse, value: 3700000, suffix: "+ sq ft", label: "Warehouse Space", decimals: 0, format: "compact" },
  { icon: Clock, value: 24, suffix: "/7", label: "Operations", prefix: "" },
  { icon: PackageCheck, value: 15, suffix: "M+", label: "Units Fulfilled / Month" },
]

export function StatsSection() {
  return (
    <section id="stats" className="py-20 lg:py-28 bg-brand-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold">
            By the Numbers
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Our track record speaks for itself. Here&apos;s what we&apos;ve
            accomplished for our clients.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <Icon className="h-6 w-6 text-brand-secondary" aria-hidden="true" />
                </div>
                <div className="text-3xl sm:text-4xl font-heading font-bold text-brand-secondary">
                  {stat.label === "Operations" ? (
                    "24/7"
                  ) : stat.label === "Warehouse Space" ? (
                    <AnimatedCounter end={stat.value} prefix="" />
                  ) : stat.label === "Units Fulfilled / Month" ? (
                    <><AnimatedCounter end={15} />M+</>
                  ) : (
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="mt-1.5 text-xs sm:text-sm text-white/70 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
