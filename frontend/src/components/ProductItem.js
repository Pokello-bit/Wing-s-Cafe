import React from "react";

function ProductItem({ product, onDelete, onAdjustStock }) {
  return (
    <li style={{ marginBottom: "15px" }}>
      <b>{product.name}</b> — {product.quantity} in stock<br />
      <small>{product.description} | {product.category} | R{product.price}</small><br />
      <button onClick={() => onAdjustStock(product.id, 1)}>➕ Add Stock</button>
      <button onClick={() => onAdjustStock(product.id, -1)} disabled={product.quantity <= 0}>➖ Deduct Stock</button>
      <button onClick={() => onDelete(product.id)} style={{ color: "red", marginLeft: "10px" }}>❌ Delete</button>
    </li>
  );
}

export default ProductItem;
