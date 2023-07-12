import Avatar from '../shared/Avatar';
import Button from '@/components/shared/Button';
import { User } from '@prisma/client';
import React from 'react';

type TUserItemProps = {
  user: User;
};

const UserItem: React.FC<TUserItemProps> = ({ user }) => {
  return (
    <Button className="w-full flex justify-center items-center">
      <div className="relative py-2.5 px-4 w-full flex items-center justify-center gap-4 bg-background-800 rounded-lg transition shadow-md">
        <Avatar />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-white capitalize">
                {user.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Button>
  );
};

export default UserItem;
