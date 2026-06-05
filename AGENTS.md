# About this project

Fresh `create-next-app` scaffold (Next.js 16 App Router, React 19, Tailwind v4, TypeScript 5 strict). No custom logic yet — treat it as starting from scratch.

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | dev server |
| `npm run build` | production build (Turbopack) |
| `npm run start` | production server |
| `npm run lint` | ESLint (flat config, `core-web-vitals` + `typescript` presets) |
| `npx tsc --noEmit` | typecheck (no script defined) |

No test framework installed yet. Next.js 16 ships testing guides in `node_modules/next/dist/docs/` if one is added.

## Next.js 16 quirks (differs from v15)

Read `node_modules/next/dist/docs/` before writing code — this version has breaking changes. Key ones:

- **Turbopack default**: no `--turbopack` flag; use `--webpack` to opt out
- **`next lint` removed**: use `eslint` directly
- **Async request APIs**: `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` are async only — must `await`
- **`proxy.ts` replaces `middleware.ts`**: Edge runtime not supported
- **Tailwind v4**: config is CSS-based (`@theme`, `@import "tailwindcss"`), no `tailwind.config.js`
- **Path alias**: `@/*` maps to `./*` (repo root, not `src/`)
- **Build output**: no longer shows `size` / `First Load JS`
- **`next build` no longer runs linting**: run lint separately before build

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


# AGENTS.md — Ship Smart Solutions Web App

> **Project:** Ship Smart Solutions — Professional Trucking & Logistics Platform
> **Stack:** Next.js 14 (App Router) · Clerk Authentication · Tailwind CSS · Framer Motion · Claude AI Chatbot
> **Standard:** Every agent working on this codebase must read and follow this document entirely before writing a single line of code.

---

## 1. PROJECT OVERVIEW

Ship Smart Solutions is a professional B2B logistics web application serving trucking clients across all 48 US states. The product must feel like a **Fortune 500 SaaS tool** — not a template. Users are operations managers, freight coordinators, and enterprise procurement teams. First impressions are everything.

### Core Pages
| Route | Purpose |
|---|---|
| `/` | Public landing page (Hero, Services, Stats, Testimonials, Contact) |
| `/sign-in` | Clerk-powered sign in |
| `/sign-up` | Clerk-powered sign up |
| `/dashboard` | Authenticated client portal home |
| `/dashboard/quote` | Request a freight quote |
| `/dashboard/shipments` | Track active shipments |
| `/dashboard/history` | Shipment history |
| `/dashboard/documents` | BOLs, invoices, compliance docs |
| `/dashboard/support` | AI chatbot + human escalation |
| `/dashboard/settings` | Account & notification settings |
| `/(admin)` | Internal admin portal (protected) |

---

## 2. GOLDEN RULES — NON-NEGOTIABLE

Every agent must internalize these before touching any file:

1. **No layout shifts.** Use `min-h`, skeleton loaders, and `Suspense` boundaries everywhere async data is fetched.
2. **No orphaned loading states.** Every data fetch has: loading UI → success UI → error UI. No exceptions.
3. **No hardcoded colors or spacing.** Use Tailwind design tokens exclusively. Define brand tokens in `tailwind.config.ts`.
4. **No `any` TypeScript.** All props, API responses, and state must be fully typed. Use Zod for runtime validation.
5. **No client components without reason.** Default to Server Components. Add `"use client"` only when interactivity demands it.
6. **No form without validation.** Every form uses React Hook Form + Zod schema. Every field has inline error messaging.
7. **No page without metadata.** Every route exports a `generateMetadata()` function.
8. **No image without `next/image`.** Always provide `width`, `height`, `alt`, and `priority` on above-the-fold images.
9. **No animation that blocks interaction.** All Framer Motion animations use `will-change: transform` and respect `prefers-reduced-motion`.
10. **No unhandled promise.** Wrap all async operations in try/catch. Surface errors to the user, never swallow them silently.

---

## 3. TECH STACK & VERSIONS

