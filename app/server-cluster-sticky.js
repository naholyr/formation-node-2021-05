// cluster.js
const server = require("./server");
require("sticky-cluster")((cb) => cb(server), {
  port: process.env.PORT,
  debug: true,
});
