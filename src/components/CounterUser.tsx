import React, { useState, useEffect, JSX } from "react";
import axios from "axios";

// Define the user type
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const CounterUser = (): JSX.Element => {
  const [counter, setCounter] = useState<number>(1);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Fetch user based on counter value
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${counter}`);
        setUser(response.data);
        setError(""); // Clear previous errors if data is fetched successfully
      } catch (err) {
        setUser(null);  // Reset user data on error
        setError("User not found");  // Show "User not found" message
        console.error(err);  // Optionally log the error
      }
    };

    fetchUser();
  }, [counter]);

  const incrementCounter = (): void => {
    if (counter < 10) {
      setCounter(prevCounter => prevCounter + 1);
    } else {
      alert("Counter can't go above 10");
    }
  };

  const decrementCounter = (): void => {
    if (counter > 1) {
      setCounter(prevCounter => prevCounter - 1);
    } else {
      alert("Counter can't go below 1");
    }
  };

  return (
    <div className="counter-container">
      <p className="counter-info">User Info Based on Counter</p>

      {error && <div className="error-message">{error}</div>}

      <div className="counter-buttons">
        <button className="counter-button" onClick={incrementCounter}>+</button>

        {user ? (
          <div className="user-card">
            <h4>Counter: {user.id}</h4>
            <h4>{user.name}</h4>
            <h4>Email: {user.email}</h4>
            <h4>Phone: {user.phone}</h4>
          </div>
        ) : (
          !error && <p>Loading...</p>  
        )}

        <button className="counter-button" onClick={decrementCounter}>-</button>
      </div>
    </div>
  );
};

export default CounterUser;
