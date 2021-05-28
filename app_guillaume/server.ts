import http from "http";
import { app } from "./app";
import { Server, Socket } from "socket.io"
import { getUsernameFromToken } from "./lib/data/user"
import { addMessage, getMessages } from './lib/data/message'
import { Message } from "./lib/model/message.model"

const server = http.createServer(app);
const io = new Server(server)

server.on("listening", () => {
  console.log("Server ready: http://localhost:3003");
});

server.listen(Number(process.env.PORT));


io.on("connection", (socket: Socket) => {
  initWebsocket(io, socket);
});

const initWebsocket = async (io: Server, socket: Socket) => {
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
  let username: string | null

  socket.on("login", async (token: any, cb: any) => {
    try {
      username = await getUsernameFromToken(token);
      cb(username);
      fakeMessages();
    } catch (err) {
      cb(null);
    }
  });

  socket.on("send-message", async ({room, text}) => {
    try {
      if(username) {
        const test: Message = { username, text, room , date: Date.now()}
        //await addMessage(message)
        console.log(test)
        //io.emit("recv-message", message)
      }
    } catch(err) {

    }
  })

  socket.on("get-messages", async (room: any) => {
    try {
      const messages: Message[] = await getMessages({room, limit: 10})
      console.log(messages)
    } catch(err) {console.log(err)}
  })

  const fakeMessages = () => {
    setTimeout(() => {
      socket.emit("recv-message", {
        room: "#general",
        message: "coucou",
        username: "bidule",
        date: Date.now(),
      });
    }, 2000);
    setTimeout(() => {
      socket.emit("recv-message", {
        room: "#truc",
        message: "coucou",
        username: "bidule",
        date: Date.now(),
      });
    }, 3000);
    setTimeout(() => {
      socket.emit("recv-message", {
        room: "#general",
        message: "a rejoint la room",
        username: "truc",
        date: Date.now(),
        system: true,
      });
    }, 4000);
  };
};
