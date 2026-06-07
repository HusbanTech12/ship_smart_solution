"use client"

import { useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useChatbot } from "@/hooks/useChatbot"
import { ChatMessage } from "@/components/chatbot/chat-message"
import { ChatInput } from "@/components/chatbot/chat-input"
import { TypingIndicator } from "@/components/chatbot/typing-indicator"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Trash2, Sparkles } from "lucide-react"

const panelVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: "easeIn" as const,
    },
  },
}

const staggerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.2 },
  }),
}

export function ChatWidget() {
  const {
    messages,
    isOpen,
    isLoading,
    error,
    suggestedPrompts,
    sendMessage,
    toggleChat,
    clearHistory,
  } = useChatbot()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        toggleChat()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, toggleChat])

  const showSuggested = messages.length === 0 && !isLoading

  const handleRetry = useCallback(() => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user")
    if (lastUserMessage) {
      sendMessage(lastUserMessage.content)
    }
  }, [messages, sendMessage])

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-brand-secondary text-white shadow-lg transition-all duration-200 ease-out hover:brightness-110 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {!isOpen && messages.length > 0 && (
        <span className="fixed bottom-[4.5rem] right-[1.125rem] sm:bottom-[6.5rem] sm:right-[1.625rem] z-50 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-secondary opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-secondary" />
        </span>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
          aria-hidden="true"
          onClick={toggleChat}
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed z-50 flex flex-col overflow-hidden border border-border bg-card shadow-2xl
                       inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-24 sm:right-6
                       rounded-t-2xl sm:rounded-2xl
                       w-full sm:w-[380px]"
            style={{ height: "calc(100dvh - 80px)", maxHeight: "100dvh", minHeight: "300px" }}
          >
            <div className="flex items-center justify-between border-b border-border bg-brand-primary px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand-accent" />
                <span className="text-sm font-semibold">Ship Smart Assistant</span>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Clear chat history"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={toggleChat}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {showSuggested && (
                <div className="space-y-3">
                  <p className="text-center text-xs text-brand-muted">
                    Hi! How can I help you today?
                  </p>
                  <div className="flex flex-col gap-2">
                    {suggestedPrompts.map((prompt, i) => (
                      <motion.button
                        key={prompt}
                        custom={i}
                        variants={staggerVariants}
                        initial="hidden"
                        animate="visible"
                        onClick={() => sendMessage(prompt)}
                        className="rounded-xl border border-border bg-brand-surface px-4 py-2.5 text-left text-sm text-foreground transition-all duration-200 ease-out hover:border-brand-secondary/50 hover:bg-brand-secondary/5 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {prompt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md border border-border bg-card">
                    <TypingIndicator />
                  </div>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center gap-2 rounded-xl border border-status-error/30 bg-status-error/5 px-4 py-3">
                  <p className="text-sm text-status-error">
                    Something went wrong. Try again.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRetry}
                    className="min-w-0"
                  >
                    Retry
                  </Button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <ChatInput onSend={sendMessage} isLoading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
