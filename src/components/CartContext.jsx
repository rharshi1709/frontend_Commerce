import { createContext, useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email || "guest";

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem(`cart_${email}`);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(`cart_${email}`, JSON.stringify(cart));
  }, [cart, email]);

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id ? { ...item, count: item.count + 1 } : item
      ));
      toast('Quantity increased ⬆️');
    } else {
      setCart([...cart, { ...product, count: 1 }]);
      toast.success('Item added 🛒');
    }
  };

  const removeFromCart = (id) => {
    const existing = cart.find(item => item._id === id);
    if (!existing) return;

    if (existing.count === 1) {
      setCart(cart.filter(item => item._id !== id));
      toast.error('Item removed 🗑️');
    } else {
      setCart(cart.map(item =>
        item._id === id ? { ...item, count: item.count - 1 } : item
      ));
      toast('Quantity decreased ⬇️');
    }
  };

  const deleteItem = (id) => {
    setCart(cart.filter(item => item._id !== id));
    toast.error('Item deleted 🗑️');
  };

  const clearCart = () => {
    setCart([]);
    toast.error('Cart cleared 🧹');
  };

  const totalItems = useMemo(() => cart.reduce((sum, i) => sum + i.count, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, i) => sum + i.count * i.price, 0), [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        deleteItem,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
