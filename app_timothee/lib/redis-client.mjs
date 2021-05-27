import Redis from "ioredis";

const options = {
  host: "localhost",
  port: 6378,
};

const client = new Redis(process.env.REDIS_URL);

module.exports = {
  client,
};
