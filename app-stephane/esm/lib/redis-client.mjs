import Redis from "ioredis";

const options = {
  host: "localhost",
  port: 6379,
};

const client = new Redis(options);

// TODO: pool? → https://www.npmjs.com/package/redis-connection-pool
// Solution générique : https://www.npmjs.com/package/generic-pool

//module.exports = client;

export default client;
