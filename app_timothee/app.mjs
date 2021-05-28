import express from "express";
import { fibo } from "./fibo.mjs";
import bodyParser from "body-parser";
import { addUser } from "./lib/model/user.mjs";
import { callbackify } from "node:util";

export const app = express();

app.set("x-powered-by", false);
app.set("etag", false);

app.use(express.static("public"));
app.use(bodyParser.json({}));

app.get("/fibo/:number([0-9]+)", (req, res) => {
  res.send({ number: fibo(Number(req.params.number)) });
});

app.post(
  "/auth/register",
  callbackify(async (req, res) => {
    const token = await addUser(req.body.username);
    res.send({ token });
  })
);
