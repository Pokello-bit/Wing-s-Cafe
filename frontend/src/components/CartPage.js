import React from "react";

const CartPage = ({ cart, removeFromCart, checkout }) => {
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h1>🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)} style={{ backgroundColor: "#dc3545", color: "#fff" }}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total: ${totalPrice}</h3>
          <button onClick={checkout} style={{ padding: "0.6rem 1rem", backgroundColor: "#28a745", color: "#fff", fontWeight: "bold", borderRadius: "5px" }}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
