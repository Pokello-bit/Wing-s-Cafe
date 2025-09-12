import React from "react";

function InventorySummary({ products }) {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const lowStockCount = products.filter(p => p.quantity < 5).length;

  return (
    <div style={{ marginBottom: "20px" }}>
      <p><strong>Total Products:</strong> {totalProducts}</p>
      <p><strong>Total Inventory Value:</strong> R{totalValue.toFixed(2)}</p>
      <p><strong>Low Stock Items:</strong> {lowStockCount}</p>
    </div>
  );
}

export default InventorySummary;
