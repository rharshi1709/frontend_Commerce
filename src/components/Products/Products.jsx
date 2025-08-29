import React, { useEffect, useState } from 'react'
import './Products.css'

import { Link } from 'react-router'
function Products() {
  const [categoryGrp, setCategoryGrp] = useState('all')
  const [category, setCategory] = useState([])
  const [products, setProducts] = useState([])

  const [name, setName] = useState('')
  const [sort, setSort] = useState('')

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // filter + search + sort
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

  // pagination calculation
  const totalPages = Math.ceil(filteredArray.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredArray.slice(startIndex, endIndex)

  // reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [name, categoryGrp, sort])

  // fetch products
  useEffect(() => {
    async function getProducts() {
      const url = 'https://backend-commerce-mf9d.onrender.com/api/products'
      const response = await fetch(url)
      const data = await response.json()
      setProducts(data.data)
    }
    getProducts()
  }, [])

  // fetch categories
  useEffect(() => {
    async function getCategory() {
      const url = 'https://backend-commerce-1.onrender.com/api/category'
      const response = await fetch(url)
      const data = await response.json()
      setCategory(data.data)
    }
    getCategory()
  }, [])

  return (
    <>
      
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
            <a onClick={() => setSort('')}>RemoveSorting</a>
          </div>
        </div>

        <div className='products-container'>
          <h2>Products</h2>
          <div className="flex-container">
            {currentItems.map((product) => (
              <Link to={`/product/${product.id}`}><div className='product-card' key={product._id}>
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
                <p>Price: {product.price}</p>
                <p>Rating: {product.rating}</p>
              
              </div></Link>
              
            ))}
          </div>

         <div className="pagination">
  <button
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
  >
    &#8592; {/* Left Arrow */}
  </button>

  <span>
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
  >
    &#8594; {/* Right Arrow */}
  </button>
</div>


        </div>
      </div>
    </>
  )
}

export default Products
