"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/delta-ui/delta/input-otp"
import { Button } from "@/registry/delta-ui/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/delta-ui/ui/card"
import { Checkbox } from "@/registry/delta-ui/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/delta-ui/ui/form"

const FormSchema = z.object({
  pin: z
    .string()
    .min(6, {
      message: "Your one-time password must be 6 characters.",
    })
    .regex(/^\d+$/, {
      message: "Your one-time password must contain numbers only.",
    }),
})

export default function InputOTPForm() {
  const [autoSubmit, setAutoSubmit] = React.useState(true)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  // Watch the pin value for auto-submit
  const pinValue = form.watch("pin")

  React.useEffect(() => {
    if (autoSubmit && pinValue.length === 6) {
      form.handleSubmit(onSubmit)()
    }
  }, [pinValue, autoSubmit])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
    form.reset()
  }

  return (
    <div className="w-full space-y-4 sm:max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Please enter the 6-digit code sent to your device.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="otp-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="otp-form" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="auto-submit"
          checked={autoSubmit}
          onCheckedChange={(checked) => setAutoSubmit(checked as boolean)}
        />
        <label
          htmlFor="auto-submit"
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Auto-submit when complete
        </label>
      </div>
    </div>
  )
}
