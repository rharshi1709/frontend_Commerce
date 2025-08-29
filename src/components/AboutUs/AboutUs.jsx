import React from 'react'
import Navbar from '../Navbar/Navbar'
import './AboutUs.css'

function AboutUs() {
  return (
    <div className='about-section'>
      <Navbar/>
      <div>
        <div className="about">
          <img 
            src="https://static.fibre2fashion.com//articleresources/images/76/7511/ecommerce-Small_Small.jpg" 
            alt="about"
          />
          <div className='text'>
            <h2>About Us</h2>
            <p>
              Welcome to <span>ShopEasy</span>, your one-stop shop for electronics, clothing, toys, home décor, and more.<br/>
              We make shopping easy, enjoyable, and affordable with high-quality products, fast delivery, and secure payments.<br/>
              Shop with confidence and discover products that make life better.
            </p>
          </div>
        </div>

        <div className='about2'>
          <h2>Meet Our Members</h2>
          <div className="members-container">
            
            <div className="card">
              <img src="https://i.pravatar.cc/150?img=11" alt="Aarav"/>
              <h3>Aarav Sharma</h3>
              <p className="role">Lead Designer</p>
              <p className="bio">
                Aarav brings creativity and innovation to ShopEasy with 7+ years of experience in UX/UI design.
              </p>
            </div>

            <div className="card">
              <img src="https://i.pravatar.cc/150?img=32" alt="Isha"/>
              <h3>Isha Patel</h3>
              <p className="role">Founder & Visionary</p>
              <p className="bio">
                Isha founded the company to make online shopping accessible, affordable, and enjoyable for everyone.
              </p>
            </div>

            <div className="card">
              <img src="https://i.pravatar.cc/150?img=5" alt="Rohan"/>
              <h3>Rohan Gupta</h3>
              <p className="role">Marketing Lead</p>
              <p className="bio">
                Rohan heads the marketing team with expertise in digital campaigns and brand storytelling. 
               
              </p>
            </div>

          </div>
        </div>

        <div className="feedback-section">
          <h2>Feedback from Our Customers</h2>
          <div className="feedback-container">

            <div className="feedback-card">
              <img src="https://i.pravatar.cc/100?img=21" alt="Priya"/>
              <h3>Priya Mehta</h3>
              <p className="rating">⭐⭐⭐⭐⭐</p>
              <p className="review">
                "ShopEasy made online shopping so simple and reliable! 
                The delivery was super fast, and the products were exactly as shown. Highly recommended!"
              </p>
            </div>

            <div className="feedback-card">
              <img src="https://i.pravatar.cc/100?img=34" alt="Arjun"/>
              <h3>Arjun Verma</h3>
              <p className="rating">⭐⭐⭐⭐</p>
              <p className="review">
                "Great variety of products at affordable prices. 
                The secure payment system gave me peace of mind while shopping."
              </p>
            </div>

            <div className="feedback-card">
              <img src="https://i.pravatar.cc/100?img=45" alt="Neha"/>
              <h3>Neha Singh</h3>
              <p className="rating">⭐⭐⭐⭐⭐</p>
              <p className="review">
                "I love how easy the website is to use. The design is clean, 
                and I always find what I need without wasting time."
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default AboutUs
