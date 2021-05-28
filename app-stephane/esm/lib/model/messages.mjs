import client from "../redis-client.mjs";

export const addLMessage = async ({
  room,
  username,
  message,
  date,
  system,
}) => {
  return await client.lpush(
    "M3004:" + room,
    JSON.stringify([username, message, date, system])
  );
};

export const listLMessages = async ({ room, limit }) => {
  const list = await client.lrange("M3004:" + room, 0, limit);
  return list.map((string) => {
    const [username, message, date, system] = JSON.parse(string);
    return { username, message, date, system, room };
  });
};

// addMessage({ username, text, room, system }): Promise<{ username, text, room, system, timestamp }>
// listMessages(limit = 10): Promise<{ username, text, room, system, timestamp }[]>
