import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/validations/contact.schema"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid form data"
      return NextResponse.json({ message: firstError }, { status: 400 })
    }

    const { name, email, phone, serviceType, message, smsConsent } = parsed.data

    console.info("[Contact] New inquiry:", {
      name,
      email,
      phone,
      serviceType,
      messageLength: message.length,
      smsConsent,
    })

    return NextResponse.json({
      success: true,
      message: "Inquiry received. We'll be in touch within 24 hours.",
    })
  } catch (error) {
    console.error("[Contact] Error processing inquiry:", error)
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
