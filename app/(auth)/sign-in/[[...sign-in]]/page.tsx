import type { Metadata } from "next"
import { AuthCard } from "@/components/auth/auth-card"

export const metadata: Metadata = {
  title: "Sign In — Ship Smart Solutions",
  description:
    "Sign in to your Ship Smart Solutions client portal to manage quotes, track shipments, and access documents.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function SignInPage() {
  return <AuthCard mode="sign-in" />
}
