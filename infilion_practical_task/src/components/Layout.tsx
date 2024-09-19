import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode; // Define the type for children
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main>
      <div className="container mx-auto p-4">
        {children}
      </div>
    </main>
  );
};

export default Layout;
