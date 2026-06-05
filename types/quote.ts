export interface QuoteRequest {
  serviceType: "reefer" | "dry-van" | "flatbed"
  weight: number
  dimensions: string
  commodity: string
  origin: string
  destination: string
  pickupDate: string
  deliveryWindow: string
  contactName: string
  contactEmail: string
  contactPhone: string
  specialInstructions: string
}

export interface QuoteResponse {
  id: string
  referenceNumber: string
  status: "pending" | "approved" | "expired"
  estimatedCost: number | null
  requestedAt: string
  expiresAt: string
}
