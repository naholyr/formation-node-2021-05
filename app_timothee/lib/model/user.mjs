import { client } from "../redis-client.mjs";
import { v4 } from "uuid";

const tokenDuration = Number(process.env.TOKEN_DURATION);

// isUserAvailable(username): Promise<boolean>
export const isUserAvailable = async (username) => {
  // falsy = false, undefined, null, '', 0, NaN
  return !(await client.get("U:" + username));
};

// getUsernameFromToken(token): Promise<username: string | null>
export const getUsernameFromToken = async (token) => {
  return await client.get("T:" + token);
};

// addUser(username): Promise<token: string>
export const addUser = async (username) => {
  const token = v4();
  await client
    .multi()
    .set("U:" + username, token, "EX", tokenDuration)
    .set("T:" + token, username, "EX", tokenDuration)
    .exec();
  return token;
};

// refreshToken(token): Promise<void>
export const refreshToken = async (token) => {
  const username = await getUsernameFromToken(token);
  await client
    .multi()
    .expire("U:" + username, tokenDuration)
    .expire("T:" + token, tokenDuration)
    .exec();
};
