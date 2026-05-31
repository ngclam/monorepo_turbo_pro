import { Server } from "socket.io";

const io = new Server(4000, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.emit("server:message", "Monitor đã kết nối tới Socket.IO server");

  const timer = setInterval(() => {
    socket.emit("server:message", `Heartbeat từ server: ${new Date().toLocaleTimeString("vi-VN")}`);
  }, 3000);

  socket.on("disconnect", () => {
    clearInterval(timer);
    console.log(`Client disconnected: ${socket.id}`);
  });
});

console.log("Socket.IO server running at http://localhost:4000");
