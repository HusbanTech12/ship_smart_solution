import { GoogleGenerativeAI } from "@google/generative-ai"

const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.0-flash"

function getClient() {
  const key = process.env.GEMINI_API_KEY
  if (!key) {
    throw new Error("GEMINI_API_KEY environment variable is not set")
  }
  return new GoogleGenerativeAI(key)
}

function buildSystemInstruction(): string {
  return [
    "You are the Ship Smart Solutions virtual assistant.",
    "You help clients with:",
    "- Getting freight quotes for reefer, dry van, and flatbed loads",
    "- Tracking shipment status",
    "- Understanding services and capabilities",
    "- Connecting with the operations team",
    "",
    "Company info:",
    "- Phone: (331) 215-4701",
    "- Email: operations@ship-solutions.net",
    "- Address: 650 E Diehl Rd, Naperville IL, 60563",
    "- Coverage: All 48 contiguous US states",
    "- Services: 53' Reefers (team drivers), 53' Dry Vans (team drivers), Flatbed/Step Deck/RGN",
    "- Stats: 99%+ on-time delivery, 500+ truckloads/month, 3,600+ assets",
    "",
    "Keep answers concise, professional, and logistics-focused.",
    "If asked about something outside logistics/shipping, politely redirect.",
    "Always offer to connect them with a human agent for complex requests.",
  ].join("\n")
}

function toGeminiContents(
  messages: { role: string; content: string }[],
): { role: "user" | "model"; parts: { text: string }[] }[] {
  const contents: { role: "user" | "model"; parts: { text: string }[] }[] = []

  for (const msg of messages) {
    if (msg.role === "system") continue
    contents.push({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    })
  }

  return contents
}

export async function streamChat(
  messages: { role: string; content: string }[],
): Promise<ReadableStream<Uint8Array>> {
  const genAI = getClient()
  const model = genAI.getGenerativeModel({
    model: MODEL,
    systemInstruction: buildSystemInstruction(),
  })

  const contents = toGeminiContents(messages)

  const result = await model.generateContentStream({ contents })

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        for await (const chunk of result.stream) {
          const text = chunk.text()
          if (text) {
            controller.enqueue(new TextEncoder().encode(text))
          }
        }
        controller.close()
      } catch (error) {
        console.error("[Gemini] Stream error:", error)
        controller.error(error)
      }
    },
  })
}
