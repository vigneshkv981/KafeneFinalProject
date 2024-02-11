import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./loginpage";
import Orders from "./orders";
import Product from "./products";
import Users from "./users";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/products" element={<Product />} />
        <Route exact path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
