import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
  BrowserRouter, Link, Route, Routes
} from "react-router-dom";
import './App.css';
import Navigation from './components/Navigation';
import AddDesease from './pages/AddDesease';
import DNATest from './pages/DNATest';
import Search from './pages/Search';
import banner from './banner.svg';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path="/" element={<img src={banner} alt="banner" className='banner'/>} />
          <Route path="/test" element={<DNATest/>} />
          <Route path="/add" element={<AddDesease />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        
      </BrowserRouter>
      
    </div>
  );
}

export default App;
