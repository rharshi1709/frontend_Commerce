import { createContext, useState, useMemo } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add a product to the cart
  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);

    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id ? { ...item, count: item.count + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, count: 1 }]);
    }
  };

  // Remove a product from the cart
  const removeFromCart = (id) => {
    const existing = cart.find(item => item._id === id);
    if (!existing) return;

    if (existing.count === 1) {
      setCart(cart.filter(item => item._id !== id));
    } else {
      setCart(cart.map(item =>
        item._id === id ? { ...item, count: item.count - 1 } : item
      ));
    }
  };
 const deleteItem =(id)=>{
    const item= cart.find(it=> it._id===id)
    if (item){
      setCart(cart.filter(item =>
        item._id !== id 
      ))
    }
 }
  // Clear entire cart
  const clearCart = () => setCart([]);

  // Memoized totals for performance
  const totalItems = useMemo(() => cart.reduce((acc, item) => acc + item.count, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((acc, item) => acc + item.count * item.price, 0), [cart]);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      deleteItem,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
