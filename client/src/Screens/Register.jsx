import axios from 'axios'
import Loader from '../Components/loader'
import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2';

const Register = () => {
    const [name,setname] =useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('') 
    const [cpassword, setcpassword] = useState('') 
    const [error, seterror] = useState(false)
    const [success, setsuccess] = useState(false)
    const [loading, setloading] = useState()
    

    async function registerhandle(){
        if (password===cpassword)
        {
            const user={
                name,
                email,
                password,
                cpassword
            }
            try {
                setloading(true)
                const result = await axios.post('/api/users/register', user).data
                setloading(false)
                
                Swal.fire('User created successfully', 'success')
                window.location.href='/login'
            } catch (error) {
                console.log(error);
            }
        }
            else{
                alert('password not matched')
            }
            
        }
          
   
  return (
      
    <div>
        <div className="row justify-content-center mt-5">
            <div className="col-md-5">
                <h1>Register</h1>
                {loading && <Loader/>}
                <div className='bs'>
                <input type="text" className='form-control input' onChange={(e)=>setname(e.target.value)} placeholder='name' />
                <input type="text" className='form-control input' onChange={(e)=>setemail(e.target.value)} placeholder='email' />
                <input type="password" className='form-control input' onChange={(e)=>setpassword(e.target.value)} placeholder='password' />
                <input type="text" className='form-control input' onChange={(e)=>setcpassword(e.target.value)} placeholder='confirm password' />
                <button className='btn btn-primary register-btn' onClick={registerhandle}>Register</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Register