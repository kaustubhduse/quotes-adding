import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css'; // Import the CSS file

const MainNavigation = () => {
  return (
    <header className="header"> 
      <div className="logo">Great Quotes</div>
      <nav className="nav">
        <ul>
          <li>
            <NavLink to='/quotes' activeClassName="active"> 
              Fetch Quotes
            </NavLink>
          </li>
          <li>
            <NavLink to='/saved' activeClassName="active"> 
              Saved Quotes
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
