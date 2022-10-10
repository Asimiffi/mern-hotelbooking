import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../Components/loader";
import Error from "../Components/error";
import Success from "../Components/success";
import Swal from 'sweetalert2'

const Profile = () => {
  const { TabPane } = Tabs;
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState();
  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(async () => {
    try {
       setloading(true)
      const rooms = await axios.post(
        "api/bookings/getbookingsbyuserid",
        { userid: user._id }
      );
      
      setbookings(rooms.data);
      setloading(false)
    } catch (error) {
        setloading(false)
      seterror(true)
    }

    if (!user) {
      window.location.href = "/login";
    }
  }, []);



  async function cancelBooking(bookingid, roomid) {
    try {
        setloading(true);
        console.log(loading);
    const result = await axios.post("api/bookings/cancelbooking", {
      bookingid,
      roomid,
    }).data;
    setloading(false);
    Swal.fire('Successfully cancelled booking', "success").then(result=>{window.location.reload()})
    } catch (error) {
        console.log(error);
        Swal.fire('Error cancelling','error')
    }
  }
 
  

  return (
    <div>
      
      
        <Tabs defaultActiveKey="1">
          <TabPane tab="Profile" key="1">
            <h1>My Profile</h1>
            <div style={{ textAlign: "left", lineHeight: "60px" }}>
              <span style={{ fontWeight: "bold" }}> Name: </span>{" "}
              {user.name}
            </div>
            <div style={{ textAlign: "left" }}>
              {" "}
              <span style={{ fontWeight: "bold" }}>
                {" "}
                Email:{" "}
              </span>: {user.email}
            </div>
          </TabPane>
          
          
              <TabPane tab="Bookings" key="2">
                      <h1>My Bookings</h1>
              {loading &&(<Loader/>)}
              {error &&(<Error/>)}
              {   bookings.map((booking) => (
                <div className="row">
                  <div className="col-md-5">
                  
                    <div
                      className="card bg-light mb-3"
                      style={{ width: "32rem" }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{booking.room}</h5>
                        {loading && <Loader/>}
                        <p className="card-text">
                          Booking ID: {booking._id}
                        </p>
                        <p className="card-text">
                          Check In: {booking.fromdate}
                        </p>
                        <p className="card-text">
                          Check Out: {booking.todate}
                        </p>
                        <p className="card-text">
                          Amount: {booking.totalamount}
                        </p>
                        <p className="card-text">
                          Status: {booking.status}
                        </p>
                        {booking.status == "booked" ? (
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              cancelBooking(booking._id, booking.roomid)
                            }
                          >
                            Cancel Booking
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
            </TabPane>
       
          
        </Tabs>
      
    </div>
  );
};

export default Profile;
