import Section from "@/components/shared/section"

interface ConversationsLayoutProps {
  children: React.ReactNode
}

export default function ConversationsLayout({
  children,
}: ConversationsLayoutProps) {
  return <Section>{children}</Section>
}
