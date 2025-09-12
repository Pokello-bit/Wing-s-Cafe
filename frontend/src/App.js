import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Report from "./components/Report";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Add product to cart
  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout cartItems={cartItems} />}>
          {/* Dashboard */}
          <Route index element={<Dashboard products={products} addToCart={addToCart} />} />

          {/* Add new product */}
          <Route
            path="add"
            element={<AddProduct onAdd={fetchProducts} />}
          />

          {/* Manage products (edit/delete) */}
          <Route
            path="products"
            element={<ProductList />}
          />

          {/* Cart page */}
          <Route
            path="cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          />

          {/* Sales report */}
          <Route
            path="report"
            element={<Report products={products} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
