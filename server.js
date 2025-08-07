const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');


const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // The origin of your Next.js app
    methods: ["GET", "POST"]
  }
});
const port = 3000;

app.use(express.json());
app.use(cors());

io.on("connection",(socket)=>{
    console.log("User connected.");

    socket.on("chat-message", ({roomName, msg})=>{
        console.log("received msg "+ msg);
        io.to(roomName).emit("chat-message", msg);
    })

    socket.on("join-room", (room)=>{
        socket.join(room);
        socket.emit("joined", room);
        io.to(room).emit("newUser", socket.id)
    })

    socket.on('disconnect',()=>{
        console.log("User disconnected.")
    })
})


const controlRooms = require("./controllers/controllers")

app.use("/rooms", controlRooms)



app.get("/", (req,res)=>{
    res.send("Home page")
})

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); 

