import { useContext } from "react";
import { CartContext } from "./CartContext";
import "./Cart.css";
import Payment from "./Payment";
import { Navigate, useNavigate } from "react-router";

function Cart() {
  const { cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice ,deleteItem} = useContext(CartContext);
  const navigate=useNavigate()
  function payment(){
navigate("/payment")
  }
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
                  <button className="delete-button"onClick={() => deleteItem(item._id)} >❌</button>
                </li>
              ))}
            </ul>

            <div className="cart-summary">
              <p>Total Items: {totalItems}</p>
              <p>Total Price: ₹{totalPrice}</p>
              <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
               <button className="clear-cart" onClick={payment} >Buy Now</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
