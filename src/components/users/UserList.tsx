import UserItem from './UserItem';
import getUsers from '@/utils/getUsers';
import ListContainer from '../shared/ListContainer';
import Input from '../shared/Input';
import React from 'react';

const UserList = async () => {
  const users = await getUsers();

  return (
    <ListContainer listTitle="Users">
      <Input
        className="text-accent-foreground my-2"
        type="Search"
        placeholder="Search users..."
      />
      {users?.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </ListContainer>
  );
};

export default UserList;
