import React, { useEffect, useState } from "react";

const SalesReport = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/sales")
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📊 Sales History</h2>
      {sales.length === 0 ? (
        <p>No sales yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Items</th>
              <th>Total ($)</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(s => (
              <tr key={s.id}>
                <td>{new Date(s.date).toLocaleString()}</td>
                <td>
                  {s.items.map(i => `${i.id} x${i.quantity}`).join(", ")}
                </td>
                <td>{s.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesReport;
