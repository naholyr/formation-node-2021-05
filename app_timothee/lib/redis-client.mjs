import Redis from "ioredis";

const options = {
  host: "localhost",
  port: 6378,
};

export const client = new Redis(process.env.REDIS_URL);
