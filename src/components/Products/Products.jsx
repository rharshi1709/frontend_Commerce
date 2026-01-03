import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import API_BASE_URL from "../../config";
import { toast } from "react-toastify";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("jwt_token");

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(`${API_BASE_URL}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ Prevent JSON crash
        if (!response.ok) {
          const text = await response.text();
          console.error(text);
          toast.error("Unauthorized or session expired");
          return;
        }

        const data = await response.json();
        setProducts(data.data);
      } catch (err) {
        toast.error("Network error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      getProducts();
    }
  }, [token]);

  if (!token) {
    return <p>Please login to view products</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {products.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>{p.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;
