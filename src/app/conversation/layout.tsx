"use client"

import Section from "@/components/shared/section"

export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Section>{children}</Section>
}
