const http = require("http");
const app = require("./app");
const socketio = require("socket.io");
const { getUsernameFromToken } = require("./lib/model/users");
const { addMessage, listMessages } = require("./lib/model/messages");

const server = http.createServer(app);

server.on("listening", () => {
  console.log("Server ready: http://localhost:" + process.env.PORT);
});

server.listen(Number(process.env.PORT));

const io = socketio();

io.listen(server);

io.on("connection", (socket) => {
  initWebsocket(io, socket);
});

// TODO: module
const initWebsocket = (io, socket) => {
  // socket.emit('nom', ...args) => envoyer au client
  // socket.on('nom', cb) => appelle le callback quand le client envoie

  // socket.emit('nom', ...args, cb) => envoyer au client + callback
  // socket.on('nom', (...args, cb) => {}) => appelle le callback quand le client envoie

  // io.emit('nom', ...args) => envoyer à tous les clients
  // socket.broadcast.emit('nom', ...args) => envoyer à tous clients sauf socket

  // socket.join('groupe') => range le socket dans un groupe
  // socket.leave('groupe') => retire le socket du groupe
  // io.to('groupe').emit() => envoyer à tous les sockets du groupe
  // socket.broadcast.to('groupe').emit() => envoyer à tous les sockets du groupe sauf socket
  // io.to('groupe1').to('groupe2').emit() => envoyer à tous les socket des groupes 1 + 2

  let username;

  socket.on("login", async (token, cb) => {
    try {
      username = await getUsernameFromToken(token);
      cb(username);
    } catch (err) {
      cb(null);
    }
  });

  socket.on("send-message", async ({ room, message }) => {
    if (!username) {
      return;
    }
    const messageObject = {
      room,
      message,
      username,
      date: Date.now(),
      system: false,
    };
    const storedMessage = await addMessage(messageObject);
    io.emit("recv-message", storedMessage);
  });

  socket.on("get-messages", async (room, limit, cb) => {
    const messages = await listMessages(room, limit);
    cb(messages);
  });

  socket.on("disconnect", () => {
    // eslint-disable-next-line no-console
    console.log("Disconnected", socket.id, username);
  });
};
