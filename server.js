const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const mongoose = require("mongoose")
const { Socket } = require("dgram")

const server = express()
const httpServer = http.createServer(server)
const io = socketio(httpServer)

io.on("connection", (socket)=>{
    console.log("new connection arrived", socket.id)
    
    socket.on("join", (options)=>{
        console.log("JOINED! ", options)
    })
    
    socket.on("leave", ()=>{})
    
    socket.on("message", ()=>{})
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
