import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/logout">Logout</Link>
    </nav>
  );
}

export default Nav;
