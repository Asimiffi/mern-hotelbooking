import { useState } from "react"
import React from 'react'
import axios from "axios"
import Errorlogin from '../Components/errorlogin'

const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('') 
    const [loading, setloading] = useState(false) 
    const [errorlogin, seterrorlogin] = useState()
    async function loginhandle(){
         
        const user={
            email,
            password
        }
        try {
            setloading(true)
            const result = await axios.post('/api/users/login', user)
            localStorage.setItem('currentUser', JSON.stringify(result.data))
            setloading(false)
            window.location.href='/'

         } catch (error) {
            console.log(error);
            seterrorlogin(true)
             }
            
            
        }
          
   
  return (
      
    <div>
        <div className="row justify-content-center mt-5">
            <div className="col-md-5">
                {errorlogin && (<Errorlogin/>)}
                <h1>Login</h1>
                <div className='bs'>
                <input type="text" className='form-control input' onChange={(e)=>setemail(e.target.value)} placeholder='email' />
                <input type="password" className='form-control input' onChange={(e)=>setpassword(e.target.value)} placeholder='password' />
                <button className='btn btn-primary register-btn' onClick={loginhandle}>Login</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Login