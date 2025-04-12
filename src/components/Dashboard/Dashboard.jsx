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
         setUsers(fetchedUsers)
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);

  return (
    <main className='dashboard'>
      <div className="dashboard-header">
        <h1>Welcome, {user.username}!</h1>
        <p className='dashboardTag'>
          This is my recipe app! A place to share recipes with others or look for inspiration for yourself!
        </p>
      </div>

      <section className="dashboard-users">
        <h2 className='userListTitle'>Current users:</h2>
        <div className='userList'>
          {users.map((user, index) => ( 
            <p key={index}>{user.username}</p> 
          ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;

