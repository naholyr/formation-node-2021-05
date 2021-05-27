// TODO: use "joi" (or "zod") to validate config?
module.exports = {
  ...process.env,
  PORT: Number(process.env.PORT) ?? 8080,
  REDIS_URL: process.env.REDIS_URL,
  ...
}
