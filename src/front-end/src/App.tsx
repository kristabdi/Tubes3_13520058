import React from 'react';
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import './App.css';
import Navigation from './components/Navigation';
import AddDesease from './pages/AddDesease';
import DNATest from './pages/DNATest';
import Search from './pages/Search';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path="/" element={<DNATest/>} />
          <Route path="/add" element={<AddDesease />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
