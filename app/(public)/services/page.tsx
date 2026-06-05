import type { Metadata } from "next"
import { ServicesSection } from "@/components/landing/services-section"

export const metadata: Metadata = {
  title: "Our Services — Ship Smart Solutions",
  description:
    "Dedicated 53' reefers, 53' dry vans, and specialized open deck services. Team drivers, 24/7 operations, nationwide coverage.",
  openGraph: {
    type: "website",
    url: "https://www.shipsmartsolution.com/services",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
}

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <ServicesSection />
    </div>
  )
}
