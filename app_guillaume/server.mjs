import http from "http";
import { app } from "./app.mjs";

const server = http.createServer(app);

server.on("listening", () => {
  console.log("Server ready: http://localhost:3003");
});

server.listen(3003);
