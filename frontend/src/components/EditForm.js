import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

/**
 * Edit-product form with validation and loading states.
 * Props:
 *  - product: product object to edit (from parent state)
 *  - setProduct: setter for updating the product state in parent
 *  - onSubmit: async function to update the product in the backend
 */
export default function EditForm({ product, setProduct, onSubmit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [localProduct, setLocalProduct] = useState(product || null);

  // If parent didn't pass product, fetch it directly
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products`);
        const data = await res.json();
        const found = data.find((p) => p.id === Number(id));
        if (found) {
          setLocalProduct(found);
          setProduct && setProduct(found);
        }
      } catch (err) {
        console.error("Failed to load product:", err);
        setError("Could not load product details.");
      }
    };

    if (!product) {
      fetchProduct();
    }
  }, [id, product, setProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalProduct((prev) => ({ ...prev, [name]: value }));
    setProduct && setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localProduct.name.trim()) {
      setError("Product name is required.");
      return;
    }
    if (Number(localProduct.price) < 0) {
      setError("Price must be a non-negative number.");
      return;
    }
    if (Number(localProduct.quantity) < 0) {
      setError("Quantity must be a non-negative number.");
      return;
    }

    setError("");
    setSaving(true);

    try {
      await onSubmit();
      navigate("/products"); // go back to the product list
    } catch (err) {
      console.error("Failed to update product:", err);
      setError("Could not update product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!localProduct) return <p>Loading product details…</p>;

  return (
    <div className="form-container">
      <h2>Edit Product</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={localProduct.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={localProduct.description || ""}
            onChange={handleChange}
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            value={localProduct.category || ""}
            onChange={handleChange}
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={localProduct.price}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </label>

        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={localProduct.quantity}
            onChange={handleChange}
            min="0"
            step="1"
          />
        </label>

        <button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Update Product"}
        </button>
      </form>
    </div>
  );
}
