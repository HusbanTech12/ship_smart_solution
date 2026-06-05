import type { Metadata } from "next"
import { AboutHero } from "@/components/landing/about-hero"
import { AboutStory } from "@/components/landing/about-story"
import { AboutValues } from "@/components/landing/about-values"
import { StatsSection } from "@/components/landing/stats-section"
import { TrustedBySection } from "@/components/landing/trusted-by-section"
import { AboutCTA } from "@/components/landing/about-cta"

export const metadata: Metadata = {
  title: "About Us — Ship Smart Solutions",
  description:
    "24/7 operations, 99%+ on-time delivery, 500+ truckloads per month. Learn why Ship Smart Solutions is trusted by Fortune 500 companies.",
  openGraph: {
    type: "website",
    url: "https://www.shipsmartsolution.com/about",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <StatsSection />
      <TrustedBySection />
      <AboutCTA />
    </div>
  )
}
