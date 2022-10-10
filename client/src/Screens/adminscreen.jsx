import React from 'react'
import { Tabs } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import success from '../Components/success';
import AddRooms from '../Components/Addroom';
import Loader from '../Components/loader';

const { TabPane } = Tabs;
const adminscreen = () => {
  return (
    <div>
        <h3 className='m-3'>Admin Panel</h3>
        
        <Tabs defaultActiveKey="1" className='m-3'>
    <TabPane tab="Bookings" key="1" className='m-3'>
      <Bookings/>
    </TabPane>
    <TabPane tab="Rooms" key="2">
    <Rooms/>
    </TabPane>
    <TabPane tab="Add Room" key="3">
    
      <AddRooms/>
    </TabPane>
    <TabPane tab="Users" key="4">
        <Users/>
    </TabPane>
  </Tabs>
        </div>
  )
}

export default adminscreen

export function Bookings(){
    const[bookings, setbookings] = useState([])
    const [loading, setloading] = useState()

    useEffect(async()=>{
        try {
            setloading(true)
            const data = await axios.get('api/bookings/getallbookings')
            setbookings(data.data);
            setloading(false)

        } catch (error) {
            console.log(error);
        }
    },[])
    return(
        <div>
            <h5>Bookings</h5>
            {loading && (<Loader/>)}
            <table className='table table-bordered table-dark'>
                <thead>
                <tr>
                    <th>Booking ID</th>
                    <th>User ID </th>
                    <th>Room</th>
                    <th>From </th>
                    <th>To </th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    {bookings.length && bookings.map(booking=>(
                        <tr  className='mx-2'>
                        <td>{booking._id}</td>
                        <td>{booking.userid}</td>
                        <td>{booking.room}</td>
                        <td>{booking.fromdate}</td>
                        <td>{booking.todate}</td>
                        <td>{booking.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


export function Rooms(){
    const[rooms, setrooms] = useState([])
    const[loading,setloading] = useState()

    useEffect(async()=>{
        try {
            setloading(true)
            const data = await axios.get('api/rooms/getallrooms')
            setrooms(data.data.rooms);
            console.log(data.data);
            setloading(false)
        } catch (error) {
            console.log(error);
        }
    },[])
    return(
        <div>
            <h5>Rooms</h5>
            {loading && <Loader/>}
            <table className='table table-bordered table-dark'>
                <thead>
                <tr>
                    <th>Room ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    
                    <th>Rent per day </th>
                    <th>Max Count</th>
                </tr>
                </thead>
                <tbody>
                    {rooms.length && rooms.map(room=>(
                        <tr  className='mx-2'>
                        <td>{room._id}</td>
                        <td>{room.name}</td>
                        <td>{room.type}</td>
                        <td>{room.rentperday}</td>
                        <td>{room.maxcount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export function Users(){
    const[users, setusers] = useState([])
    const[loading, setloading] = useState([])

    useEffect(async()=>{
        try {
            setloading(true)
            const data = await axios.get('api/users/getallusers')
            setusers(data.data);
            setloading(false)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    },[])
    return(
        <div>
            <h5>Users</h5>
            {loading && <Loader/>}
            <table className='table table-bordered table-dark'>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Isadmin</th>
                </tr>
                </thead>
                <tbody>
                    {users.length && users.map(user=>(
                        <tr  className='mx-2'>
                        
                        <td>{user.name}</td>
                        <td>{user._id}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin?'Yes':"No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

