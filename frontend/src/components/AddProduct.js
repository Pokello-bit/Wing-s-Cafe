import React, { useState } from "react";
import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000"; // fallback for local dev

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    image: ""
  });
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/products`, {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity)
      });
      setSuccessMsg("✅ Product added successfully!");
      setForm({
        name: "",
        description: "",
        category: "",
        price: "",
        quantity: "",
        image: ""
      });
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      console.error(err);
      setSuccessMsg("❌ Failed to add product.");
      setTimeout(() => setSuccessMsg(""), 4000);
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Product</h1>

      {successMsg && <p className="success">{successMsg}</p>}

      <div className="product-card add-card">
        <form className="add-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Product Name"
                 value={form.name} onChange={handleChange} required />
          <input type="text" name="description" placeholder="Description"
                 value={form.description} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category"
                 value={form.category} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price"
                 value={form.price} onChange={handleChange} required />
          <input type="number" name="quantity" placeholder="Quantity"
                 value={form.quantity} onChange={handleChange} required />
          <input type="text" name="image" placeholder="Image URL"
                 value={form.image} onChange={handleChange} />
          <button type="submit" className="btn primary">Add Product</button>
        </form>
      </div>
    </div>
  );
}
