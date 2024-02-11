import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Fetch products from API
    fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initially, filteredProducts is same as products
        setCount(data.length);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  function handleExpiredCheckboxChange(e) {
    const isChecked = e.target.checked;
    const updatedFilteredProducts = isChecked
      ? products.filter(
          (item) => new Date(item.expiryDate).getTime() < new Date().getTime()
        )
      : products;
    setFilteredProducts(updatedFilteredProducts);
    setCount(updatedFilteredProducts.length);
  }

  function handleLowStockCheckboxChange(e) {
    const isChecked = e.target.checked;
    const updatedFilteredProducts = isChecked
      ? products.filter((item) => parseInt(item.stock) < 100)
      : products;
    setFilteredProducts(updatedFilteredProducts);
    setCount(updatedFilteredProducts.length);
  }

  const handleLogout = () => {
    localStorage.setItem("loginStatus", false);
    window.location.assign("./");
  };

  return (
    <>
      <div className="navbar">
        <div className="Navbar_Menu">
          <div className="logo">
            <img
              src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png"
              alt="Logo"
            />
            <p className="logo_name">Kafene</p>
          </div>
          <nav>
            <a className="nav-items" href="./orders">
              Orders
            </a>
            <a className="nav-items active" href="./products">
              Products
            </a>
            <a className="nav-items" href="./users">
              Users
            </a>
          </nav>
        </div>
        <a className="nav-items" id="logout-button" onClick={handleLogout}>
          Logout
        </a>
      </div>

      <div className="order_page">
        <h1 className="order_header">Products</h1>
        <div className="table_container">
          <div className="filter-container">
            <h3>Filters</h3>
            <div className="filter-option">
              <p>
                Count: <span id={count}></span>
              </p>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  name="orders-new"
                  id="expiredCheckBox"
                  onChange={handleExpiredCheckboxChange}
                />
                Expired{" "}
              </label>

              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  name="orders-packed"
                  id="lowStockCheckBox"
                  onChange={handleLowStockCheckboxChange}
                />
                Low Stock
              </label>
            </div>
          </div>
          <div className="table">
            <table className="order-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Product Brand</th>
                  <th>Expiry Date</th>
                  <th>Unit Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody id="table-body">
                {filteredProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>{product.medicineName}</td>
                    <td>{product.medicineBrand}</td>
                    <td>{product.expiryDate}</td>
                    <td>${product.unitPrice}</td>
                    <td>{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
