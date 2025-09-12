import React from "react";

function CategoryBreakdown({ products }) {
  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h3>📦 Category Breakdown</h3>
      <ul>
        {Object.entries(categoryCounts).map(([category, count]) => (
          <li key={category}>
            {category}: {count} item{count > 1 ? "s" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryBreakdown;
