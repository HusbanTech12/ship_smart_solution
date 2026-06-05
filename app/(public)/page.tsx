import type { Metadata } from "next"
import { HeroSection } from "@/components/landing/hero-section"
import { ServicesSection } from "@/components/landing/services-section"
import { StatsSection } from "@/components/landing/stats-section"
import { TrustedBySection } from "@/components/landing/trusted-by-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { ContactSection } from "@/components/landing/contact-section"

export const metadata: Metadata = {
  title: "Ship Smart Solutions — Professional Trucking Services",
  description:
    "Reliable 53' reefer, dry van, and flatbed services across all 48 states. 99%+ on-time delivery. 500+ truckloads/month.",
  openGraph: {
    type: "website",
    url: "https://www.shipsmartsolution.com",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  keywords: [
    "trucking",
    "logistics",
    "reefer",
    "dry van",
    "flatbed",
    "freight",
    "shipping",
  ],
}

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <TrustedBySection />
      <TestimonialsSection />
      <ContactSection />
    </>
  )
}
