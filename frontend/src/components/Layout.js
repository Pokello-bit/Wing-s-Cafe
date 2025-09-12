import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout({ cartItems }) {
  return (
    <div className="app-wrapper">
      {/* Header */}
      <header>
        <div className="header-container">
          <div className="navbar-logo">Wing's Café</div>
          <nav className="navbar-links">
            <NavLink to="/" end className={({ isActive }) => isActive ? "active-link" : ""}>
              Dashboard
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => isActive ? "active-link" : ""}>
              Products
            </NavLink>
            <NavLink to="/add" className={({ isActive }) => isActive ? "active-link" : ""}>
              Add Product
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) => isActive ? "active-link" : ""}>
              Cart ({cartItems?.length || 0})
            </NavLink>
            <NavLink to="/report" className={({ isActive }) => isActive ? "active-link" : ""}>
              Report
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="content main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} Wing's Café. All Rights Reserved.
      </footer>
    </div>
  );
}
