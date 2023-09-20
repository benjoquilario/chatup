"use client"

import Link from "next/link"
import { cn } from "@/lib/cn"
import React from "react"
import { buttonVariants } from "../ui/button"

interface DesktopItemProps {
  label: string
  icon: any
  href: string
  onClick?: () => void
  active?: boolean
}

export default function DesktopItem({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}: DesktopItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick()
    }
  }

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={buttonVariants({
          variant: "ghost",
          className: active
            ? "bg-primary py-4 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90"
            : "py-4",
        })}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  )
}
