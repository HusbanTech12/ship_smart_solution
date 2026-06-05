import type { Metadata } from "next"
import { DM_Sans, Syne, Geist_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"
import { IntroOverlay } from "@/components/intro-overlay"
import "./globals.css"

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shipsmartsolution.com"),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${dmSans.variable} ${syne.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <IntroOverlay />
            {children}
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
