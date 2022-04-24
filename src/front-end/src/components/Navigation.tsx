import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './../logo.svg';

function Navigation() {
  return (
    <Navbar className='navbar d-flex justify-content-between px-4'>
      <Link to="/">
        <img src={logo} alt="logo" className='w-50'/>
      </Link>
      <div>
        <Link to="/" className='mx-4 nav-item'>DNA Test</Link>
        <Link to="/search" className='mx-4 nav-item'>Search</Link>
        <Link to="/add" className='mx-4 nav-item'>Add Desease</Link>
      </div>
    </Navbar>
  )
}

export default Navigation