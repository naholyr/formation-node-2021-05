import express from "express";
import { fibo } from "./fibo.mjs";
import bodyParser from "body-parser";
import { addUser, getUsernameFromToken } from "./lib/model/users.mjs";

export const app = express();

//en option
app.set("x-powered-by", false);
app.set("etag", false);

app.use(express.static("esm/public"));

app.use(bodyParser.json({}));

//route 1
app.get("/", (req, res) => {
  //res.cookies si middleware)
  //res.session si middleware)
  //res.query si middleware)
  //res.body (si middleware)
  //res.params (params d'url)
  //res.send (raccourci de write + end => avec un Etag pour le cache)

  //res.write("coucou");
  //res.end();

  //ou

  res.send("coucou");
});

/*app.post("/auth/register", (req, res) => {
  console.log(req.headers["content-type"]);
  console.log(req.body);
  req.body.username;
  res.send({ token: "FakeTokenFromRequest" });
});$/
*/
app.post("/auth/register", async (req, res) => {
  try {
    const token = await addUser(req.body.username);
    res.send({ token });
  } catch (err) {
    // TODO: use a real logger "bunyan" or "winston"
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});
app.post("/auth/checktoken", async (req, res) => {
  try {
    const username = await getUsernameFromToken(req.body.token);
    res.send({ username });
  } catch (err) {
    // TODO: use a real logger "bunyan" or "winston"
    console.error(err);
    res.status(401).send({ error: "invalid token" });
  }
});

/*app.post(
  "/auth/register",
  callbackify(async (req, res) => {
    const token = await addUser(req.body.username);
    res.send({ token });
  })
);*/

/*app.get("/fibo/10", (req, res) => {
  res.send({ input: 10, output: fibo(10) });
});*/

//url dynamique
app.get("/fibo/:number", (req, res) => {
  res.send({ input: req.params.number, output: fibo(req.params.number) });
});

//url dynamique avec typage du param
/*app.get("/fibo/:number([0-9]+)", (req, res) => {
    res.send({ input: req.params.number, output: fibo(10) });
  });
  */
//module.exports = app;

const requestHandler = (request, response) => {
  // request.url = ''
  // request.method = 'GET'
  // request.header
  console.log(request.url);
  const url = request.url;
  response.write("coucou:" + url);
  if (url == "/") {
    response.write("coucou");
  } else {
    const num = url.substr(1);
    response.write("num:" + num);
    response.write("fibo:" + (isNaN(num) ? "ko" : fibo(Math.abs(num))));
  }
  response.end();
};
