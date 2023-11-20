import { useState, useEffect } from "react";
import { fetchAllUsers } from "../api";

export const Dashboard = ({ token, setToken, admin, setAdmin }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getUsers(admin) {
      try {
        //if user is admin, actually fire the fetch request; else, setUsers as false for conditional rendering purposes
        if (admin) {
          const response = await fetchAllUsers();
          const result = await response.json();
          if (response.status === 200) {
            setUsers(result.users);
          } else {
            setError(response.error);
            console.error(error);
          }
        } else {
          setUsers(false);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }
    getUsers(admin);
  }, []);

  console.log(users);

  return (
    <>
      {/* <h1>Welcome, {users.username}!</h1>  */}
      {/* i think we need a single user fetch */}
      <h1>This is the user dashboard.</h1>
      <h2>Congratulations on being a user</h2>
      {/* {users ? <div>{users.id}</div> : null} */}
      {users &&
        users.map((user, index) => (
          <div key={index} className="users-container">
            <h3>id: {user.id}</h3>
            <p>name: {user.name}</p>
            <p>email: {user.email}</p>
          </div>
        ))}
    </>
  );
};
