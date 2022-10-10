import React from "react";
import Navbar from "./Components/Navbar";
import Homescreen from "./Screens/Homescreen";
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import './App.css'
import BookingScreens from './Screens/Bookingscreens';
import Register from "./Screens/Register";
import Login from "./Screens/Login";
import Profile from "./Screens/profile";
import Adminscreen from "./Screens/adminscreen";
import Loader from "./Components/loader";




function App() {
  
  return (
    <div className="App">
        <Navbar/>
        <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Homescreen/>} />
        <Route exact path="/book/:roomid/:fromdate/:todate" element={<BookingScreens/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/admin" element={<Adminscreen/>} />
        <Route exact path="/loader" element={<Loader/>} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
