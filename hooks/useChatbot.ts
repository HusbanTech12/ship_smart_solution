"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import type { ChatMessage } from "@/types/chat"

const STORAGE_KEY = "ship-smart-chat-history"
const SUGGESTED_PROMPTS = [
  "Get a freight quote",
  "Track my shipment",
  "Talk to a human agent",
] as const

function loadHistory(): ChatMessage[] {
  if (typeof window === "undefined") return []
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveHistory(messages: ChatMessage[]) {
  if (typeof window === "undefined") return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  } catch {
    /* noop */
  }
}

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesRef = useRef(messages)

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    }

    let updatedMessages: ChatMessage[]

    setMessages((prev) => {
      updatedMessages = [...prev, userMessage]
      saveHistory(updatedMessages)
      return updatedMessages
    })

    setIsLoading(true)
    setError(null)

    try {
      const currentMessages = messagesRef.current
      const apiMessages = [...currentMessages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error("No response stream")

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => {
        const updated = [...prev, assistantMessage]
        saveHistory(updated)
        return updated
      })

      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: streamDone } = await reader.read()
        done = streamDone
        if (value) {
          const text = decoder.decode(value, { stream: !done })
          setMessages((prev) => {
            const updated = [...prev]
            const last = updated[updated.length - 1]
            if (last?.role === "assistant") {
              updated[updated.length - 1] = {
                ...last,
                content: last.content + text,
              }
            }
            saveHistory(updated)
            return updated
          })
        }
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong"
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const clearHistory = useCallback(() => {
    setMessages([])
    setError(null)
    sessionStorage.removeItem(STORAGE_KEY)
  }, [])

  return {
    messages,
    isOpen,
    isLoading,
    error,
    suggestedPrompts: SUGGESTED_PROMPTS,
    sendMessage,
    toggleChat,
    clearHistory,
  }
}
