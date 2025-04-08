import { TextInput } from "@/registry/ui/text-input"

export default function TextInputBasicDemo() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <TextInput
        label="Username"
        name="username"
        placeholder="Enter your username"
        required
      />
      <TextInput
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        required
      />
      <TextInput
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        required
      />
    </div>
  )
} 