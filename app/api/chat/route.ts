import { streamChat } from "@/lib/llm/client"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const stream = await streamChat(messages)

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream" },
    })
  } catch (error) {
    console.error("[Chat API] Error:", error)
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
