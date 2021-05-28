const http = require("http");
const app = require("./app");
const socketio = require("socket.io");
const { getUsernameFromToken } = require("./lib/model/users");
const { addMessage, listMessages } = require("./lib/model/messages");
const redisAdapter = require("socket.io-redis");

const server = http.createServer(app);

server.on("listening", () => {
  console.log("Server ready: http://localhost:" + process.env.PORT);
});

module.exports = server;

const io = socketio();

io.adapter(redisAdapter(process.env.REDIS_URL));

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

  const sendMessage = async (message) => {
    if (!message.date) {
      message.date = Date.now();
    }
    const storedMessage = await addMessage(message);
    io.to(storedMessage.room).emit("recv-message", storedMessage);
  };

  socket.on("login", async (token, cb) => {
    try {
      username = await getUsernameFromToken(token);
      cb(username);
      // Initialize rooms
      socket.join("(system)");
      socket.join("@" + username);
      socket.join("#general");
      await sendMessage({
        room: "#general",
        username,
        message: "s’est connecté",
        system: true,
      });
    } catch (err) {
      cb(null);
    }
  });

  socket.on("send-message", async ({ room, message }) => {
    if (!username) {
      return;
    }
    await sendMessage({ room, message, username });
  });

  socket.on("get-messages", async (room, limit, cb) => {
    const messages = await listMessages(room, limit);
    cb(messages);
  });

  socket.on("join-room", async (room) => {
    socket.join(room);
    await sendMessage({
      room,
      username,
      message: "a rejoint " + room,
      system: true,
    });
  });

  socket.on("leave-room", async (room) => {
    socket.leave(room);
    await sendMessage({
      room,
      username,
      message: "a quitté " + room,
      system: true,
    });
  });

  socket.on("disconnect", () => {
    // eslint-disable-next-line no-console
    console.log("Disconnected", socket.id, username);
  });
};
