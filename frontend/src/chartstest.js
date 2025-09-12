import React, { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer
} from "recharts";

// 🧪 Mock product data
const mockProducts = [
  { id: 1, name: "Espresso", category: "Beverage", price: 25, quantity: 10 },
  { id: 2, name: "Muffin", category: "Bakery", price: 15, quantity: 5 },
  { id: 3, name: "Latte", category: "Beverage", price: 30, quantity: 8 },
  { id: 4, name: "Croissant", category: "Bakery", price: 20, quantity: 6 },
  { id: 5, name: "Sandwich", category: "Food", price: 40, quantity: 4 }
];

// 🧱 ChartErrorBoundary (optional fallback wrapper)
function ChartErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  return hasError ? (
    <p>⚠️ Chart failed to render.</p>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
}

// 📊 CategoryPieChart component
function CategoryPieChart({ products }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];
  if (!Array.isArray(products) || products.length === 0) {
    return <p>No category data available.</p>;
  }

  const categoryData = Object.entries(
    products.reduce((acc, p) => {
      const cat = (p.category || "Uncategorized").trim().toLowerCase();
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  if (!categoryData.length) {
    return <p>No category data available.</p>;
  }

  return (
    <div>
      <h3>📊 Category Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} (${isNaN(percent) ? "0" : (percent * 100).toFixed(0)}%)`
            }
          >
            {categoryData.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// 💰 ValueBarChart component
function ValueBarChart({ products }) {
  if (!Array.isArray(products) || products.length === 0) {
    return <p>No inventory value data available.</p>;
  }

  const valueData = products
    .filter(p => typeof p.price === "number" && typeof p.quantity === "number")
    .map(p => ({
      name: p.name || "Unnamed",
      value: p.price * p.quantity
    }));

  if (!valueData.length) {
    return <p>No valid product value data available.</p>;
  }

  return (
    <div>
      <h3>💰 Inventory Value by Product</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={valueData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// 🧪 Chart Toggle Wrapper
function ChartPreview() {
  const [showPie, setShowPie] = useState(true);
  const [showBar, setShowBar] = useState(true);

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <h2>📈 Chart Preview Sandbox</h2>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setShowPie(!showPie)}>
          {showPie ? "Hide" : "Show"} Category Pie Chart
        </button>
        <button onClick={() => setShowBar(!showBar)} style={{ marginLeft: "10px" }}>
          {showBar ? "Hide" : "Show"} Value Bar Chart
        </button>
      </div>

      {showPie && (
        <div style={{ marginBottom: "30px" }}>
          <ChartErrorBoundary>
            <CategoryPieChart products={mockProducts} />
          </ChartErrorBoundary>
        </div>
      )}

      {showBar && (
        <div>
          <ChartErrorBoundary>
            <ValueBarChart products={mockProducts} />
          </ChartErrorBoundary>
        </div>
      )}
    </div>
  );
}

// 🧪 Render the chart preview
<ChartPreview />
