import React, { useEffect, useState, useContext } from 'react';
import './Products.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext.jsx';
import Cookies from 'js-cookie';

import API_BASE_URL from '../../config';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';

function Products() {
  const { addToCart, removeFromCart, cart } = useContext(CartContext);
  const token = Cookies.get('jwt_token');

  const [categoryGrp, setCategoryGrp] = useState('all');
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const getQuantity = (id) => {
    const item = cart.find(p => p._id === id);
    return item ? item.count : 0;
  };

  /* ---------- FILTERING ---------- */
  let filteredArray = products;

  if (name) {
    filteredArray = filteredArray.filter(product =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (categoryGrp !== 'all') {
    filteredArray = filteredArray.filter(
      product => product.categoryId === categoryGrp
    );
  }

  if (sort) {
    filteredArray = [...filteredArray].sort((a, b) => {
      if (sort === 'priceLowHigh') return a.price - b.price;
      if (sort === 'priceHighLow') return b.price - a.price;
      if (sort === 'ratingLowHigh') return a.rating - b.rating;
      if (sort === 'ratingHighLow') return b.rating - a.rating;
      return 0;
    });
  }

  /* ---------- PAGINATION ---------- */
  const totalPages = Math.ceil(filteredArray.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredArray.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [name, categoryGrp, sort]);

  /* ---------- FETCH PRODUCTS ---------- */
  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/products`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        console.log(response);
        const data = await response.json();
        if (response.status !== 200) {
          throw new Error(data.message || 'Failed to fetch products');

        }
        console.log(data);
        setProducts(data.data || []);
        console.log(data.data);
        console.log(data);
      } catch (error) {
        console.error('Failed to load products');
        console.error(error);
      }
      setLoading(false);
    }
    getProducts();
  }, [token]);



  return (
    <>
      <Navbar />

      <div className='product'>
        {/* FILTER */}
        <div className='filter'>
          <h2>Filters</h2>

          <input
            className='search'
            placeholder='Search'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className='category'>
            <h3>Categories</h3>
            <button className='anchor' onClick={() => setCategoryGrp('all')}>All</button>
            <button className='anchor' onClick={() => setCategoryGrp("men")}>Men</button>
            <button className='anchor' onClick={() => setCategoryGrp("women")}>Women</button>
            <button className='anchor' onClick={() => setCategoryGrp("kids")}>kids</button>
          </div>

          <div className='sort'>
            <h3>Sort By</h3>
            <button className='anchor' onClick={() => setSort('ratingLowHigh')}>Rating ↑</button>
            <button className='anchor' onClick={() => setSort('ratingHighLow')}>Rating ↓</button>
            <button className='anchor' onClick={() => setSort('priceLowHigh')}>Price ↑</button>
            <button className='anchor' onClick={() => setSort('priceHighLow')}>Price ↓</button>
            <button className='anchor' onClick={() => setSort('')}>Clear</button>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className='products-container'>
          <h2>Products</h2>

          {loading ? (
            <div className='loader'>Loading...</div>
          ) : (
            <>
              <div className='flex-container'>
                {currentItems.map(product => (
                  <div key={product._id} className='product-card'>
                    <Link
                      to={`/product/${product.id}`}
                      className='product-image-link'
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className='product-image'
                      />
                    </Link>

                    <div className='product-info'>
                      <p>{product.name}</p>
                      <p>₹ {product.price}</p>
                      <p>⭐ {product.rating}</p>
                    </div>

                    {getQuantity(product._id) > 0 ? (
                      <div className='cart-buttons'>
                        <button onClick={() => removeFromCart(product._id)}>-</button>
                        <span>{getQuantity(product._id)}</span>
                        <button onClick={() => addToCart(product)}>+</button>
                      </div>
                    ) : (
                      <button onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* PAGINATION */}
              <div className='pagination'>
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  ←
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage(p => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  →
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Products;
