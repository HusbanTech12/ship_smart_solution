"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { COMPANY } from "@/lib/constants/company"

export function AboutCTA() {
  const prefersReduced = useReducedMotion()
  const anim = !prefersReduced

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #00264D 0%, #0a3a6b 100%)",
        }}
      />

      {!prefersReduced && (
        <>
          <div className="absolute top-10 right-10 h-96 w-96 rounded-full bg-brand-secondary/20 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-brand-accent/10 blur-3xl" />
        </>
      )}

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <motion.div
            initial={anim ? { opacity: 0, y: 20 } : undefined}
            whileInView={anim ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="lg:col-span-3"
          >
            <span className="inline-block rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1 text-xs font-semibold text-white/90 mb-6">
              Let&apos;s Work Together
            </span>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white tracking-tight">
              Ready to ship{" "}
              <span className="bg-gradient-to-r from-brand-accent to-brand-secondary bg-clip-text text-transparent">
                smarter?
              </span>
            </h2>
            <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
              Get a transparent quote in under 60 seconds, or talk to our
              operations team about your lanes. We&apos;re here 24/7.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="shadow-lg shadow-brand-secondary/30"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href="/services"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              >
                View Our Services
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={anim ? { opacity: 0, x: 20 } : undefined}
            whileInView={anim ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/60">
                Direct Contact
              </h3>

              <a
                href={COMPANY.phoneHref}
                className="flex items-start gap-3 group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-secondary/20 group-hover:bg-brand-secondary/30 transition-colors">
                  <Phone className="h-4 w-4 text-brand-secondary" />
                </div>
                <div>
                  <div className="text-xs text-white/60 font-medium">Call us 24/7</div>
                  <div className="text-base text-white font-semibold tabular-nums">
                    {COMPANY.phone}
                  </div>
                </div>
              </a>

              <a
                href={COMPANY.emailHref}
                className="flex items-start gap-3 group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-secondary/20 group-hover:bg-brand-secondary/30 transition-colors">
                  <Mail className="h-4 w-4 text-brand-secondary" />
                </div>
                <div>
                  <div className="text-xs text-white/60 font-medium">Email operations</div>
                  <div className="text-sm text-white font-semibold break-all">
                    {COMPANY.email}
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-secondary/20">
                  <MapPin className="h-4 w-4 text-brand-secondary" />
                </div>
                <div>
                  <div className="text-xs text-white/60 font-medium">Headquarters</div>
                  <div className="text-sm text-white font-semibold">
                    {COMPANY.address}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
