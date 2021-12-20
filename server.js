const mongoose = require('mongoose');
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors');


// import route
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
}).then(con => {
    // console.log(con.connections);
    console.log('DB connection sucessful!');
})

// middleware
app.use(cors());
app.use(express.json());
// route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

// const roomSchema = new mongoose.Schema({
//     subject: {
//         type: String,
//         required: [true,"Subject cant be empty"]
//     },
//     assignment: {
//         type: Number,
//         default: 0
//     },
// })

// const Room = mongoose.model("Room", roomSchema)

// const testRoom = new Room({
//     subject: "Prolog",
//     assignment: 100,
// }) 

// testRoom.save().then(doc => {
//     console.log(doc);
// }).catch(err => {
//     console.log("ERROR!",err)
// })

app.listen(3001)