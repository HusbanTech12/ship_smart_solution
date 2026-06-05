import type { Metadata } from "next"
import { SignIn } from "@clerk/nextjs"

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
  return (
    <div className="w-full max-w-md">
      <SignIn
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "shadow-2xl border border-gray-200/70 rounded-2xl bg-white",
            cardBox: "w-full",
            headerTitle: "text-2xl font-heading font-bold text-brand-primary",
            headerSubtitle: "text-sm text-brand-muted",
            socialButtonsBlockButton:
              "border border-gray-200 hover:border-brand-primary/40 hover:bg-brand-primary/5 text-foreground transition-all duration-200",
            socialButtonsBlockButtonText: "font-medium text-foreground",
            dividerLine: "bg-gray-200",
            dividerText: "text-xs uppercase tracking-wider text-brand-muted",
            formFieldLabel: "text-sm font-medium text-foreground",
            formFieldInput:
              "border-gray-300 hover:border-brand-primary/50 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 rounded-lg transition-colors duration-200",
            formButtonPrimary:
              "bg-brand-secondary hover:bg-brand-secondary/90 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200",
            formFieldAction: "text-brand-secondary hover:text-brand-secondary/80",
            footerActionLink:
              "text-brand-secondary hover:text-brand-secondary/80 font-medium",
            identityPreviewEditButton:
              "text-brand-secondary hover:text-brand-secondary/80",
            alert:
              "border border-status-error/30 bg-status-error/5 text-status-error",
            alertText: "text-status-error",
            formResendCodeLink:
              "text-brand-secondary hover:text-brand-secondary/80",
            otpCodeFieldInput:
              "border-gray-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 rounded-lg",
            formFieldSuccessText: "text-status-success",
            formFieldErrorText: "text-status-error",
            formFieldHintText: "text-xs text-brand-muted",
            footer: "bg-transparent",
            footerPagesLink: "text-brand-muted hover:text-brand-primary",
            logoBox: "hidden",
            clerkBadge: "hidden",
          },
          layout: {
            socialButtonsPlacement: "top",
            showOptionalFields: true,
          },
          variables: {
            colorPrimary: "#E8732A",
            colorDanger: "#DC2626",
            colorSuccess: "#16A34A",
            colorWarning: "#D97706",
            colorText: "#0A0F1E",
            colorTextSecondary: "#6B7280",
            colorBackground: "#FFFFFF",
            colorInputBackground: "#FFFFFF",
            colorInputText: "#0A0F1E",
            borderRadius: "0.5rem",
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: "0.875rem",
          },
        }}
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/dashboard"
        forceRedirectUrl="/dashboard"
      />
    </div>
  )
}
