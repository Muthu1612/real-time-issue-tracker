import React from 'react'

interface User{
    id: number;
    name: string;
    email: string;
}
const UsersPage = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {cache: 'no-store'});
    const users = await res.json();
    
  return (
    <>
    <h1>Users</h1>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
        {users.map((user: User) => <tr key ={user.id}>
            <th>{user.name}</th>
            <th>{user.email}</th>
            </tr>)}
        </tbody>
    </table>
    </>

  )
}

export default UsersPage