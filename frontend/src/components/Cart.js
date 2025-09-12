import React, { useState } from "react";
import "../index.css"; // Ensure global styles including .footer exist

export default function Cart({ cartItems, setCartItems }) {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container" style={{ minHeight: "80vh" }}>
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  // Calculate total
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  // Delete item from cart
  const handleDelete = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  // Checkout
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems, total: totalPrice }),
      });
      if (!res.ok) throw new Error("Failed to record sale");

      setCartItems([]); // Clear cart
      setSuccessMsg("✅ Checkout successful! Sale recorded.");
    } catch (err) {
      console.error(err);
      setSuccessMsg("❌ Checkout failed. Try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMsg(""), 4000); // clear message after 4s
    }
  };

  return (
    <div className="container" style={{ minHeight: "80vh", paddingBottom: "4rem" }}>
      <h2>🛒 Your Cart</h2>
      {successMsg && <p className="success">{successMsg}</p>}

      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${Number(item.price).toFixed(2)}</td>
              <td>${(Number(item.price) * Number(item.quantity)).toFixed(2)}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  style={{ backgroundColor: "#d9534f" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Processing..." : "Checkout"}
      </button>

      {/* Sticky Footer */}
      <footer className="footer" style={{
        position: "sticky",
        bottom: 0,
        width: "100%",
        backgroundColor: "#f8f8f8",
        textAlign: "center",
        padding: "1rem",
        boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
        marginTop: "2rem"
      }}>
        &copy; {new Date().getFullYear()} Wings Café
      </footer>
    </div>
  );
}
