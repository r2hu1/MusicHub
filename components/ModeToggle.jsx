"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme, resolvedTheme: theme, systemTheme } = useTheme();

  return (
    <div className="flex rounded-lg overflow-hidden border border-border">
      <Button onClick={() => setTheme("light")} size="icon" className="rounded-none dark:bg-transparent hover:bg-primary dark:text-foreground bg-primary hover:text-primary-foreground text-primary-foreground" variant={"ghost"}><Sun className="h-4 w-4" /></Button>
      <Button onClick={() => setTheme("dark")} size="icon" className="rounded-none dark:bg-primary dark:text-primary-foreground" variant={"ghost"}><Moon className="h-4 w-4" /></Button>
    </div>
  )
}
