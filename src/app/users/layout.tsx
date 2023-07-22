import Section from '@/components/shared/Section';
import Sidebar from '@/components/sidebar/Sidebar';
import UserList from '@/components/users/UserList';
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
