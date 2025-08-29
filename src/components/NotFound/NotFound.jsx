import React from 'react'
import './NotFound.css'
import { useNavigate } from 'react-router'
function NotFound() {
    const navigate=useNavigate()
function goHome(){
    navigate('/', { replace: true })
}
  return (
    <div className='not-found'>
    <h1>404</h1>
    <h2>Oops! Page not Found</h2>
    <h3>The Page You requested could not be found</h3>
    <div>
        <button onClick={goHome}>Go Back to home</button>
    </div>
    </div>
  )
}

export default NotFound
