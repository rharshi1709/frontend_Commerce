import React from 'react'
import './Login.css'
import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

function Login() {

    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    const navigate=useNavigate()
    const  [error,setError]=useState('')
    const onSuccess=(token)=>{

    Cookies.set('jwt_token', token, {expires: 30})
       navigate("/", { replace: true });
    }
    const onSubmitForm = async (event)=>{
        event.preventDefault()
        try{
            const userDetails ={email,password}
        const url='https://backend-commerce-mf9d.onrender.com/api/login'
        const options={
             method: "POST",
             headers: {
    "Content-Type": "application/json"
  },

      body: JSON.stringify(userDetails),
        }
        const res =await fetch(url,options)
        const data= await res.json()
        if (res.ok){
         const token = data.jwToken
          onSuccess(token)
        }
        else{
             setError(data?.message || "Something went wrong. Please try again.");
        }
        }
        catch(err){
            alert(err)
        }
    }
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
  if (jwtToken !== undefined) {
  return <Navigate to="/" replace />
  }

  return (
    <div className='form'>
        <div className='card'>
            <h1>Login Form</h1>
            <form onSubmit={onSubmitForm}>
                <div className='item'>
                <label htmlFor="email">EMAIL</label>
                <input className='input'  id="email" value={email} type="email" required placeholder='Enter your email' onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
           </div>
             <div className='item'>
                <label htmlFor="pass">PASSWORD</label>
                <input className='input' id="pass" value={password} type="password" required placeholder='Enter your password' onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
           </div>
           <p>If you don't have an account ? please Register </p>
           <div className='buttons'>
            <button type="submit">Submit</button>
         <button type="button" onClick={()=>{
            navigate('/register',{replace:true})
         }}>Register</button>
           </div>
           <p className='error-message'>{error}</p>
            </form>
        </div>
    </div>
  )
}

export default Login
