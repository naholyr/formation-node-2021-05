const http = require("http");

const fibo = (n) => (n === 0 ? 0 : n === 1 ? 1 : fibo(n - 1) + fibo(n - 2));
// 3002

const requestHandler = (request, response) => {
  let message = "";
  if (request.method === "GET") {
    if (request.url == "/") {
      console.log("Enter /");
    } else if (
      !isNaN(Number(request.url.substring(1))) &&
      Number(request.url.substring(1)) > 0
    ) {
      message = JSON.stringify(fibo(Number(request.url.substring(1))));
    } else {
      message = "Error";
    }
  }
  response.write(message);
  response.end();
};

const server = http.createServer(requestHandler);

server.listen(3002);
