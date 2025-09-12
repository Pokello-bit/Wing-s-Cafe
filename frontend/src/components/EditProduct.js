import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Form.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/products`)
      .then(res => {
        const product = res.data.find(p => p.id === Number(id));
        if (product) {
          setName(product.name);
          setDescription(product.description);
          setCategory(product.category);
          setPrice(product.price);
          setQuantity(product.quantity);
          setImage(product.image || "");
        }
      })
      .catch(err => console.error("Load product error:", err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${id}`, {
        name,
        description,
        category,
        price: Number(price),
        quantity: Number(quantity),
        image
      });
      navigate("/");
    } catch (err) {
      alert("Failed to update product");
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name}
          onChange={(e) => setName(e.target.value)} required />

        <textarea placeholder="Description" value={description}
          onChange={(e) => setDescription(e.target.value)} />

        <input type="text" placeholder="Category" value={category}
          onChange={(e) => setCategory(e.target.value)} required />

        <input type="number" placeholder="Price" value={price}
          onChange={(e) => setPrice(e.target.value)} required />

        <input type="number" placeholder="Quantity" value={quantity}
          onChange={(e) => setQuantity(e.target.value)} required />

        <input type="url" placeholder="Image URL (optional)" value={image}
          onChange={(e) => setImage(e.target.value)} />

        <button type="submit" className="btn">Save Changes</button>
      </form>
    </div>
  );
}
