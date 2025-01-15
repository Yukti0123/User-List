import React, {useState, useEffect} from "react";
import axios from "axios";

const CounterUser = () => {
    const [counter, setCounter] = useState(1);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(
              `https://jsonplaceholder.typicode.com/users/${counter}`
            );
            setUser(response.data);
        };
    
        fetchUser();
      }, [counter]);
    
      const incrementCounter = () => {
        setCounter(prevCounter => prevCounter + 1); 
      };
    
      const decrementCounter = () => {
        setCounter(prevCounter => (prevCounter > 1 ? prevCounter - 1 : 1)); 
      };
    
      return (
        <div>
          <p>User Info Based on Counter</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={incrementCounter}>+</button>
    
            {user && (
              <div className="user-card">
                <h4>Counter: {user.id}</h4>
                <h4>{user.name}</h4>
                <h4>Email: {user.email}</h4>
                <h4>Phone: {user.phone}</h4>
              </div>
            )}
    
            <button onClick={decrementCounter}>-</button>
          </div>
        </div>
      );
    };

    export default CounterUser
