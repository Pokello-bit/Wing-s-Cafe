import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "", description: "", category: "", price: "", quantity: "", image: ""
  });

  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:5000/products");
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({ ...p });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", description: "", category: "", price: "", quantity: "", image: "" });
  };

  const saveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/products/${editingId}`, {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity)
      });
      await fetchProducts();
      cancelEdit();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      await axios.delete(`http://localhost:5000/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Management</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-lg shadow p-4 flex flex-col relative">
            <img
              src={p.image || "https://via.placeholder.com/150"}
              alt={p.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-600">{p.description}</p>
            <p className="font-bold mt-2">Price: M{Number(p.price).toFixed(2)}</p>
            <p>Qty: {p.quantity}</p>

            {p.quantity <= 5 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                Low Stock!
              </span>
            )}

            <div className="flex justify-between mt-auto pt-3">
              <button
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                onClick={() => startEdit(p)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={() => deleteProduct(p.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            {["name","description","category","price","quantity","image"].map((f)=>(
              <input
                key={f}
                name={f}
                type={f==="price"||f==="quantity"?"number":"text"}
                placeholder={f.charAt(0).toUpperCase()+f.slice(1)}
                className="w-full border p-2 mb-3 rounded"
                value={form[f]}
                onChange={(e)=>setForm({ ...form, [f]: e.target.value })}
              />
            ))}
            <div className="flex justify-between">
              <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={cancelEdit}>
                Cancel
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={saveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
