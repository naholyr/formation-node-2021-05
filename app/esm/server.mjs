import http from "http";
import express from "express";
import { fibo } from "./fibo.mjs";

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

const server = http.createServer(requestHandler);

server.on("listening", () => {
  console.log("Server ready: http://localhost:3001");
});

server.listen(3001);
