"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { contactSchema, type ContactFormData } from "@/lib/validations/contact.schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { FormField } from "@/components/forms/form-field"
import { SERVICES } from "@/lib/constants/services"

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.message || "Failed to send message")
      }

      toast.success("Message sent! We'll be in touch within 24 hours.")
      reset()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong"
      toast.error(message || "Something went wrong. Please try again or call us directly.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <FormField label="Full Name" error={errors.name?.message} required>
        <Input
          id="contact-name"
          placeholder="John Smith"
          error={errors.name?.message}
          {...register("name")}
        />
      </FormField>

      <FormField label="Email Address" error={errors.email?.message} required>
        <Input
          id="contact-email"
          type="email"
          placeholder="john@company.com"
          error={errors.email?.message}
          {...register("email")}
        />
      </FormField>

      <FormField label="Phone Number" hint="Optional">
        <Input
          id="contact-phone"
          type="tel"
          placeholder="(123) 456-7890"
          {...register("phone")}
        />
      </FormField>

      <FormField label="Service Type" error={errors.serviceType?.message} required>
        <Select
          id="contact-service"
          error={errors.serviceType?.message}
          {...register("serviceType")}
          defaultValue=""
        >
          <option value="" disabled>
            Select a service...
          </option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="Message" error={errors.message?.message} required>
        <Textarea
          id="contact-message"
          placeholder="Tell us about your shipping needs..."
          rows={4}
          error={errors.message?.message}
          {...register("message")}
        />
      </FormField>

      <Checkbox
        id="contact-sms"
        label="I agree to receive SMS updates about my inquiry"
        error={errors.smsConsent?.message}
        {...register("smsConsent")}
      />

      <Button type="submit" loading={isSubmitting} className="w-full">
        Send Message
      </Button>
    </form>
  )
}
