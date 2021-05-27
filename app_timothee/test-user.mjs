import {
  isUserAvailable,
  getUsernameFromToken,
  addUser,
  refreshToken,
} from "./lib/model/user.mjs";

addUser("John").then(console.log(response));
