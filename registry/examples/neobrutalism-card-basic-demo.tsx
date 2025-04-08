"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/registry/ui/neobrutalism-card';

export default function NeobrutalismCardBasicDemo() {
  return (
    <div className="w-full ">
        <Card color="blue" className="max-w-64 mx-auto" hover={true}>
          <CardHeader>
            <CardTitle>Blue Card</CardTitle>
            <CardDescription>Default blue variant</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This card has hover and active states.</p>
          </CardContent>
        </Card>
    </div>
  )
}
