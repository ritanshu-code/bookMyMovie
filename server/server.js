const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { registerSocketHandlers } = require("./socket/socketHandlers"); 

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    /\.vercel\.app$/
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
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

const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
    console.log(`Socket server running on port ${PORT}`);
});