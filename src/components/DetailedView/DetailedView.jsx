import React from 'react'
import { useState } from 'react'
import './index.css'
import { useEffect } from 'react'
import { useParams } from 'react-router'

function DetailedView() {
    const [product,setProduct]= useState([])
    const {id }= useParams()
     useEffect(() => {
       try{
         const getProduct = async () => {
           const url=`https://backend-commerce-1.onrender.com/api/product/${id}`
           const response =await fetch(url)
           const data=await response.json()
           console.log(response)
           setProduct(data.data)
        };
        getProduct();
       }
       catch(e){
        console.log(e)
       }
     }, [id])
     console.log(product)
  return (
    <div className='detail-view'>

    <div className="products-card">
  <img src={product.image} alt={product.name} />
  <div className="product-details">
    <h2>PRODUCT NAME:</h2>
    <p>{product.name}</p>
    <h2>DESCRIPTION:</h2>
    <p>{product.description}</p>
    <h2>PRICE:</h2>
    <p>₹{product.price}</p>
    <h2>RATING:</h2>
    <p>⭐{product.rating}</p>
    <button>Add to Cart</button>
  </div>
</div>

    </div>
  )
}

export default DetailedView
