import { Star } from "lucide-react"

const testimonials = [
  {
    name: "James Mitchell",
    company: "Mitchell Logistics",
    quote:
      "Ship Smart Solutions has transformed our supply chain. Their reefers are top-notch and their team drivers ensure our perishables arrive on time, every time.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    company: "Chen Foods Inc.",
    quote:
      "We've been using Ship Smart for over two years now. Their dry van service is reliable, and their customer support is exceptional. Highly recommend.",
    rating: 5,
  },
  {
    name: "Robert Torres",
    company: "Torres Construction",
    quote:
      "The flatbed team at Ship Smart handled our oversized loads with expertise. Permitting was seamless and delivery was ahead of schedule.",
    rating: 5,
  },
]

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-brand-surface dark:bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto">
            Don&apos;t take our word for it — hear from the businesses that trust
            us with their freight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white dark:bg-brand-dark rounded-xl border border-gray-200 dark:border-gray-800 p-6 lg:p-8 transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-brand-accent text-brand-accent"
                  />
                ))}
              </div>

              <blockquote className="text-sm text-brand-muted leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white text-sm font-semibold">
                  {getInitials(t.name)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {t.name}
                  </div>
                  <div className="text-xs text-brand-muted">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
