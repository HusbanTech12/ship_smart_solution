import { Phone, Mail, MapPin } from "lucide-react"
import { COMPANY } from "@/lib/constants/company"
import { ContactForm } from "@/components/forms/contact-form"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-white dark:bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Get in Touch
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto">
            Ready to ship? Contact us for a free quote or to discuss your
            logistics needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                <Phone className="h-5 w-5 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Phone</h3>
                <a
                  href={COMPANY.phoneHref}
                  className="mt-1 text-sm text-brand-muted hover:text-brand-primary transition-colors"
                >
                  {COMPANY.phone}
                </a>
                <p className="text-xs text-brand-muted mt-0.5">24/7 operations</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                <Mail className="h-5 w-5 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Email</h3>
                <a
                  href={COMPANY.emailHref}
                  className="mt-1 text-sm text-brand-muted hover:text-brand-primary transition-colors"
                >
                  {COMPANY.email}
                </a>
                <p className="text-xs text-brand-muted mt-0.5">We respond within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                <MapPin className="h-5 w-5 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Office</h3>
                <p className="mt-1 text-sm text-brand-muted">{COMPANY.address}</p>
                <p className="text-xs text-brand-muted mt-0.5">{COMPANY.coverage}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 lg:p-8 bg-brand-surface dark:bg-brand-dark">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
