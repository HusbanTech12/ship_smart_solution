import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  serviceType: z.enum(["reefer", "dry-van", "flatbed"], {
    message: "Please select a service type",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
  smsConsent: z.boolean().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
