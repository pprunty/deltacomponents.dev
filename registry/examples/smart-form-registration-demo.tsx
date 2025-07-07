"use client"

import { z } from "zod"

import { FieldDefinition, SmartForm } from "@/registry/blocks/smart-form"

const registrationSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    country: z.string().min(1, "Please select your country"),
    skills: z.array(z.string()).min(1, "Please add at least one skill"),
    marketingEmails: z.boolean().optional(),
    agreeToTerms: z
      .boolean()
      .refine((val) => val === true, "You must agree to the terms"),
    newsletter: z.boolean().optional(),
    bio: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

const fields: FieldDefinition[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    placeholder: "Enter your first name",
    group: "name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
    placeholder: "Enter your last name",
    group: "name",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "Enter your email address",
    description: "We'll never share your email with anyone else.",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    placeholder: "Create a secure password",
    hint: "Must be at least 8 characters long",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    required: true,
    placeholder: "Confirm your password",
  },
  {
    name: "country",
    label: "Country",
    type: "select",
    required: true,
    placeholder: "Select your country",
    options: [
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
      { value: "uk", label: "United Kingdom" },
      { value: "au", label: "Australia" },
      { value: "de", label: "Germany" },
      { value: "fr", label: "France" },
      { value: "jp", label: "Japan" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "skills",
    label: "Skills",
    type: "tags",
    required: true,
    hint: "Press Enter or comma to add a skill",
    description:
      "Add technologies, programming languages, or other relevant skills",
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Tell us a bit about yourself (optional)",
    rows: 3,
    hint: "This information will be displayed on your profile",
  },
  {
    name: "marketingEmails",
    label: "Receive marketing emails and product updates",
    type: "switch",
    variant: "pill",
    description:
      "Get notified about new features, promotions, and company updates",
  },
  {
    name: "agreeToTerms",
    label: "I agree to the Terms of Service and Privacy Policy",
    type: "checkbox",
    required: true,
  },
  {
    name: "newsletter",
    label: "Subscribe to our newsletter for updates and tips",
    type: "checkbox",
  },
]

export default function SmartFormRegistrationDemo() {
  const handleSubmit = async (data: z.infer<typeof registrationSchema>) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert(`Form submitted with data:\\n${JSON.stringify(data, null, 2)}`)

    // In a real app, you would send this data to your backend
    console.log("Registration data:", data)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <SmartForm
        fields={fields}
        schema={registrationSchema}
        onSubmit={handleSubmit}
        submitText="Create Account"
        layout="vertical"
        successMessage="Account created successfully! Welcome to our platform."
        errorMessage="Please fix the errors below and try again."
        resetOnSuccess={true}
      />
    </div>
  )
}
