import { NextResponse } from "next/server"
import { Resend } from "resend"
import { contactSchema } from "@/lib/validations/contact.schema"
import { COMPANY } from "@/lib/constants/company"

const resend = new Resend(process.env.RESEND_API_KEY)

const SERVICE_LABELS: Record<string, string> = {
  reefer: "Dedicated 53' Reefer",
  "dry-van": "Dedicated 53' Dry Van",
  flatbed: "Specialized Open Deck",
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid form data"
      return NextResponse.json({ message: firstError }, { status: 400 })
    }

    const { name, email, phone, serviceType, message, smsConsent } = parsed.data

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: system-ui, sans-serif; color: #1c1917; margin: 0; padding: 0; background: #f5f5f4; }
            .container { max-width: 560px; margin: 0 auto; padding: 32px 24px; }
            .card { background: #fff; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
            .header { text-align: center; margin-bottom: 24px; }
            .header h1 { font-size: 20px; margin: 0; color: #292524; }
            .header p { font-size: 14px; color: #78716c; margin: 4px 0 0; }
            .divider { height: 1px; background: #e7e5e4; margin: 20px 0; }
            .field { margin-bottom: 16px; }
            .field-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #78716c; margin-bottom: 4px; }
            .field-value { font-size: 15px; color: #292524; }
            .badge { display: inline-block; background: #fff7ed; color: #f97316; font-size: 13px; font-weight: 600; padding: 4px 12px; border-radius: 20px; }
            .consent { display: inline-block; font-size: 13px; color: #16a34a; font-weight: 600; }
            .footer { text-align: center; margin-top: 24px; font-size: 12px; color: #a8a29e; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="card">
              <div class="header">
                <div style="font-size: 32px; margin-bottom: 4px;">📬</div>
                <h1>New Contact Inquiry</h1>
                <p>${COMPANY.name} — Website Contact Form</p>
              </div>
              <div class="divider"></div>
              <div class="field">
                <div class="field-label">Name</div>
                <div class="field-value">${name}</div>
              </div>
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value"><a href="mailto:${email}" style="color: #f97316; text-decoration: none;">${email}</a></div>
              </div>
              ${phone ? `
              <div class="field">
                <div class="field-label">Phone</div>
                <div class="field-value"><a href="tel:${phone}" style="color: #f97316; text-decoration: none;">${phone}</a></div>
              </div>
              ` : ""}
              <div class="field">
                <div class="field-label">Service Type</div>
                <div class="field-value"><span class="badge">${SERVICE_LABELS[serviceType] ?? serviceType}</span></div>
              </div>
              <div class="field">
                <div class="field-label">Message</div>
                <div class="field-value" style="white-space: pre-wrap; line-height: 1.6;">${message}</div>
              </div>
              <div class="divider"></div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 13px; color: #78716c;">SMS Consent</span>
                <span class="consent">${smsConsent ? "✓ Granted" : "— Not provided"}</span>
              </div>
            </div>
            <div class="footer">
              <p>Sent via ${COMPANY.name} contact form</p>
            </div>
          </div>
        </body>
      </html>
    `

    const { error } = await resend.emails.send({
      from: "Ship Smart Solutions <onboarding@resend.dev>",
      to: [COMPANY.email],
      replyTo: email,
      subject: `New Contact Inquiry — ${name}`,
      html,
    })

    if (error) {
      console.error("[Contact] Resend error:", error)
      return NextResponse.json(
        { message: "Failed to send message. Please try again." },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Message sent! We'll be in touch within 24 hours.",
    })
  } catch (error) {
    console.error("[Contact] Error processing inquiry:", error)
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
