"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/shared/logo"

const SESSION_KEY = "ship-smart-intro-seen"
const INTRO_DURATION = 3000

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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: "easeIn" as const },
  },
}

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/20 backdrop-blur-xl"
          aria-hidden="true"
        >
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
                <Logo variant="mark" size="xl" mode="gradient" />
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-x-[1px] font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-lg"
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
              <span className="text-[10px] sm:text-xs font-medium tracking-[0.3em] uppercase text-brand-secondary drop-shadow-lg">
                {tagline}
              </span>
              <span className="h-px w-6 bg-brand-secondary/60" />
            </motion.div>
          </motion.div>

          <span className="sr-only">Loading {brandName} experience</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
