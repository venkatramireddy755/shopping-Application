// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './Loginpage.css'

// function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // Handle login logic here
//     let response = null;
//     try{
//       response = await axios.post("http://localhost:8000/login", {
//         username,
//         password
//       });
//       alert(response.data.message);
//     }catch(error){
//       alert(response.data.message);
//     }
//   };

//   return (
//     <div className="login-page">
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             name="username"
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <p>New user? <Link to='/new-account'>Create an account</Link></p>
//     </div>
//   );
// }

// export default LoginPage;





// import React, { useState,useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import axios from 'axios';
// import { ShopContext } from '../ShopContext/ShopContext';
// import './Loginpage.css';

// function LoginPage() {
//   const { setUser } = useContext(ShopContext);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages
//   const navigate = useNavigate(); // Initialize useNavigate for redirection

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setErrorMessage(''); // Clear previous error message

//     try {
//       const response = await axios.post('http://localhost:8000/login', {
//         username,
//         password,
//       });

//       if (response.data.token) {
//         // Store the token in localStorage
//         localStorage.setItem('token', response.data.token);
//         setUser(username); // Store the username in the context
//         // Optionally store the username
//         localStorage.setItem('username', username);

//         alert(response.data.message); // Optionally show a success alert
//         navigate('/'); // Redirect to the home page after successful login
//       } else {
//         // If no token is received, display an error message
//         setErrorMessage('Invalid username or password');
//       }
//     } catch (error) {
//       // Check if the error response exists and has a message
//     if (error.response && error.response.data && error.response.data.message) {
//       setErrorMessage(error.response.data.message); // Show the server error message
//     } else {
//       setErrorMessage('An error occurred while logging in. Please try again.'); // Generic error message
//     }
//     }
//   };

//   return (
//     <div className="login-page">
//       <h1>Login</h1>
//       {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             name="username"
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         New user? <Link to="/new-account">Create an account</Link>
//       </p>
//     </div>
//   );
// }

// export default LoginPage;






import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../ShopContext/ShopContext';
import './Loginpage.css';

function LoginPage() {
  const { setUser } = useContext(ShopContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser(username); // Store the username in the context
        console.log(username)
        localStorage.setItem('username', username);
        alert(response.data.message);
        navigate('/'); // Redirect to the home page
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.log('Error logging in:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred while logging in. Please try again.');
      }
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        New user? <Link to="/new-account">Create an account</Link>
      </p>
    </div>
  );
}

export default LoginPage;
