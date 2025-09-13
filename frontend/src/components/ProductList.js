import React, { useState, useEffect } from "react";
import axios from "axios";

// Use the live backend when deployed, localhost when developing
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    image: ""
  });

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/products`);
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({ ...p });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      name: "",
      description: "",
      category: "",
      price: "",
      quantity: "",
      image: ""
    });
  };

  const saveEdit = async () => {
    try {
      await axios.put(`${API_URL}/products/${editingId}`, {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity)
      });
      await fetchProducts();
      cancelEdit();
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`${API_URL}/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="dashboard-container">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Products</h1>

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
            <p className="font-bold">Price: M{Number(p.price).toFixed(2)}</p>
            <p>Qty: {p.quantity}</p>

            <div className="card-actions">
              <button
                className="btn small primary"
                onClick={() => startEdit(p)}
              >
                Edit
              </button>
              <button
                className="btn small danger"
                onClick={() => deleteProduct(p.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            {["name","description","category","price","quantity","image"].map((f) => (
              <input
                key={f}
                name={f}
                type={f === "price" || f === "quantity" ? "number" : "text"}
                placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                className="w-full border p-2 mb-3 rounded"
                value={form[f]}
                onChange={handleChange}
              />
            ))}
            <div className="edit-actions flex justify-between">
              <button className="btn small secondary" onClick={cancelEdit}>
                Cancel
              </button>
              <button className="btn small primary" onClick={saveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
