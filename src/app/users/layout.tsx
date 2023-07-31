import Section from '@/components/shared/section';
import UserList from '@/components/users/user-list';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <Section>
      <UserList />
      {children}
    </Section>
  );
}
