const client = require("../redis-client");
const uuid = require("uuid");

const tokenDuration = Number(process.env.TOKEN_DURATION);

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
const isUserAvailable = async (username) => {
  // falsy = false, undefined, null, '', 0, NaN
  return !(await client.get("U:" + username));
};

// getUsernameFromToken(token): Promise<username: string | null>
const getUsernameFromToken = async (token) => {
  return await client.get("T:" + token);
};

// addUser(username): Promise<token: string>
const addUser = async (username) => {
  const token = uuid.v4();
  await client
    .multi()
    .set("U:" + username, token, "EX", tokenDuration)
    .set("T:" + token, username, "EX", tokenDuration)
    .exec();
  return token;
};

// refreshToken(token): Promise<void>
const refreshToken = async (token) => {
  const username = await getUsernameFromToken(token);
  await client
    .multi()
    .expire("U:" + username, tokenDuration)
    .expire("T:" + token, tokenDuration)
    .exec();
};

// Public API
module.exports = {
  isUserAvailable,
  getUsernameFromToken,
  addUser,
  refreshToken,
};
