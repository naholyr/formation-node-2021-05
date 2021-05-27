import {
  getUsernameFromToken,
  isUserAvailable,
  addUser,
} from "./lib/data/user";

let token = "";
let username = "";

// 1. l'utilisateur saisit son pseudo
setTimeout(async () => {
  username = "John2";
  if (await isUserAvailable(username)) {
    token = await addUser(username);
  }
  console.log({ username, token });

  // 2. Un peu plus tard, l'utilisateur revient
  setTimeout(async () => {
    const username = await getUsernameFromToken(token);
    console.log({ username, token });

    process.exit(0);
  }, 5000);
});
