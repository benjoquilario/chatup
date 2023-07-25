'use client';
import Sidebar from '@/components/sidebar/Sidebar';

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="h-full">
    <Sidebar />
    <main className="lg:pl-20 h-full">
      <div className="relative h-full">{children}</div>
    </main>
  </div>
);

export default Section;
