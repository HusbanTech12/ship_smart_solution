export const PUBLIC_NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
] as const

export const DASHBOARD_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Get a Quote", href: "/dashboard/quote", icon: "FileText" },
  { label: "Shipments", href: "/dashboard/shipments", icon: "Truck" },
  { label: "History", href: "/dashboard/history", icon: "Clock" },
  { label: "Documents", href: "/dashboard/documents", icon: "FolderOpen" },
  { label: "Support", href: "/dashboard/support", icon: "MessageSquare" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
] as const
