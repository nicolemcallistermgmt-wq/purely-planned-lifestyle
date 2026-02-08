import { z } from "zod";

export const ALLOWED_SERVICES = [
  "Lifestyle Consulting",
  "Home Organizing",
  "Concierge Services",
  "Move Management",
  "Move Management",
  "Downsizing",
] as const;

export const intakeSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z
    .string()
    .max(30)
    .regex(/^[\d\s()\-+.]*$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
  preferredContact: z.enum(["email", "phone", "text"]).default("email"),
  address: z.string().max(200).optional().or(z.literal("")),
  city: z.string().max(100).optional().or(z.literal("")),
  state: z.string().max(50).optional().or(z.literal("")),
  zip: z
    .string()
    .max(15)
    .regex(/^[\dA-Za-z\s\-]*$/, "Invalid ZIP code")
    .optional()
    .or(z.literal("")),
  services: z
    .array(z.enum(ALLOWED_SERVICES))
    .min(1, "Select at least one service"),
  timeline: z.string().max(50).optional().or(z.literal("")),
  budget: z.string().max(50).optional().or(z.literal("")),
  referralSource: z.string().max(200).optional().or(z.literal("")),
  additionalInfo: z.string().max(2000).optional().or(z.literal("")),
});

export type IntakeFormData = z.infer<typeof intakeSchema>;
