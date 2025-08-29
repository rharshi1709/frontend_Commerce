import React from 'react'
import Navbar from '../Navbar/Navbar'
import './ContactUs.css'
function ContactUs() {
  return (
    <div>
        <Navbar/>
     <div class="contact-container">
  <h2>Contact Us</h2>
  <p>
    We’re here to help! If you have any questions or need support,
    feel free to reach out to us.
  </p>

  <div class="contact-info">
    <div class="contact-box">
      <h3>📞 Phone</h3>
      <p>+91 98765 43210</p>
    </div>

    <div class="contact-box">
      <h3>📧 Email</h3>
      <p>support@yourstore.com</p>
    </div>

    <div class="contact-box">
      <h3>📍 Address</h3>
      <p>123 Main Street, Hyderabad, Telangana, India</p>
    </div>
  </div>
</div>


    </div>
  )
}

export default ContactUs
