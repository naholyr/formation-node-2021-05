import {
  isUserAvailable,
  addUser,
  getUsernameFromToken,
} from "./lib/model/users.mjs";
import { v4 as uuidV4 } from "uuid";

// 0. Contexte
let token = "";
let username = "";

// 1. l'utilisateur saisit son pseudo
setTimeout(async () => {
  username = "John" + uuidV4();
  if (await isUserAvailable(username)) {
    token = await addUser(username);
  }
  console.log({ username, token });

  // 2. Un peu plus tard, l'utilisateur revient
  setTimeout(async () => {
    username = await getUsernameFromToken(token);
    console.log({ username, token });

    process.exit(0);
  }, 5000);
});
