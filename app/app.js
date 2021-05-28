const express = require("express");
const { fibo } = require("./fibo"); // fibo === function ...
const bodyParser = require("body-parser");
const { addUser, getUsernameFromToken } = require("./lib/model/users");
const { callbackify } = require("node:util");

const app = express();

/*
const router = new express.Router()
router.get('/:number', (req, res) => {})
app.use('/fibo', router);
*/

app.set("x-powered-by", false);
app.set("etag", false);

app.use(express.static("public"));

app.use(bodyParser.json({}));
// app.use(bodyParser.urlencoded(…))

/*
const middleware = (req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
};

app.use(middleware);
*/

/*
const userSession = async (req, res, next) => {
  let error = null;
  try {
    const sessionId = getFromCookies(req.cookies);
    const session = await fetchUserSessionFromDB(sessionId);
    req.session = session;
  } catch (err) {
    error = err;
  }
  next(error);
};

app.use(userSession);
*/

/*
const { callbackify } = require("util");

const userSession = async (req, res) => {
  const sessionId = getFromCookies(req.cookies);
  const session = await fetchUserSessionFromDB(sessionId);
  req.session = session;
};

app.use(callbackify(userSession));
*/

// app.verb(route, handler)

app.get("/", (req, res) => {
  // req.cookies (si middleware)
  // req.session (si middleware)
  // req.query (query string)
  // req.body (si middleware)
  // req.params (paramètres d'url)
  // res.send (raccourci de write + end)
  //       string => text/html
  //       Buffer => application/octet-stream
  //       object => application/json
  //       number => status
  // res.redirect (302 + header "location")
  res.send("Coucou");
});

app.get("/fibo/:number([1-9][0-9]*)", (req, res) => {
  const n = Number(req.params.number);
  res.send({ input: n, output: fibo(n) });
});

/*
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
*/
app.post(
  "/auth/register",
  callbackify(async (req, res) => {
    const token = await addUser(req.body.username);
    res.send({ token });
  })
);

app.post(
  "/auth/check",
  callbackify(async (req, res) => {
    const username = await getUsernameFromToken(req.body.token);
    if (username) {
      res.send({ username });
    } else {
      res.status(401).send({ error: "Invalid token" });
    }
  })
);

module.exports = app;
