import React from 'react'
import { useState, useEffect} from "react";
import axios from 'axios'
import Room from '../Components/room';
import Loader from '../Components/loader';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment'
import Error from '../Components/error';





const Homescreen = () => {
  const { RangePicker } = DatePicker;
  const[rooms,setrooms]=useState([])
  const[loading,setloading]=useState(false)
  const[error,seterror]=useState()
  const[fromDate, setfromDate] = useState('')
  const[toDate, settoDate] = useState('')
  const[duplicateRooms, setduplicateRooms] = useState([])
  const [searchkey, setsearchkey] = useState('')


  useEffect(async ()=>{
    
     try {
        setloading(true)
        const data = (await axios.get('http://localhost:5000/api/rooms/getallrooms')).data
            setrooms(data.rooms)
            setduplicateRooms(data.rooms)
            setloading(false)
     } catch (error) {
         seterror(true)
         setloading(false)
        }
    },[])

    function filterbyDate(dates)
    {
        setfromDate(moment(dates[0]).format('DD-MM-YYYY'));
        settoDate(moment(dates[1]).format('DD-MM-YYYY'));
        
        var temprooms = [];
        var availability = false;
        for (const room of duplicateRooms){
            if(room.currentbookings.length>0){
                for(const booking of room.currentbookings){
                if(
                    !moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(
                            booking.fromdate,
                            booking.todate
                            )
                            &&
                        !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(
                            booking.fromdate,
                            booking.todate
                            ))
                           {
                             if(        
                
                
                moment(dates[0]).format('DD-MM-YYYY') !==booking.fromdate &&
                moment(dates[0]).format('DD-MM-YYYY') !==booking.todate &&
                moment(dates[1]).format('DD-MM-YYYY') !==booking.fromdate &&
                moment(dates[1]).format('DD-MM-YYYY') !==booking.todate )
                {
                    availability=true
                }    
        
    }
}}
    if (availability==true || room.currentbookings.length ==0)
    {temprooms.push(room);
      console.log(room.currentbookings.length);
    
}
setrooms(temprooms)
}
console.log(temprooms) 
}



function filterbysearch(){
    const temprooms = duplicateRooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setrooms(temprooms)
}   
function filterbyType(e){

if(e!=='all'){
    const temprooms = duplicateRooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
    setrooms(temprooms)
}
else{
    setrooms(duplicateRooms)
}
}


  return (
    <div className="container">
        <div className="row mt-5">
            <div className="col-md-3">
                <RangePicker format="DD-MM-YYYY" onChange={filterbyDate}/>
            </div>
            <div className="col-md-5">
                <input type="text" className='form-control' placeholder='search rooms'
                onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterbysearch}/>
            </div>
            <div className="col-md-3">
                <select name="" id="" onChange={(e)=>{filterbyType(e.target.value)}}>
            <option value='all'>All</option>
            <option value='Delux'>Delux</option>
            <option value='Non-delux'>Non-delux</option>
            </select>
            </div>
        </div>
      <div
        className="row justify-content-center mt-5"
        style={{ topMargin: "50px" }}
      >
         {error && (<Error/>)}
        {loading &&(<Loader/>)}
        { 
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} fromdate={fromDate} todate={toDate}/>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default Homescreen