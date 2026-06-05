import { cn } from "@/lib/utils"

interface TypingIndicatorProps {
  className?: string
}

export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div
      className={cn("flex items-center gap-1 px-4 py-3", className)}
      aria-label="Assistant is typing"
      role="status"
    >
      <span className="sr-only">Typing</span>
      <span className="h-2 w-2 rounded-full bg-brand-muted/60 animate-bounce [animation-delay:0ms]" />
      <span className="h-2 w-2 rounded-full bg-brand-muted/60 animate-bounce [animation-delay:150ms]" />
      <span className="h-2 w-2 rounded-full bg-brand-muted/60 animate-bounce [animation-delay:300ms]" />
    </div>
  )
}
