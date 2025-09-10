import React, { useEffect, useState, useContext } from 'react'
import './Products.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../CartContext.jsx'

function Products() {
  const { addToCart, removeFromCart, cart } = useContext(CartContext)

  const [categoryGrp, setCategoryGrp] = useState('all')
  const [category, setCategory] = useState([])
  const [products, setProducts] = useState([])

  const [name, setName] = useState('')
  const [sort, setSort] = useState('')

  const [loading, setLoading] = useState(true)

 
 const getQuantity = (id) => {
  const item = cart.find(p => p._id === id)
  return (item? item.count : 0)
}

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  let filteredArray = products

  if (name !== '') {
    filteredArray = filteredArray.filter(product => {
      const searchValue = name.toLowerCase()
      return product.name.toLowerCase().includes(searchValue)
    })
  }

  if (categoryGrp !== 'all') {
    filteredArray = filteredArray.filter(product => product.categoryId === categoryGrp)
  }

  if (sort !== '') {
    filteredArray = [...filteredArray].sort((a, b) => {
      if (sort === "priceLowHigh") return a.price - b.price
      if (sort === "priceHighLow") return b.price - a.price
      if (sort === "ratingLowHigh") return a.rating - b.rating
      if (sort === "ratingHighLow") return b.rating - a.rating
      return 0
    })
  }

  const totalPages = Math.ceil(filteredArray.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredArray.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [name, categoryGrp, sort])

  // fetch products
  useEffect(() => {
    async function getProducts() {
      setLoading(true)
      try {
        const url = 'https://backend-commerce-1.onrender.com/api/products'
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        setProducts(data.data)
      } catch (error) {
        alert(error)
      }
      setLoading(false)
    }
    getProducts()
  }, [])

  useEffect(() => {
    async function getCategory() {
      try {
        const url = 'https://backend-commerce-1.onrender.com/api/category'
        const response = await fetch(url)
        const data = await response.json()
        setCategory(data.data)
      } catch (error) {
        console.error(error)
      }
    }
    getCategory()
  }, [])

  return (
    <div className='product'>
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
          <a onClick={() => setCategoryGrp("all")}>All</a>
          {category.map((item) => (
            <div key={item._id}>
              <a onClick={() => setCategoryGrp(item.category.toLowerCase())}>
                {item.category}
              </a>
            </div>
          ))}
        </div>

        <div className='sort'>
          <h3>Sort By</h3>
          <a onClick={() => setSort('ratingLowHigh')}> Rating (low - high)</a>
          <a onClick={() => setSort('ratingHighLow')}> Rating (high - low)</a>
          <a onClick={() => setSort('priceLowHigh')}> Price (low - high)</a>
          <a onClick={() => setSort('priceHighLow')}> Price (high - low)</a>
          <a onClick={() => setSort('')}>Remove Sorting</a>
        </div>
      </div>

      <div className='products-container'>
        <h2>Products</h2>

        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <>
            <div className="flex-container">
              {currentItems.map((product) => (
                <div key={product._id} className='product-card'>
                  <Link to={`/product/${product._id}`}>
                    <img src={product.image} alt={product.name} />
                    <p>{product.name}</p>
                    <p>Price: {product.price}</p>
                    <p>Rating: {product.rating}</p>
                  </Link>

                  {getQuantity(product._id) > 0 ? (
                    <div className="cart-buttons">
                      <button onClick={() => removeFromCart(product._id)}>-</button>
                      <span>{getQuantity(product._id)}</span>
                      <button onClick={() => addToCart(product)}>+</button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                  )}
                </div>
              ))}
            </div>

            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &#8592;
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                &#8594;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Products
