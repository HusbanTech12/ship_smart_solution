"use client"

import { type FormEvent, useRef, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Send, CornerDownLeft } from "lucide-react"

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
  disabled?: boolean
  className?: string
}

export function ChatInput({
  onSend,
  isLoading,
  disabled,
  className,
}: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isLoading])

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      const form = formRef.current
      if (!form) return

      const formData = new FormData(form)
      const text = (formData.get("message") as string)?.trim()

      if (!text || isLoading) return

      onSend(text)
      form.reset()
      if (inputRef.current) {
        inputRef.current.style.height = "auto"
      }
    },
    [onSend, isLoading],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        formRef.current?.requestSubmit()
      }
    },
    [],
  )

  const handleInput = useCallback(() => {
    const textarea = inputRef.current
    if (!textarea) return
    textarea.style.height = "auto"
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
  }, [])

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn(
        "flex items-end gap-2 border-t border-border bg-card p-3",
        className,
      )}
    >
      <div className="relative flex-1">
        <textarea
          ref={inputRef}
          name="message"
          rows={1}
          placeholder="Type your message..."
          disabled={disabled || isLoading}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          className={cn(
            "w-full resize-none rounded-xl border border-border bg-brand-surface py-2.5 pl-4 pr-12 text-sm",
            "text-foreground placeholder:text-brand-muted",
            "transition-colors duration-200 ease-out",
            "hover:border-brand-primary/50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 focus-visible:border-brand-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          aria-label="Chat message"
        />
        <button
          type="submit"
          disabled={disabled || isLoading}
          className={cn(
            "absolute right-2 bottom-1.5 flex h-8 w-8 items-center justify-center rounded-lg",
            "bg-brand-primary text-white transition-all duration-200 ease-out",
            "hover:brightness-110 hover:scale-105",
            "active:scale-95",
            "disabled:pointer-events-none disabled:opacity-40",
          )}
          aria-label="Send message"
        >
          {isLoading ? (
            <span className="sr-only">Loading</span>
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>
      <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border bg-brand-surface px-1.5 py-0.5 text-[10px] text-brand-muted mb-1.5">
        <CornerDownLeft className="h-3 w-3" />
      </kbd>
    </form>
  )
}
