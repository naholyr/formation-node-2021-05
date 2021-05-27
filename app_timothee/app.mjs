import express from "express";
import { fibo } from "./fibo.mjs";

export const app = express();

app.use(express.static("public"));

app.get("/fibo/:number([0-9]+)", (req, res) => {
  res.send({ number: fibo(Number(req.params.number)) });
});
