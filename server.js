const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const mongoose = require("mongoose")
const { Socket } = require("dgram")

const server = express()
const httpServer = http.createServer(server)
const io = socketio(httpServer)

const { saveUserInRoom } = require("./usersUtils")
io.on("connection", (socket)=>{
    console.log("new connection arrived", socket.id)
    
    socket.on("join", async (options)=>{
        console.log("JOINED! ", options)
        await saveUserInRoom({
            roomName: options.room,
            username: options.username,
            id: socket.id
        })
        
        socket.join(options.room)
        
        socket.emit("message", {
            sender: "Admin",
            text: "Welcome",
            createdAt: new Date(),
        })
        
        socket.broadcast.to(options.room).emit("message", {
            sender: "Admin",
            text: `${options.username} joined the channel!`,
            createdAt: new Date(),
        })
        
        const list = []
        
        io.to(options.room).emit("roomData", {room: options.room, members: list})
    })
    
    socket.on("leave", ()=>{})
    
    socket.on("sendMessage", async()=>{
        
    })
})

const port = process.env.PORT || 3002

mongoose.connect(process.env.MONGO_CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(
    httpServer.listen(port, () =>{
        console.log(`Server listening on Port ${port}`)
    })
)
