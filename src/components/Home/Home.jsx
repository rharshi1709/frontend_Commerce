import React from 'react'

import './Home.css'
import { Navigate, useNavigate } from 'react-router'
function Home() {
  const navigate=useNavigate()
  const goRegister=()=>{
     navigate('/register',{replace:true})
  }
   const goLogin=()=>{
     navigate('/login',{replace:true})
  }
  return (
   
    <div>
   
  <div className='home'>
     <div className='home'>
        <h1>Welcome to Our Website</h1>
        <p>
          Your one-stop platform for shopping, browsing, and exploring.  
          Join us today and start your journey with ease.
        </p>

        <div className="home-buttons">
          <button className="btn" onClick={goLogin}>Login</button>
          <button className="btn btn-secondary" onClick={goRegister}>Register</button>
        </div>
      </div>
  </div>
    </div>
  )
}

export default Home
