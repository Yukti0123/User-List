import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CounterUser from "./CounterUser";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const Navigate = useNavigate();


  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);  
      })
  }, 
); 

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId) return;
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${searchId}`)
      .then((response) => {
        Navigate(`/user/${response.data.id}`)
      })
  };

  return (
    <div>
      <h1>User List</h1>
      <div  className="user-list">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <h2>{user.name}</h2>
            <h2>{user.id}</h2>
            <p>{user.email}</p>
            <Link to={`/user/${user.id}`}>View Details</Link>
          </div>
        ))}
      </div>

      <form onSubmit={handleSearch}>
        <div>
        <input
          type="number"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter User ID"
        />
        </div>
        <div>
        <button type="submit">Search User</button>
        </div>
      </form>

      <CounterUser />

    </div>
  );
};

export default UserList;
