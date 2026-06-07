"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "James Mitchell",
    company: "Mitchell Logistics",
    role: "VP of Supply Chain",
    quote:
      "Ship Smart Solutions has transformed our supply chain. Their reefers are top-notch and their team drivers ensure our perishables arrive on time, every time.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    company: "Chen Foods Inc.",
    role: "Operations Director",
    quote:
      "We've been using Ship Smart for over two years now. Their dry van service is reliable, and their customer support is exceptional. Highly recommend.",
    rating: 5,
  },
  {
    name: "Robert Torres",
    company: "Torres Construction",
    role: "Logistics Manager",
    quote:
      "The flatbed team at Ship Smart handled our oversized loads with expertise. Permitting was seamless and delivery was ahead of schedule.",
    rating: 5,
  },
]

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-brand-surface to-card overflow-hidden" id="testimonials">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(232,115,42,0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-1 text-xs font-semibold text-brand-secondary mb-6">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-foreground">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              industry leaders
            </span>
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Don&apos;t take our word for it — hear from the businesses that trust
            us with their freight.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial={prefersReduced ? undefined : "hidden"}
          animate={prefersReduced ? undefined : isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="group relative bg-card rounded-2xl border border-border p-8 transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2"
            >
              {!prefersReduced && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-brand-secondary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              )}

              <div className="absolute top-6 right-6 text-brand-secondary/10">
                <Quote className="h-12 w-12" />
              </div>

              <div className="relative z-10">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-brand-accent text-brand-accent"
                    />
                  ))}
                </div>

                <blockquote className="text-sm text-brand-muted leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center gap-3">
                  <div className="relative shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary text-white text-sm font-semibold">
                      {getInitials(t.name)}
                    </div>
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs text-brand-muted">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm text-brand-muted">
            <span className="flex -space-x-2">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white dark:border-card bg-brand-primary text-[10px] font-bold text-white"
                >
                  {getInitials(t.name)}
                </div>
              ))}
            </span>
            <span className="ml-2">
              <strong className="text-foreground dark:text-white">4.9</strong> average rating from 200+ reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
