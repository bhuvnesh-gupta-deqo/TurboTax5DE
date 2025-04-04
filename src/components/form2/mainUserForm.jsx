import React from 'react';
import UserForm from './UserForm'
import { useState } from 'react'
import UserList from './UserList'
function MainUserForm() {

  const [users, setUsers] = useState([]);

  const onUserAdd = (user) => {
    setUsers([...users, user])
  }

  return (
    <div>
    <UserForm onUserAdd={onUserAdd}/>
    <UserList users={users} />
    </div>
  )
}

export default MainUserForm;
