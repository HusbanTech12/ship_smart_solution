export interface User {
  id: string
  firstName: string | null
  lastName: string | null
  email: string
  phone: string | null
  imageUrl: string | null
  role: "client" | "admin"
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  notifications: boolean
  smsUpdates: boolean
  emailUpdates: boolean
}
