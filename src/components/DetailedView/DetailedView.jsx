import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import './DetailedView.css'
import Navbar from '../Navbar/Navbar'
function DetailedView() {
    const [product,setProduct]= useState([])
    const {id }= useParams()
     useEffect(() => {
       try{
         const getProduct = async () => {
           const url=`https://backend-commerce-mf9d.onrender.com/api/product/${id}`
           const response =await fetch(url)
           const data=await response.json()
           console.log(data)
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
<Navbar/>
      <div className="products-card">
        <img src={product.image}/>
        <div><h2>
            PRODUCT NAME:
           
        </h2>
        <p> {product.name}</p>
        <h2>
            DESCRIPTION:
        </h2>
        <p>{product.description}</p>
        <h2>
            PRICE:
            
        </h2>
        <p> ₹{product.price}</p>
         <h2>
            RATING:
             
        </h2>
        <p>⭐{product.rating}</p>
        <button>Add to Cart</button>
        </div>
        
      </div>
    </div>
  )
}

export default DetailedView
