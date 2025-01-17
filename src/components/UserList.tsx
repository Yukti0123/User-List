import { useEffect, useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CounterUser from "./CounterUser";
import { JSX } from "react";
import User from "../Interface";
import { useTheme } from "./ThemeContext";

const UserList = ():JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchId, setSearchId] = useState<string>("");
  const [error, setError] = useState<string>("");  
  const navigate = useNavigate();


  const {theme, toggleTheme} = useTheme();

 
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
      <button  onClick={toggleTheme}> Switch To {theme === "light"? "Dark" : "Light"} Mode</button>

      <h1 className="counter-info">User List</h1>

      <div className="user-list">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <div className="user-card" key={user.id}>
              <h4>{user.name}</h4>
              <h4>{user.id}</h4>
              <h4>{user.email}</h4>
              <Link to={`/user/${user.id}`}>View Details</Link>
            </div>
          ))
        )}
      </div>
        <br></br>
      <form onSubmit={handleSearch}>
        <div>
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter User ID"
          />
        </div>
        <br></br>
        <div className="counter-buttons">
          <button type="submit" className="counter-button">Search User</button>
        </div>
      </form>
      <br></br>
      {error && <div className="error-message">{error}</div>}

      <br></br><br></br>

      <CounterUser />
    </div>
  );
};

export default UserList;
