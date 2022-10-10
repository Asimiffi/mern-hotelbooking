const { connection } = require('mongoose');
const mongoose= require('mongoose');
var mongoURL = 'mongodb+srv://asim:asim>@cluster0.m9eim.mongodb.net/mern-rooms?retryWrites=true&w=majority';

mongoose.connect(mongoURL, {useUnifiedTopology:true, useNewURLParser: true})

connection.on('error',()=>{
    console.log('MongoDB connection failed')
})
connection.on('Connected',()=>{
    console.log('MongoDB connection successfull')
})

module.exports = mongoose