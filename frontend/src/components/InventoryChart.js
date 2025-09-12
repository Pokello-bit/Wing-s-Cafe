import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function InventoryChart({ products }) {
    const data = products.map(p => ({
        name: p.name,
        quantity: Number(p.quantity),
        price: Number(p.price)
    }));

    return (
        <div>
            <h3>📊 Quantity per Product</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="quantity" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
