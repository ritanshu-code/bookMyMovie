import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL;

console.log("✅ SOCKET INIT:", URL);

export const socket = io(URL, {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("✅ CONNECTED TO:", socket.io.uri);
});