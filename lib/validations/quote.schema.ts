import { z } from "zod"

export const quoteStep1Schema = z.object({
  serviceType: z.enum(["reefer", "dry-van", "flatbed"], {
    message: "Please select a service type",
  }),
  weight: z.coerce.number().positive("Weight must be greater than 0"),
  dimensions: z.string().min(1, "Please enter dimensions"),
  commodity: z.string().min(2, "Please describe the commodity"),
})

export const quoteStep2Schema = z.object({
  origin: z.string().min(3, "Please enter origin city/state"),
  destination: z.string().min(3, "Please enter destination city/state"),
  pickupDate: z.string().min(1, "Please select a pickup date"),
  deliveryWindow: z.string().min(1, "Please select a delivery window"),
})

export const quoteStep3Schema = z.object({
  contactName: z.string().min(2, "Name must be at least 2 characters"),
  contactEmail: z.string().email("Please enter a valid email"),
  contactPhone: z.string().min(10, "Please enter a valid phone number"),
  specialInstructions: z.string().optional(),
})

export type QuoteStep1Data = z.infer<typeof quoteStep1Schema>
export type QuoteStep2Data = z.infer<typeof quoteStep2Schema>
export type QuoteStep3Data = z.infer<typeof quoteStep3Schema>
