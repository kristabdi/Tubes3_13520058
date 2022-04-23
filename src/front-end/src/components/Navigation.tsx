import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div>
      <h1>BackendTeam</h1>
      <nav>
        <Link to="/">DNA Test</Link>
        <Link to="/search">Search</Link>
        <Link to="/add">Add Desease</Link>
      </nav>
    </div>
  )
}

export default Navigation