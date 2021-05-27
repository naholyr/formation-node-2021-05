const express = require("express");
const { fibo } = require("./fibo"); // fibo === function ...

const app = express();

/*
const router = new express.Router()
router.get('/:number', (req, res) => {})
app.use('/fibo', router);
*/

app.set("x-powered-by", false);
app.set("etag", false);

app.use(express.static("public"));

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

module.exports = app;

// 3001

/*
string.substring(1); // tout sauf 1er caractères
Number(string); // number ou NaN
isNaN(value); // true si NaN
JSON.stringify(objet); // json
*/

// GET / => "Coucou"
// GET /nombre => JSON { input: nombre, output: fibo(nombre) }

const requestHandler = (request, response) => {
  // request.url = '/favicon.ico'
  // request.method = 'GET'
  // request.headers = { [lower case header name]: value }
  let body = "";
  if (request.method === "GET" && request.url === "/") {
    body = "Coucou";
  } else {
    const n = Number(request.url.substring(1));
    if (isNaN(n) || n < 0) {
      response.statusCode = 400;
      body = "Positive integer expected";
    } else {
      const result = fibo(n);
      body = JSON.stringify({ input: n, output: result });
    }
  }
  response.setHeader("Content-Length", body.length);
  response.write(body);
  response.end();
};
