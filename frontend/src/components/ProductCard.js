import React from "react";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "1rem",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      <img
        src={product.image || "https://via.placeholder.com/200x120?text=No+Image"}
        alt={product.name}
        style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px", marginBottom: "0.5rem" }}
      />
      <h3>{product.name}</h3>
      <p style={{ flexGrow: 1 }}>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>In stock: {product.quantity}</p>
      <button
        onClick={addToCart}
        disabled={product.quantity === 0}
        style={{
          marginTop: "0.5rem",
          padding: "0.5rem",
          borderRadius: "6px",
          border: "none",
          backgroundColor: product.quantity === 0 ? "#ccc" : "#0077cc",
          color: "#fff",
          cursor: product.quantity === 0 ? "not-allowed" : "pointer"
        }}
      >
        {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
