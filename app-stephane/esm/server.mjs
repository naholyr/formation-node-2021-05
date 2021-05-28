import http from "http";
import { app } from "./app.mjs";

const server = http.createServer(app);

server.on("listening", () => {
  console.log("Server ready: http://localhost:" + Number(process.env.PORT));
});

//console.log(process.env.TOTO);

server.listen(Number(process.env.PORT));
