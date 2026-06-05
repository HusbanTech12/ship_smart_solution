import { Phone, Mail, MapPin, ArrowRight, Clock, Shield } from "lucide-react"
import { COMPANY } from "@/lib/constants/company"
import { ContactForm } from "@/components/forms/contact-form"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: COMPANY.phone,
    href: COMPANY.phoneHref,
    subtitle: "24/7 operations",
  },
  {
    icon: Mail,
    title: "Email",
    value: COMPANY.email,
    href: COMPANY.emailHref,
    subtitle: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Office",
    value: COMPANY.address,
    subtitle: COMPANY.coverage,
  },
]

const highlights = [
  { icon: Clock, text: "48-state coverage" },
  { icon: Shield, text: "99%+ on-time delivery" },
  { icon: ArrowRight, text: "Instant freight quoting" },
]

export function ContactSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-brand-surface to-white overflow-hidden" id="contact">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-secondary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-1 text-xs font-semibold text-brand-secondary mb-6">
            Get Started
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-foreground">
            Ready to{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              ship smarter
            </span>
            ?
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Contact us for a free quote or to discuss your logistics needs. Our team is ready 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 space-y-8">
              {contactInfo.map((info) => {
                const Icon = info.icon
                return (
                  <div key={info.title} className="flex items-start gap-4 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary/80 shadow-md transition-all duration-300 group-hover:shadow-brand-secondary/20 group-hover:shadow-lg">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{info.title}</h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="mt-0.5 text-sm text-brand-muted hover:text-brand-secondary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm text-brand-muted">{info.value}</p>
                      )}
                      <p className="text-xs text-brand-muted/70 mt-0.5">{info.subtitle}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-brand-primary to-[#0a3a6b] p-8 text-white">
              <h3 className="text-lg font-heading font-semibold mb-4">Why choose Ship Smart?</h3>
              <ul className="space-y-3">
                {highlights.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.text} className="flex items-center gap-3 text-sm text-white/80">
                      <Icon className="h-4 w-4 shrink-0 text-brand-secondary" />
                      {item.text}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 lg:p-10 shadow-xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
