"use client"

import { useSearchParams } from "next/navigation"
import { TimezoneWidget } from "@/components/timezone-widget"
import { Suspense } from "react"

function WidgetContent() {
  const searchParams = useSearchParams()
  
  const tz = searchParams.get("tz") || undefined
  const lang = searchParams.get("lang") || undefined
  const theme = searchParams.get("theme") as "light" | "dark" | undefined
  const format = searchParams.get("format")
  const is24h = format ? format === "24h" : undefined

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-background">
      <TimezoneWidget
        defaultTimezone={tz}
        defaultLanguage={lang}
        defaultTheme={theme}
        default24h={is24h}
      />
    </main>
  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-2xl h-[400px] animate-pulse bg-muted rounded-2xl" />
      </main>
    }>
      <WidgetContent />
    </Suspense>
  )
}
