import type { Metadata } from "next"
import { TestimonialsSection } from "@/components/landing/testimonials-section"

export const metadata: Metadata = {
  title: "Testimonials — Ship Smart Solutions",
  description:
    "Hear from our clients. Ship Smart Solutions delivers 99%+ on-time performance for Fortune 500 companies across the US.",
  openGraph: {
    type: "website",
    url: "https://www.shipsmartsolution.com/testimonials",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
}

export default function TestimonialsPage() {
  return (
    <div className="pt-20">
      <TestimonialsSection />
    </div>
  )
}
