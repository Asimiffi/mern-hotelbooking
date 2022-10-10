import React, { useState } from "react";
import "../App.css";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const Room = ({ room, fromdate, todate }) => {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <div className="row bs">
        <div className="col-md-4">
          <img className="small-img" src={room.imageurls[0]} alt="" />
        </div>
        <div className="col-md-8">
          <h5>{room.name}</h5>
          <p>Max Count: {room.maxcount}</p>
          <p>Phone Number: {room.phonenumber}</p>
          <p>Type: {room.type}</p>
        </div>
           
        <div style={{ float: "right !important" }}>
        {(fromdate && todate)&&
         (<Link to={`/book/${room._id}/${fromdate}/${todate}`}>

         <button className="btn btn-primary me-2">Book Now</button>
       </Link>)} 
         
          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map((url) => (
              <Carousel.Item>
                <img className="d-block w-100 bigimg" src={url} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Room;
