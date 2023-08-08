import UserItem from "./user-item"
import getUsers from "@/utils/getUsers"
import ListContainer from "@/components/shared/list-container"
import { Input } from "@/components/ui/input"
import React from "react"

const UserList = async () => {
  const users = await getUsers()

  return (
    <ListContainer listTitle="Users">
      <span className="text-xs text-muted-foreground/80">Active Users(20)</span>
      <Input
        className="my-2 rounded-full bg-secondary text-accent-foreground"
        type="Search"
        placeholder="Search users..."
      />
      {users?.map((user) => <UserItem key={user.id} user={user} />)}
    </ListContainer>
  )
}

export default UserList
