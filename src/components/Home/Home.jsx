import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
function Home() {
  const navigate = useNavigate()
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload()
    },10000000) // 30 minutes in milliseconds

    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const url = 'https://backend-commerce-1.onrender.com/api/products'
        const response = await fetch(url)
        const data = await response.json()
        
        if (data.data) {
          const featured = data.data
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 6)
          setFeaturedProducts(featured)
        }
      } catch (error) {
        console.log('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <div className='home-hero'>
        <Navbar/>

        <div className='hero-content'>
          <h1>Welcome to ShopEasy</h1>
          <p>
            Your one-stop platform for quality products at unbeatable prices.
            Discover amazing deals and shop with confidence.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/products')}>
              Shop Now
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/about')}>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className='featured-section'>
        <h2>Featured Products</h2>
        <p className='section-subtitle'>Top-rated products you'll love</p>

        {loading ? (
          <div className="loader">Loading featured products...</div>
        ) : featuredProducts.length > 0 ? (
          <div className='featured-grid'>
            {featuredProducts.map((product) => (
              <Link 
                key={product._id} 
                to={`/product/${product.id}`}
                className='featured-card'
              >
                <div className='product-image'>
                  <img src={product.image} alt={product.name} />
                  <span className='product-badge'>★ {product.rating}</span>
                </div>
                <div className='card-content'>
                  <h3>{product.name}</h3>
                  <p className='product-price'>₹{product.price}</p>
                  <button className='view-btn'>View Details</button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className='no-products'>No products available</p>
        )}
      </div>

      {/* Benefits Section */}
      <div className='benefits-section'>
        <h2>Why Shop with Us?</h2>
        <div className='benefits-grid'>
          <div className='benefit-card'>
            <div className='benefit-icon'>🚚</div>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable shipping to your doorstep</p>
          </div>
          <div className='benefit-card'>
            <div className='benefit-icon'>💰</div>
            <h3>Best Prices</h3>
            <p>Competitive pricing on all our products</p>
          </div>
          <div className='benefit-card'>
            <div className='benefit-icon'>✅</div>
            <h3>Quality Assured</h3>
            <p>All products are carefully selected and verified</p>
          </div>
          <div className='benefit-card'>
            <div className='benefit-icon'>🛡️</div>
            <h3>Secure Shopping</h3>
            <p>Safe and secure checkout process</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