```
next                    14.x   (App Router, Server Actions)
react                   18.x
typescript              5.x
tailwindcss             3.x
@clerk/nextjs           5.x
framer-motion           11.x
react-hook-form         7.x
zod                     3.x
@tanstack/react-query   5.x
axios                   1.x
lucide-react            latest
sonner                  latest  (toast notifications)
next-themes             latest  (dark mode)
```

---

## 4. FOLDER STRUCTURE

```
ship-smart-solutions/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   ├── (public)/
│   │   ├── layout.tsx          ← Public layout (navbar + footer)
│   │   └── page.tsx            ← Landing page
│   ├── (dashboard)/
│   │   ├── layout.tsx          ← Dashboard shell (sidebar + topbar)
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── quote/page.tsx
│   │   │   ├── shipments/page.tsx
│   │   │   ├── history/page.tsx
│   │   │   ├── documents/page.tsx
│   │   │   ├── support/page.tsx
│   │   │   └── settings/page.tsx
│   ├── api/
│   │   ├── chat/route.ts       ← AI chatbot endpoint
│   │   ├── quote/route.ts
│   │   └── webhooks/clerk/route.ts
│   ├── globals.css
│   ├── layout.tsx              ← Root layout (ClerkProvider, ThemeProvider, Toaster)
│   └── not-found.tsx
│
├── components/
│   ├── ui/                     ← Base primitives (Button, Input, Modal, Badge, etc.)
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── DashboardTopbar.tsx
│   ├── landing/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── TrustedBySection.tsx
│   │   └── ContactSection.tsx
│   ├── dashboard/
│   │   ├── QuoteForm.tsx
│   │   ├── ShipmentCard.tsx
│   │   ├── ShipmentTracker.tsx
│   │   ├── DocumentList.tsx
│   │   └── StatsOverview.tsx
│   ├── chatbot/
│   │   ├── ChatWidget.tsx      ← Floating chatbot button + panel
│   │   ├── ChatMessage.tsx
│   │   ├── ChatInput.tsx
│   │   └── TypingIndicator.tsx
│   ├── forms/
│   │   ├── ContactForm.tsx
│   │   ├── QuoteRequestForm.tsx
│   │   └── FormField.tsx       ← Reusable field wrapper with error state
│   └── shared/
│       ├── SkeletonLoader.tsx
│       ├── EmptyState.tsx
│       ├── ErrorBoundary.tsx
│       ├── PageHeader.tsx
│       └── AnimatedCounter.tsx
│
├── lib/
│   ├── utils.ts                ← cn(), formatDate(), formatCurrency()
│   ├── validations/
│   │   ├── quote.schema.ts
│   │   ├── contact.schema.ts
│   │   └── auth.schema.ts
│   ├── api/
│   │   ├── client.ts           ← Axios instance
│   │   └── endpoints.ts
│   └── constants/
│       ├── services.ts
│       ├── navigation.ts
│       └── company.ts          ← Phone, email, address, stats
│
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useMediaQuery.ts
│   ├── useDebounce.ts
│   └── useChatbot.ts
│
├── types/
│   ├── shipment.ts
│   ├── quote.ts
│   ├── user.ts
│   └── chat.ts
│
├── middleware.ts                ← Clerk auth middleware
├── tailwind.config.ts
├── next.config.ts
└── AGENTS.md
```

---

## 5. DESIGN SYSTEM

### 5.1 Brand Tokens — `tailwind.config.ts`

```ts
colors: {
  brand: {
    primary:   '#00264D',   // Deep navy — primary backgrounds, headers
    secondary: '#E8732A',   // Trucking orange — CTAs, highlights
    accent:    '#F5A623',   // Amber — badges, warnings, stars
    surface:   '#F8F9FA',   // Off-white — page backgrounds
    muted:     '#6B7280',   // Gray — secondary text
    dark:      '#0A0F1E',   // Near-black — dark mode bg
  },
  status: {
    success:   '#16A34A',
    warning:   '#D97706',
    error:     '#DC2626',
    info:      '#2563EB',
  }
}
```

### 5.2 Typography Scale

