const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51KZKPeDZCmvHfyvkSm04PlLPXKuh2pCSpgy9JSvFfaItQOYQcEsTvkNcXoiI2Oku8yg84jxYK7hoMqVVT5ITPCbf00joEsEhXO"
);
const { v4: uuidv4 } = require("uuid");
const Booking = require("../models/booking");
const Room = require("./../models/room");
const moment = require("moment");

router.post("/bookroom", async (req, res) => {
  const {
    room,
    roomid,
    userid,
    fromdate,
    todate,
    totalamount,
    days,
    token,
  } = req.body;

  
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "pkr",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    res.send("payment successful");
  
    
  

  if (payment) {
    const newbooking = new Booking({
      room: room.name,
      roomid,
      userid,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      totalamount,
      days,
      transactionId: "1234",
    });
    const booking = await newbooking.save();

    const roomtemp = await Room.findOne({ _id: room._id });
    roomtemp.currentbookings.push({
      bookingid: booking._id,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      userid: userid,
      status: booking.status,
    });
    await roomtemp.save();
  }
});
router.post('/getbookingsbyuserid', async (req,res)=>{
const userid = req.body.userid;
try {
  const bookings = await Booking.find({userid:userid})
  res.send(bookings)
} catch (error) {
  return res.status(400).json({error})
}
})

router.post('/cancelbooking', async(req,res)=>{
  const {bookingid, roomid} = req.body;
  try {
    const bookingitem = await Booking.findOne({_id:bookingid})
    bookingitem.status='cancelled'
    await bookingitem.save()
    const room = await Room.findOne({_id:roomid})
    const bookingarr = room.currentbookings
    const temp = bookingarr.filter(booking=>booking.bookingid.toString()!==bookingid)
    room.currentbookings = temp;
    await room.save()
     res.send('Booking cancelled successfully')
  } catch (error) {
    
  }
})

router.get('/getallbookings', async(req, res)=>{
try {
  const bookings = await Booking.find()
  res.send(bookings)
} catch (error) {
  res.status.json(error)
}
})

module.exports = router;
