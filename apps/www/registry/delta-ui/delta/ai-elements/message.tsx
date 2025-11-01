import type { ComponentProps, HTMLAttributes } from "react"
import type { UIMessage } from "ai"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/delta-ui/ui/avatar"

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"]
}

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full items-end justify-end gap-2 py-4",
      from === "user" ? "is-user" : "is-assistant flex-row-reverse justify-end",
      className
    )}
    {...props}
  />
)

const messageContentVariants = cva(
  "is-user:dark rounded-lg text-sm [&_pre]:overflow-x-auto [&_table]:overflow-x-auto [&_table]:block [&_table]:w-full",
  {
    variants: {
      variant: {
        contained: [
          "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:inline-block group-[.is-user]:min-w-fit group-[.is-user]:ml-12",
          "group-[.is-assistant]:text-foreground group-[.is-assistant]:px-2 group-[.is-assistant]:py-3 group-[.is-assistant]:overflow-hidden group-[.is-assistant]:space-y-2 group-[.is-assistant]:max-w-full group-[.is-assistant]:min-w-0 group-[.is-assistant]:[&_pre]:min-w-0 group-[.is-assistant]:[&_pre]:whitespace-pre group-[.is-assistant]:[&_pre]:break-normal",
        ],
        flat: [
          "group-[.is-user]:max-w-[80%] group-[.is-user]:bg-secondary group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-foreground space-y-2",
          "group-[.is-assistant]:text-foreground space-y-2 group-[.is-assistant]:[&>*]:break-words",
        ],
      },
    },
    defaultVariants: {
      variant: "contained",
    },
  }
)

export type MessageContentProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof messageContentVariants>

export const MessageContent = ({
  children,
  className,
  variant,
  ...props
}: MessageContentProps) => (
  <div
    className={cn(messageContentVariants({ variant, className }))}
    {...props}
  >
    {children}
  </div>
)

export type MessageAvatarProps = ComponentProps<typeof Avatar> & {
  src: string
  name?: string
}

export const MessageAvatar = ({
  src,
  name,
  className,
  ...props
}: MessageAvatarProps) => (
  <Avatar className={cn("ring-border size-8 ring-1", className)} {...props}>
    <AvatarImage alt="" className="mt-0 mb-0" src={src} />
    <AvatarFallback>{name?.slice(0, 2) || "ME"}</AvatarFallback>
  </Avatar>
)
