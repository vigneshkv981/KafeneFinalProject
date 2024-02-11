import React, { useState , useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
  
    const [loginStatus, setLoginStatus] = useState(localStorage.getItem('loginStatus') === 'true');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (username === password) {
            alert('Login Successful!!');
            localStorage.setItem('loginStatus', true);
            setLoginStatus(true);
            navigate('/orders');
        } else {
            alert('Please Enter Valid Credentials');
        }
    };
  
    const handleInputChange = (e) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };
  
    const handleInputClick = (e) => {
        e.preventDefault();
  
    };
  
  
    return (
  
      <>
     
     <div className="navbar">
          <div className="Navbar_Menu">
              <div className="logo">
                  <img src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png" alt="Logo"></img>
                  <p className="logo_name">Kafene</p>
              </div>
              <nav>
                  <a className="nav-items" href="">Orders</a>
                  <a className="nav-items" href="">Products</a>
                  <a className="nav-items" href="">Users</a>
              </nav>
          </div>
          <a className="nav-items" id="logout-button" href="">Logout</a>
      </div>
      <div id="loginForm">
      <form className="LoginPage" id="loginform" onSubmit={handleFormSubmit}>
      <h1>Sign In</h1>
              <input className="inputs" type="text" name="username" placeholder="Enter Username" value={username} onChange={handleInputChange} onClick={handleInputClick} />
              <input className="inputs" type="password" name="password" placeholder="Enter Password" value={password} onChange={handleInputChange} onClick={handleInputClick} />
              <button className="login_button" type="submit">Login</button>
          </form>
      </div>
    
  </>
  
  
    );
  };
  
  
  
  export default Login;