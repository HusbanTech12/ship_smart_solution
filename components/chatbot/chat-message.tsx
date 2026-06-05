"use client"

import { cn } from "@/lib/utils"
import type { ChatMessage as ChatMessageType } from "@/types/chat"
import { Bot, User } from "lucide-react"

interface ChatMessageProps {
  message: ChatMessageType
  isStreaming?: boolean
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex gap-3 w-full",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white mt-1">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-brand-secondary text-white rounded-br-md"
            : "bg-card text-foreground border border-border rounded-bl-md",
        )}
      >
        <p className="whitespace-pre-wrap break-words">
          {message.content}
          {isStreaming && <span className="inline-block w-1.5 h-4 bg-brand-secondary ml-0.5 animate-pulse" />}
        </p>
      </div>
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-white mt-1">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}
