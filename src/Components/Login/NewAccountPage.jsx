import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Add axios for making HTTP requests
import '../Login/NewAccountPage.css'

function NewAccountPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/signup', {
        username,
        password,
        email
      });
      console.log(response.data);
      alert("User Registred Successful");
      // Redirect to login page or show a success message
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="new-account-page">
      <h1>Create New Account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Create Account</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default NewAccountPage;