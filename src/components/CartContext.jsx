import { createContext, useState, useMemo, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ✅ Get the current user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email || "guest"; // use "guest" if no user is logged in

  console.log(email)
  // ✅ Load user's specific cart
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem(`cart_${email}`);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // ✅ Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(`cart_${email}`, JSON.stringify(cart));
  }, [cart, email]);

  // ✅ Add product
  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, count: item.count + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, count: 1 }]); // start count at 1
    }
  };

  // ✅ Remove one quantity of a product
  const removeFromCart = (id) => {
    const existing = cart.find((item) => item._id === id);
    if (!existing) return;

    if (existing.count === 1) {
      setCart(cart.filter((item) => item._id !== id));
    } else {
      setCart(
        cart.map((item) =>
          item._id === id ? { ...item, count: item.count - 1 } : item
        )
      );
    }
  };

  // ✅ Delete entire item
  const deleteItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // ✅ Clear entire cart
  const clearCart = () => setCart([]);

  // ✅ Totals (memoized)
  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.count, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.count * item.price, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        deleteItem,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
