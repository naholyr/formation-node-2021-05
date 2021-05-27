const Redis = require("ioredis");

const client = new Redis(process.env.REDIS_URL);

// TODO: pool? → https://www.npmjs.com/package/redis-connection-pool
// Solution générique : https://www.npmjs.com/package/generic-pool

module.exports = client;
