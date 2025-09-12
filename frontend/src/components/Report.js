import React, { useState, useEffect } from "react";

export default function Report() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch("http://localhost:5000/sales");
        const data = await res.json();
        setSales(data);
      } catch (err) {
        console.error("Failed to fetch sales:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  if (loading) return <div className="container"><h2>Loading sales...</h2></div>;

  if (sales.length === 0) return <div className="container"><h2>No sales recorded yet.</h2></div>;

  return (
    <div className="container">
      <h2>📊 Sales Report</h2>
      {sales.map(sale => (
        <div key={sale.id} className="card">
          <h4>Sale ID: {sale.id}</h4>
          <p><strong>Date:</strong> {new Date(sale.date).toLocaleString()}</p>
          <table className="product-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {sale.items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${Number(item.price).toFixed(2)}</td>
                  <td>${(Number(item.price) * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Total: ${sale.total.toFixed(2)}</h4>
        </div>
      ))}
    </div>
  );
}
