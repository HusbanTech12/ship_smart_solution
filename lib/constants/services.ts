export const SERVICES = [
  {
    id: "reefer",
    title: "Dedicated 53' Reefers",
    description:
      "Temperature-controlled shipping with team drivers for coast-to-coast delivery. Ideal for perishable goods, pharmaceuticals, and sensitive cargo.",
    features: ["Team drivers", "Real-time temp monitoring", "GPS tracking", "Cross-country"],
  },
  {
    id: "dry-van",
    title: "Dedicated 53' Dry Vans",
    description:
      "Reliable dry van shipping with team drivers. Perfect for general freight, palletized goods, and non-perishable commodities.",
    features: ["Team drivers", "Max cube capacity", "Load securement", "Nationwide coverage"],
  },
  {
    id: "flatbed",
    title: "Flatbed / Step Deck / RGN",
    description:
      "Specialized open deck shipping for oversized, heavy-haul, and dimensional freight. Custom rigging and permitting available.",
    features: ["Oversized loads", "Heavy haul", "Permitting", "Custom rigging"],
  },
] as const

export type ServiceType = (typeof SERVICES)[number]["id"]
