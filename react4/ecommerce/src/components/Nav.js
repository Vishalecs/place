// Nav.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/nav.css'; // Import the CSS file

function Nav() {
  const location = useLocation();

  return (
    <nav>
      <div className="navbar-container">
        <h1 className="logo">Ecommerce</h1>
        <ul className="nav-links">
          <li>
            <Link to="/">Product</Link>
          </li>
          {/* Conditionally render the "Add Product" button */}
          {location.pathname === '/add' ? null : (
            <li>
              <Link to="/add">Add Product</Link>
            </li>
          )}
          <li>
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </li>
          <li>
            <Link to="/user">
              <i className="fas fa-user"></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
