import React from "react";

export default function Dashboard({ products, addToCart }) {
  return (
    <div className="dashboard-container">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img
              src={p.image || "https://via.placeholder.com/150"}
              alt={p.name}
              className="product-image"
            />
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-600">{p.description}</p>
            <p className="font-bold">Price: M{p.price}</p>
            <p>Qty: {p.quantity}</p>

            {p.quantity <= 5 && (
              <div className="info">⚠️ Low stock!</div>
            )}

            <button
              className="btn sell-btn"
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
