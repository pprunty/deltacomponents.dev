import { AppSidebar } from "@/components/app-sidebar"

export default function Home() {
  return (
    <>
      <AppSidebar />
      <main className="flex min-h-svh flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="text-muted-foreground text-center">
            LLM chat component to be added later
          </div>
        </div>
      </main>
    </>
  )
}
