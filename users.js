import React, { useState , useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Users() {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loginStatus') === 'true');
    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (!isLoggedIn) {
            window.location.assign('../Login/index.html');
        }

        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    const handleLogout = () => {
        localStorage.setItem('loginStatus', false);
        window.location.assign('./');
    };

    const handleSearchChange = event => {
        setSearchValue(event.target.value.toUpperCase());
    };

    const handleReset = () => {
        setSearchValue('');
    };

    const filteredUsers = users.filter(user =>
        user.fullName.toUpperCase().includes(searchValue)
    );
  
    return (
  
      <>
     
     <div class="navbar">
        <div class="Navbar_Menu">
            <div class="logo">
                <img src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png" alt="Logo"/>
                <p class="logo_name">Kafene</p>
            </div>
            <nav>
                <a class="nav-items" href="./orders">Orders</a>
                <a class="nav-items" href="./products">Products</a>
                <a class="nav-items active" href="./users">Users</a>
            </nav>
        </div>
        <a  class="nav-items" id="logout-button" onClick={handleLogout}>Logout</a>
      
    </div>


    <div class="order_page">
        <h1 class="order_header">Users</h1>
        <div>

            <form class="userfilter_form" id="search-form" onSubmit={e => e.preventDefault()}>
                <input type="text" class="user_searchbox" id="searchBox" value={searchValue} onChange={handleSearchChange} placeholder="Search by name" />
                <button type="button" class="Reset_btn" id="resetBtn" onClick={handleReset}>Reset</button>
            </form>
            <div className='table'>
                <table class="order-table">
                    <tr>
                        <th>ID</th>
                        <th>User Avatar</th>
                        <th>Full Name</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Current Location</th>
                    </tr>
                    <tbody id="table-body">
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td className="secondary-text">{user.id}</td>
                            <td className="secondary-text"><img src={user.profilePic} alt="Profile"/></td>
                            <td className="secondary-text">{user.fullName}</td>
                            <td className="primary-text">{user.dob}</td>
                            <td className="secondary-text">{user.gender}</td>
                            <td className="secondary-text">{`${user.currentCity}, ${user.currentCountry}`}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
  </>
  
  
    );
  };
  
  
  
  export default Users;