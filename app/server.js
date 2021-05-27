const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.on("listening", () => {
  console.log("Server ready: http://localhost:3001");
});

server.listen(Number(process.env.PORT));