```
Display:  font-display (Bebas Neue or Syne) — hero headlines only
Heading:  font-heading (DM Sans 600/700) — section titles, card headers
Body:     font-sans (DM Sans 400) — paragraphs, labels
Mono:     font-mono — tracking numbers, IDs, codes
```

Load via `next/font/google`. Never use system fonts for headings.

### 5.3 Spacing Discipline

- Section vertical padding: `py-20 lg:py-28`
- Container max-width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Card padding: `p-6 lg:p-8`
- Gap between grid items: `gap-6 lg:gap-8`

### 5.4 Component Anatomy — Button

```tsx
// variants: primary | secondary | ghost | danger
// sizes: sm | md | lg
// states: default | loading | disabled

<Button variant="primary" size="lg" loading={isSubmitting}>
  Get a Free Quote
</Button>
```

Button rules:
- Always has `min-w-[120px]` to prevent layout shift during loading state
- Loading state shows spinner + disabled, never just disabled alone
- Hover: 5% brightness shift + subtle scale(1.02)
- Active: scale(0.98)
- Focus: 2px offset ring in brand color

### 5.5 Dark Mode

- Use `next-themes` with `attribute="class"`
- All colors via CSS variables, never raw hex in components
- Dark mode tested on every component before marking done

---

## 6. AUTHENTICATION — CLERK

### 6.1 Setup

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
])

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', '/(api|trpc)(.*)'],
}
```

### 6.2 Auth Pages

- Use `<SignIn />` and `<SignUp />` Clerk components
- Wrap in a centered layout with the Ship Smart logo above
- Apply `appearance` prop to match brand colors
- After sign-in redirect to `/dashboard`

```tsx
// app/(auth)/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-surface">
      <Logo className="mb-8 h-10" />
      <SignIn
        afterSignInUrl="/dashboard"
        appearance={{
          elements: {
            formButtonPrimary: 'bg-brand-secondary hover:bg-brand-secondary/90',
            card: 'shadow-xl border border-gray-100',
          }
        }}
      />
    </div>
  )
}
```

### 6.3 Protecting Server Components

```tsx
import { auth, currentUser } from '@clerk/nextjs/server'

export default async function DashboardPage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const user = await currentUser()
  return <Dashboard user={user} />
}
```

### 6.4 User Data Sync

On Clerk `user.created` webhook → sync user to your DB:

```ts
// app/api/webhooks/clerk/route.ts
// Verify Svix signature → extract event → upsert user record
```

---

## 7. AI CHATBOT

### 7.1 Architecture

```
User types → ChatWidget (client) → POST /api/chat → Claude API → streamed response → ChatMessage renders markdown
```

### 7.2 API Route

```ts
// app/api/chat/route.ts
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const SYSTEM_PROMPT = `
You are the Ship Smart Solutions virtual assistant. You help clients with:
- Getting freight quotes for reefer, dry van, and flatbed loads
- Tracking shipment status
- Understanding services and capabilities
- Connecting with the operations team

Company info:
- Phone: (331) 215-4701
- Email: operations@ship-solutions.net  
- Address: 650 E Diehl Rd, Naperville IL, 60563
- Coverage: All 48 contiguous US states
- Services: 53' Reefers (team drivers), 53' Dry Vans (team drivers), Flatbed/Step Deck/RGN
- Stats: 99%+ on-time delivery, 500+ truckloads/month, 3,600+ assets

Keep answers concise, professional, and logistics-focused.
If asked about something outside logistics/shipping, politely redirect.
Always offer to connect them with a human agent for complex requests.
`

