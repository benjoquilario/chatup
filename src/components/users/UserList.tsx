import UserItem from './UserItem';
import React from 'react';
import getUsers from '@/utils/getUsers';

const UserList: React.FC = async () => {
  const users = await getUsers();

  return (
    <React.Fragment>
      {users.map(user => (
        <UserItem user={user} key={user.id} />
      ))}
    </React.Fragment>
  );
};

export default UserList;
