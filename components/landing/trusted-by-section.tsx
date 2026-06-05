"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { COMPANY } from "@/lib/constants/company"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const logoVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
}

const clientColors: Record<string, string> = {
  Amazon: "from-orange-400 to-orange-600",
  FedEx: "from-purple-500 to-purple-700",
  Walmart: "from-blue-500 to-blue-700",
  Costco: "from-red-500 to-red-700",
  "TDU Tires": "from-gray-500 to-gray-700",
  "Moesle Meat": "from-rose-500 to-rose-700",
}

export function TrustedBySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative py-20 lg:py-24 border-y border-gray-100 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block rounded-full border border-gray-200 bg-gray-50 px-4 py-1 text-xs font-semibold text-brand-muted mb-4">
            Trusted Partners
          </span>
          <p className="text-sm sm:text-base font-medium text-brand-muted">
            Powering logistics for industry-leading companies
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial={prefersReduced ? undefined : "hidden"}
          animate={prefersReduced ? undefined : isInView ? "visible" : "hidden"}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8"
        >
          {COMPANY.clients.map((client) => (
            <motion.div
              key={client}
              variants={logoVariants}
              className="group relative flex items-center justify-center"
            >
              <div className="flex h-16 w-40 items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 px-6 transition-all duration-300 hover:border-brand-secondary/30 hover:shadow-lg hover:-translate-y-0.5">
                <span className="text-base sm:text-lg font-heading font-bold text-gray-400 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent whitespace-nowrap select-none"
                  style={{
                    backgroundImage: prefersReduced ? undefined : `linear-gradient(135deg, ${clientColors[client]?.replace("from-", "").replace("to-", "").replace("orange-400", "#fb923c").replace("orange-600", "#ea580c").replace("purple-500", "#a855f7").replace("purple-700", "#7e22ce").replace("blue-500", "#3b82f6").replace("blue-700", "#1d4ed8").replace("red-500", "#ef4444").replace("red-700", "#b91c1c").replace("gray-500", "#6b7280").replace("gray-700", "#374151").replace("rose-500", "#f43f5e").replace("rose-700", "#be123c") || "#e8732a"})`,
                    WebkitBackgroundClip: prefersReduced ? undefined : "text",
                    WebkitTextFillColor: prefersReduced ? undefined : "transparent",
                    opacity: prefersReduced ? 0.5 : 0.3,
                    transition: "opacity 0.3s ease-out",
                  }}
                  onMouseEnter={(e) => { if (!prefersReduced) e.currentTarget.style.opacity = "1" }}
                  onMouseLeave={(e) => { if (!prefersReduced) e.currentTarget.style.opacity = "0.3" }}
                >
                  {client}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
