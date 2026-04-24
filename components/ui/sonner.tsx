"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CheckCircle, InfoCircle, DangerTriangle, DangerCircle, Restart } from "@solar-icons/react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CheckCircle weight="BoldDuotone" className="size-4" />
        ),
        info: (
          <InfoCircle weight="BoldDuotone" className="size-4" />
        ),
        warning: (
          <DangerTriangle weight="BoldDuotone" className="size-4" />
        ),
        error: (
          <DangerCircle weight="BoldDuotone" className="size-4" />
        ),
        loading: (
          <Restart weight="BoldDuotone" className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
