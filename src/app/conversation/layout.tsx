"use client"

import Section from "@/components/shared/section"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <Section>{children}</Section>
}

export default Layout
