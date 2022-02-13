import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import  './NavBar.css'
import Login from './Login';
import Logout from './Logout';
import DisplayHome from './DisplayHome';

const NavBar = () => {
    return (
        <div>
            <nav className="nav-container">
                <DisplayHome/>
                <ul className='header-navigation-bar'>
                    <li><Link to="/resources">Resource</Link></li>
                    <li><Link to="/form">Form</Link></li>
                    <li><Link to="/favorite">Favorite</Link></li>
                    <li><Link to="/profile">Profile</Link></li> 
                </ul>
                <ul className="authentication-element">
                    <li><Login/></li>
                    <li><Logout/></li>
                </ul>
            </nav>
            <Outlet/>
        </div>
    )
};

export default NavBar;
