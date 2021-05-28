import { client } from "../redis-client";
import { User } from "../model/user.model";
import * as UUID from "uuid";

const tokenDuration = Number(process.env.TOKEN_DURATION) || 86400;

export const addUser = async (username: any): Promise<string> => {
  const token = UUID.v4();
  await client
    .multi()
    .set("U:" + username, token, "EX", tokenDuration)
    .set("T:" + token, username, "EX", tokenDuration)
    .exec();
  return token;
};

export const isUserAvailable = async (username: string): Promise<boolean> =>
  !(await client.get("U:" + username));

export const getUsernameFromToken = async (token: any): Promise<string | null> =>
  await client.get("T:" + token);

export const refreshToken = async (token: any): Promise<void> => {
  const username = await getUsernameFromToken(token);
  await client
    .multi()
    .expire("U:" + username, tokenDuration)
    .expire("T:" + token, tokenDuration)
    .exec();
};
