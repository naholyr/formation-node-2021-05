import http from "http";
import { app } from "./app.mjs";
import { Server } from "socket.io";
import { getUsernameFromToken } from "./lib/model/user.mjs";
import { addMessage, listMessages } from "./lib/model/message.mjs";
// 3002

const server = http.createServer(app);
const io = new Server(server);

server.listen(3002);

io.on("connection", (socket) => {
  initWebsocket(io, socket);
});

const initWebsocket = (io, socket) => {
  let username;

  socket.on("login", async (token) => {
    let message;
    try {
      username = await getUsernameFromToken(token);
      socket.emit("login-success", username);
      message = {
        room: "#general",
        message: "est connecté.",
        username: username,
        date: Date.now(),
        system: true,
      };
      addMessage(message);
      io.emit("recv-message", message);
    } catch (error) {
      socket.emit("login-error", error);
    }
  });

  socket.on("send-message", (content) => {
    let message = {
      room: content.room,
      message: content.message,
      username: username,
      date: Date.now(),
    };
    addMessage(message);
    io.emit("recv-message", message);
  });

  socket.on("get-messages", async (room, cb) => {
    const messages = await listMessages(100, room);
    cb(messages);
  });
};
