const express = require("express")
const { chats} = require('./data.js')
const app = express()
const dotenv = require('dotenv')
const connectDB = require("./config/db.js")
const userRoutes = require("./routes/userRoutes.js")
const {notFound, errorHandler} = require("./middleware/errorMiddleware.js")
const chatRoutes = require("./routes/chatRoutes.js")
const messageRoutes = require("./routes/messageRoutes")
const cors = require('cors')

const subjectRoutes = require("./routes/subjectRoutes")
const fileRoutes = require("./routes/fileRoutes")

dotenv.config()
connectDB()

app.use(cors())
app.use(express.json())

app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/subject", subjectRoutes)
app.use("/api/file", fileRoutes)

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000
const server = app.listen(5000,console.log('server start on port 5000 '))

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
      console.log("socket connected")
      socket.on('setup', (userData) => {
          socket.join(userData._id)
          socket.emit('connected')
      })

      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined " + room)
      });

//       socket.on("typing", (room) => socket.in(room).emit("typing"))
//       socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))

      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;

          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });
  })