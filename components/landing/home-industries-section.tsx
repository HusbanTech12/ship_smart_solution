"use client"

import { ShoppingBag, Beef, Pill, Factory, Wrench, Truck } from "lucide-react"

const industries = [
  { icon: ShoppingBag, name: "Retail & E-commerce", metric: "500+ loads/mo" },
  { icon: Beef, name: "Food & Beverage", metric: "FDA-compliant" },
  { icon: Pill, name: "Pharmaceuticals", metric: "GDP certified" },
  { icon: Factory, name: "Manufacturing", metric: "JIT ready" },
  { icon: Wrench, name: "Construction", metric: "Heavy-haul" },
  { icon: Truck, name: "Automotive", metric: "Tier-1 supplier" },
]

export function HomeIndustriesSection() {
  return (
    <section className="py-20 lg:py-28 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary mb-3">
            Industries We Serve
          </p>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-brand-primary tracking-tight">
            Specialized for your industry
          </h2>
          <p className="mt-3 text-brand-muted leading-relaxed">
            Dedicated capacity and compliance expertise across the sectors that move America.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-l border-gray-200">
          {industries.map((industry) => {
            const Icon = industry.icon
            return (
              <div
                key={industry.name}
                className="group border-r border-b border-gray-200 p-5 transition-colors duration-200 hover:bg-white"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-primary/5 text-brand-primary transition-colors duration-200 group-hover:bg-brand-primary group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-brand-primary leading-snug">
                  {industry.name}
                </h3>

                <p className="mt-1 text-xs text-brand-muted">
                  {industry.metric}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
