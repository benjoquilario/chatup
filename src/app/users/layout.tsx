import Sidebar from '@/components/sidebar/Sidebar';
import UserList from '@/components/users/UserList';
import React from 'react';

type TLayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<TLayoutProps> = async ({ children }) => {
  return (
    <Sidebar>
      <div className="fixed inset-y-0 w-full lg:w-80 overflow-y-auto left-28 pt-4">
        <div className="">
          <div className="w-full">
            <div className="text-lg text-white py-2 font-semibold w-full">
              People
            </div>
            <UserList />
          </div>
        </div>
      </div>
      {children}
    </Sidebar>
  );
};

export default Layout;
