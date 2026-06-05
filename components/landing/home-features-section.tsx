"use client"

import { Activity, Clock, Globe, Shield, Users, Zap } from "lucide-react"

const features = [
  {
    icon: Activity,
    title: "Real-time tracking",
    description: "Live GPS and temperature monitoring with automated status alerts.",
  },
  {
    icon: Clock,
    title: "24/7 operations",
    description: "Round-the-clock dispatch and customer support.",
  },
  {
    icon: Users,
    title: "Team drivers",
    description: "Two-driver teams cut transit times by up to 40%.",
  },
  {
    icon: Globe,
    title: "48-state coverage",
    description: "Coast-to-coast with owned assets and partner network.",
  },
  {
    icon: Shield,
    title: "Fully insured",
    description: "$1.5M cargo coverage on every load.",
  },
  {
    icon: Zap,
    title: "Instant quoting",
    description: "Transparent pricing in under 60 seconds.",
  },
]

export function HomeFeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary mb-3">
            Why Ship Smart
          </p>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-brand-primary tracking-tight">
            Built for serious shippers
          </h2>
          <p className="mt-3 text-brand-muted leading-relaxed">
            Six reasons enterprise teams choose us as their logistics partner.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-200">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group relative border-r border-b border-gray-200 p-6 lg:p-8 transition-colors duration-200 hover:bg-brand-surface"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-primary/5 text-brand-primary transition-colors duration-200 group-hover:bg-brand-primary group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-base font-semibold text-brand-primary">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