export async function POST(req: Request) {
  const { messages } = await req.json()

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  })

  return new Response(stream.toReadableStream(), {
    headers: { 'Content-Type': 'text/event-stream' },
  })
}
```

### 7.3 ChatWidget Component Behavior

- **Floating button** — fixed bottom-right, z-50, pulsing indicator dot when unread
- **Panel** — 380px wide, 520px tall, slides up on open (Framer Motion)
- **Messages** — user bubble (right, brand-secondary), bot bubble (left, white/dark surface)
- **Typing indicator** — animated 3-dot pulse while streaming
- **Streaming** — render tokens as they arrive, auto-scroll to bottom
- **Persistence** — store chat history in `sessionStorage` (clears on tab close)
- **Error state** — if API fails, show "Something went wrong. Try again." with retry button
- **Suggested prompts** — show 3 quick-action chips on first open:
  - "Get a freight quote"
  - "Track my shipment"
  - "Talk to a human agent"

---

## 8. LANDING PAGE SECTIONS

### 8.1 Navbar
- Transparent on top, solid `brand-primary` on scroll (use `useScrollProgress`)
- Logo left, nav links center, "Get a Quote" CTA right
- Mobile: hamburger → full-screen slide-down menu with staggered link animation
- Active link indicator: underline dot below current section (scroll-spy)
- Smooth scroll to sections on click

### 8.2 Hero Section
- Full viewport height (`min-h-screen`)
- Background: dark navy with subtle animated particle/grid overlay (CSS only, `prefers-reduced-motion` safe)
- Headline: Display font, large, white — "Ship Smarter with Us"
- Subheadline: muted gray, max-w-2xl
- Two CTAs: primary "Get a Free Quote" + ghost "Our Services"
- Scroll indicator: animated chevron-down at bottom
- Stats strip below fold: 4 key numbers with animated counters on viewport entry

### 8.3 Services Section
- 3-column grid (1 col mobile, 3 col desktop)
- Each card: service image (next/image), title, description, "View Details" link
- Hover: card lifts with box-shadow, image subtle zoom
- Cards animate in with staggered `fadeInUp` on scroll

### 8.4 Stats Section
- Full-width dark band
- 5 stats in a row with `AnimatedCounter` (IntersectionObserver triggered, runs once)
- Icon above each stat

### 8.5 Trusted By Section
- Infinite horizontal scroll marquee (CSS animation, `animation-play-state: paused` on hover)
- Company logos/abbreviations as styled badges

### 8.6 Testimonials Section
- 3 testimonial cards in a grid
- Star rating (5 stars, brand-accent color)
- Avatar initials circle, name, company, quote
- Subtle card hover effect

### 8.7 Contact Section
- Two-column: left = contact info cards (phone, email, address), right = contact form
- Form fields: Name, Email, Phone, Service Type (select), Message, SMS consent checkbox
- On submit: show loading state → success toast → reset form
- All fields validated with Zod before submit

### 8.8 Footer
- 3-column: Logo + tagline | Quick Links | Contact Info
- Copyright bar with links to Privacy Policy and SMS Terms
- Social links (if applicable)

---

## 9. DASHBOARD

### 9.1 Layout Shell
- Sidebar: collapsible, 260px expanded / 72px collapsed
- Topbar: user avatar (Clerk `<UserButton />`), page title, notification bell
- Sidebar nav items animate active state with background pill
- Mobile: sidebar hidden, hamburger opens drawer overlay

### 9.2 Dashboard Home
- Welcome banner with user first name
- 4 metric cards: Active Shipments, Pending Quotes, Documents, On-Time Rate
- Recent shipments table (last 5)
- Quick actions: New Quote, Track Shipment, Upload Document

### 9.3 Quote Request Form
- Multi-step form (3 steps with progress indicator):
  1. Load details (service type, weight, dimensions, commodity)
  2. Route details (origin, destination, pickup date, delivery window)
  3. Contact & notes (confirm info, special instructions)
- Step validation before advancing — cannot skip
- Final step shows summary review before submit
- Submit → success confirmation with quote reference number

### 9.4 Shipment Tracker
- Search by tracking number or shipment ID
- Visual timeline: Booked → Picked Up → In Transit → Out for Delivery → Delivered
- Each milestone has timestamp, location, and status badge
- Map placeholder (or static map embed)

---

## 10. FORMS — STANDARDS

Every form in this app must follow this pattern:

```tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  serviceType: z.enum(['reefer', 'dry-van', 'flatbed'], {
    errorMap: () => ({ message: 'Please select a service type' })
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      await submitContact(data)
      toast.success('Message sent! We\'ll be in touch within 24 hours.')
      reset()
    } catch {
      toast.error('Something went wrong. Please try again or call us directly.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormField label="Full Name" error={errors.name?.message} required>
        <input {...register('name')} type="text" placeholder="John Smith" />
      </FormField>
      {/* ... other fields */}
      <Button type="submit" loading={isSubmitting} className="w-full">
        Send Message
      </Button>
    </form>
  )
}
```

### FormField Wrapper Contract
```tsx
// components/forms/FormField.tsx
// Props: label, error, required, hint, children
// Renders: label → input slot → error message (aria-live) → hint text
// Error: red text, red border on input, error icon
// Success: green checkmark when field is valid and touched
```

---

## 11. MICRO-INTERACTIONS CHECKLIST

Every interactive element must have these states implemented:

| Element | Default | Hover | Active | Focus | Loading | Disabled |
|---|---|---|---|---|---|---|
| Button | ✓ | scale(1.02) | scale(0.98) | ring-2 | spinner | opacity-50 |
| Input | border-gray | border-brand | — | ring-2 | — | opacity-50 bg-gray |
| Card | shadow-sm | shadow-md translateY(-2px) | — | — | skeleton | — |
| Link | — | underline color shift | — | ring-2 | — | — |
| Checkbox | border | bg-brand check | scale(0.95) | ring-2 | — | opacity-50 |
| Select | border-gray | border-brand | — | ring-2 | — | opacity-50 |

Animation timing:
- Hover transitions: `duration-200 ease-out`
- Page enter animations: `duration-500 ease-out`
- Stagger delay between list items: `0.08s`
- Counter animations: `duration-2000 ease-out`

---

## 12. ERROR HANDLING

### 12.1 Network Errors
```tsx
// Always show user-friendly messages, log technical details to console
try {
  const data = await fetchShipments()
  setShipments(data)
} catch (error) {
  console.error('[Shipments] Fetch failed:', error)
  toast.error('Could not load shipments. Please refresh or contact support.')
  setError(true)
}
```

### 12.2 Error States in UI
Every data-fetching component has three states:

```tsx
if (isLoading) return <SkeletonLoader rows={4} />
if (error) return <ErrorState message="Could not load shipments" onRetry={refetch} />
if (!data?.length) return <EmptyState title="No shipments yet" description="Your active shipments will appear here." />
return <ShipmentList data={data} />
```

### 12.3 Global Error Boundary
Wrap dashboard in `<ErrorBoundary>` with a friendly fallback:
```tsx
// "Something went wrong. Our team has been notified."
// + "Go to Dashboard" button
// + Support phone number
```

### 12.4 `not-found.tsx`
Custom 404 page with:
- Ship Smart logo
- "Page not found" message
- Back to home button
- Support contact

### 12.5 `error.tsx`
Custom error page (Next.js error boundary):
- Same branding as 404
- "Try again" button (calls `reset()`)
- Support phone number

---

## 13. PERFORMANCE RULES

### Images
- All images via `next/image`
- Hero image: `priority` prop
- Below fold: default lazy loading
- Format: WebP preferred
- Placeholder: `placeholder="blur"` with `blurDataURL`

### Animations
- Compositor only: `transform` and `opacity` exclusively
- `will-change: transform` on animated elements
- Pause on `visibilitychange` and when element leaves viewport
- `prefers-reduced-motion`: wrap all Framer Motion in:
```tsx
const prefersReduced = useReducedMotion()
const variants = prefersReduced ? {} : animationVariants
```

### Code Splitting
- Dashboard sections loaded with `next/dynamic` + `loading` skeleton
- Chatbot widget: `dynamic(() => import('./ChatWidget'), { ssr: false })`
- Heavy libraries (charts, maps): dynamic import on demand

### Fonts
- Load with `next/font/google`, `display: 'swap'`
- Subset to used characters where possible

### Bundle
- No barrel imports (`import { x } from 'lucide-react'` NOT `import * as Icons`)
- Analyze with `@next/bundle-analyzer` before each major release

---

## 14. ACCESSIBILITY

- All interactive elements reachable via keyboard
- Focus visible at all times (never `outline: none` without replacement)
- Color contrast minimum 4.5:1 for body text, 3:1 for large text
- All images have meaningful `alt` text
- Form errors announced via `aria-live="polite"`
- Modal/drawer traps focus and restores on close
- Skip to main content link at top of every page
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`

---

## 15. SEO & METADATA

Every page exports:

```tsx
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Ship Smart Solutions — Professional Trucking Services',
    description: 'Reliable 53\' reefer, dry van, and flatbed services across all 48 states. 99%+ on-time delivery. 500+ truckloads/month.',
    openGraph: {
      type: 'website',
      url: 'https://www.shipsmartsolution.com',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    keywords: ['trucking', 'logistics', 'reefer', 'dry van', 'flatbed', 'freight', 'shipping'],
  }
}
```

---

## 16. ENVIRONMENT VARIABLES

```env
# .env.local

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
CLERK_WEBHOOK_SECRET=

# Anthropic (Chatbot)
ANTHROPIC_API_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Never commit `.env.local`. Always add to `.gitignore`.

---

## 17. CONSTANTS FILE

```ts
// lib/constants/company.ts
export const COMPANY = {
  name: 'Ship Smart Solutions',
  tagline: 'Ship Smarter with Us',
  phone: '(331) 215-4701',
  phoneHref: 'tel:+13312154701',
  email: 'operations@ship-solutions.net',
  emailHref: 'mailto:operations@ship-solutions.net',
  address: '650 E Diehl Rd, Naperville IL, 60563',
  coverage: 'All 48 contiguous US states',
  stats: {
    onTimeRate: '99%+',
    operations: '24/7',
    warehouseSpace: '3.7M+',
    truckloadsPerMonth: '500+',
    totalAssets: '3,600+',
    unitsFulfilledPerMonth: '15M+',
  },
  services: ['Dedicated 53\' Reefers', 'Dedicated 53\' Dry Vans', 'Specialized Open Deck'],
  clients: ['Amazon', 'FedEx', 'Walmart', 'Costco', 'TDU Tires', 'Moesle Meat'],
} as const
```

---

## 18. AGENT TASK PROTOCOL

When an agent receives a task, it must:

1. **Read this file first.** No exceptions.
2. **Identify which section applies** to the task (form? auth? chatbot? landing?).
3. **Check existing components** in `components/ui/` before creating new ones.
4. **Follow the folder structure** in Section 4 exactly.
5. **Type everything.** No implicit `any`.
6. **Handle all three states:** loading, error, empty/success.
7. **Test dark mode** before marking complete.
8. **Test mobile (375px)** before marking complete.
9. **Run `tsc --noEmit`** — zero TypeScript errors before committing.
10. **Self-review against Section 2 Golden Rules** before submitting.

---

## 19. COMMIT CONVENTIONS

```
feat(chatbot): add streaming response with typing indicator
fix(quote-form): correct phone number validation regex
style(navbar): fix mobile menu z-index overlap
perf(hero): replace setInterval counter with requestAnimationFrame
a11y(contact-form): add aria-live to error messages
refactor(dashboard): extract ShipmentCard to shared component
```

---

## 20. DEFINITION OF DONE

A feature is **done** when:

- [ ] Works on mobile (375px), tablet (768px), desktop (1440px)
- [ ] Works in light mode AND dark mode
- [ ] All interactive states implemented (hover, focus, loading, disabled, error)
- [ ] TypeScript compiles with zero errors
- [ ] Forms validate and show inline errors
- [ ] Loading skeletons shown during data fetch
- [ ] Error state shown on fetch failure with retry option
- [ ] `prefers-reduced-motion` respected for all animations
- [ ] All images use `next/image` with proper `alt`
- [ ] Page has `generateMetadata()` export
- [ ] Checked against Section 2 Golden Rules — all pass

---

*Last updated: June 2026 | Ship Smart Solutions Engineering*