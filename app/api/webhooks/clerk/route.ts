import { NextResponse } from "next/server"
import { verifyWebhook } from "@clerk/nextjs/webhooks"
import type { WebhookEvent } from "@clerk/nextjs/webhooks"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type SyncResult = {
  eventType: WebhookEvent["type"]
  userId: string
  status: "synced" | "skipped"
  timestamp: string
}

async function syncUser(event: WebhookEvent): Promise<SyncResult> {
  const timestamp = new Date().toISOString()

  if (event.type === "user.created" || event.type === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url, phone_numbers } =
      event.data

    const primaryEmail = email_addresses.find(
      (e) => e.id === event.data.primary_email_address_id,
    )?.email_address

    const primaryPhone = phone_numbers.find(
      (p) => p.id === event.data.primary_phone_number_id,
    )?.phone_number

    console.info("[Clerk Webhook] User sync payload", {
      eventType: event.type,
      userId: id,
      email: primaryEmail ?? null,
      firstName: first_name ?? null,
      lastName: last_name ?? null,
      phone: primaryPhone ?? null,
      imageUrl: image_url ?? null,
      timestamp,
    })

    return {
      eventType: event.type,
      userId: id,
      status: "synced",
      timestamp,
    }
  }

  if (event.type === "user.deleted") {
    const userId = event.data.id

    if (!userId) {
      console.warn("[Clerk Webhook] user.deleted missing user id", { timestamp })
      return {
        eventType: event.type,
        userId: "unknown",
        status: "skipped",
        timestamp,
      }
    }

    console.info("[Clerk Webhook] User deleted", {
      eventType: event.type,
      userId,
      timestamp,
    })

    return {
      eventType: event.type,
      userId,
      status: "synced",
      timestamp,
    }
  }

  console.info("[Clerk Webhook] Unhandled event type", {
    eventType: event.type,
    timestamp,
  })

  return {
    eventType: event.type,
    userId: "n/a",
    status: "skipped",
    timestamp,
  }
}

export async function POST(req: Request) {
  try {
    const evt = await verifyWebhook(req as Parameters<typeof verifyWebhook>[0])

    const result = await syncUser(evt)

    return NextResponse.json({
      success: true,
      ...result,
    })
  } catch (error) {
    console.error("[Clerk Webhook] Verification or processing failed:", error)

    if (error instanceof Error) {
      const isSignatureError =
        error.message.toLowerCase().includes("signature") ||
        error.message.toLowerCase().includes("svix") ||
        error.message.toLowerCase().includes("verify")

      return NextResponse.json(
        {
          success: false,
          message: isSignatureError
            ? "Invalid webhook signature"
            : "Webhook processing failed",
        },
        { status: isSignatureError ? 401 : 400 },
      )
    }

    return NextResponse.json(
      { success: false, message: "Webhook processing failed" },
      { status: 400 },
    )
  }
}
