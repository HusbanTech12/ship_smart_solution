import type { Metadata } from "next"
import { ContactSection } from "@/components/landing/contact-section"

export const metadata: Metadata = {
  title: "Contact Us — Ship Smart Solutions",
  description:
    "Get a free freight quote or speak with our operations team. Call +1 (832) 951-2823 or reach out online.",
  openGraph: {
    type: "website",
    url: "https://www.shipsmartsolution.com/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      <ContactSection />
    </div>
  )
}
