import express from "express";
import { fibo } from "./fibo.mjs";

export const app = express();

app.set("x-powered-by", false);
app.set("etag", false);

app.use(express.static("public"));

// app.verb(route, handler)

app.get("/", (req, res) => {
  // req.cookies (si middleware)
  // req.session (si middleware)
  // req.query (query string)
  // req.body (si middleware)
  // req.params (paramètres d'url)
  // res.send (raccourci de write + end)
  // res.redirect (302 + header "location")
  res.send("Coucou");
});

app.get("/fibo/:number([1-9][0-9]*)", (req, res) => {
  const n = Number(req.params.number);
  res.send({ input: n, output: fibo(n) });
});
