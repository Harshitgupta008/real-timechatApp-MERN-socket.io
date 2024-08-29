import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
const app = express();
const port = 3000;

const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection",(socket)=>{
    // console.log(socket.id)

    socket.on("message",({message,room})=>{
        // socket.broadcast.emit("Usermessage",message);
        socket.to(room).emit("Usermessage",message);
    })
    
});

server.listen(port, () => {
    console.log("server run on port no. :: " + port);
});
