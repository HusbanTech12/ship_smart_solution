"use client"

import { Snowflake, Container, Truck, ArrowRight, Check, Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const previews = [
  {
    icon: Snowflake,
    title: "53' Reefers",
    description:
      "Temperature-controlled with real-time monitoring for perishables and pharma.",
    details: ["Team drivers", "Temp monitoring", "GPS tracking"],
    popular: true,
  },
  {
    icon: Container,
    title: "53' Dry Vans",
    description:
      "Reliable general freight shipping with maximum cube capacity.",
    details: ["Team drivers", "Max cube", "Load securement"],
  },
  {
    icon: Truck,
    title: "Flatbed & RGN",
    description:
      "Specialized open deck for oversized and heavy-haul freight.",
    details: ["Oversized loads", "Heavy haul", "Permitting"],
  },
]

export function HomeServicesPreviewSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary mb-3">
              Our Services
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-brand-primary tracking-tight">
              Three modes. One platform.
            </h2>
            <p className="mt-3 text-brand-muted leading-relaxed">
              Pick the trailer type that fits your freight. We handle the rest.
            </p>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-secondary hover:text-brand-accent transition-colors"
          >
            View all services
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {previews.map((preview) => {
            const Icon = preview.icon
            return (
              <div
                key={preview.title}
                className={cn(
                  "group relative flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300",
                  "hover:-translate-y-1 hover:border-brand-secondary/40 hover:shadow-lg hover:shadow-brand-secondary/5",
                )}
              >
                {preview.popular && (
                  <div className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-brand-secondary to-brand-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white shadow-md">
                    <Sparkles className="h-3 w-3" />
                    Most popular
                  </div>
                )}

                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-primary/5 text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-brand-primary">
                  {preview.title}
                </h3>

                <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                  {preview.description}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-gray-100 pt-4">
                  {preview.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center gap-2.5 text-sm text-brand-muted"
                    >
                      <Check className="h-3.5 w-3.5 text-brand-secondary shrink-0" strokeWidth={3} />
                      {detail}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/services"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-secondary transition-all duration-200 group-hover:gap-2 hover:text-brand-accent"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
