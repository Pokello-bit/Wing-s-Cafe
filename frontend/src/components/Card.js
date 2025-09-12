// src/components/Card.js
import React from "react";

const Card = ({ title, value, icon, color = "#0077cc" }) => {
  return (
    <div style={{
      flex: "1",
      minWidth: "200px",
      backgroundColor: "#fff",
      padding: "1.5rem",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    }}>
      {icon && <div style={{ fontSize: "2rem", color }}>{icon}</div>}
      <div>
        <h3 style={{ margin: 0, color: "#333", fontSize: "1.1rem" }}>{title}</h3>
        <p style={{ margin: 0, fontWeight: "bold", fontSize: "1.5rem", color }}>{value}</p>
      </div>
    </div>
  );
};

export default Card;
