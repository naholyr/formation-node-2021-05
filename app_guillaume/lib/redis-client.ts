import Redis from "ioredis";

const options = {
  host: "localhost",
  port: 6379,
};

export const client = new Redis(options);

// TODO: pool? → https://www.npmjs.com/package/redis-connection-pool
// Solution générique : https://www.npmjs.com/package/generic-pool
