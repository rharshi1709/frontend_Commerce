import React from 'react'
import Navbar from '../Navbar/Navbar'
import './ContactUs.css'
import { useState } from 'react'
function ContactUs() {
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [message,setMessage]=useState('');
  const [err,setErr]=useState('')
  const onSubmitContact= async (event)=>{
   event.preventDefault()
   setErr('');
   try{
          const details = { name,phone,message };
      const url = "https://backend-commerce-1.onrender.com/api/contact";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(details),
      };
 const res = await fetch(url, options);
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert(res.message)
      } else {
        alert(data.message || "Invalid email or password")
        setErr(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
       alert("Network error or server is not responding")
      setErr("Network error or server is not responding");
    }
  }
  return (
    <div className='contact-top'>
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
<div>
  <form onSubmit={onSubmitContact()} class="contact-form">
    <h2>Send Us a Message</h2>
    <label for="name">Name</label>
    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} name="name" required />
    <label for="phone">Phone</label>
    <input type="number" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" required />
    <label for="message">Message</label>
    <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} name="message" rows="5" required></textarea>
    <p>{err}</p>
    <button type="submit">Submit</button>
  </form>
</div>

    </div>
  )
}

export default ContactUs
