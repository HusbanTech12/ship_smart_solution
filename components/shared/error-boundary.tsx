"use client"

import { Component } from "react"
import { Button } from "@/components/ui/button"
import { COMPANY } from "@/lib/constants/company"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ErrorBoundary] Caught error:", error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-status-error/10">
            <svg
              className="h-7 w-7 text-status-error"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Something went wrong
          </h2>
          <p className="mt-2 max-w-md text-sm text-brand-muted">
            Our team has been notified. Please try again or contact us at{" "}
            <a
              href={COMPANY.phoneHref}
              className="font-medium text-brand-primary dark:text-brand-secondary hover:underline"
            >
              {COMPANY.phone}
            </a>
            .
          </p>
          <div className="mt-6 flex gap-3">
            <Button variant="primary" onClick={this.handleReset}>
              Try Again
            </Button>
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center h-10 px-5 text-sm font-medium rounded-lg border border-brand-primary/30 text-brand-primary dark:text-foreground hover:bg-brand-primary/5 transition-all duration-200"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
