import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';

const Bookingscreens = () => {
  const [room, setroom] = useState([]);
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false)
  const [error, seterror] = useState(false)

  const { roomid } = useParams();
  const {fromdate} = useParams();
  const {todate} = useParams();
  
 
  var a = moment(fromdate,'DD-MM-YYYY');
  var b = moment(todate,'DD-MM-YYYY');

  var days = moment.duration(b.diff(a)).asDays()+1;
  const totalamount = room.rentperday*days;
  
  
  useEffect(() => {
    try {
      axios
        .post("http://localhost:5000/api/rooms/getroombyid", {
          roomid: roomid,
        })
        .then((response) => {
          setroom(response.data.room);
         
          setloading(false);
        });
    } catch (error) {
      console.log(error);
      
      setloading(false);
    }
  },[]);
  console.log(room.imageurls);

  async function onToken(token){
    console.log(token);
    const bookingDetails={
      room,
      roomid,
      userid : JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      days,
      token
    }
    
         console.log(roomid);
       await axios.post('/api/bookings/bookroom',bookingDetails)
    } 
  

  return (
    <div>
      
        <div>
          <div className="row">
            <div className="col-md-5 ms-2">
              <h5>{room.name}</h5>
              <img
                src={room.imageurls?.[0]}
                className="bigimg"
                alt=""
              />
            </div>
            <div className="col-md-6 justify-content-start">
              <h5>Booking Details</h5>
              <p>Name: {JSON.parse(localStorage.getItem('currentuser')).name} </p>
              <p>From Date:{fromdate} </p>
              <p>To Date: {todate} </p>
              <p>Total Days:{days} </p>
              <p>Max Count:{room.maxcount} </p>
           
              <div>
                <h5>Amount</h5>
                <p>Rent per day: {room.rentperday}</p>
                <p>Total Amount:{totalamount}</p>
                
                <StripeCheckout
        token={onToken}
        amount={totalamount*100}
        currency='PKR'
        stripeKey="pk_test_51KZKPeDZCmvHfyvkc95tjbYdZ1RM4kPITt8Nb2IrFnOmxv5bdFHD4QSNeKBqYOHtvFIfyDrTfzM18B1cmTAyfBwD00eQrE15Y0"
    >
      <button className="btn btn-primary">Pay now</button>
      </StripeCheckout>
              </div>
            </div>

            <div></div>
          </div>
        </div>
     
    </div>
  );
};

export default Bookingscreens;
