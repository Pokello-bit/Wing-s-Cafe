import React from "react";
import { NavLink } from "react-router-dom";
import "../index.css"; // ensure you have your styles

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🛍️ Wings Café</div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active-link" : ""}>Dashboard</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? "active-link" : ""}>Products</NavLink>
        <NavLink to="/add" className={({ isActive }) => isActive ? "active-link" : ""}>Add Product</NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? "active-link" : ""}>Cart</NavLink>
        <NavLink to="/report" className={({ isActive }) => isActive ? "active-link" : ""}>Report</NavLink>
      </div>
    </nav>
  );
}
