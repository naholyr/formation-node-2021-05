import { client } from "../redis-client.mjs";

// addMessage({ username, message, room, system, date }): Promise<{ username, message, room, system, date }>
export const addMessage = async ({ username, message, date, room, system }) => {
  console.log(username);
  return await client.lpush(
    "M:" + room,
    JSON.stringify([username, message, date, system])
  );
};

// listMessages(limit = 10): Promise<{ username, text, room, system, timestamp }[]>
export const listMessages = async (limit, room) => {
  let list = await client.lrange("M:" + room, 0, limit);
  return list.map((string) => {
    const [username, message, date, system] = JSON.parse(string);
    return { username, message, date, system, room };
  });
};
