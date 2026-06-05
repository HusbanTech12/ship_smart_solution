"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/shared/logo"

const SESSION_KEY = "ship-smart-intro-seen"
const INTRO_DURATION = 3400

const brandName = "Ship Smart Solutions"
const tagline = "Logistics"

const charVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.05 * i,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
}

const overlayVariants = {
  hidden: {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
  },
  visible: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: {
      duration: 0.9,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
  exit: {
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      delay: 0.1,
    },
  },
}

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.9,
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
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
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
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

          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 flex flex-col items-center px-4"
          >
            <motion.div variants={itemVariants} className="relative mb-8">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-brand-secondary/40 to-brand-accent/40 blur-2xl" />
              <div className="relative">
                <Logo variant="mark" size="xl" tone="gradient" />
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-x-[1px] font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white"
            >
              {brandName.split("").map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  custom={i}
                  variants={charVariants}
                  className={char === " " ? "w-2 sm:w-3" : ""}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="mt-3 flex items-center gap-2"
            >
              <span className="h-px w-6 bg-brand-secondary/60" />
              <span className="text-[10px] sm:text-xs font-medium tracking-[0.3em] uppercase text-brand-secondary">
                {tagline}
              </span>
              <span className="h-px w-6 bg-brand-secondary/60" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 w-48 sm:w-64"
          >
            <div className="h-px w-full bg-white/10 overflow-hidden rounded-full">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-brand-secondary to-brand-accent"
              />
            </div>
            <motion.p
              variants={itemVariants}
              className="mt-3 text-center text-[10px] font-mono uppercase tracking-widest text-gray-500"
            >
              Loading freight network
            </motion.p>
          </motion.div>

          <span className="sr-only">Loading {brandName} experience</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
