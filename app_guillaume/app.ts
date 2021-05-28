import { fibo } from "./fibo";
import express from "express";
import bodyParser from 'body-parser'
import { getUsernameFromToken, addUser } from './lib/data/user'

export const app = express();

app.set("x-powered-by", false);
app.set("etag", false);

app.use(express.static("public"));
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Hello");
  res.end();
});

app.post("/auth/register", async (req, res) => {
  const user = req.body.username;
  try {
    const token = await addUser(user)
    res.send({token})
  } catch (err) {
      res.status(500).send({ err: err.message})
  }
});

app.post("/check-token", async (req, res) => {
  const token = req.body.token
  try  {
    const user = await getUsernameFromToken(token)
    res.send({isAuthenticated : !!user})
  } catch (err) {
    res.status(500).send({err: err.message})
  }
});

app.get("/fibo/:value([1-9][0-9]*)", (req, res) => {
  /*const params: {value: string} = req.params as unknown;
  const number = parseInt(params.value, 10);
  res.send({ input: number, output: fibo(number) });*/
  res.end();
});
