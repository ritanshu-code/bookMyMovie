const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { registerSocketHandlers } = require("./socket/socketHandlers"); 

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);
    registerSocketHandlers(socket, io); 
    socket.on("disconnect", (reason) => {
        console.log("user disconnected:", socket.id, reason);
    });
});

server.listen(5000, () => {
    console.log("Socket server running on port 5000");
});