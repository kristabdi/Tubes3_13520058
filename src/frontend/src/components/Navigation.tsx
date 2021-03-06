import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './../logo2.svg';

function Navigation() {
  return (
    <Navbar className='navbar d-flex justify-content-between px-4'>
      <Link to="/">
        <img src={logo} alt="logo" className='logo'/>
      </Link>
      <div>
        <Link to="/test" className='mx-4 nav-item'>DNA Test</Link>
        <Link to="/search" className='mx-4 nav-item'>Search</Link>
        <Link to="/add" className='mx-4 nav-item'>Add Disease</Link>
      </div>
    </Navbar>
  )
}

export default Navigation