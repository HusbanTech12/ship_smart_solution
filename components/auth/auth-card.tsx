"use client"

import { SignIn, SignUp } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { useHydrated } from "@/hooks/useHydrated"

type AuthMode = "sign-in" | "sign-up"

interface AuthCardProps {
  mode: AuthMode
}

const sharedAppearance = {
  elements: {
    rootBox: "w-full",
    cardBox: "w-full",
    headerTitle: "text-2xl font-heading font-bold text-brand-primary",
    headerSubtitle: "text-sm text-brand-muted",
    socialButtonsBlockButtonText: "font-medium",
    dividerLine: "bg-border",
    dividerText: "text-xs uppercase tracking-wider text-brand-muted",
    formFieldLabel: "text-sm font-medium text-foreground",
    formFieldInput:
      "rounded-lg transition-colors duration-200",
    formButtonPrimary:
      "font-medium shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200",
    formFieldAction: "text-brand-secondary hover:text-brand-secondary/80",
    footerActionLink:
      "text-brand-secondary hover:text-brand-secondary/80 font-medium",
    identityPreviewEditButton:
      "text-brand-secondary hover:text-brand-secondary/80",
    formResendCodeLink:
      "text-brand-secondary hover:text-brand-secondary/80",
    formFieldSuccessText: "text-status-success",
    formFieldErrorText: "text-status-error",
    formFieldHintText: "text-xs text-brand-muted",
    footer: "bg-transparent",
    footerPagesLink: "text-brand-muted hover:text-brand-primary",
    logoBox: "hidden",
    clerkBadge: "hidden",
    internallyClerkDevBadge: "hidden",
  } as const,
  layout: {
    socialButtonsPlacement: "top" as const,
    showOptionalFields: true,
  },
}

const lightVariables = {
  colorPrimary: "#E8732A",
  colorDanger: "#DC2626",
  colorSuccess: "#16A34A",
  colorWarning: "#D97706",
  colorText: "#1c1917",
  colorTextSecondary: "#78716c",
  colorBackground: "#ffffff",
  colorInputBackground: "#ffffff",
  colorInputText: "#1c1917",
  borderRadius: "0.5rem",
  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
  fontSize: "0.875rem",
}

const darkVariables = {
  colorPrimary: "#E8732A",
  colorDanger: "#DC2626",
  colorSuccess: "#16A34A",
  colorWarning: "#D97706",
  colorText: "#fff7ed",
  colorTextSecondary: "#a8a29e",
  colorBackground: "#292524",
  colorInputBackground: "#1c1917",
  colorInputText: "#fff7ed",
  borderRadius: "0.5rem",
  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
  fontSize: "0.875rem",
}

const lightElements = {
  card: "shadow-2xl border border-border/70 rounded-2xl bg-white",
  socialButtonsBlockButton:
    "border border-gray-200 hover:border-brand-primary/40 hover:bg-brand-primary/5 text-foreground transition-all duration-200",
  formFieldInput:
    "border-gray-300 hover:border-brand-primary/50 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white text-foreground",
  alert:
    "border border-status-error/30 bg-status-error/5 text-status-error",
  alertText: "text-status-error",
  otpCodeFieldInput:
    "border-gray-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white text-foreground",
}

const darkElements = {
  card: "shadow-2xl border border-border rounded-2xl bg-card",
  socialButtonsBlockButton:
    "border border-gray-700 hover:border-brand-primary/50 hover:bg-brand-primary/10 text-foreground transition-all duration-200",
  formFieldInput:
    "border-gray-600 hover:border-brand-primary/50 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-[#1c1917] text-foreground placeholder:text-gray-500",
  alert:
    "border border-status-error/40 bg-status-error/10 text-status-error",
  alertText: "text-status-error",
  otpCodeFieldInput:
    "border-gray-600 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-[#1c1917] text-foreground",
}

export function AuthCard({ mode }: AuthCardProps) {
  const { resolvedTheme } = useTheme()
  const mounted = useHydrated()

  const isDark = mounted && resolvedTheme === "dark"
  const variables = isDark ? darkVariables : lightVariables
  const elements = {
    ...sharedAppearance.elements,
    ...(isDark ? darkElements : lightElements),
  }

  const commonProps = {
    appearance: {
      elements,
      layout: sharedAppearance.layout,
      variables,
    },
    routing: "path" as const,
    fallbackRedirectUrl: "/dashboard" as const,
    forceRedirectUrl: "/dashboard" as const,
  }

  if (mode === "sign-in") {
    return (
      <div className="w-full max-w-md">
        <SignIn
          {...commonProps}
          path="/sign-in"
          signUpUrl="/sign-up"
        />
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <SignUp
        {...commonProps}
        path="/sign-up"
        signInUrl="/sign-in"
      />
    </div>
  )
}
