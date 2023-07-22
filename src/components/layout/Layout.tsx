import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <h1 className="sr-only">Chatty</h1>
      {children}
    </div>
  );
};

export default Layout;
