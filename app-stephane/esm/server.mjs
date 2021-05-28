import http from "http";
import { app } from "./app.mjs";
import { Server } from "socket.io";
import { fibo } from "./fibo.mjs";
import { getUsernameFromToken } from "./lib/model/users.mjs";
import { addLMessage, listLMessages } from "./lib/model/messages.mjs";

const server = http.createServer(app);

server.on("listening", () => {
  console.log("Server ready: http://localhost:" + process.env.PORT);
});

//console.log(process.env.TOTO);

server.listen(Number(process.env.PORT));

const io = new Server(server);

//io.listen(server); //permet de l'intégrer dans le server existant et il intercepte certaines requetes

io.on("connection", (socket) => {
  initWebsocket(io, socket);
});

const initWebsocket = (io, socket) => {
  //socket.emit('event', ...args) => envoyer au client
  //socket.emit('event', ...args) => envoyer au client
  //io.emit('event', ...args) => envoyer à tous les clients (sans cb)
  //socket.broadcast.emit('event', ...args) => envoyer tous les clients sauf moi (socket)
  //socket.join('groupe') => range le socket dans un groupe
  //socket.leave('groupe') => retire le socket du groupe
  //io.to('groupe').emit() => envoyer à toutes les sockets du groupe
  //socket.broadcast.to('groupe').emit() => envoyer toutes les sockets du groupe sauf moi (socket)
  //io.to('groupe').to('groupe2').emit() => envoyer à toutes les sockets du groupe + groupe 2

  let username;

  socket.on("login", async (token, cb) => {
    //TODO check token
    try {
      username = await getUsernameFromToken(token);
      cb(username);
    } catch (err) {
      cb(null);
    }
  });

  socket.on("send-message", async ({ message, room }) => {
    //socket.broadcast.emit("send-message", { message });
    const date = Date.now();
    socket.emit("receive-message", {
      room: room,
      message: message,
      username: username,
      date: date,
    });
    addLMessage({
      room: room,
      username: username,
      message: message,
      date: date,
      system: false,
    });
  });

  socket.on("get-messages", async ({ room }, cb) => {
    const messages = await listLMessages({ room: room, limit: 3 });
    cb(messages);
  });

  setTimeout(() => {
    socket.emit("receive-message", {
      room: "#general",
      message: "coucou steph",
      username: "bidule",
      date: Date.now() - 3600000,
    });
  }, 2000);

  /*setTimeout(() => {
    socket.emit("receive-message", {
      room: "#truc",
      message: "coucou steph",
      username: "bidule",
      date: Date.now() - 3600000,
    });
  }, 3000);

  socket.emit("coucou");

  socket.on("tick", (timestamp) => {
    socket.emit("tock", Date.now() - timestamp);
  });

  //appel avec un callback pour refaire le lien avec les evenements
  socket.on("fibo", (n, cb) => {
    cb(fibo(n));
  });*/
};
