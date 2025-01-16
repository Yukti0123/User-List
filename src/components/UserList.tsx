import React, { useEffect, useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CounterUser from "./CounterUser";
import { JSX } from "react";


interface User {
  id: number;
  name: string;
  email: string;
}

const UserList = ():JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchId, setSearchId] = useState<string>("");
  const [error, setError] = useState<string>("");  
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
        setError(""); 
      } catch (err) {
        setError("Failed to load users. Please try again later.");
        console.error(err);  
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchId) return;

    try {
      
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${searchId}`);
      
      navigate(`/user/${response.data.id}`);
      setError(""); 
    } catch (err) {
     
      setError("User not found. Please check the ID and try again.");
      console.error(err); 
    }
  };

  return (
    <div>
      <h1>User List</h1>

      {error && <div className="error-message" style={{ color: "red" }}>{error}</div>}

      <div className="user-list">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <div className="user-card" key={user.id}>
              <h2>{user.name}</h2>
              <h2>{user.id}</h2>
              <p>{user.email}</p>
              <Link to={`/user/${user.id}`}>View Details</Link>
            </div>
          ))
        )}
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
