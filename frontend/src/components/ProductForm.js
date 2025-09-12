import React from "react";

const ProductForm = ({ form, setForm, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="form-container">
      <h2>Add New Product</h2>
      <label>
        Name:
        <input type="text" name="name" value={form.name} onChange={handleChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={form.description} onChange={handleChange} />
      </label>
      <label>
        Category:
        <input type="text" name="category" value={form.category} onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={form.price} onChange={handleChange} />
      </label>
      <label>
        Quantity:
        <input type="number" name="quantity" value={form.quantity} onChange={handleChange} />
      </label>
      <label>
        Image URL:
        <input type="text" name="image" value={form.image || ""} onChange={handleChange} />
      </label>
      <button onClick={onSubmit} style={{ marginTop: "1rem" }}>Add Product</button>
    </div>
  );
};

export default ProductForm;
