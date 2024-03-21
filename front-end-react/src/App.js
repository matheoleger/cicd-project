import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you have a separate CSS file

const App = () => {
  const [userData, setUserData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [newUser, setNewUser] = useState({ firstname: '', lastname: '' });

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3001/user');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchOrderData = async () => {
    try {
      const response = await fetch('http://localhost:3002/order');
      const data = await response.json();
      setOrderData(data.message);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  const createUser = async () => {
    // Check if both firstname and lastname are not empty
    if (!newUser.firstname || !newUser.lastname) {
      console.log('Both First Name and Last Name are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      console.log(data.message);
      // After creating the user, refresh the user list
      fetchUserData();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Fetch user data on component mount

  return (
    <div className="app-container">
      <header className="App-header">
        <div className="form-container">
          <h2>Create User:</h2>
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            value={newUser.firstname}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={newUser.lastname}
            onChange={handleInputChange}
          />
          <button className="fetch-button" onClick={createUser}>
            Create User
          </button>
        </div>

        <div className="data-container">
          <h2>User Data:</h2>
          <ul>
            {userData.map((user, index) => (
              <li key={index}>{`${user.firstname} ${user.lastname}`}</li>
            ))}
          </ul>
        </div>

        <div className="fetch-buttons-container">
          <button className="fetch-button" onClick={fetchUserData}>
            Get Users
          </button>
          <button className="fetch-button" onClick={fetchOrderData}>
            Get Orders
          </button>
        </div>

        <div className="data-container">
          <h2>Order Data:</h2>
          <p>{orderData}</p>
        </div>
      </header>
    </div>
  );
};

export default App;