"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const SESSION_KEY = "ship-smart-intro-seen"
const INTRO_DURATION = 2200

const brandName = "Ship Smart Solutions"
const tagline = "Logistics"

const charVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.4 + i * 0.025,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
}

export function IntroOverlay() {
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const seen = sessionStorage.getItem(SESSION_KEY)
      if (!seen) {
        setShow(true)
        const timer = setTimeout(() => {
          setShow(false)
          sessionStorage.setItem(SESSION_KEY, "1")
        }, INTRO_DURATION)
        return () => clearTimeout(timer)
      }
    } catch {
      setShow(true)
    }
  }, [])

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [show])

  if (!mounted) return null

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="intro"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-brand-dark"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,115,42,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,38,77,0.4) 0%, transparent 60%)",
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center px-4">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative mb-8"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-secondary to-brand-accent blur-2xl opacity-60" />
              <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-secondary via-brand-accent to-brand-secondary shadow-2xl">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-10 w-10 sm:h-12 sm:w-12 text-white"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 17h4V5H2v12h3" />
                  <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
                  <circle cx="7.5" cy="17.5" r="2.5" />
                  <circle cx="17.5" cy="17.5" r="2.5" />
                </svg>
              </div>
            </motion.div>

            <h1 className="flex flex-wrap items-center justify-center gap-x-[1px] font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              {brandName.split("").map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  custom={i}
                  variants={charVariants}
                  initial="hidden"
                  animate="visible"
                  className={char === " " ? "w-2 sm:w-3" : ""}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + brandName.length * 0.025 + 0.1, duration: 0.5 }}
              className="mt-3 flex items-center gap-2"
            >
              <span className="h-px w-6 bg-brand-secondary/60" />
              <span className="text-[10px] sm:text-xs font-medium tracking-[0.3em] uppercase text-brand-secondary">
                {tagline}
              </span>
              <span className="h-px w-6 bg-brand-secondary/60" />
            </motion.div>
          </div>

          <div className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 w-48 sm:w-64">
            <div className="h-px w-full bg-white/10 overflow-hidden rounded-full">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-brand-secondary to-brand-accent"
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-3 text-center text-[10px] font-mono uppercase tracking-widest text-gray-500"
            >
              Loading freight network
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
