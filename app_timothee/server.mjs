import http from "http";
import { app } from "./app.mjs";

// 3002

const server = http.createServer(app);

server.listen(3002);
