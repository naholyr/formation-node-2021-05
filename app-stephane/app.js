const express = require("express");
const { fibo } = require("./fibo"); // fibo === function ...

const app = express();

//en option
app.set("x-powered-by", false);
app.set("etag", false);

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

/*app.get("/fibo/10", (req, res) => {
  res.send({ input: 10, output: fibo(10) });
});*/

//url dynamique
app.get("/fibo/:number", (req, res) => {
  res.send({ input: req.params.number, output: fibo(10) });
});

//url dynamique avec typage du param
/*app.get("/fibo/:number([0-9]+)", (req, res) => {
    res.send({ input: req.params.number, output: fibo(10) });
  });
  */
module.exports = app;

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
