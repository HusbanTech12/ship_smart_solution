import type { Metadata } from "next"
import { AuthCard } from "@/components/auth/auth-card"

export const metadata: Metadata = {
  title: "Sign Up — Ship Smart Solutions",
  description:
    "Create your Ship Smart Solutions client portal account to request freight quotes, track shipments, and manage documents.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function SignUpPage() {
  return <AuthCard mode="sign-up" />
}
