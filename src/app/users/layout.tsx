"use client"

import Section from "@/components/shared/section"
import UserList from "@/components/users/user-list"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Section>
      <UserList />
      {children}
    </Section>
  )
}
