const http = require("http");
// 3003
const fibo = (n) => (n === 0 ? 0 : n === 1 ? 1 : fibo(n - 1) + fibo(n - 2));

const requestHandler = (request, response) => {
  console.log(request);
  if (request.url === "/") {
    response.write("hello");
  }

  if (!isNaN(Number(request.url.substring(1)))) {
    response.write(JSON.stringify(fibo(request.url)));
  }

  response.end();
};

const server = http.createServer(requestHandler);

server.listen(3003);
