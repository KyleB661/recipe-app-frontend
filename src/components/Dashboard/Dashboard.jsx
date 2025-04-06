import { useEffect, useContext, useState } from 'react';

import { UserContext } from '../../contexts/UserContext';
import * as userService from '../../services/userService';

const Dashboard = () => {
  const { user } = useContext(UserContext)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index()
        console.log(fetchedUsers)
        setUsers(fetchedUsers)
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      {users.map((user, index) => ( 
        <p key={index}>{user.username}</p> 
      ))}
      <p>This dashboard page is for you to see all users</p>
    </main>
  );
};

export default Dashboard;

