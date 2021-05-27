import client from "../redis-client.mjs";
import { v4 as uuidV4 } from "uuid";

const tokenDuration = 86400;

/*

- POST /register + username =>
  - isUserAvailable(username) => dispo ?
  - addUser(username) => token
  - renvoyer le token
- Stocker le token côté client

- POST /login + token =>
  - getUsernameFromToken(token) => username ?
  - renvoyer le username
- OK

*/

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
  const token = uuidV4();
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

// Public API
/*module.exports = {
  isUserAvailable,
  getUsernameFromToken,
  addUser,
  refreshToken,
};*/
