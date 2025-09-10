import { useContext } from "react";
import { CartContext } from "./CartContext";
import "./Cart.css";

function Cart() {
  const { cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice } = useContext(CartContext);

  return (
    <div className="cart-container">
      <div className="cart-card">
        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="image-text">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                    </div>
                  </div>

                  <div className="cart-buttons">
                    <button className="dec" onClick={() => removeFromCart(item._id)}>-</button>
                    <span className="item-count">{item.count}</span>
                    <button className="inc" onClick={() => addToCart(item)}>+</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-summary">
              <p>Total Items: {totalItems}</p>
              <p>Total Price: ₹{totalPrice}</p>
              <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
