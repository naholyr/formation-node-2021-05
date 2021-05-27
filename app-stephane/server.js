const http = require("http");
const express = require("express");
const fibo = require("./fibo");

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
const server = http.createServer(requestHandler);
server.listen(3004);
