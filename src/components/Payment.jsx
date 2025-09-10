import React from 'react'
import './Payment.css'
import { Navigate, useNavigate } from 'react-router'
function Payment() {
    const navigate= useNavigate()
  return (
    <div className='payment'>
      <div className='payment-card'>
      <img src="https://funtura.in/wp-content/themes/funtura/assets/images/success.svg" alt="payment-image"/>
      <h2>Your Payment is Successfull</h2>
      <h3>Your transaction was completed successfully. Thank you for your purchase</h3>
<button className='payment-button' onClick={()=>{
navigate("/")
}} >
        Go Back To HomePage
        </button>
      </div>

    </div>
  )
}

export default Payment
