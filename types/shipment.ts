export type ShipmentStatus =
  | "booked"
  | "picked-up"
  | "in-transit"
  | "out-for-delivery"
  | "delivered"

export interface ShipmentMilestone {
  status: ShipmentStatus
  timestamp: string
  location: string
  description: string
}

export interface Shipment {
  id: string
  trackingNumber: string
  referenceNumber: string
  origin: string
  destination: string
  status: ShipmentStatus
  serviceType: "reefer" | "dry-van" | "flatbed"
  pickupDate: string
  estimatedDelivery: string
  actualDelivery: string | null
  weight: number
  dimensions: string
  commodity: string
  milestones: ShipmentMilestone[]
  createdAt: string
  updatedAt: string
}
