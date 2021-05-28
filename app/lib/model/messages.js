const client = require("../redis-client");

// addMessage({ username, message, room, system, date }): Promise<{ username, message, room, system, date }>
const addMessage = async ({
  username,
  message,
  room = "#general",
  system = false,
  date = Date.now(),
}) => {
  await client.lpush(
    "M:" + room,
    JSON.stringify([username, message, date, system])
  );
  return { username, message, room, system, date };
};

// listMessages(room, limit = 10): Promise<{ username, text, room, system, timestamp }[]>
const listMessages = async (room, limit = 10) => {
  const strings = await client.lrange("M:" + room, 0, limit);
  return strings.map((string) => {
    const [username, message, date, system] = JSON.parse(string);
    return { username, message, date, system, room };
  });
};

module.exports = { addMessage, listMessages };
