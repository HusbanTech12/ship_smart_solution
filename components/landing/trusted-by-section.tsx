import { COMPANY } from "@/lib/constants/company"

export function TrustedBySection() {
  return (
    <section className="py-16 lg:py-20 bg-white dark:bg-brand-dark border-y border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-xs sm:text-sm font-semibold uppercase tracking-widest text-brand-muted">
          Trusted by Industry Leaders
        </p>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex animate-marquee gap-16 items-center min-w-full">
            {COMPANY.clients.map((client) => (
              <div
                key={client}
                className="flex items-center justify-center shrink-0"
              >
                <span className="text-lg sm:text-xl font-heading font-bold text-gray-400 dark:text-gray-600 whitespace-nowrap select-none">
                  {client}
                </span>
              </div>
            ))}
          </div>
          <div
            className="flex animate-marquee gap-16 items-center min-w-full"
            aria-hidden="true"
          >
            {COMPANY.clients.map((client) => (
              <div
                key={`dup-${client}`}
                className="flex items-center justify-center shrink-0"
              >
                <span className="text-lg sm:text-xl font-heading font-bold text-gray-400 dark:text-gray-600 whitespace-nowrap select-none">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
