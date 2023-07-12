import Sidebar from '@/components/sidebar/Sidebar';
import Input from '@/components/shared/Input';
import React from 'react';
import UserItem from '@/components/users/UserItem';

const Users = () => {
  return (
    <div className="flex justify-center items-center h-full min-h-screen pl-80">
      <h4 className="text-2xl text-white font-semibold">
        Select a chat or start a new conversation
      </h4>
    </div>
  );
};

export default Users;
