import { fibo } from "./fibo";
import express from "express";

export const app = express();
app.set("x-powered-by", false);
app.set("etag", false);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello");
  res.end();
});

app.get("/fibo/:value([1-9][0-9]*)", (req, res) => {
  /*const params: {value: string} = req.params as unknown;
  const number = parseInt(params.value, 10);
  res.send({ input: number, output: fibo(number) });*/
  res.end();
});
