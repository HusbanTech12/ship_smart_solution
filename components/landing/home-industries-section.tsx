"use client"

import { ShoppingBag, Beef, Pill, Factory, Wrench, Car, ArrowRight } from "lucide-react"

const industries = [
  { icon: ShoppingBag, name: "Retail & E-commerce", metric: "500+ loads/mo" },
  { icon: Beef, name: "Food & Beverage", metric: "FDA-compliant" },
  { icon: Pill, name: "Pharmaceuticals", metric: "GDP certified" },
  { icon: Factory, name: "Manufacturing", metric: "JIT ready" },
  { icon: Wrench, name: "Construction", metric: "Heavy-haul" },
  { icon: Car, name: "Automotive", metric: "Tier-1 supplier" },
]

export function HomeIndustriesSection() {
  return (
    <section id="industries" className="py-20 lg:py-28 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div className="max-w-2xl">
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
          <a
            href="/contact"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-secondary hover:text-brand-accent transition-colors"
          >
            Discuss your needs
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-l border-gray-200">
          {industries.map((industry) => {
            const Icon = industry.icon
            return (
              <div
                key={industry.name}
                className="group relative border-r border-b border-gray-200 p-5 transition-colors duration-200 hover:bg-white"
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

                <ArrowRight className="absolute bottom-4 right-4 h-3.5 w-3.5 text-brand-secondary opacity-0 -translate-x-1 transition-all duration-300 pointer-fine:group-hover:opacity-100 pointer-fine:group-hover:translate-x-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-x-0" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
