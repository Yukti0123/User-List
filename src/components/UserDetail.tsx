import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();  
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        setUser(response.data);
        setError("");  
      } catch (err) {
        setError("User not found or there was an error fetching data.");
        console.error(err);  
      }
    };

    fetchUser();
  }, [userId]);

  if (error) {
    return <div className="error-message" style={{ color: "red" }}>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;  
  }

  return (
    <div className="user-detail">
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <p>Company: {user.company.name}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default UserDetail;
