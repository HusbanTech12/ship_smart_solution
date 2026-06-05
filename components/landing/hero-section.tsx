"use client"

import { useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/shared/animated-counter"

const heroStats = [
  { label: "On-Time Delivery", end: 99, suffix: "%+" },
  { label: "Truckloads / Month", end: 500, suffix: "+" },
  { label: "Total Assets", end: 3600, suffix: "+" },
  { label: "States Covered", end: 48, suffix: "" },
]

export function HeroSection() {
  const prefersReduced = useReducedMotion()

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex flex-col bg-brand-dark overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: prefersReduced
            ? "none"
            : "gridPulse 8s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.04; }
          50% { opacity: 0.08; }
        }
        @keyframes bounceChevron {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(8px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-chevron { animation: none; }
        }
      `}</style>

      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white max-w-4xl leading-[1.1] tracking-tight">
          Ship Smarter with Us
        </h1>
        <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed">
          Reliable 53&apos; reefer, dry van, and flatbed services across all 48
          states. Team drivers, 99%+ on-time delivery, and 24/7 operations
          support.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Button variant="secondary" size="lg" onClick={scrollToContact}>
            Get a Free Quote
          </Button>
          <Button variant="ghost" size="lg" onClick={scrollToServices}>
            Our Services
          </Button>
        </div>
      </div>

      <button
        onClick={scrollToServices}
        className="hero-chevron absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
        style={{
          animation: prefersReduced ? "none" : "bounceChevron 2s ease-in-out infinite",
        }}
        aria-label="Scroll to services"
      >
        <ChevronDown className="h-8 w-8" />
      </button>

      <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-heading font-bold text-brand-secondary">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
