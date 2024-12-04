import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Nav from './ui/Nav';

function App() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
