import redis from require("ioredis");

const options = {
  host: "localhost",
  port: 6378,
};

const client = new Redis.client(process.env.REDIS_URL);

module.exports = {
  client,
};
