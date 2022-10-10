import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import Loader from './loader';

function AddRooms (){
    const [name, setname] = useState('')
    const [rentperday, setrentperday] = useState('')
    const [type, settype] = useState('')
    const [maxcount, setmaxcount] = useState('')
    const [description, setdescription] = useState('')
    const [imageurl1, setimageurl1] = useState('')
    const [imageurl2, setimageurl2] = useState('')
    const [imageurl3, setimageurl3] = useState('')
    const [success,setsuccess] = useState()
    const [loading,setloading] = useState()
    
    

    
    
     const roomaddition = async()=>{
        const newroom={
            name,
            type,
            rentperday,
            maxcount,
            description,
            imageurls:[imageurl1, imageurl2, imageurl3]
        }
      
      try {
          setloading(true)
        const result = await axios.post('/api/rooms/addroom', newroom)
        setloading(false)
        Swal.fire('Room successfully added', 'success')
      } catch (error) {
          setloading(false)
        Swal.fire('Error entering fields', 'error')
      }
      
         }
    return(
       
        <div>
             
            <div className="row">
                
                <div className="col-md-5">
                {loading&&<Loader/>}
                    <input type="text" className='form-control my-3' placeholder='Room Name' onChange={(e)=>setname(e.target.value)} />
                    <input type="text" className='form-control my-3' placeholder='Type' onChange={(e)=>settype(e.target.value)} />
                    <input type="text" className='form-control my-3' placeholder='Rent per day' onChange={(e)=>setrentperday(e.target.value)} />
                    <input type="text" className='form-control my-3' placeholder='Max Count' onChange={(e)=>setmaxcount(e.target.value)}/>
                    <input type="text" className='form-control my-3' placeholder='Description' onChange={(e)=>setdescription(e.target.value)} />
                </div>
                <div className="col-md-5">
                <input type="text" className='form-control my-3' placeholder='Image URL1' onChange={(e)=>setimageurl1(e.target.value)} />
                    <input type="text" className='form-control my-3' placeholder='Image URL2' onChange={(e)=>setimageurl2(e.target.value)}/>
                    <input type="text" className='form-control my-3' placeholder='Image URL3' onChange={(e)=>setimageurl3(e.target.value)} />
                </div>
                
            </div>
            <button className='btn btn-primary text-align-center mx-5' onClick={roomaddition}>Add Now</button>
        </div>
    )
}

export default AddRooms