import React, { useState , useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './loginpage';
import Orders from './orders';

function App() {


  return (
<Router>
    <Routes>
    <Route path="/" element={<Login />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  </Router>


  );
};




export default App;

